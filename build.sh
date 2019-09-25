#!/bin/bash

echo 'Starting building ...'


# build everything
cd ./Api && yarn run build
cd ..
cd ./App && yarn run build
cd ..

#move everything to the right place
git subtree push --prefix App/dist origin master

#d o some cleanup

# deploy on github


cd ..




echo 'done'
