<template>
    <div class="svgCurved">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="867.284" viewBox="0 0 1920 867.284">
        <!-- <path  d="M0,0H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" fill="#000000"/> -->
        <!--<clipPath id="mask">
          <path d="M0,80.412H1920V681.432s-69.613-11.73-207.017,24.6C1420.831,799.76,1008.557,947.7,684.557,947.7,204.557,947.7,0,827.8,0,827.8Z" transform="translate(0 -80.412)"  fill="#000000"/>
        </clipPath>
        <foreignObject v-if="isP5" class="childContainer" clip-path="url(#mask)" width="100%" height="100%" x="0" y="0"/>
        <image v-else :xlink:href="src" class="childContainer" clip-path="url(#mask)" width="100%" /> 
      </svg> -->
        <div v-if="isP5" width="100%" height="100%" x="0" y="0" class="childContainer"></div>
        <img v-else class="childContainer thumbnail" width="100%" height="100%" x="0" y="0"  :src="src"/>
         
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
        } else {
            console.log(this)
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.p5Canvas{
    z-index:-9;
    position:relative;
    transform-origin: top left;
    transform: translateY(10%);

    width:100% !important;
    height:100% !important;
    background-color: rgb(28,28,30);
    z-index:-9;
}             

.childContainer {
    --ratio: - 25%;
    height: calc(100% - (var(--ratio) * 1.3));
    transform:translateY(var(--ratio));
    mask: url('../../assets/masks/footer_front_mask.svg') no-repeat;
    mask-size: contain;
    mask-position-y: bottom;
    transform:rotate(180deg);

    @media (max-width:1200px) {
        mask-size: 120% 70%;
    }
    @media (max-width:1000px) {
        mask-size:cover;
        mask-size: 120% 40%;

        &.thumbnail{
            mask-size:130% 90%;
        }
    }

    @media (max-width:480px) {
        mask-size: 190% 40%;
    }

    @media(min-width:1290px){
    --ratio: -24%;
    }

    @media (max-width:1290px){
        --ratio: -33%;
    } 

    @media (max-width:1170px){
        --ratio: -55%;
    } 

    @media (max-width:850px){
        --ratio: -64%;

        &.thumbnail{
            height: 40vh;
        }
    }
}




</style>