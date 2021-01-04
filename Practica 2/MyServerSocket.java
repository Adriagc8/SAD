import java.io.*;
import java.net.*;


public class MyServerSocket extends ServerSocket {
    private ServerSocket serverSocket;
    private MySocket socket;
    public MyServerSocket(int port) throws IOException{

        this.serverSocket = new ServerSocket(port);
    }

    @Override
    public MySocket Myaccept(){
        try {
            this.socket = new MySocket(serverSocket.accept()); //Listens for a connection to be made to this socket and accepts it. 
                                                            //The method blocks until a connection is made.
            return socket;
        } catch (IOException ex) {
            System.err.println(ex);
        }
        return  null;
    }


    @Override
    public void close(){
        try {
            this.serverSocket.close(); //Closes this socket. Any thread currently blocked in accept() will throw a SocketException.
                                        //If this socket has an associated channel then the channel is closed as well.
        } catch (IOException ex) {
            System.err.println(ex);
        }
    }
  
}
