const fs = require('fs');
const list = require('./coursesList.json');
const https = require('https');

for (let content in list){
    Array.from(list[content]).forEach( (plop) => {
        https.get(plop.url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            //  PARSE URL FOR CORRECT IMPORT IMAGES IN MARKDOWNS
            let url_save = data.split('![')
            
            url_save.forEach( (string) => {
                if (string.includes('](')){
                    let string_to_replace = string.split('](')[1].split(')')[0];
                    let path = string_to_replace.split('./')
                    let newUrl = `https://raw.githubusercontent.com/${plop.url.split('/')[3]}/${plop.url.split('/')[4]}/master/${path[path.length - 1]}`;
                    
                    data = data.replace(string_to_replace, newUrl);
                }
            })


            // PARSE URL FOR BAD PERSONS WHO USE HTML BALISE TO IMPORT IMAGES 

            let img_url =  data.split('<img');

            img_url.forEach( (string) => {
                if (string.includes('src="')){
                    let string_to_replace = string.split('src="')[1].split('"')[0];
                    let path = string_to_replace.split('./')
                    let newUrl = `https://raw.githubusercontent.com/${plop.url.split('/')[3]}/${plop.url.split('/')[4]}/master/${path[path.length - 1]}`;
                    
                    data = data.replace(string_to_replace, newUrl);
                    
                    console.log('img url', string_to_replace)
                }
            })

                
            
            fs.writeFile("./markdowns/" + plop.url.split('/')[4] + '.md', data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })
}




