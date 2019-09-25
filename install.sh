#!/bin/bash

echo 'Starting instaling ...'

cd ./Api && yarn install
cd ..
cd ./App && yarn install


echo 'Instaled'
