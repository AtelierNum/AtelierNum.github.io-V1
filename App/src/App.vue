<template>
<div id="app">


    <v-header/>

    <div class="top">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="947.695" viewBox="0 0 1920 947.695">
        <path id="starlight-big" d="M0,0H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" fill="#000000"/>
      </svg>
    </div>


    <svg class="scroll"  width="77" height="77" viewBox="0 0 77 77">
      <g transform="translate(-922 -945)">
        <path  d="M38.5,0C8.692,0,0,8.692,0,38.5H0C0,68.308,8.692,77,38.5,77h0C68.308,77,77,68.308,77,38.5h0C77,8.692,68.308,0,38.5,0Z" transform="translate(922 945)" fill="#f7f7f7"/>
        <path  d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(972.006 996) rotate(180)"/>
      </g>
    </svg>


    <h2 class="section-title"> Projects </h2>

    <v-tag-list>
      <v-tag>Digital art</v-tag>
      <v-tag>Processing</v-tag>
      <v-tag>P5</v-tag>
      <v-tag>Pure data</v-tag>
    </v-tag-list>
    

    <v-grid cols="3">
      <v-projectCard v-for="i in 6" :key="i" />
    </v-grid>
     


    <h2 class="section-title"> Resources </h2>

    <v-grid cols="3" >
      <v-projectCard v-for="i in 5" :key="i" class="small"/>
    </v-grid>
      
    <h2 class="section-title"> Courses </h2>

    <v-tag-list>
      <v-tag>P5</v-tag>
      <v-tag>Digital art</v-tag>
      <v-tag>Processing</v-tag>
      <v-tag>Pure data</v-tag>
    </v-tag-list>

    <v-grid>
      <v-projectCard v-for="i in 3" :key="i" has_action="true" class="long"/>
    </v-grid>
    
     
    <v-footer/>
    
</div>
</template>

<script>
import card_project from '@/components/molecules/card_project'

export default {
  components : {
    'v-projectCard' : card_project
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Rubik:300,400,500,500i,700&display=swap');
*,*:before,*:after{
  box-sizing: border-box;
  padding: 0;
  margin:0;
}
.grid{
  max-width: 1150px;
  display: grid;
  grid-template-columns: repeat(1,1fr);
  grid-gap: 45px;
  margin: 120px auto 300px auto;
  &.grid-3{
    grid-template-columns: repeat(3,1fr);
    @media screen and (max-width: 600px){
      grid-template-columns: repeat(1,1fr);
      max-width: 80vw;
    }
  }
  &.grid-2{
    grid-template-columns: repeat(2,1fr);
  }
}

.scroll{
  display: block;
  margin: 100px auto 200px;
}

a{
  color: inherit;
  text-decoration: none;
}

.section-title{
  max-width: 1150px;
  margin:auto;
  font-size: 40px;
  text-align:center;
  font-family: 'Open Sans', sans-serif;
  color:#1C1C1C;
}

</style>
