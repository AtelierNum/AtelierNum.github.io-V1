#!/bin/bash

echo 'Starting building ...'



cd ./atelier_num/public/data && node getContent.js
cd ../..
npm run build
cd ..

git add .
git commit -m "new build"
git push origin `git subtree split --prefix atelierr_num/dist src`:master --force  




echo 'done'
