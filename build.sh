#!/bin/bash

echo 'Starting building ...'


# build everything
cd ../Api && yarn run build
cd ./App && yarn run build

#move everything to the right place
pwd 
cd ./dist/
cp index.html ../../
ls


#d o some cleanup

# deploy on github
git add .
git commit -m "new version"
git push

cd ..




echo 'done'
