import java.io.PrintWriter;
import java.util.concurrent.Executors;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Server {
    private static final int PORT=5000;
    public static ConcurrentHashMap<String, Handler> clientsMap = new ConcurrentHashMap<String, Handler>();
    public static void main(String[] args) throws Exception {
        System.out.println("The server is running on port"+ PORT);
        var pool = Executors.newFixedThreadPool(500);
        try (MyServerSocket listener = new MyServerSocket(PORT)) {
            while (true) {
                pool.execute(new Handler(listener.accept()));
            }
        }
    }
    
    public static class Handler implements Runnable {
        private final MySocket socket;
        private String lastMsg=""; 
        private String clientName;
        public BufferedReader in = null;
        public PrintWriter out = null;

        public Handler(MySocket sc){
            this.socket = sc;
            this.in = new BufferedReader(new InputStreamReader(this.socket.MyGetInputStream()));
            this.out = new PrintWriter(socket.MyGetOutputStream(), true);
        }
        @Override
        public void run(){
            try (this.socket) {
                boolean username = false;
                boolean logOut = false;
                while(!username){
                    try {
                        
                    }catch (IOException e) {
                        System.out.println(e);
                    }
                }
                while(!logOut){
                    try {
                        
                    }catch (IOException e) {
                        System.out.println(e);
                    }
                }

                
            }catch (IOException ex) {
                System.out.println(ex);
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