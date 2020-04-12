# ateliernum

Ce readme détaille les points clés de l'app afin de documenter la structure de celle pour la maintenance.

## Markdown Processeur

Le composant **vue-markdown** est utilisé pour parser le markdown. Il existe nombres autes alternatives pour Vue, ou en vanilla, presque toutes basées sur la lib [Markdown-It](https://github.com/markdown-it/markdown-it). Si elles sont dans les repos npm, on peut les télécharger de la manière suivante :

```javascript
npm install vue-markdown // pour le composant vue-markdown
```

Il parse le contenu du slot **<vue-markdown></vue-markdown>**.

> Rappel : le slot est ce qui est contenu entre les deux bannières. Si l'on veut y passer une variable (référencée dans notre composant Vue, donc dans props, data, computed...), il faut l'écrire ainsi : 
> ```html
> <vue-markdown>{{ma_variable}}</vue-markdown>


### Récupération des données (readme)

Au hook **created**, on fait une request XML pour aller récupérer le fichier à l'url récupérée dans le store avec **this.getContent.url**. 
On passe ensuite la string récupérée dans la variable **readme** (que l'on retrouve dans **data**). 

L'appel XML étant asynchrone, on a besoin d'appeller le highlight Prism (servant à highlighter notamment les balises de code) à la prochaine itération de Vue avec 
```javascript
this.nextTick(() => {
    Prism.highlightAll();
})
```
sans quoi, cela ne servirait à rien puisque les données n'auront pas encore été chargées.

On remarquera plusieurs autres actions effectuées :
* on passe la variable md_loaded à **true**, puis on fait un **$emit()**. Cela permet en fait de faire remonter au composant parent ( ici à priori Document.vue) la valeur d'une variable, et ainsi échanger des données entre différents composants. L'intérêt de cet action est de prévenir le composant Document que le markdown est chargé, et qu'il va pouvoir exécuter/mettre à jour les fonctions qui dépendent du contenu de ce markdown (création de l'index de navigation notamment).
* Dans la condition suivante, on envoie un objet dans le **store** :
```javascript
if (_vue.$route.params.subcontent != undefined){}
```

Elle permet de n'exécuter cette section de code uniquement si l'on se trouve dans un readme récursif, il faut donc mettre à jour la variable qui stocke les infos du contenu actuel dans le **store**. Cependant, le readme n'étant pas listé directement dans les json, il nous manque des infos à propos de celui-ci, on construit donc un object à partir du readme "parent" et des infos (premier titre, première image trouvés) que l'on peut glaner de manière certaine dans la string que l'on récupère (du readme).

### Remplacement de certaines portions de string dans les données téléchargées

La méthode **parseURL(data, url)** s'occupe de traiter le remplacement des données, afin de gérer les changements de path sur les liens et images. **Data** est le paramètre qui passe la string complète téléchargée du readme distant, et **url** l'url de celui-ci.

On détermine dans un premier temps l'auteur et le nom du repo, la structure des url Github étant facile à parser :

```javascript
let urlSplited = url.split('/');
let author = urlSplited[3] ;
let repo = urlSplited[4] ;
```

Et on fait de même, dans un tableau (**intern_paths**) pour la liste complète de cours et projets recensés dans les json. On réutilisera ce tableau par la suite pour comparer toutes les urls dans le markdown.

```javascript
let intern_paths = this.getUrlofInternalContents; // getUrlofInternalContents : store getter 

let credentials_paths = intern_paths.map( path => ({
author : path.split('/')[3],
repo : path.split('/')[4],
}))
```

On va ensuite spliter les données reçues pour tous les liens que l'on trouve (en syntaxe markdown) :

```javascript
let repo_paths = data.split('](');
```

Cela prend effetivement également en compte les images, dont le path différera légèrement des repo, mais patience petit gredin ; ne cours pas plus vite que l'abeille.
On loop donc dans ce tableau nouvellement créé en sélectionnant uniquement les bouts de string qui nous intéressent, à savoir ceux avant le prochain caractère **)** que l'on trouve.

* On effectue une première vérification : l'url en question relève-t-elle des repos que l'on a déjà listé, auquel cas on souhaite rester sur le site Ateliernum ? Dans le cas positif, il nous faut donc parser l'url, et remettre une dirigeant vers le **raw.githubusercontent.com[url]** afin de pouvoir la télécharger :

```javascript
let correspondance = credentials_paths.find(teststring => (repopath.includes(teststring.author) && repopath.includes(teststring.repo)));
// on check si repopath (l'url que l'on vérifie actuellement tirée de data) contient dans les strings auteurs et repo, auquel cas, ce lien dirige donc vers un autre repo "interne". Si ce n'est pas le cas, .find() renvoie undefined.
```

Dans le cas où cela matche, on recrée la bonne adresse vers le raw, et on la remplace en créant une expression régulière, afin de remplacer d'un seul coup toutes les occurences de la string **repopath** dans **data**.

```javascript
data = data.replace(new RegExp(repopath, 'g'), (correspondance, decalage) => { // le paramètre g dans une regexp signifie 'global', et indique de cibler toutes les occurences connues
    if (data.substring(decalage - 2, decalage) == ']('){ // decalage donne l'index des portions de string trouvées, on verifie que le début de la string est bien ]( pour ne pas remplacer deux fois des url, et fausser ainsi le tout.)
        if (!this.internalLinks.includes(targetrepo)){
            this.internalLinks.push({path: targetrepo, recursive : false}); // on ajoute au tableau l'url en indiquant si le lien est récusif ou non, utile plus tard (cf ### Comportement router-friendly des liens internes)
        }
        return targetrepo ; 
    } else {
        return repopath ; // dans le cas ou on ne trouve pas ]( précédemment , c'est donc que la string a déjà été remplacée,
    }
});
```

* Seconde vérification : Si l'url ne pointe pas vers un autre repo interne, elle peut pointer vers une ressource externe, ou simplement être un anchor link ; dans ce cas on ne fait rien : 

```javascript
if (repopath.includes('http') || repopath.includes('www') || repopath.slice(0,1) == '#'){
```

* Troisième vérification : si l'url contient **.md**, c'est donc qu'elle pointe vers un repo recursif (notamment pour les pages projets). A ce stade, il n'y a pas besoin de vérification supplémentaire, les précedentes vérifications ayant éliminés toutes les autres possibilités : il ne reste que le cas où l'url est relative, vers un readme ou une image.

On va donc effectuer la même procédure que pour le remplacement de path vers un repo, à deux différences près : l'url devant cibler un repo récursif, on peut réutiliser l'url du readme actuel et simplement remplacer la fin **readme.md** pour apposer le path relatif vers notre nouveau markdown. On utilise pour cela une RegExp pour éviter les problèmes de casse :

```javascript
let recursiveRepo = this.getContent.url.replace(/readme.md/i,repopath);
```

Et le lien étant cette fois-ci vers un readme récursif, on le précise dans l'objet qu'on push dans le tableau **internaLinks** :

```javascript
this.internalLinks.push({path: recursiveRepo, recursive : true});
```

* Dernier cas : les images ! La procédure étant similaire et déjà détaillée, je passe. Simplement la construction de l'url est relativement différente. On vérifie si la **$route** (l'url en Vue) contient dans ses paramètres un **subcontent**, qui indiquerait que nous sommes sur un readme récursif. Pour plus d'infos concernant la construction du router, voir le chapitre [**Router**](Router).

```javascript
if (this.$route.params.subcontent != undefined){
    var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${this.$route.params.subcontent}/${image_path[image_path.length - 1]}`;
} else {
    var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${image_path[image_path.length - 1]}`;
}
```

On pourra ensuite voir qu'on effectue la même chose pour les images intégrées en syntaxe HTML, ce qui est bien plus simple à parser. Je ne m'attarderai donc pas dessus.

### Comportement router-friendly des liens internes
Appelée au prochain tick de Vue (la prochaine itération), donc après que le markdown ait bien été téléchargé, la fonction **routerLinks(array)** va parcourir l'ensemble des éléments HTML du composant pour trouver les liens qui correspondent à notre tableau **internalLinks** précédemment cité, afin de leur adjoindre un comportement router-friendly, plutôt qu'un lien hardcodé.

On lui passe en paramètre la collection HTML d'éléments sur laquelle il va looper :
```javascript
Array.from(this.$children[0].$el.childNodes) // this réfère à l'instance Vue markdownReader, children[0] au composant vue-markdown, $el à l'élément HTML de ce dernier et childNodes à la HTMLCollection qui contient tous les enfants. Cibler les éléments HTML comme ceci est beaucoup plus performant qu'avec des query vanilla.
```
La fonction est récursive, ainsi si l'élément **node** a également des enfants, on ira aussi les vérifier : 
```javascript
array.forEach( (node) => {
    if (Array.from(node.childNodes).length > 0 && ['ul', 'li', 'ol', 'p'].includes(node.localName)){ // needed to avoid to much revursioin because of code sections or others unwanted
        this.routerLinks(Array.from(node.childNodes));
    
    } else {
        // cas ou il n'y a pas d'enfants
```

On vérifie ensuite si l'élément node est un lien, auquel cas on check si il fait partie de notre liste de liens internes ( RAPPEL : les liens internes sont soit des liens vers d'autres pages/repos, soit vers un readme récursif, dans tous les cas, ce sont des liens qui doivent rediriger vers le site).
Pour ceux qui valident la condition, on leur ajoute un eventlistnener à la mano qui annule l'évent du lien, pour préférer une méthode router-friendly :

```javascript
this.$router.push(unesuperurl) ;
```
Dans le cas où c'est un autre repo, c'est assez simple, on appelle l'action du store **setByUrl()** qui retrouve dans les json le bon contenu et qui update la variable **current_content** du store. On n'a plus qu'à récupérer l'url dans le store, pusher dans l'historique du router une nouvelle adresse le tour est joué. 
**NB:** L'API du router est très semblable à l'API history des navigateurs, avec nombre de fonctions identiquement nommées.

Dans le cas où c'est un repo récursif, on retrouve le nom du repo dans la string que l'on est en train d'évaluer (**test_path.path**) et on l'ajoute dans le path de la **$route**. 
Une condition vérifie que la $route actuelle contient ou non un paramètre **subcontent** pour éviter de doubler l'url dans des cas où le premier clic sur le lien n'aurait pas abouti à une redirection.
**NB:** Ce comportement est actuellement observé de temps à autre, sans error affiché, donc je ne sais pas quelle pourrait être l'origine du problème pour le moment. C'est tout de même assez rare, donc je ne me suis pas focalisé dessus.

De même, on remplace tous les les liens redirigeant vers le readme "parent" en revenant simplement d'un cran dans l'historique de navigation.
```javascript
if (/..\/README.md/ig.test(node.href)){
    node.addEventListener('click', (event) => {
        this.$router.push(this.$router.history.go(- 1));
        event.preventDefault();
    })
}
```