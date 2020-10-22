
import java.io.*;

public class EditableBufferedReader extends BufferedReader {
    private Line line;
    // variables
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
    static final int _LEFT = 204;
    static final int _RIGHT = 202;
    static final int _END = 203;
    static final int _BACKSPACE = 206;
    static final int _INVINPUT=129;

    // Constructor
    public EditableBufferedReader(Reader in) {
        super(in);
        this.line = new Line(); 
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

   

        int carac = 0;
       try{
            carac = super.read();
        if (carac == ESC) { //sequencia d'escape
            carac = super.read();
            if (carac == CORCHETE) {
                carac = super.read();
               switch (carac) {
                    case INSERT:
                        super.read();
                        carac = _INSERT;
                        break;
                    case SUPR:
                        super.read();
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
        }else if (carac==BACKSPACE){
            carac=_BACKSPACE;
        }
       
        }catch (IOException e) {
            e.printStackTrace();
        }
        return carac;
   

    }

   public String readLine()throws IOException{ 
   this.setRaw();
          int r_carac=0;
           do{ 
               r_carac=this.read();
                
                if(r_carac >= _ESCAPE){
                    switch (r_carac){
                            case _INSERT:
                                this.line.toInsert();
                            break;
                            case _SUPR:
                                this.line.suprimir();
                            break;
                            case _RIGHT:
                                this.line.right();
                            break;
                            
                            case _BACKSPACE:
                                this.line.backspace();
                            break;
                            case _END:
                                this.line.end();
                            break;
                            case _HOME:
                                this.line.home();
                            break;
                            case _LEFT:
                                this.line.left();
                            break;
                            default:
                            System.out.println("Invalid input!!");
                            break;
                           
                    }
                }else if(r_carac!=ENTER){
                    this.line.addCaracter(r_carac);
                }else{
                    System.out.println("Invalid input!!");
                }
                                
                System.out.print("\r"+this.line.toString());    
                System.out.print("\033["+this.line.getPos()+"G"); 
             
       } while(r_carac != ENTER);
       this.unsetRaw();
       return this.line.toString();
      
      }
}