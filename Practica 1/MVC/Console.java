import java.util.Observable;
import java.util.Observer;

public class Console implements Observer {
    @Override
    public void update(Observable observable, Object obj) {
       //sobresciurem el metode update per tal d'esciure per consola 

       String[] action = (String[]) obj;
       switch (action[0]){
           case "insertChar":
               System.out.print(action[1]);
               break;
           default:
               System.err.println("Invalid input!!");
               break;
       }


    }
}