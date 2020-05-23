<template>
<div id ="page">

  <svg-curved class="mask_thumbnail" content="image" :src="getContent.thumbnail"></svg-curved>

  <section class="introCourse">
    <h1>{{getContent.name}}</h1>
    <h2>{{getContent.author}}</h2>
    <div>
      <span v-for="(tag, i) in getContent.tags"  :key="i">{{tag}}</span>
    </div>

    <p>{{getContent.desc}}</p>
  </section>  

  <section class="contentCourse">
    <!-- <div class="indexBar">
      <ul>
        <li v-for="(section, i) in index" :key="i" :class="current.section.index == i ? 'currentSection' : 'top'" >        
            <a @click="moveToSection(i, section.section)">{{section.section}}</a>
            <ul v-if="section.children.length > 0">
              <li 
              v-for="(subsection,k) in section.children" 
              :key="k" 
              @click="moveToSection(i, subsection.innerText)" 
              :class="current.subsection.index == i ? 'currentSubsection' : ''"
              >{{subsection.innerText}}</li>
            </ul>  
        </li>
      </ul>
    </div> -->

    <index-nav ref="indexnav" :parentChilds="markdownChilds" v-show="windowWidth > 880"></index-nav>

    <div class="separator" :class="windowWidth > 880 ? '' : 'indexSlider'">
      <!-- <div v-show="windowWidth < 880" class="sliderInput" :class="sliderOffset">{{sliderSection}}</div> -->
      <!-- :style="{'top': sliderOffset + 'px'} -->
      <input v-on:click="dragSlider()" orient="vertical" type="range" min="0" max="100" v-model="sliderValue" v-show="windowWidth < 880" class="sliderInput">
    </div>

    <md-reader @mdloaded="waitingFunctions">
      <v-loader v-for="i in 12" :key="i + '-loader'" v-show="!loaded"></v-loader>
    </md-reader>
  </section>  
  <p class="last_update">Last update {{getContent.last_update}}</p>
  
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import loader from '@/components/atoms/loader'
import mdReader from '@/components/atoms/markdownReader'
import indexNav from '@/components/molecules/IndexNav.vue'
// import VueClipboard from 'vue-clipboard2'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'DocumentationPage',
  data(){
    return{
      markdownChilds : [],
      loaded : false,
      sliderValue : 5,
      windowTop: 0,
      beingDragged: false,
      contentRect : {}
    }
  },
  computed : {
    ...mapGetters(['getContent']),
    windowWidth(){
      return window.innerWidth;
    }
  },
  components:{
    'svg-curved' : svgCurved,
    'md-reader' : mdReader,
    'index-nav' : indexNav,
    'v-loader' : loader
  },
  methods:{
    ...mapActions({
      setContent : 'setContent'
    }),
    waitingFunctions(){
      this.$nextTick( () => {
        this.loaded = !this.loaded ;
        this.markdownChilds = Array.from(this.$children[2].$el.childNodes);
        this.$refs.indexnav.createIndex(this.markdownChilds);
        this.setAnchor(this.markdownChilds);
        this.contentRect = this.$children[2].$el.getBoundingClientRect();
        // this.setCopyCodeButtons();
      })
    },
    hrefAnchor(title){
      return title.split(/[^\w]/g).join('_') ;
    },
    setAnchor(md_childs){
      let titles = md_childs.filter( child => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.localName));
      titles.forEach(title => title.id = this.hrefAnchor(title.innerText));
    },
    setCopyCodeButtons(){
        let md_childs = Array.from(this.$children[1].$el.childNodes);
        let codesections = md_childs.filter( child => child.localName == 'pre');
        for (let w = 0 ; w < codesections.length ; w ++){

          let copycode = document.createElement('button');
          copycode.innerText = '<> Copy the code' ;
          copycode.classList.add('copycode');

          // copycode.addEventListener('click', () => {
          //   console.log(codesections[w].children[0], document.querySelector('code'))
          //   // document.querySelector('code').select();
          //   // document.execCommand('copy');

          //   this.$copyText(codesections[w].children[0].innerText).then(function (e) {
          //     alert('Copied')
          //     console.log(e)
          //   }, function (e) {
          //     alert('Can not copy')
          //     console.log(e)
          //   })
          // })

          codesections[w].appendChild(copycode);
        }
    },
    onScroll(e) {
      this.windowTop = window.top.scrollY ;
      this.beingDragged = false;
    },
    dragSlider(){
      this.beingDragged = true ;
      console.log('dragSLider', this.beingDragged)
    },
    map(value, x1, y1, x2, y2){
      return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  watch: {
    sliderValue(newval, oldval){
      if(this.$children[2] && this.beingDragged){
        let scrollHeight = this.map(newval, 0, 100, this.contentRect.top, this.contentRect.bottom);
        // let scrollHeight = (newval - 0) / (100 - 0) * (this.contentRect.height - this.contentRect.top) + this.contentRect.top + (window.innerHeight / 2);
        window.scrollTo(0,scrollHeight);
      }
    },
    windowTop(newval, oldval){
      if(newval > this.contentRect.top && !this.beingDragged){
        this.sliderValue = this.map(newval, this.contentRect.top,  this.contentRect.bottom, 0, 100);
      }
    },
    beingDragged(newval, oldval){
      console.log('beingdrag', newval)
    }
  }
}
</script>

