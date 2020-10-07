/*public Line() {

}

public void toInsert(){

}
public void delete(){

}
public void fin(){
    
}
public void home(){
    
}
public void left(){
    
}
public void right(){
    
}
public void suprimir(){
    
}*/
import java.io.*;
import java.util.*;
public class Line{

    ArrayList<Integer> buffer;
    int cursor;
    public Line(){
        this.buffer = new ArrayList<>();
        this.cursor = 0;

    }
   

    public void addCaracter(int c){
        this.buffer.add(this.cursor, c);
        this.cursor ++;
      
    }

    public void toInsert(){
        System.out.print("to insert");
  
    }
    public void delete(){
      
        this.buffer.remove(this.cursor);
        this.cursor--;
      }

    public void end(){
        this.cursor = this.buffer.size();
    }

    public void home(){
        this.cursor = 0;
    }
    public void left(){
        if(this.cursor > 0){
          this.cursor --;
        }
    }
    public void right(){
        if(this.cursor < this.buffer.size()){
          this.cursor ++;
        }
    }
    public void suprimir(){
        if((this.buffer.size()>0) && this.cursor > 0){ //min carac+cursor 
            this.buffer.remove(this.cursor-1);
            this.left();
            this.cursor--;
        }
    }

    public String toString(){
        String str = "";
        for (Character c : this.buffer){
            str+=c;
        }
        return str;
    }

}