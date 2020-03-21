# Website of AtelierNum 

AtelierNum showcases works by students at l'Ecole de design Nantes Atlantique, and some ressources available to them. AtelierNum is the digital part of the physical place where students can experiment with creative coding, DIY electronics, virtual reality, machine learning and all kinds of digital goodness !

Created by [Simon Renault](http://www.simon-renault.com), [Raphaël Perraud](http://www.raphaelperraud.com) and [Bérenger Recoules](http://b2renger.github.io/)

## To build the project

The **API** is not functional for now, so we just need to install the **App** part. This project is build with webpack, so it needs NPM ( and Nodes.js for few actions on alpha).

```
cd App
npm install
```

Markdowns files of courses, projects, ressources repos are not imported from the web for now, so you need to download them before.
Update the list of markdowns you want to display in json files stored in **./lists**  :

``` 
cd src/assets/lists/
```
Then execute the script to  update the list of markdowns in **globalList.json** :

``` 
cd ..
node getContent.js
```

Now you can open a local server of your project ( from App directory): 

``` 
cd ../../
npm run serve
```

It will open a local server on a available port ( usually localhost:8080 or near).