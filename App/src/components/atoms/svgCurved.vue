<template>
  <div class="top">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="631" viewBox="0 0 1920 631">
        <!-- <path  d="M0,0H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" fill="#000000"/> -->
        <clipPath id="mask">
          <path d="M0,80.412H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" transform="translate(0 -80.412)"  fill="#000000"/>
        </clipPath>
        <foreignObject v-if="isP5" class="p5_container" clip-path="url(#mask)" width="100%" height="100%"/>
        <image v-else :xlink:href="src" clip-path="url(#mask)" width="100%" /> 
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
        },
    },
    mounted(){
        if (this.isP5){
            let sketch = require('@/../public/js/sketch.js');
            new p5(sketch.main);
        }
    }
}
</script>

<style style="scss" scoped>
.p5Canvas{
  transform-origin: top left;
  transform: scale(2,2)
}

.image_container{
    width:100%;
}


</style>