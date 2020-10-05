
import java.io.*;

public class EditableBufferedReader extends BufferedReader {
    // variables
    // Valors dentrada de system.in
    static final int ENTER = 13;
    static final int ESC = 27;
    static final int INSERT = 50; // ^[[2~
    static final int SUPR = 51; // ^[[3~
    static final int LEFT = 68; // ^[[D
    static final int RIGHT = 67; // ^[[C
    static final int END = 70; // ^[[6~
    static final int HOME = 72; // ^[[5~
    static final int CORCHETE = 91;
    static final int BACKSPACE = 127;
    // valors interns de comunicació entre ReadLine() i Line
    static final int _ESCAPE= 200; //a partir de 200 hem definit les escape secuences
    static final int _INSERT = 201;
    static final int _SUPR = 205;
    static final int _HOME = 200;
    static final int _LEFT = 201;
    static final int _RIGHT = 202;
    static final int _END = 203;
    static final int _BACKSPACE = 128;
    static final int _INVINPUT=129;
    

    // Constructor
    public EditableBufferedReader(Reader in) {
        super(in);
    }
  

    public void setRaw() {
        String[] cmd = { "/bin/sh", "-c", "stty -echo raw </dev/tty" }; // Comana per canviar la consola a mode Raw
        Process p;
        try {
            p = Runtime.getRuntime().exec(cmd);
            if (p.waitFor() == 1) {
                p.destroy();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void unsetRaw() {
        String[] cmd = { "/bin/sh", "-c", "stty echo cooked </dev/tty" }; // Comana per canviar la consola a mode Cooked
        Process p;
        try {
            p = Runtime.getRuntime().exec(cmd);
            if (p.waitFor() == 1) {
                p.destroy();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int read() throws IOException {
        // Caldrà que els sencers retornats com a símbols no es solapin
        // amb els sencers retornats com a caràcters simples.

        this.setRaw();

        int carac = 0;
        try{
            carac = super.read();
        if (carac == ESC) { //sequencia d'escape
            carac = super.read();
            if (carac == CORCHETE) {
                carac = super.read();
               switch (carac) {
                    case INSERT:
                        carac = _INSERT;
                        break;
                    case SUPR:
                        carac = _SUPR;
                        break;
                    case HOME:
                        carac= _HOME;
                        break;
                    case LEFT:
                        carac= _LEFT;
                        break;
                    case RIGHT:
                        carac= _RIGHT;
                        break;
                    case END:
                        carac= _END;
                        break;
                    default:
                        carac=_INVINPUT;
                        break;
                }

            } else { 
                carac=_INVINPUT;
            }
        } else if (carac==BACKSPACE){
            carac=_BACKSPACE;
        }
        this.unsetRaw();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return carac;
   

    }

  /*  public String readLine(){ 
          int r_carac=0;
           do{ 
               r_carac=this.read();
                
                    if(r_carac >= _ESCAPE){
                        switch (carac){
                            case _INSERT:
                                //this.linia.toInsert();
                            break;
                            case _SUPR:
                                //this.linia.suprimir();
                            break;
                            case SEC_RIGHT:
                                //this.linia.right();
                            break;
                            
                            case SEC_DELETE:
                                //this.linia.delete();
                              
                            break;
                            case SEC_FIN:
                                //this.linia.fin();
                            break;
                            case SEC_HOME:
                                //this.linia.home();
                            break;
                            case SEC_LEFT:
                                //this.linia.left();
                            break;
                           
                        }
     
      
             
       } while(carac != ENTER);
      
      
      
      
      }

}*/
}