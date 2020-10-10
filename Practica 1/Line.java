
import java.io.*;
import java.util.*;

public class Line {

    ArrayList<Integer> buffer;
    int cursor;
    int length;
    int pos;
    boolean insert;
    char lastChar;

    public Line() {
        this.buffer = new ArrayList<>();
        this.cursor = 0;
        this.length = 0;

    }

    public int getPos() {
       pos= this.cursor+1;
        return pos;
    }


    public void addCaracter(int c) {

        if (this.insert) {
            if (this.cursor < this.buffer.size()) {
                this.buffer.set(this.cursor, c);
            } else {
                this.buffer.add(this.cursor, c);
            }
        } else {
            int i = 0;
            this.length = this.buffer.size();
           if (this.cursor < this.length) {
                for (i = this.length; i > this.cursor; i--) {
                    this.buffer.add(i, this.buffer.get(i - 1));
                    this.buffer.remove(i - 1);
                }
            }
            this.buffer.add(this.cursor, c);
           
        }
     
        this.cursor++;

    }

    public void toInsert() {
       
        this.insert = !this.insert;

    }

    public void backspace() {
       if ((this.buffer.size() > 0) && this.cursor > 0) { // min carac+cursor
            this.buffer.remove(this.cursor - 1);
            this.left();
        }
    }

    public void end() {
 
        this.cursor = this.buffer.size();
    }

    public void home() {
        
        this.cursor = 0;
    }

    public void left() {
 
        if (this.cursor > 0) {
            this.cursor--;
        }
    }

    public void right() {
      
        if (this.cursor < this.buffer.size()) {
            this.cursor++;
        }
    }

    public void suprimir() {
      
       if (this.cursor < this.buffer.size()) {
            this.buffer.remove(this.cursor);
            this.length--;
        }
    }

    public String toString() {
        String str = "";
        int i = 0;
        int aux = 0;
        for (i = 0; i < this.buffer.size(); i++) {
            aux = this.buffer.get(i);
            str += (char) aux;
        }
        return str;
    }

}