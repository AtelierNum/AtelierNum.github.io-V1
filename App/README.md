# ateliernum

Ce readme détaille les points clés de l'app afin de documenter la structure de celle pour la maintenance.

** Markdown Processeur

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
La condition d'affichage est utile afin de ne pas rendre inutilement un composant vide à cause d'un problème d'url, qui pourrait causer d'autres problèmes ailleurs.

L'appel XML étant asynchrone, on a besoin d'appeller le highlight Prism (servant à highlighter notamment les balises de code) à la prochaine itération de Vue avec 
```javascript
this.nextTick(() => {
    Prism.highlightAll();
})
```
sans quoi, cela ne servirait à rien puisque les données n'auront pas encore été chargées.