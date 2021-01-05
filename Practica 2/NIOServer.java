package Practica 3;

import java.io.IOException;
import java.util.HashMap;
import java.net.InetSocketAddress;
import java.nio.*;


class NIOServer implements Runnable {
    final Selector selector;
    final static int PORT = 4000;
    final ServerSocketChannel serverch;
    HashMap<String,ServerHandler> usersMap;

    public static void main(String[] args) {
        try {
            new Thread(new NIOServer(PORT)).start();
            System.out.println("SERVER RUNING ON PORT: "+PORT);
        }
        catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    NIOServer(int port) throws IOException {
        selector = Selector.open();
        serverch = ServerSocketChannel.open();
        serverch.socket().bind(new InetSocketAddress(port));
        serverch.configureBlocking(false);
        SelectionKey sk = serverch.register(selector, SelectionKey.OP_ACCEPT);
        sk.attach(new Acceptor());
        usersMap = new HashMap<String,ServerHandler>();
    }

  
