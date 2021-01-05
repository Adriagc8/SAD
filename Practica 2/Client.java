import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.util.Scanner;


public class Client {
    public static final int serverPort = 5000;
    public static final String serverHost = "localhost";

    public static void main(String[] args) throws IOException{
        MySocket socket = new MySocket(serverHost,serverPort);
        Scanner keyboard = new Scanner(System.in);
        PrintWriter out = new PrintWriter(socket.MyGetOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.MyGetInputStream()));      

        Thread chatInput = new Thread(new Runnable(){
            public void run(){      
                String line=keyboard.nextLine();
                while(line != null){
                   out.print(line+"\n");
                    out.flush();
                    line=keyboard.nextLine();
                }              
            }
        });
        Thread chatOutput = new Thread(new Runnable(){
            public void run(){            
                try {
                    String msg=in.readLine();
                    while(msg != null){
                        System.out.println(msg);
                           msg=in.readLine();
                    }
                } catch (IOException ex) {
                    
                }              
            } 
        });
        chatInput.start();
        chatOutput.start();
        System.out.println("CLIENT JOINED");
        System.out.println("write exit to LogOut");
    }    
}