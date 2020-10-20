import java.io.*;
import java.util.*;

 class CountCol {

  public static void main(String[] args) {

       String[] COLS = {"bash", "-c", "tput cols > /dev/tty"};

   
    try{
        Process p = Runtime.getRuntime().exec(COLS);
        p.waitFor();
        InputStreamReader in = new InputStreamReader(p.getInputStream());
        int cols = in.read();
        System.out.println(cols) ;
    }catch(Exception e){
        System.out.println(e);
    }
   
    
    
  }
  
}
