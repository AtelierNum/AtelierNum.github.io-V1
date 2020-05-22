<template>
<div id="q-app" dark>
    <router-view />
</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Rubik:300,400,500,500i,700&display=swap');
/* global variables */
#q-app{

  --color-dark01 : #1C1C1C;
  --color-dark02 : #373D4A;
  
  --color-gray01 : #F7F7F7 ;

  max-width:100vw;  
}

* {
  text-decoration: none;
  list-style: none;
  margin-left:0;

  scrollbar-color :#373D4A  #1C1C1C;
}

*,*:before,*:after{
  box-sizing: border-box;
  padding: 0;
  margin:0;
}


</style>