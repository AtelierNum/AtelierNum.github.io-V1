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

    <index-nav ref="indexnav" :parentChilds="markdownChilds"></index-nav>

    <div class="separator"></div>

    <md-reader @mdloaded="waitingFunctions"></md-reader>
  </section>  
  <p class="last_update">Last update {{getContent.last_update}}</p>
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import mdReader from '@/components/atoms/markdownReader'
import indexNav from '@/components/molecules/IndexNav.vue'
// import VueClipboard from 'vue-clipboard2'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'DocumentationPage',
  data(){
    return{
      markdownChilds : []
    }
  },
  computed : {
    ...mapGetters(['getContent'])
  },
  components:{
    'svg-curved' : svgCurved,
    'md-reader' : mdReader,
    'index-nav' : indexNav
  },
  methods:{
    ...mapActions({
      setContent : 'setContent'
    }),
    waitingFunctions(){
      this.$nextTick( () => {
        this.markdownChilds = Array.from(this.$children[2].$el.childNodes);
        this.$refs.indexnav.createIndex(this.markdownChilds);
        this.setAnchor(this.markdownChilds);
        // this.setCopyCodeButtons();
      })
    },
    hrefAnchor(title){
      return title.split(/[^\w]/g).join('_') ;
    },
    setAnchor(md_childs){
      let titles = md_childs.filter( child => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.localName));
      titles.forEach( title => title.id = this.hrefAnchor(title.innerText));
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
  justify-items: center;
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

    & + h2 {
      text-align: center;
      font-family: 'Rubik';
      font-size:1.6em;
      font-weight:500;
      color: rgb(98, 105, 121);

      margin-bottom:20px;

      & + div {
        margin-bottom:30px; 

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
        }
        

        & + p{
          text-align: center;
          font-family: 'Open Sans';
          font-weight:300;
          font-size:1.2em;
          color: #373D4A;

          max-width:900px;
        }
      }

    }
  }
}

.contentCourse {
  display: flex;
  margin-bottom:30px;

}

.separator{
  width:2px;
  // height:100%;
  background-color:#373D4A;
  border-radius:4px;

  align-self: stretch;
  justify-self: center;
}

.contentmd{
  padding: 0px 50px;
  max-width:1300px;
  justify-self: center;
  width:70%;
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
