import java.util.*;

public class MyStringBuffer {
    char[] str;
    int limit;
    final int CHUNK = 10;

    MyStringBuffer(){
        str = new char[CHUNK];
        limit=0;
    }

    MyStringBuffer insert(int posCursor, char carac){
        str[posCursor] = carac;
        limit++;
        return this;
    }
 

    public String toString(){
        return new String(str, 0, limit);
    }
}
