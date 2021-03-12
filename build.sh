#!/bin/bash

echo 'Starting building ...'



cd ./public/data && node getContent.js
cd ../..
npm run build
cd ..

git add .
git commit -m "new build"
git push origin `git subtree split --prefix dist src`:master --force  




echo 'done'
