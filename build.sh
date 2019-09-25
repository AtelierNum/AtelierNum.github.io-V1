#!/bin/bash

echo 'Starting building ...'


# build everything
cd ./Api && yarn run build
cd ..
cd ./App && yarn run build
cd ..

#move everything to the right place
cp  -R ./App/dist/ ./Docs
ls


#d o some cleanup

# deploy on github


cd ..




echo 'done'
