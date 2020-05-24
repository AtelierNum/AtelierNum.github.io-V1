<template>
  <input :oninput="dragSlider()" :onchange="dragSlider()" orient="vertical" type="range" :min="min" :max="max" v-model="sliderValue" class="sliderInput">
</template>

<script>
export default {
    name: 'scrollSlider',
    props:{
        min: {
            type: Number,
            default: () => 0,
            required : false
        },
        max: {
            type: Number,
            default: () => 100,
            required : false
        },
        scrollingContentRect : {
            type: DOMRect,
            default : () => new DOMRect(),
            required: true
        }
    },
    data(){
        return {
            sliderValue : 0,
            windowTop: 0,
            beingDragged: false
        }
    },
    methods:{
        onScroll(e) {
            this.windowTop = window.top.scrollY ;
            this.beingDragged = false;
        },
        dragSlider(){
            this.beingDragged = true ;
        },
        map(value, x1, y1, x2, y2){
            return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
        }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    watch: {
        sliderValue(newval, oldval){
            if(this.beingDragged){
                let scrollHeight = this.map(newval, 0, 100, this.scrollingContentRect.top, this.scrollingContentRect.bottom + (window.innerHeight / 2));
                window.scrollTo(0,scrollHeight);
                this.$emit('update:scrolling', true);
            } else {
                this.$emit('update:scrolling', false);
            }
        },
        windowTop(newval, oldval){
            if(newval > this.scrollingContentRect.top && !this.beingDragged){
                this.sliderValue = this.map(newval, this.scrollingContentRect.top,  this.scrollingContentRect.bottom, 0, 100);
            }
        }
    }
}
</script>

<style scoped lang="scss">
input{
    margin-left:20px;
    scroll-snap-type: y mandatory;

    &:hover{
      cursor:pointer;
    }


    &.sliderInput{
      position:absolute;
      left:-3px;
      writing-mode: bt-lr; /* IE */
      -webkit-appearance: slider-vertical; /* WebKit */
      -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
      background: transparent; /* Otherwise white in Chrome */
      transform: rotate(180deg);

      width:2px;
      height:100%;
      max-height:80vh;
      
      border-radius: 4px;
      box-shadow: 0 0 8px 2px rgba(0,0,0, .16);
      color: var(--color-gray01);
      font-family:'Rubik';
      font-weight:500;
      font-size:14px;

      --rad : 4px;
      --bgrnd : var(--color-dark02);
      --pad : 0 4px 4px 4px;
      --shad : 0 0 8px 2px rgba(0,0,0, .16);
      --col : var(--color-gray01);
      --wh : 16px;
      --border : none ;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: var(--wh);
        width: var(--wh);
        border: var(--border);
        border-radius: var(--rad);
        background: var(--bgrnd);;
        cursor: pointer;
        margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        box-shadow: var(--shad);
      }

      &::-moz-range-thumb {
        box-shadow: var(--shad);
        border:var(--border);
        height: var(--wh);
        width: var(--wh);
        border-radius: var(--rad);
        background: var(--bgrnd);
        cursor: pointer;
      }

      &::-ms-thumb {
        box-shadow: var(--shad);
        border:var(--border);
        height: var(--wh);
        width: var(--wh);
        border-radius: var(--rad);
        background: var(--bgrnd);
        cursor: pointer;
      }

      &::-webkit-slider-runnable-track {
        width: 2px;
        cursor: pointer;
        border:none;
        border-radius: 4px;
        background-color:var(--color-dark01);
      }

      &::-moz-range-track {
        width: 2px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color:var(--color-dark01);
      }

      &::-ms-track {
        width: 2px;
        cursor: pointer;
        background: var(--color-dark01);
        border:none;
        border-radius: 4px;
      }


      &:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
      }

      &::-ms-track {
        width: 100%;
        cursor: pointer;

        /* Hides the slider so custom styles can be added */
        background: transparent; 
        border-color: transparent;
        color: transparent;
}
      
    }
}
</style>