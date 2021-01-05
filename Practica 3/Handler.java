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
        int nbytes;

        try {
            nbytes = channel.read(readBuff);

        }
        catch (IOException ex) {
            
            return;
        }
    }

    void write() throws IOException {
       
    }
}
