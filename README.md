# Website of AtelierNum 

AtelierNum showcases works by students at l'Ecole de design Nantes Atlantique, and some ressources available to them. AtelierNum is the digital part of the physical place where students can experiment with creative coding, DIY electronics, virtual reality, machine learning and all kinds of digital goodness !

Created by [Simon Renault](http://www.simon-renault.com), [Raphaël Perraud](http://www.raphaelperraud.com) and [Bérenger Recoules](http://b2renger.github.io/)

Everything happens codewise in the "src" branch and all the instructions below should happe with this branch checkedout. The master branch only holds the last build of the website.

## To test locally the project

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

## To publish a new build

```
bash build.sh "my commit message"
```

this will build the projects running 'getContent.js' from /App/src/assets, 'npm run build' from /App and create a commit to the master branch using [git subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt).

afterwads you can synch with the repo whith whatever method you see fit.


## How to write a compatible markdown file to be integrated in this website

* Use only one **H1** in your file
* Don't create anchors with hard-coded links in html. Do instead :
  
```markdown
## My title 

[link to my title](#My-title)
```

* You can go from one readme to another by creating relative links :

```markdown
[go to this page inside another folder](anotherFolder/anotherReadme.md)
```

```markdown
[go up to home page](../Readme.md)
```


* When mention a README in order to be displayed in this website, use a relative path, never a global (www.address.com) one.

* When mention a readme you want to be displayed on github or another external source, use a global url.

* When mention another internal repo, just point to the repo address. But don't include the link inside another tag than **ul, ol, li or p** :

> authorized :
```markdown

* [a super link](github.com/[githubuser]/[repo_name])

This is a super text where there is inside [a super link](github.com/[githubuser]/[repo_name]).
````

> unauthorized :
```markdown
 ## [a super link](github.com/[githubuser]/[repo_name])
```

 ```javascript
    function superfunction(){
        // content of my function
    }
    [a super link](github.com/[githubuser]/[repo_name])

 ```


* Feature enable for iframes :
you have to write in a parent div with a video_container class. Remove default sizes given by Youtube or Vimeo :
```html
<div class="video_container">
   <iframe ></iframe>
</div>
```
It will display it with the maximum width of the parent component ( aka markdownReader ), conserving the 16/9 ratio. Tested with a Vimeo Iframe.