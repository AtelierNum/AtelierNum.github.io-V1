const fs = require('fs');
const https = require('https');

const courses = require('./lists/coursesList.json');
const ressources = require('./lists/ressourcesList.json');
const projects = require('./lists/projectsList.json');
const tags = require('./lists/tagsList.json');


// create global file
let globalList = Object.assign(courses, ressources, projects, tags);
// write global json file
fs.writeFile('./globalList.json', JSON.stringify(globalList), 'utf-8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 