<style scoped lang="scss">

.mask_thumbnail{
  background-color: #f7f7f7;
}

.introCourse{
  background-color: #f7f7f7;
  text-align: center;
  display:grid;
  grid-auto-columns: auto;
  justify-items: centechildrenr;
  padding-bottom: 250px; 
  margin-bottom:50px;

  mask: url('../assets/masks/top_content_mask.svg');
  mask-position:bottom;
  
  & h1 {
  text-align: center;
  font-family: 'Rubik';
  font-size:3.2em;
  font-weight:500;
  color: #373D4A;

  margin-bottom:12px;
  max-width:90%;
  margin-left:auto;
  margin-right:auto;

    & + h2 {
      text-align: center;
      font-family: 'Rubik';
      font-size:1.6em;
      font-weight:500;
      color: rgb(98, 105, 121);

      margin-bottom:20px;
      max-width:90%;
      margin-left:auto;
      margin-right:auto;

      & + div {
        margin-bottom:30px; 
        max-width:80%;
        margin-left:auto;
        margin-right:auto;

        & > span {
          display:inline-block;
          text-align: center;
          font-family: 'Open Sans';
          font-weight:300;
          font-size:1.4em;
          letter-spacing: 0;
          color: #373D4A;

          margin-right:20px;
          background-color:rgb(233, 233, 233);
          border-radius: 12px;
          padding: 12px 20px;
          margin-bottom:12px;
        }
        

        & + p{
          text-align: center;
          font-family: 'Open Sans';
          font-weight:300;
          font-size:1.2em;
          color: #373D4A;

          max-width:900px;
          max-width:80%;
          margin-left:auto;
          margin-right:auto;
        }
      }

    }
  }
}

.contentCourse {
  display: flex;
  margin-bottom:30px;

  @media(max-width:880px){
    width:100%;
  }

}

.separator{
  position:relative;
  width:2px;
  // height:100%;
  background-color:#373D4A;
  border-radius:4px;

  align-self: stretch;
  justify-self: center;
  flex-shrink: 0;

  @media(max-width:880px){
    background-color:unset;
  }

  &.indexSlider{
    margin-left:20px;
    scroll-snap-type: y mandatory;

    &:hover{
      cursor:pointer;
    }


    .sliderInput{
      position:absolute;
      left:-3px;
      // transform: rotate(90deg);
      writing-mode: bt-lr; /* IE */
      -webkit-appearance: slider-vertical; /* WebKit */
      -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
      background: transparent; /* Otherwise white in Chrome */
      transform: rotate(180deg);

      width:2px;
      height:100%;
      max-height:80vh;
      // padding:4px;
      // padding-top:0;
      
      border-radius: 4px;
      // background-color: var(--color-dark01);
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

  @media(max-width:880px){
    position:sticky;
    top:120px;
    max-height:80vh;
  }
}

.contentmd{
  padding: 0px 50px;
  max-width:1300px;
  justify-self: center;
  width:70%;

  @media(max-width:880px){
    width:unset;
  }
}

.last_update{
  display:block;
  text-align:right;
  margin-right: 62px;
  margin-bottom: 130px;

  font-family: 'Open Sans';
  font-weight:300;
  font-size:1em;
  color: #373D4A;
}

/deep/
.copycode{
  position:absolute;
  bottom: 20px;
  right:20px;
  // content: '<> Copy the code';
  padding: 10px 20px;
  border-radius: 8px;
  border:none;

  text-align: center;
  font-family:'Rubik';
  font-size: 1em;
  color: #F8F8F8;
  background-color: #373D4A;

  &:hover{
    cursor:pointer;
  }
}
</style>
