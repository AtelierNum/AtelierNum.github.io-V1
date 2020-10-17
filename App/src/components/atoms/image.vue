<template>
  <div :class="{'box-image' : true ,'placeholder':true, 'loaded' :loaded}" :style="padding">
    <transition name="fade" v-if="placeholder">
      <img v-show="loadedPlaceholder" v-on:load="onLoadedPlaceholder" :src="placeholder"  :alt="alt" :style="styles" class="blured" :class="{'loaded': loaded}">
    </transition>
    <transition name="fade">
      <img v-show="loaded" v-on:load="onLoaded" :src="src"  :alt="alt" :style="styles" >
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'image-loader',
    props: {
      src: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        required: false
      },
      width: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required: false
      },
      className : {
        type: String,
        required: false
      },
      ratio : {
        type: String,
        required: false
      }
    },
    data () {
      return {
        loaded: false,
        loadedPlaceholder: false,
      }
    },
    computed: {
      padding(){
        let styles = {
          paddingBottom : this.ratio
        }
        
        
        if (this.width) {
          styles.width = this.width
        }
        if (this.height) {
          styles.height = this.height
        }
        return styles
      },
      styles(){
        let styles = {}
        
        
        if (this.width) {
          styles.width = this.width
        }
        if (this.height) {
          styles.height = this.height
        }
        return styles
      }
    },
    methods: {
      onLoaded () {
        this.loaded = true
      },
      onLoadedPlaceholder () {
        this.loadedPlaceholder = true
      }
    }
  }
</script>

<style scoped lang="scss">

.fade-enter-active {
  transition: opacity 800ms ease-in-out;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}

.box-image {
  display: flex;
  position: relative;
  overflow: hidden;
  background: #f6f7f8;
  position: relative;
  img {
    //position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    height: 100%;
    width: 100%;
    transition: 800ms all ease-in-out;
  } 
  .loaded img {
    //transition : none;
  }
}

.blured {
  filter: blur(25px);
}

</style>
