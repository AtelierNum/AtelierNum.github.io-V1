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
        <div v-if="isP5" width="100%" height="100%" x="0" y="0" class="childContainer p5" :class="loaded ? '' : 'loading'"></div>
        <img v-else class="childContainer thumbnail" width="100%" height="100%" x="0" y="0"  :src="src"/>
         
    </div>
</template>

<script>
import p5 from 'p5';

export default {
    name: 'svgCurved',
    data(){
        return{
            loaded: false
        }
    },
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

            setTimeout( () =>{
                this.loaded = true;
                console.log(this.loaded)
            }, 6000) // better to do
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.p5Canvas{
    height:40vh;
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
    mask: url('../../assets/masks/footer_front_mask.svg') no-repeat;
    mask-size: 100% 90%;
    mask-position-y: bottom;
    -webkit-mask-position-y: bottom;
    -ms-mask-position-y: bottom;
    transform:rotate(180deg);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);

    height:40vh;

    &.p5{
        background-color: rgb(28,28,30);
    }

    &.loading{
        overflow:hidden;

        &::before{
            content:' ';
            z-index:-10;
            display: block;
            position: absolute;
            left: -150px;
            top: 0;
            height: 100%;
            width: 150px;
            background: linear-gradient(to right, transparent 0%, rgb(44, 44, 48) 50%, transparent 100%);
            animation: load 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
        }
    }

    @keyframes load {
        from {
            left: -150px;
        }
        to   {
            left: 100%;
        }
    }

    @media (max-width:480px) {
        mask-size: 190% 40%;
    }

    @media (max-width:1000px) {
        mask-size:cover;
        mask-size: 120% 40%;

        &.thumbnail{
            mask-size:130% 90%;
        }
    }

    @media (max-width:1200px) {
        mask-size: 120% 70%;
    }

    @media (min-width:1000px) {
        height:50vh;
    }

    @media(min-width:1920px){
        height: 70vh;
    }
}




</style>