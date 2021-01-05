import java.io.PrintWriter;
import java.util.concurrent.Executors;
import java.io.BufferedReader;
import java.io.Console;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Server {
    private static final int PORT = 5000;
    public static ConcurrentHashMap<String, Handler> clientsMap = new ConcurrentHashMap<String, Handler>();

    public static void main(String[] args) throws Exception {
        System.out.println("The server is running on port" + PORT);
        var pool = Executors.newFixedThreadPool(500);
        try (MyServerSocket listener = new MyServerSocket(PORT)) {
            while (true) {
              //  pool.execute(new Handler(listener.accept()));
              pool.execute(new Handler(listener.accept()));
            }
        }
    }

    public static class Handler implements Runnable {
        private final MySocket socket;
        private String lastMsg = "";
        private String clientName;
        public BufferedReader in = null;
        public PrintWriter out = null;

        public Handler(MySocket sc) {
            this.socket = sc;
            this.in = new BufferedReader(new InputStreamReader(this.socket.MyGetInputStream()));
            this.out = new PrintWriter(socket.MyGetOutputStream(), true);
        }

        @Override
        public void run() {
            try (this.socket) {
                boolean username = false;
                boolean logOut = false;
                while (!username) {
                    this.out.print("Enter your username: \n");
                    this.out.flush();
                    try {
                        this.clientName = this.in.readLine();
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                    if (!clientsMap.containsKey(this.clientName)) {

                        Server.clientsMap.values().stream().map((ms) -> {
                            ms.out.print(">>"+this.clientName + " has joined the chat<<\n");
                            return ms;
                        }).forEachOrdered((ms) -> {
                            ms.out.flush();
                        });
                        System.out.println("New User: " + this.clientName + ":)");
                        clientsMap.put(this.clientName, this);
                        username = true;
                    } else {
                        this.out.println("Username already taken :(\n");
                        this.out.flush();
                    }
                }
                while (!logOut) {
                    try {
                        if (this.in.ready()) {
                            this.lastMsg = this.in.readLine();
                            System.out.println("receive message: '" + this.lastMsg + "'");
                            if (this.lastMsg.equals("exit")) {
                                clientsMap.remove(this.clientName);
                                // Li diem a tots els clients que ell marxa:
                                Server.clientsMap.values().stream().map((ms) -> {
                                    ms.out.print("\t\t"+this.clientName + " has left\n");
                                    return ms;
                                }).forEachOrdered((ms) -> {
                                    ms.out.flush();
                                });
                                logOut = true;
                            }

                        }
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                   
                if (!"".equals(this.lastMsg)) { // si l'ultim missatge no es buit
              
                    Server.clientsMap.values().stream().map((ms) -> {
                        if (!ms.clientName.equals(this.clientName)) { // mirem que no siguem nosaltres
                            ms.out.print("\t>"+this.clientName + ": " + this.lastMsg + "\n");
                        }
                        return ms;

                    }).forEachOrdered((ms) -> {
                        ms.out.flush();
                    });
                }
                this.lastMsg = "";
                }
                

            } 
            try {
                this.in.close();
            } catch (IOException ex) {
                System.out.println(ex);
            }
            this.out.close();
        }

    }
}