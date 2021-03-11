<template>
<div id ="page">

   <svg-curved content="p5"></svg-curved>


  <section class="introCourse">
    <h1>{{getContent.name}}</h1>
    <h2>{{getContent.author}}</h2>
    <div>
      <span v-for="(tag, i) in getContent.tags"  :key="i">{{tag}}</span>
    </div>

    <p>{{getContent.desc}}</p>
  </section>  

  <section class="contentCourse">
    <index-nav ref="indexnav" :parentChilds="markdownChilds" v-show="windowWidth > 880"></index-nav>

    <div class="separator" :class="windowWidth > 880 ? '' : 'indexSlider'">
      <v-scrollSlider 
        ref="sliderScroll" 
        v-if="loaded" 
        :windowScroll="true"
        v-show="windowWidth < 880" 
        :scrollingContentRect="contentRect"
        :scrolling.sync="scrollingIndex"></v-scrollSlider>
    </div>

    <md-reader @mdloaded="waitingFunctions"></md-reader>
  </section>  
  <p class="last_update">Last update {{getContent.last_update}}</p>
  
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import loader from '@/components/atoms/loader'
import scrollSlider from '@/components/atoms/scrollSlider'
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
      contentRect: new DOMRect(),
      scrollingIndex : false,
      windowWidth: window.innerWidth
    }
  },
  computed : {
    ...mapGetters(['getContent'])
  },
  components:{
    'svg-curved' : svgCurved,
    'md-reader' : mdReader,
    'index-nav' : indexNav,
    'v-loader' : loader,
    'v-scrollSlider': scrollSlider
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

          copycode.addEventListener('click', () => {
            console.log(codesections[w].children[0], document.querySelector('code'))
            // document.querySelector('code').select();
            // document.execCommand('copy');

            this.$copyText(codesections[w].children[0].innerText).then(function (e) {
              alert('Copied')
              console.log(e)
            }, function (e) {
              alert('Can not copy')
              console.log(e)
            })
          })

          codesections[w].appendChild(copycode);
        }
    }
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })
  }
}
</script>

<style scoped lang="scss">
.svgCurved{
  background:#f7f7f7;
}

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

  @media(max-width:480px){
    word-break:word-break;
    font-size:12vw;
  }

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
    width:0;
    background-color:unset;
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
    width:100%;
    padding:0 10px 0 40px;
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

  @media(max-width:480px){
    margin-right: 10px;
  }
}

// /deep/
// .copycode{
//   position:absolute;
//   bottom: 20px;
//   right:20px;
//   content: '<> Copy the code';
//   padding: 10px 20px;
//   border-radius: 8px;
//   border:none;

//   text-align: center;
//   font-family:'Rubik';
//   font-size: 1em;
//   color: #F8F8F8;
//   background-color: #373D4A;

//   &:hover{
//     cursor:pointer;
//   }
// }
</style>
