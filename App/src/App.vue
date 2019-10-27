<template>
<div id="app">

    <h2 class="section-title">
      Projects
    </h2>
    

    <div class="grid grid-3">
      <a v-for="i in 9" :key="i" class="card-project">
        <div class="top">
          <v-lazy-image src="https://source.unsplash.com/random" height="100%" width="100%"/>
        </div>
        <div class="bottom">
          <h3 class="title">Workshop PCD 2019</h3>
          <p class="desc">Generative art experiment made during a one week seminar</p>
          <ul class="tags">
            <li>P5</li>
            <li>Processing</li>
            <li>Generative art</li>
          </ul>
        </div>
      </a>

    </div>


    <h2 class="section-title">
      Resources
    </h2>


    <div class="grid grid-3">
      <a v-for="i in 3" :key="i" class="card-project small">
        <div class="top">
           <v-lazy-image src="https://source.unsplash.com/random" height="100%" width="100%"/>
        </div>
        <div class="bottom">
          <h3 class="title">Workshop PCD 2019</h3>
          <p class="desc">Generative art experiment made during a one week seminar</p>
          <ul class="tags">
            <li>P5</li>
            <li>Processing</li>
            <li>Generative art</li>
          </ul>
        </div>
      </a>

    </div>

    <h2 class="section-title">
      Courses
    </h2>

    <ul class="tag-list">
      <li class="tag">Digital art</li>
      <li class="tag">Processing</li>
      <li class="tag">P5</li>
      <li class="tag">Pure data</li>
    </ul>


    <div class="grid ">
      <a v-for="i in 3" :key="i" class="card-project long">
        <div class="top">
           <v-lazy-image src="https://source.unsplash.com/random" height="100%" width="100%"/>
        </div>
        <div class="bottom">
          <h3 class="title">Workshop PCD 2019</h3>
          <p class="desc">Generative art experiment made during a one week seminar</p>
          <ul class="tags">
            <li>P5</li>
            <li>Processing</li>
            <li>Generative art</li>
          </ul>
         
        </div>
         <span href="" class="action">
            <svg width="43.804" height="43.804" viewBox="0 0 43.804 43.804">
              <g transform="translate(-1486.598 -1930.598)">
                <path   class="bg" d="M21.9,0C4.945,0,0,4.945,0,21.9H0C0,38.86,4.945,43.8,21.9,43.8h0c16.957,0,21.9-4.945,21.9-21.9h0C43.8,4.945,38.86,0,21.9,0Z" transform="translate(1486.598 1974.402) rotate(-90)" fill="#f7f7f7"/>
                <path  class="arrow" d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(1521 1940.994) rotate(90)"/>
              </g>
            </svg>
          </span>
      </a>

    </div>



    <div class="footer">
      <svg  width="100%" height="554.81" viewBox="0 0 1920 554.81">
        <path   d="M0,0H1920V335.688s-69.613-5.778-207.017,12.121c-292.152,46.17-703.646,207-1027.646,207C205.336,554.81,0,407.792,0,407.792Z" transform="translate(1920 554.81) rotate(180)" fill="#1c1c1c"/>
    </svg>

    </div>
    
</div>
</template>

<script>
import card_project from '@/components/card_project'

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


.tag-list{
  margin:auto;
  display: flex;
  .tag{
    list-style: none;
    height:60px;
    padding: 0 30px;
    background: #F7F7F7;
    border-radius: 6px;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
  }
}


.section-title{
  max-width: 1150px;
  margin:auto;
  font-size: 40px;
  text-align:center;
  font-family: 'Open Sans', sans-serif;
}


.card-project{
  width: 350px;
  height:600px;
  position: relative;
  background: linear-gradient(to bottom, #ffffff 30% , #F7F7F7);
  background-position: 0 700px;
  background-repeat: no-repeat;
  border-radius: 6px;
  transition: all .3s ease;  
  &:hover{
     background-position: 0 0;
  }
  .top{
    background-color: #F7F7F7;
    height: 430px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }
  .bottom{
    color:#373D4A;
    padding: 15px 10px 0px;
    display: flex;
    flex-direction: column;
  }
  .title{
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 22px;
  }
  .desc{
    font-family: 'Open Sans', sans-serif;
    font-weight: 200;
    font-size: 20px;
    margin: 10px 0 0 0;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tags{
    font-family: 'Open Sans', sans-serif;
    display: flex;
    font-weight: 200;
    font-size: 18px;
    opacity: 60%;
    margin: 10px 0 0 0;
    li{
      list-style: none;
      &:after{
        content:"-";
        margin: 0px 5px;
      }
      &:last-child{
        &:after{display:none;}
      }
    }
  }

  &.small{
    width: 350px;
    height:250px;
    .top{
      height: 120px;
    }
    .desc{
      height:1.5em;
       white-space: nowrap;
    }
  }

  &.long{
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 45px;
    height:200px;
    width:initial;
    background: linear-gradient(to right, #ffffff 30% , #F7F7F7);
    background-position: 1000px 0;
    background-repeat: no-repeat;
    &:hover{
      background-position: 0 0;
      background-repeat: no-repeat;
      .action{
        transform: translate(50%,-50%);
        .arrow{
          fill: #F7F7F7;
        }
        .bg{
          fill: #373D4A;
        }
      }
    }
    .top{
      width:100%;
      height:100%;
    }
    .bottom{
      align-self: center;
      padding: initial;
      grid-column: span 2;
      max-width: 70%;
       
    }
  }
  .action{
    position:absolute;
    top:50%;
    right:0;
    transition: all .2s ease;  
    transform: translate(0,-50%);
    .arrow{
      fill: #373D4A;
      transition: all .2s ease;  
    }
    .bg{
      fill: #F7F7F7;
      transition: all .2s ease;  
    }
  }
}
</style>
