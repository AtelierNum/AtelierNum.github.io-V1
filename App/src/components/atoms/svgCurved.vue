<template>
  <div class="top">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="867.284" viewBox="0 0 1920 867.284">
        <!-- <path  d="M0,0H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" fill="#000000"/> -->
        <clipPath id="mask">
          <path d="M0,80.412H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" transform="translate(0 -80.412)"  fill="#000000"/>
        </clipPath>
        <foreignObject v-if="isP5" class="childContainer" clip-path="url(#mask)" width="100%" height="100%" x="0" y="0"/>
        <image v-else :xlink:href="src" class="childContainer" clip-path="url(#mask)" width="100%" /> 
      </svg>
  </div>
</template>

<script>
import p5 from 'p5';

export default {
    name: 'svgCurved',
    props: {
        content : {
            type: String,
            default : () => '',
            required : true
        },
        src: {
            type: String,
            default: () => '',
            required : false
        }
    },
    computed: {
        isP5(){
            return this.content == 'p5' ? true : false;
        }
    },
    mounted(){
        if (this.isP5){
            let sketch = require('@/../public/js/sketch.js');
            new p5(sketch.main);
        }
    }
}
</script>

<style>
.p5Canvas{
  transform-origin: top left;
}

canvas{
    width:100% !important;
    height:100% !important;
    background-color: rgb(28,28,30);
}

.image_container{
    width:100%;
}

.top svg{
    --ratio: - 25%;
    height: calc(100% - (var(--ratio) * 1.3));
}

.childContainer {
    transform:translateY(var(--ratio));
}

@media(min-width:1290px){
    .top svg{
        --ratio: -24%;
    }
}

@media (max-width:1290px){
    .top svg{
        --ratio: -33%;
    }
} 

@media (max-width:1170px){
    .top svg{
        --ratio: -55%;
    }
} 

@media (max-width:850px){
    .top svg{
        --ratio: -64%;
    }
}


</style>