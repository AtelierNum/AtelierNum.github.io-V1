#!/bin/bash

echo 'Starting building ...'


# build everything
#cd ./Api && yarn run build
#cd ..
#cd ./App && yarn run build
#cd ..
cd ./App/public/data && node getContent.js
cd ../../..
cp ./App/public/data/globalList.json ./App/dist/data/

#move everything to the right place
git add App/dist/data/*
git commit -m "new ressource"
git push origin `git subtree split --prefix App/dist src`:master --force  

#do some cleanup

#deploy on github


cd ..




echo 'done'
