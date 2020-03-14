<template>
<div id ="page">

  <svg-curved class="mask_thumbnail" content="image" :src="getContent.thumbnail"></svg-curved>

  <section class="introCourse">
    <h1>{{getContent.name}}</h1>
    <div>
      <span v-for="(tag, i) in getContent.tags"  :key="i">{{tag}}</span>
    </div>

    <p>{{getContent.desc}}</p>
  </section>  

  <section class="contentCourse">
    <div class="indexBar">
      <ul>
        <li v-for="(section, i) in index" :key="i" @click="moveToSection(i, section.section)" :class="current.section == i ? 'currentSection' : 'top'">
          {{section.section}}
            <ul v-if="section.children.length > 0">
              <li v-for="(subsection,k) in section.children" :key="k">{{subsection.innerText}}</li>
            </ul>  
        </li>
      </ul>
    </div>

    <div class="separator"></div>

    <md-reader></md-reader>

    <p class="last_update">Last update {{getContent.last_update}}</p>
  
  </section>  
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import mdReader from '@/components/atoms/markdownReader'
import {mapGetters} from 'vuex';

export default {
  name: 'CoursePage',
  data(){
    return{
      index: [],
      current : {
        section : 0,
        subsection : 0
      }
    }
  },
  computed : {
    ...mapGetters(['getContent']),
  },
  components:{
    'svg-curved' : svgCurved,
    'md-reader' : mdReader
  },
  methods:{
    moveToSection(index, el){
      this.current.section = index ; 
      let scrollTarget = Array.from(this.$children[1].$el.childNodes).find( node => node.innerText == el) ;

      window.scrollTo({
        left: 0,
        top: scrollTarget.offsetTop - 70,
        behaviour: 'smooth'
      })
    }
  },
  mounted(){

    console.log(this.getContent)
    
    let md_childs = Array.from(this.$children[1].$el.childNodes);
    let h1_sections = md_childs.filter( child => child.localName == 'h2');

    for (let w = 0 ; w < h1_sections.length ; w ++){

        let i0 = md_childs.findIndex( (i) => i.innerText == h1_sections[w].innerText);

        if (w == h1_sections.length - 1){
          var indexSection = {
            section : h1_sections[w].innerText,
            children : md_childs.slice(i0 + 1, md_childs.length).filter( child => child.localName == 'h3')
          }
        } else {
          let i1 = md_childs.findIndex( (i) => i.innerText == h1_sections[w + 1].innerText);
  
          var indexSection = {
            section : h1_sections[w].innerText,
            children : md_childs.slice(i0 + 1, i1).filter( child => child.localName == 'h3')
          }
        }

        this.index.push(indexSection);
    }
  }
}
</script>

<style scoped lang="scss">

.mask_thumbnail{
  background-color: rgb(235, 235, 235)
}

.introCourse{
  background-color: rgb(235, 235, 235);
  text-align: center;
  display:grid;
  grid-auto-columns: auto;
  justify-items: center;
  padding-bottom: 200px; 
  margin-bottom:50px;

  // clip-path:path('M10 30 120 90 180 52')
  & h1 {
  text-align: center;
  font-family: 'Rubik';
  font-size:3.2em;
  font-weight:500;
  color: #373D4A;

  margin-bottom:20px;

    & + div {
      margin-bottom:30px; 

      & > span {
        text-align: center;
        font-family: 'Open Sans';
        font-weight:300;
        font-size:1.4em;
        letter-spacing: 0;
        color: #373D4A;

        margin-right:20px;
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

.contentCourse {
  display: grid;
  grid-template-columns: auto 12px 70%;
  margin-bottom:130px;
}

.separator{
  width:2px;
  height:100%;
  background-color:#373D4A;
  border-radius:4px;

  justify-self: center;
}


.indexBar{
  display:flex;
  justify-content: center;

  & > ul{
    position: -webkit-sticky;
    position: sticky;
    top: 10vh;
    min-width:70%;
    width:95%;
    height:min-content;

    &::before {
      content : ' ';
      position:absolute;
      left: 0;
      top: 0;
      width: 12px;
      height:100%;
      background-color:#373D4A;
      border-radius:4px;
      z-index:10;
    }
  }


  & > ul > li {
    text-align: left;
    font-family: 'Open Sans';
    font-weight:600;
    font-size:1.2em;
    color: #373D4A;
    position: relative;
    margin-bottom:10px;
    padding-left:30px;
    padding-right:30px;

    & > ul {
      display:none;
      transform:translateY(-10px);
      opacity: 0;
      transition: .2s ease-out;
    }
  }


  .currentSection{
    border-radius:8px;
    background: linear-gradient(var(--color-gray01), 1.8em, rgba(255, 255, 255, 0) 2em 100%);
    font-weight: 700;
    font-size:1.4em;

    &::after{
      content:'v';
      position:relatve;
      color:#373D4A;

      position: absolute;
      right:10px;
      top:0;
    }

    & > ul{
      display:initial;
      transform: translateY(0);
      opacity: 1;

      & > li {
        margin-top:10px;
        text-align: left;
        font-family: 'Open Sans';
        font-weight:400;
        font-size:.88em;
        color: #373D4A;
      }
    }

    .currentChapitre {
      font-weight: 600;
    }
  }
}

.contentmd{
  padding: 0px 50px;
  max-width:1300px;
  justify-self: center;
}

.last_update{
  grid-column: 3/4;
  justify-self: end;
  margin-right: 50px;

  font-family: 'Open Sans';
  font-weight:300;
  font-size:1em;
  color: #373D4A;
}
</style>
