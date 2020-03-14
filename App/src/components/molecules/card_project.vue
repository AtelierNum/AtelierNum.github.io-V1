<template>
<div  class="card-project " @click="card_action">

  <div class="top">
      <v-lazy-image :src="thumbnailUrl" height="100%" width="100%"/>
  </div>

  <div class="bottom">
    <h3 class="title">{{title}}</h3>
    <p class="desc">{{desc}}</p>
    <ul class="tags">
      <li>{{tags[0]}}</li>
      <span>-</span>
      <li>{{tags[1]}}</li>
      <span>-</span>
      <li>{{tags[2]}}</li>
    </ul>
  </div>

  <span href="" class="action" v-if="has_action">
    <svg width="43.804" height="43.804" viewBox="0 0 43.804 43.804">
      <g transform="translate(-1486.598 -1930.598)">
        <path   class="bg" d="M21.9,0C4.945,0,0,4.945,0,21.9H0C0,38.86,4.945,43.8,21.9,43.8h0c16.957,0,21.9-4.945,21.9-21.9h0C43.8,4.945,38.86,0,21.9,0Z" transform="translate(1486.598 1974.402) rotate(-90)" fill="#f7f7f7"/>
        <path  class="arrow" d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(1521 1940.994) rotate(90)"/>
      </g>
    </svg>
  </span>

</div>
</template>

<script>

import {mapActions} from 'vuex' ;

  export default {
    name: 'card_project',
    props: {
      has_action: {
        type: Boolean,
        default : () => false
      },
      r_action : {
        type: String,
        default : () => ''
      },
      id : {
        type:String,
        default: () => '',
        required: true
      },
      title : {
        type:String,
        default: () => '',
        required: true
      },
      tags : {
        type:Array,
        default: () => '',
        required: true
      },
      desc : {
        type:String,
        default: () => '',
        required: true
      },
      thumbnailUrl: {
        type: String,
        default : () => 'https://source.unsplash.com/random',
        required: false
      }
    },
    methods: {
      ...mapActions({
        setContent : 'setContent'
      }),
      card_action(){
        if (this.r_action != ''){
          this.setContent(this.id);

          this.$router.push('/' + this.r_action + '/' + this.id);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.card-project{
  cursor: pointer;
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
    color:#1C1C1C;
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
    margin: 10px 0 0 0;
    color:#373D4A;
    opacity: 0.6 ;
    span{
      margin: 0 5px;
    }
    li{
      position: relative;
      list-style: none;
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
          fill: #1C1C1C;
        }
      }
    }
    .top{
      display:grid;
      width:100%;
      height:100%;
    }
    .bottom{
      align-self: left;
      padding: initial;
      grid-column: span 2;
      max-width: 70%;
    }
  }

  &.inversed{
    grid-template-columns: auto 1fr 1fr;
    background: linear-gradient(to left, rgba(255,255,255,0) 30% , rgba(255,255,255,0)) !important;

    &:hover{
      background: linear-gradient(to left, #ffffff 30% , #F7F7F7) !important;
      .action{
        transform: translate(50%, -50%)
      }
    }

    .action{
      grid-column:1/2;
      left:0;
    }
    .bottom{ 
      grid-column: span 2;
      text-align:right;
      justify-self:end;

      *{ justify-self:right }
      .tags{ justify-content: flex-end }
    }
    .top{ 
      grid-row: 1/2;
      grid-column: 3 /4;
      margin-left: none !important;
      display: block;
      width:inherit;
    }
  }
  .action{
    position:absolute;
    top:50%;
    right:0;
    transition: all .2s ease;  
    transform: translate(0,-50%);
    .arrow{
      fill: #1C1C1C;
      transition: all .2s ease;  
    }
    .bg{
      fill: #F7F7F7;
      transition: all .2s ease;  
    }
  }
}
</style>