# SAD 
This is the repo of SAD from Adrià Gonzalez i Robert Ariño

## Practica 1
La primera practica es demana programar un editor de text en Java, on es pugui inserir i editar el contingut. 
Cada cop que s’insereix una tecla, la consola passa a estar en mode raw, es crida al mètode read() on s’interpreta quina tecla ha estat polsada depenent el codi que rep. Un cop identificat quin caràcter o tecla és, es crida als mètodes de line per editar el buffer on queda guardades les dades.
ERRORS: 
No varem tenir masses errors destacables, excepte que no teniem clar si tractar com a INT o CHAR en el buffer.

## Practica 2
La segona pràctica es demana programar una aplicació de xat, on tots els missatges enviats per als clients, els rep un servidor centralitzat i seguidament fa un broadcast a tots els clients. Tots els usuaris tenen un nick identificatiu. 
Per la part del servidor, tenim la classe principal Server, on cada cop que un usuari es connecta arranca un nou thread. Aquest thread controla els missatges que arriben per part del client  i també gestiona que els missatges dels altres usuaris arribin al client. La connexió acaba quan l’usuari escriu "exit". 
MyServerSocket s’encarrega d’establir i tancar les connexions amb els clients, de manera que sempre està escoltant al servidor.
Per la part del client trobem dos theads, un controla les entrades que fa l’usuari per el chat i l’altre mostra per pantalla el que arriba per part del servidor.
MySocket es la classe que utilitza el client cada cop que estableix connexió amb el servidor, aquesta classe proporciona els mètodes per poder rebre i transmetre dades. S'encarrega de connectar-se o desconectar-se al servidor i obtenir els Input i Output Streams.
### ERRORS:
Principalment hem tingut varis errors en l'enviament de missatges i en la detecció de qui l'havia enviat.
<img src="./Practica 2/exemples d'execució/Versio1Chat.png"/>

## Practica 3
La tercera pràctica es demanar programar un xat com a la pràctica 2, però en aquest cas cal implementar una interfície gràfica, on es visualitzi una entrada de missatges, els missatges del xat i els participants.
A la classe Handler trobem dos mètodes, en un tracta les dades que rep i en l’altre les envia.
NIOServer es el thread principal on agafa dades del client, te ha disposició la llista de clients.
MySocket es la mateixa classe que a la pràctica 2.
ClientGUI es el client visual, escolta a missatges enviats pel servidor i depenent del "tag" actualitza la informació d'usuaris, o bé esciur al chat, cal destacar que es fa un control de qui es el client per tal de proporcionar una millor visualització del contigut.
### ERRORS 
error: local variables referenced from a lambda expression must be final or effectively final
Hem tingut que crear una nova variable i igualarl-la a nickNames, tant al NIOServer (linia 82) com al Handler (linia 76).
Handler.java:106: error: exception IOException is never thrown in body of corresponding try statement
No es necessari el try catch en el write() de Handler.
<img src="./Practica3/exemples d'execució/versio2.png"/>

## ChatPissarra
This application is based on NodeJs, using socket.io and canvas.
You can try it here: http://chatpizarrasad.ddns.net
Functionalities: 
-Multiuser whiteboard:
    random color for every user.
    draw lines, circles and squares.
    clear whiteboard.
    download whiteboard (png).
-Chat:
    -send messages to all users.
    -clear local chat for a better experience.
This a project from Adrià Gonzalez & Robert Ariño for the subject SAD in UPC-BarcelonaTECH
