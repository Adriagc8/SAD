import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.*;


public class MySocket extends Socket{
   private Socket sc; 

   public MySocket(String host, int port) {
    
    try {
        this.sc = new Socket(host, port); 
       } catch (IOException ex) {
        System.err.println(ex);
       }
   }
   
   public MySocket(Socket socket){
       this.sc = socket;
   }

   public void MyConnect(SocketAddress endpoint){
    
       try {
        this.sc.connect(endpoint); //Connects this socket to the server.
       } catch (IOException ex) {
        System.err.println(ex);
       }
   }

   public InputStream MyGetInputStream(){
       try {
           return sc.getInputStream(); //returns an input stream for reading bytes from this socket.
       } catch (IOException ex) {
        System.err.println(ex);
       }
       return null;
      
   }
   public OutputStream MyGetOutputStream(){
      
       try {
           return sc.getOutputStream(); //Returns an output stream for this socket
       } catch (IOException ex) {
        System.err.println(ex);
       }
       return null;
   }
   
   public void Myclose(){
       try {
           sc.close(); //Closing this socket will also close the socket's InputStream and OutputStream.
                      // If this socket has an associated channel then the channel is closed as well.
       } catch (IOException ex) {
        System.err.println(ex);
       }
   }
}