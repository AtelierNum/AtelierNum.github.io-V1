<template>
<div id="q-app" dark>
    <router-view />
</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Rubik:300,400,500,500i,700&display=swap');
/* global variables */
#q-app{
  --background : rgb(254, 254, 253);
  --color-dark01 : #1C1C1C;
  --color-dark02 : #373D4A;
  
  --color-gray01 : #F7F7F7 ;

  // @media(prefers-color-scheme: dark){
  //   --color-dark01 : #F7F7F7;
  //   --color-dark02 : rgb(84, 91, 104);
  
  //   --color-gray01 : rgb(27, 26, 26) ;
  //   --background : #373D4A;
  // }

  max-width:100vw;  
  background-color:var(--background);
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

.notif{
  position: fixed;
  bottom:0;
  left: calc(50% - 3em);
  color:#F7F7F7;
  background:#373D4A;
  padding: 20px 30px;
  border-radius:8px;

  animation: appear 1s ease-out;
}

@keyframes appear{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
    bottom: calc(70px + 1em);
  }
}
</style>