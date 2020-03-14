<div align="center">
<br>
<img width="800" src="/assets/doc/Title.png" alt="totem-panic">
<br>
<img width="800" src="/assets/doc/Keyword.png" alt="totem-panic">
<br>
<img width="600" src="/assets/doc/Built.png" alt="built">
<br>
<img width="100" src="/assets/doc/Status.png" alt="status">
<br>
</div>

# Introduction

Ce projet a été réalisés par 4 étudiants d'interaction et game design de [L'Ecole de design Nantes Atlantique](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/https://www.lecolededesign.com/) : 
[Emilie Schaffer](www.emilie-schaefer.com), [Riwan Madjitate](https://www.fichier-pdf.fr/2020/02/17/riwan-majidate-portfolio-2020/), [Théo Geiller](http://theogeiller.com/), [Raphaël Perraud](http://raphaelperraud.com/#/)


![sample gif](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/sample.gif)

## Narration

Dans une salle de classe morose, un des élèves a décroché du cours... Son esprit est parti ailleurs, là où le jeu et la gaieté sont de mise. Sur son pupitre de bois, il imagine une goutte d'encre noire qui se fraie un chemin entre les lignes de son cahier, pour aller jusqu'à rebondir dans un espace imaginaire du garçon.

## Principes du jeu

Le ou les deux joueurs sont placés face à un mobilier en bois qui prend la forme d'une borne d'arcade inspirée du pupitre d'école. Sur la partie haute se trouve un écran et sur la partie à plat se trouve une zone de contrôle et un tampon de chaque côté de celle-ci. Le but est de garder le plus longtemps possible une goutte d'encre à l'intérieur de l'écran. Pour la faire vivre et évoluer dans l'écran, le joueur doit imprimer des rectangles sur lesquels la goutte pourra rebondir, et ce, en pressant les tampons sur la zone de contrôle au bond endroit et avec la bonne inclinaison pour ne pas bloquer le goutte. Cependant, l'encre des tampons n'est pas illimitée et il faut recharger les tampons sur leur support respectif assez longtemps afin de pouvoir les utiliser à nouveau. En mode deux joueurs, le but est que la goutte rebondisse le plus souvent possible sur les rectangles imprimés par soi-même, tout en faisant vivre la goutte le plus longtemps possible.

![principe du jeu](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/jeu.jpeg)

## Choix graphiques

L'univers de ce jeu s'inspire de l'aspect d'une salle de classe d'école primaire des années 30. Nos références et veilles se sont donc intéressées à des films et livres comme *La guerre des boutons* et *Le petit Nicolas.* C'est pourquoi la borne, prenant la forme d'un pupitre, a été conçue en bois foncé, gravée, comme par des élèves s'ennuyant en classe. Les supports de chargement des tampons sont également conçus d'après la forme des étuis à matériel scolaire sur les bureaux des images de l'époque. Concernant l'écran du jeu, nous avons choisi de prioriser le noir, le blanc  et le gris, qui rappellent les photos que l'on a aujourd'hui de cette époque mais qui font surtout référence aux tons tristes et morose de la salle de classe de ce garçon. 

![univers](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/univers.jpeg)

## Matériel nécessaire

Voici le matériel requis pour construire la borne d'arcarde :

### Hardware setup
- carte Arduino UNO
- caméra OpenMV
- mpr121
- 2 capteurs de pression
- écran 16/9
- Résistances 47K x3
- breadboard

### Borne
- 2 tables à planche rabattable
- plusieurs planches de bois
- vernis brun
- plaque de plexiglas

### Tampons
- 2 manches en bois
- 2 plaques de bois rectangulaires
- Mousse en plastique
- Peinture conductrice
- Scotch conducteur

### Support de chargement
- 2 plaques de bois un peu plus grandes que celles des tampons
- Fines plaques de bois pour créer des rebords
- peinture conductrice
- scotch conducteur

## Comment construire la borne ?

### Tampons
1. Découper la plaque de bois aux dimensions indiquées. Au milieu de la plaque, coller une plaque carrée plus fine. Dessus, fixer le capteur de contact, relié au circuit. Coller ensuite le QR code dessus. Prendre soin de laisser un cadre blanc d'au moins 3mm de largeur autour du code.
2. Des deux côtés du QR code, coller de la mousse de la même épaisseur que la partie centrale. 
3. Coller le manche à la plaque.
4. Peindre de peinture conductrice et/ou recouvrir de scotch conducteur.

![tampons](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/tampons.jpg)

### Supports de tampons
1. Scier les plaques de bois aux dimensions indiquées ci-contre.
2. Coller à la colle chaude les plaques de la manière illustrée.
3. Peindre le centre de peinture conductrice ou le recouvrir de scotch conducteur et connecter ce support au circuit.
4. Peindre les plaques qui servent de bords en rouge.
5. Faire de même pour construire le deuxième support, celui-ci peint en bleu.

### Borne
1. Scier les planches de bois aux dimensions indiquées ci-contre.
2. Sur la base d'une table existante, ou sans si le bois choisit est assez épais et solide, assembler les planches découpées à la colle chaude et en clouant, en prenant soin d'intégrer l'écran à ce moment ainsi que la plaque de plexiglas. Laisser le dos non assemblé jusqu'à la fin du montage et des réglages techniques. 
3. Vernir la borne puis graver et écrire des notes d'écolier.
4. Coller les supports de tampons sur la borne. 

![borne](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/borne.jpg)


### Connections
![schéma connnections](https://github.com/R4ph3rd/workshop_alt_ctrl/blob/master/assets/schema.jpg)

## Programme
### Données envoyées sur le port série
La carte Arduino servira à envoyer sur un autre port série les informations provenant du mpr121 ( pour détecter les recharges de tampons ), des capteurs de pression et du bouton de restart. La caméra openMV sera branchée sur un port usb du pc et enverra donc des infos depuis un autre port série que l'Arduino.

### Caméra OpenMV
La caméra openMV est une carte qui embarque plusieurs capteurs, et execute des scripts Pythons, que l'on peut éditer dans son éditeur de texte ou dans [l'IDE OpenMV](https://openmv.io/pages/download), qui a l'avantage de comprendre tous les exemples disponibles pour la carte. 
Elle nous permettra dans notre cas de détecter des **April Tags**, markers spécifiques que l'on appose sous les tampons, afin de détecter leur position, l'angle et de différencier les markers entre eux. L'exemple **find_apriltags.py** a été utilisé, en modifiant légérement le code avant d'envoyer sur le port série toutes les informations en même temps. On loop donc sur tous les objets reconnus, en stockant au fur et à mesure dans une string les informations reçues.

```py
if (len(img.find_apriltags(families=tag_families)) == 0): # si aucun tag détecté
        print("no tag in cam")
    else:
        string = "{"
        for tag in img.find_apriltags(families=tag_families): # on loop sur tous les tags détectés
            img.draw_rectangle(tag.rect(), color = (255, 0, 0))
            img.draw_cross(tag.cx(), tag.cy(), color = (0, 255, 0))
            print_args = (tag.cx(), tag.cy(), (180 * tag.rotation()) / math.pi)
            if (tag.id() == 54): # tag utilisé sur le tampon de droite
                string = string + "r_pos_x: %i, r_pos_y: %i, r_rotation: %f " %print_args
            if (tag.id() == 12): #tag utilisé sur le tampon de gauche
                string = string + "l_pos_x: %i, l_pos_y: %i, l_rotation: %f " %print_args
            string = string + "," # pour séparer les tampons dans le json s'il y en a plusieurs
        # print("{Tag_ID: %d, pos_x: %i, pos_y: %i, rotation: %f }" %print_args )
        string = string + " void:null}" # pour éviter les erreurs de json avec la "," ajoutée à la fin de chaque boucle
        print(string)  # envoie données sur le port série
```


#### Détecter que les zones de recharges soient activées
On utilise pour cela un MPR121, qui permet de détecter les variations de courant avec précision, en le connectant à notre plaque de recharge, elle-même recouverte de peinture conductrice ( ou de scotch conducteur ). Les tampons étant recouverts d'une matière conductrice jusqu'au manche, il a donc une connection continue entre le corps de l'utilisateur et le mpr121 lorsqu'il y a contact.

Pour utiliser le mpr, on a besoin des libraries **Wire** **MPR121** que l'on appelle ainsi après les avoir t��léchargées depuis l'IDE Arduino : 
```C++
#include <Wire.h>
#include "Adafruit_MPR121.h"
```
On crée ensuite un objet **cap** qui permettra de manipuler les données reçues par le mpr et des variables permettrant de stocker l'id des pin précdemment et couramment activées :
```C++
Adafruit_MPR121 cap = Adafruit_MPR121();

uint16_t lasttouched = 0;
uint16_t currtouched = 0;
```

Il nous faut ensuite initialiser le tout : 
```C++ 
  Serial.println("Adafruit MPR121 Capacitive Touch sensor test"); 
  
  // Default address is 0x5A, if tied to 3.3V its 0x5B
  // If tied to SDA its 0x5C and if SCL then 0x5D
  if (!cap.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
    while (1);
  }
  Serial.println("MPR121 found!");
  ```

  Dans le **loop**, on charge à chaque itération les valeurs de chacune des pins du mpr dans **currtouched**. On détecte ensuite si un contact est établi avec l'une des pin, ou si le contact a été rompu.

  ```C++
  currtouched = cap.touched();

  for (uint8_t i = 5 ; i < 9; i++) {
      // it if *is* touched and *wasnt* touched before, alert!
      if ((currtouched & _BV(i)) && !(lasttouched & _BV(i)) ) {
        String json = "{contact:";
        json += i ;
        json += "}";
        Serial.println(json);
  
      }
      // if it *was* touched and now *isnt*, alert!
      if (!(currtouched & _BV(i)) && (lasttouched & _BV(i)) ) {
        String json = "{released:";
        json += i ;
        json += "}";
  
        Serial.println(json);
      }
  }
  ```

  Concernant le bouton de restart qui servait à l'origine de bouton de start, à chaque appui, on imprime sur le port série l'information : 
  ``` C++
    if (digitalRead(startButton)){
      Serial.println("{start:1}");
  }
  ```

  Pour les capteurs de pression, on récupère la valeur reçue sur la pin analogique, puis on calcule le voltage afin de définir la conductance, variable du calcul permettant de finalement définir la force imprimée sur le capteur de pression. On définit des fonctions qui retournent ces valeurs pour alléger les calculs : 
  ```C++
  float calculateFSR(int valuePin){
    float fsrV = valuePin * VCC / 1023.0; // ADC reading to calculate voltage
    return R_DIV * (VCC / fsrV - 1.0);// calculate FSR
  }

float calculateConductance(int valuePin){
  return 1.0 / calculateFSR(valuePin); // Calculate conductance
}
```

On définit donc un seuil ( à 600), afin de limiter les petites variations de valeurs dûes au fait que nos capteurs sont apposés sur une matière molle (mousse synthétique), pour n'imprimer sur le port série la valeur du capteur qu'à condition de surpasser ce seuil :
  ```C++
  int fsrADC_r = analogRead(FSR_PIN_r);  
  if (fsrADC_r != 0) { // si je reçois une valeur de la pin
    float force;
    // Break parabolic curve down into two linear slopes:
    if (calculateFSR(fsrADC_r) <= seuil) 
      force = (calculateConductance(fsrADC_r) - 0.00075) / 0.00000032639;
    else{
      force =  calculateConductance(fsrADC_r) / 0.000000642857;
      if (force >= seuil){
        Serial.println("{force_r: " + String(force) + "}");
      }
    }
  }
  ```

### Jeu Processing
#### Lecture des informations reçues sur le port série
Il existe une librairie Processing qui facilite la lecture des infos venant des ports séries, qu'il nous faut importer dans le sketch afin de créer des objets **Serial** qui nous permettront de manipuler les données reçues :

```java
import processing.serial.*;
Serial camPort;
Serial arduinoPort;
```

Il nous initialiser ensuite les ports, sur les bons ports, que l'on peut retrouver en imprimant dans la console la liste de tous les ports avec **Serial.list()** et en comparant les ports disponibles que l'on retrouve dans l'IDE Arduino:
```java
    printArray(Serial.list()); 
    String portName = Serial.list()[1]; 
    String arduinoPortName = Serial.list()[0];
    camPort = new Serial(this, portName, 9600); // 9600 = vitesse de lecture qui doit être similaire à la vitesse d'écriture des cartes
    arduinoPort = new Serial(this, arduinoPortName, 9600);
    camPort.bufferUntil('\n');
    arduinoPort.bufferUntil('\n');
```

On utilise ensuite l'event listener de la librairie serial **serialEvent** pour récupérer les données en cas de reception. On fait donc un **essai** pour éviter des erreurs bloquantes, qui permettent de *tester* une portion de code, et en cas d'erreur, de renvoyer sur une autre portion.

```java
void serialEvent (Serial thisPort) {
  try { 
    // code à executer 
  } catch {
    // code à executer rn cas d'erreur dans le try
  }
```
On enfile ensuite plusieurs conditions pour éviter les erreurs et parser les json que l'on reçoit : 
```java
if ( thisPort == camPort){ // pour le port de la camera openMV, on remplace camPort par arduinoPort pour lire les infos venant du port Arduino
  while (camPort.available() > 0) {
    String inBuffer = camPort.readString(); 
    if (inBuffer != null) {
      if (inBuffer.substring(0, 1).equals("{")) {
        JSONObject json = parseJSONObject(inBuffer); 
        if (json != null) {
          //code à executer selon le json reçu
        }
      }
    }
  }
}
```

##### Infos de la cam openmv
Si le jeu n'est pas lancé, on attend de détecter un april tag dans la caméra pour positionner le vecteur **selecter** qui servira à placer sur l'écran l'élément gris qui permet au joueur de sélectionner l'un des modes. Chaque tampon est différencié dans les keys des valeurs dans le json : *l_pos_\** pour celui de gauche, et *r_pos\** pour celui de droite.
On utilise **getInt("key")** pour transformer des caractères d'une string en une valeur entière.
Note : Cette notation l/r sera réutilisée dans tout le programme pour différencier les deux tampons.
```java
 //two players waiting 
  if (!startGame){
    if (json.get("l_pos_x") != null){ 
      selecter.set(json.getInt("l_pos_x"), json.getInt("l_pos_y"));
    }
    if (json.get("r_pos_x") != null){
      selecter.set(json.getInt("r_pos_x"), json.getInt("r_pos_y"));
    }
  }
```

Si le jeu est démarré, on effectue quasiment la même opération, mais en attribuant les valeurs que l'on reçoit dans les tableaux **pos** et **angle**, en sachant que l'index **0** correspond au tampon gauche, et **1** au tampon de droite. On définit les variables **\*isOnScreen** afin que l'on puisse savoir si le tampon est détecté, et au dessus de l'écran. Cela servira plus tard, notamment pour afficher les *ghosts* des tampons.
A l'inverse, si le tampon n'est pas détecté, on passe cette variable à false, et on appelle la fonction **removeFromScreen(i)** (cf. fonctions annexes).

```java
// exemple avec le tampon gauche
if (json.get("l_pos_x") != null){
    pos[0].set(json.getInt("l_pos_x"), json.getInt("l_pos_y"));
    angle[0] = json.getFloat("l_rotation");
    lStampIsOnScreen = true;
    //println("left stamp is on screen");
} else {
  removeFromScreen(0);
  lStampIsOnScreen = false;
}
```


##### Infos de la carte Arduino
Si le joueur appuie sur le bouton restart, on appelle celle fonction dans le programme afin de reset le jeu en cours et toutes les variables de jeu :
``` java
if (ttjson.get("start") != null){
  if (ttjson.getInt("start") == 1){
    restart();
  }
}
```

Si le jeu n'est pas démarré, on appelle la fonction **selectPlayer()** lorsqu'un tampon est pressé sur l'écran (ou en soit, sur n'importe quelle surface) (cf. fonction annexes) :
```java
if (!startGame){
  if ( ttjson.get("force_l") != null || ttjson.get("force_r") != null ){
      selectPlayers();
  }
}
```

Voilà donc venir l'utilité du boolean **\*isOnScreen** : si le tampon est détecté dans l'écran, et si ce même tampon est actuellement pressé, c'est donc que le joueur veut imprimer une plateforme dans le jeu. Dernière petite condition : il faut qu'il ait encore de "l'encre" disponible dans son tampon !
Si toutes ces conditions sont validées, on ajoute donc un nouvel élément à notre arrayList **stamps** qui contient tous les tampons/plateformes sur l'écran. La fonction **stamped** décremente la charge du tampon correspondant, et on lance un son de tamponnage aléatoire avec **randomStamp()**.
Note: on rajoute une condition avec un seuil (450 ou 500) selon les tampons toujours pour éviter les "faux contacts" liés au fait que le capteur soit apposé sur de la mousse. ( Implicitement, cela amène le joueur à bourriner sur la borne).

```java
if ( ttjson.get("force_l") != null && lStampIsOnScreen && charge_l > 0 ){

if ( ttjson.getInt("force_l") >= 450){
  stamps.add(new Stamp( new PVector(stampPos[0].x, stampPos[0].y), angle[0], false));        
  stamped(false);
  randomStamp();
}
}
```
Enfin, si l'une des plaques est en contact avec un tampon, et donc en train d'être rechargée, on change la valeur du vecteur **rerchargingStamp** dont on se sert comme d'un objet contenant deux booléens pour savoir quel tampon recharger.
A l'inverse, on passe la valeur à 0 lorsque qu'il n'y a plus contact.
```java
if (ttjson.getInt("contact") == 5) rechargingStamp.y = 1 ;
//
if (ttjson.getInt("released") == 6) rechargingStamp.y = 0 ;
```

#### Setup et initialisation du jeu
En dehors de toutes les valeurs que l'on set à 0, on donne les valeurs initiales aux tailles de tampons, la charge de ceux-ci, on définit également les couleurs bleu et rouge r��utilisées dans tout le programme, charge et resize les images de tampon utilisés dans l'écran de sélection du mode de jeu, ainsi que les fonts utilisées.
**InitColliders** permet d'initialiser tous les objets relatifs à la librairie Fisica, tandis que **initSounds** appelle celle chargée de loader tous les sons dans les objets **AudioSample** ou **AudioPlayer**.
La fonction **playBO()** en fin de setup permet d'appeler une fonction définissant de jouer en boucle la bande-son.

La gestion des sons se fait grâce à la librairie **Minim**, disponible en téléchargement depuis l'IDE Processing, que l'on importe ainsi :
```java
import ddf.minim.*;
Minim minim; // création de l'objet minim
AudioPlayer extraitaudio;
AudioSample sampleaudio;
```
Une dernière librairie est appelée, **Countdown Timer** (téléchargement depuis l'IDE également), afin de régler un timer pour afficher l'écran de fin de jeu avec les scores, avant de revenir sur l'écran d'attente.
```java
import com.dhchoi.CountdownTimer;
import com.dhchoi.CountdownTimerService;
CountdownTimer timer;
```

##### Draw
L'écran étant placé à la verticale dans la borne, il nous faut donc replacer correctement l'origine en haut à gauche de la nouvelle disposition ( donc sur le coin en bas à gauche de l'écran dans sa disposition paysage normale) :
```java
translate(width/2, height/2);
rotate(-PI/2);
translate(-height/2, -width/2);
```

Il y a deux conditions majeures qui définissent ce que le programme doit afficher, selon si une partie est en cours, ou si il faut afficher l'écran de fin de jeu, ou simplement l'écran d'attente:
```java
if(startGame){ // partie en cours

} else { // si aucune patie n'est en cours
  if(screenLoose){
    displayScreenLoose();//écran de fin de jeu
  } else {
    waitingForStart();//écran d'attente
  }
}
```

Si une partie est en cours, on va alors mettre à jour les valeurs et l'affichage des *ghosts*, représentation visuels des tampons détectés par la caméra sur l'écran, permettant au joueur de visualiser la zone d'impression de ses tampons.

```java
updateGhosts();
displayGhosts();
```

On met ensuite à jour les valeurs de nos tampons stockés dans l'arraylist, ou les retire lorsqu'il dépassent une certaine hauteur (en dehors de l'écran) :
```java
for ( int i = 0; i < stamps.size(); i ++) {
  Stamp stamp = stamps.get(i);

  if (stamp.checkEdges()) {
    stamps.remove(i);
  } else {
    stamp.update();
    stamp.display();
  }
}
```

On met également à jour les animations de contact, petites bulles sombres qui apparaissent lorsque la goutte entre en contact avec des plateformes. L'objet **world** contenant tous les objets de physique doit également se rafraichir.

```java
updateCollideAnim();
  
world.step();
world.draw();

for ( Stamp stamp : stamps) {
  world.remove(stamp.box);
}
```

On utilise un boolean pour effectuer une action similaire au debounce() que l'on retrouve en javascript, certes moins performante, mais qui permet de limiter tout de même le nombre d'appel de la meme fonction. Cela est requis pour jouer un sample audio au contact de la goutte avec une plateforme, qui est ciblé par une fonction de la librairie fisica, qui s'active malheuresement pour chaque vertex de la goutte. La goutte étant un objet relativement mou, plusieurs vertex sont donc appelés à chaque contact, appelant ce listener un nombre équivalent de fois, faussant notre condition. Cette méthode  a le mérite de plafonner les appels à seulement 1 ou 2.

On augmente le score à intervalle régulier (pour le mode solo), tout en diminuant la taille des tampons légèrement.
```java
if (debounce) {
  playSample(triggerSample(moyenneStorage()));
  debounce = !debounce ;
}

if (frameCount % 50 == 0) {
  if (speed < 8) speed += .05 ;
  if (b_length > 250){
      b_length -- ;
      b_height -- ;
  }
  score ++ ;
}
```

On met ensuite à jour l'affichage des charges de tampons, du score, puis on verifie que la goutte est toujours dans l'écran avec **checkDrop()**, et dans le cas contraire, on appelle la fonction **looseGame()** qui viendra mettre un terme au jeu et afficher l'écran de fin de jeu :
```java
rechargeStamps(); // update des recharges de tampons
displayChargeStamps(); // update de l'affichage 
displayScore(); // update du score
checkDrop(); // vérification de la position de la goutte

if (!isDropInScreen) { // si la goutte est en dehors, le(s) a/ont perdu
  looseGame();
}
```

#### Physique du jeu
Nous avions besoin pour la gravité d'une physique, on a utilisé fisica pour avoir des effet de rebonds sur notre tache d'encre.

##### L'environnement
après avoir importé la librairie, nous déclarons une variable "world" de type FWorld appartenant a fisica.
```java
import fisica.*;
FWorld world;

void setup() {
  size(500, 700);
  Fisica.init(this);

  world = new FWorld();
  world.setGravity(0, +250);
}
```
l'objet world peut ensuite subir des modifications grace a .setGravity dans l'exemple ci-dessus. 

##### Les bordures
```java
//left side
  FPoly l = new FPoly();
  l.vertex(0+sideMargin, 0);
  l.vertex(0, 0);
  l.vertex(0, height);
  l.vertex(0+sideMargin, height);
  l.vertex(0+sideMargin, height-bottomMargin);
  l.setStatic(true);
  l.setFill(0);
  l.setFriction(1);
  world.add(l);


  //right side
  FPoly r = new FPoly();
  r.vertex(width-sideMargin, 0);
  r.vertex(width, 0);
  r.vertex(width, height);
  r.vertex(width-sideMargin, height);
  r.setStatic(true);
  r.setFill(0);
  r.setFriction(1);
  world.add(r);
  ```
  
  Toujours dans le setup nous allons definir des obstacle dans notre world en ajoutant des FPoly.
  en modifiant la propriété de l'objet sur setStatic(true); nous le faisons devenir un obstacle statique.
  Nous pourrons modifier les paramètre de cet objet pour ajuster les effet physique de collision.
##### L'agent
```java
 //Blob popping
  FBlob b = new FBlob();
  b.setAsCircle(width/2, 20, 30, 20);
  b.setStroke(0);
  b.setStrokeWeight(0);
  b.setFill(255);
  world.add(b);
```
Puis en ajoutant un objet FBlob, nous avont un agent qui réagirat et subira la gravité ou autres caractéristique du world fisica
##### Update & Draw
```java
void draw() {
  world.step();
  world.draw();
}
```
Enfin, dans le draw on utilisera une fonction d'update (world.step()) et une foction de dessin (world.draw()).

#### Fonctions annexes
##### Fonctions relatives au statut de jeu
Elles sont présentes dans l'onglet **game**, exceptés deux que l'on retrouvera dans l'onglet principal.

- **posConverer()** convertit les valeurs envoyées par la caméra openmv dans le range de l'écran
- **checkDrop()** vérifie la position de la goutte dans l'écran, et modifie des booléans le cas échant. La librairie Fisica étant assez opaque, on ne peut pas directement accéder aux valeurs actuelles des objets, il nous faut parcourir l'arraylist de **FBody** recensant tous les objets présents dans le **FWorld** ; et lorsque l'on retrouve notre goutte (unique élément de classe FCircle), on peut enfin récupérer sa position avec les méthodes **getX() et getY()**.
```java
    ArrayList <FBody> bodies = world.getBodies(); // on récupère tous les body
  
    for (FBody body : bodies) { // on boucle sur l'arraylist de bodies
      if (body.getClass().getName().equals("fisica.FCircle")) {
        // code à executer
      }
```

  - - lorsque l'on est en mode multi, il y a deux types de fin de jeu : 
  - - lorsque les joueurs font tomber la balle, le score de chacun est affiché, et celui ayant le plus important l'emporte.
  - - lorsque l'un des joueurs fait sortir la goutte par le haut, il est alors fautif, et perd automatiquement la partie  
  ```java 
  yBlob = body.getY();
if (players){
  if (yBlob < - width / 8){ // la limite est dessus du haut de l'écran, pour permettre un peu plus de souplesse dans le gameplay
    isDropInScreen = false;
    isPlayerGuilty = true ; // on indique qu'un joueur est fautif, un autre boolean définit quel joueur est en cause
    playRealSample(loose_up);
  }
  if (yBlob > width){
    isDropInScreen = false; // en passant à false, elle activera la fonction loosegame vue précédemment
    playRealSample(loose_down);
  }
  ```

  -- en mode solo, le joueur perd dès que la balle tombe ou dépasse la même limite en haut

  - **selectPlayers()** affiche le *ghost* du tampon détecté sur l'écran de sélection et change les booleans définissant le mode de jeu et le début de jeu selon la sélection du joueur

  - **waitingForStart()** régit l'affichage de l'écran d'attente 

  - **looseGame()** marque la fin de partie et initialise un timer pour laisser l'écran de fin de jeu s'afficher durant 10 sec

  - **displayScore()** affiche le(s) score en haut de l'écran

  - **displayScreenLoose()** gère l'affichage de fin de jeu. Plusieurs situations sont possibles :
    - - en multi, l'un des joueurs fait sortir par le haut la balle. Il perd automatiquement. Moqué, il est condamné à ne voir que le score de son adversaire.
    - - en multi, la balle tombe en bas de l'écran. Les deux joueurs perdent, et sont alors départagés par leur score après avoir été préalablement rabaissés au rang de loosers.
    - - en solo, le joueur est gratifié d'une phrase soignement préparée par notre IA intégrée selon son score :
    > Stade 1 : "You sprawled out like a Breton in his piss ! Such a boomer.."

    > Stade 2 : "You crashed like a cockroach ! Such a looser.."

    > Stade 3 : "You loose ! Ah, would the cowherd try to rise ?"

    > Stade 4 : "You loose ! Too bad, the butterfly was taking the right path to flight."

    - **restart()** réinitialise toutes les valeurs, vide les arraylists, coupe le timer et relance une partie


#### Fonctions relatives à la gestion sonore
- **triggerSample()** renvoie l'un des samples de goutte selon la hauteur de la chute (passée en paramètre)

- **randomGoutte()** joue aléatoirement un son de goutte en appelant la fonction  **playRealSample**

#### Fonctions relatives à la gestion des tampons
- **updateGhosts()** met à jour les valeurs des *ghosts* dans le tableau **stampPos**

- **displayGhosts()** affiche les *ghosts*

- **removeFromScreen()** les retire de l'écran, en passant des valeurs très éloignées aux tableaux de vecteurs

- **displayChargeStamps()** gère l'affichage de la jauge d'encre des tampons, dépendante des variables **charge_l et charge_r**

- **rechargeStamps()** est appelée lorsqu'un tampon touche une plaque de recharge, et augmente la valeur correspondante (charge_r/l) à intervalle court

- **stamped()** retire une unité de charge aux tampons, le booléen en paramètre indique quelle charge de tampon doit être décrémentée

## Conclusion

You will see three arduino sketches in this repo, the main one is totem_panic. In this one, you will also find a indianmusic.ino and a notes.h, which was old files to create digibit music, but we changed it to implement a mp3 reader from a SD card. This is not completely implemented yet, so it's commented for now. We wish to add it soon.

## Copyright and further use

This game arcade is completely open source so feel free to use it, reproduce it or modify it as you want. A credit to the original project is not mandatory but would be highly appreciated, so feel free to talk with us about ideas of improvement or modifications.

For further informations, please contact us : [Raphaël Perraud](mailto:r.perraud@lecolededesign.com), [Théo Geiller](mailto:t.geiller@lecolededesign.com)