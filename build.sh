#!/bin/bash

echo 'Starting building ...'


# build everything
cd ./Api && yarn run build
cd ..
cd ./App && yarn run build
cd ..

#move everything to the right place
cp ./App/dist/index.html ./

#d o some cleanup

# deploy on github


cd ..




echo 'done'
