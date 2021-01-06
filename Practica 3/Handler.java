package Practica 3;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.nio.channels.Selector;
import java.nio.channels.SelectionKey;
import java.nio.channels.SocketChannel;
import java.util.logging.Level;
import java.util.logging.Logger;

class ServerHandler implements Runnable {
    final SocketChannel channel;
    final SelectionKey selkey;
    ByteBuffer readBuff = ByteBuffer.allocate(1024);
    String nickName;
    String msg;
    HashMap<String,ServerHandler> usersMap;
   

    ServerHandler(Selector sel, SocketChannel scCha, String nickName, HashMap<String,ServerHandler> usersMap) throws IOException {
        this.channel = scCha;
        channel.configureBlocking(false);
        this.nickName = nickName;
        this.usersMap = usersMap;
        selkey = channel.register(sel, SelectionKey.OP_READ);
        selkey.attach(this);
        selkey.interestOps(SelectionKey.OP_READ);
        sel.wakeup();
    }
    public void run() {
        try {
            if (selkey.isReadable())
                read();
            else if (selkey.isWritable())
                write();
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    void read() throws IOException {
        int numBytes;

        try {
            numBytes = channel.read(readBuff);
            System.out.println("Number of bytes read into buffer = " + numBytes);

            if (numBytes == -1) {
                selkey.cancel();
                channel.close();
                System.out.println("NumBytes=-1");
            }
            else {
                readBuff.flip(); // The limit is set to the current position and then the position is set to zero. 
                byte[] bytes = new byte[readBuff.remaining()];
                msg = nickName+": "+(new String(bytes, Charset.forName("ISO-8859-1")));
                readBuff.get(bytes, 0, bytes.length);
                selkey.interestOps(SelectionKey.OP_WRITE);
                selkey.selector().wakeup();
            }
        }
        catch (IOException ex) {
    
            selkey.cancel();
            channel.close();
            ex.printStackTrace();
            usersMap.remove(nickName);
            String nickNames=usersMap.keySet().toString();
            nickNames=nickNames.replace("[","");
            nickNames=nickNames.replace("]","");
            nickNames=nickNames.replace(", ","-");
            String nickNamelist=nickNames;                  
            System.out.println("Good bye "+nickName);
            usersMap.forEach((k,v) -> {
                try{
                    v.channel.write(ByteBuffer.wrap((nickName+" logOut\n").getBytes()));
                    v.channel.write(ByteBuffer.wrap(("updateUser-"+nickNamelist+"\n").getBytes()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            return;
        }
    }

    void write() throws IOException {
        try {
            usersMap.forEach((k,v) -> {
                if(k!=nickName){
                    System.out.println(k);
                    try{
                        v.channel.write(ByteBuffer.wrap(msg.getBytes()));
                    }catch (IOException ex) {
                        ex.printStackTrace();
                    }
                };
            });
            System.out.print("message: "+msg);    
            readBuff.clear();
            selkey.interestOps(SelectionKey.OP_READ);
            selkey.selector().wakeup();
        }
        catch (IOException ex) {
            channel.close();
            ex.printStackTrace();
        }  
    }
}