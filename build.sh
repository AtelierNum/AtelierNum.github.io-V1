#!/bin/bash

echo 'Starting building ...'


# build everything
#cd ./Api && yarn run build
#cd ..
#cd ./App && yarn run build
#cd ..

cd ./App && npm run build
cd ..

#move everything to the right place
git add .
git commit -m "new build"
git push origin `git subtree split --prefix App/dist src`:master --force  

#d o some cleanup

# deploy on github


cd ..




echo 'done'
