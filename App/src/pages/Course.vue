<template>
<div id ="page">

  <svg-curved class="mask_thumbnail" content="image" src="https://source.unsplash.com/random"></svg-curved>

  <section class="introCourse">
    <h1>Introduction Processing</h1>
    <p>Processing - Dataviz</p>

    <p>Lorem ipsum nec mergetur Lorem ipsum nec mergetur  Lorem ipsum nec mergetur  Lorem ipsum nec mergetur  Lorem ipsum nec mergetur  Lorem ipsum nec mergetur </p>
  </section>  

  <section class="contentCourse">
    <div class="indexBar">
      <ul>
        <li>ezfee</li>
        <li class="currentSection">
          moajppabzpzpiub
          <ul>
            <li>moasdfd_1</li>
            <li class="currentChapitre">msdfdsfoa_2</li>
            <li>moadfds_3</li>
          </ul>
        </li>
        <li>sfssdfef</li>
        <li>hjhdsfdfgf</li>
        <li>ezdsdsff</li>

        <li v-for="(section, i) in index" :key="i">
          {{section.section}}
            <ul v-if="section.children.length > 0">
              <li v-for="(subsection,k) in section.children" :key="k">{{subsection.innerText}}</li>
            </ul>  
        </li>
      </ul>
    </div>

    <div class="separator"></div>

    <md-reader></md-reader>

    <p class="last_update">Last update {{lastupdate}}</p>
  
  </section>  
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import mdReader from '@/components/atoms/markdownReader'

export default {
  name: 'CoursePage',
  data(){
    return{
      index: []
    }
  },
  computed : {
    lastupdate(){
      return '28/10/19';
    }
  },
  components:{
    'svg-curved' : svgCurved,
    'md-reader' : mdReader
  },
  mounted(){
    
    let md_childs = Array.from(this.$children[1].$el.childNodes);

    let h1_sections = md_childs.filter( child => child.localName == 'h1');

    for (let w = 1 ; w < h1_sections.length - 1; w ++){
        // let child = h1_sections[w];
        let i0 = md_childs.findIndex( (i) => i.innerText == h1_sections[w - 1].innerText);
        let i1 = md_childs.findIndex( (i) => i.innerText == h1_sections[w].innerText);


        let indexSection = {
          section : h1_sections[w - 1].innerText,
          children : md_childs.slice(i0 + 1, i1).filter( child => child.localName == 'h2')
        }

        // console.log(indexSection);

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

    & + p{
      text-align: center;
        font-family: 'Open Sans';
        font-weight:300;
        font-size:1.4em;
        letter-spacing: 0;
        color: #373D4A;

        margin-bottom:20px; 

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
  grid-template-columns: auto 12px 80%;
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
  position:relative;

  & ul{
    position: -webkit-sticky;
    position: sticky;
    top: 400px;

    &::before {
      content : ' ';
      position:absolute;
      left: -20px;
      top: 0;
      width: 12px;
      height:100%;
      background-color:#373D4A;
      border-radius:4px;
    }
  }


  ul > li {
    text-align: left;
    font-family: 'Open Sans';
    font-weight:600;
    font-size:1.2em;
    color: #373D4A;
    position: relative;

    & > ul > li {
      text-align: left;
      font-family: 'Open Sans';
      font-weight:400;
      font-size:.98em;
      color: #373D4A;
    }
  }


  &.currentSection{
    &::before{
      content: ' ';
      position: absolute;
      top: - 5px ; 
      left : - 20px;
      width: calc(100% + 20px);
      height: calc(1.4em + 10px);

      border-radius:4px;
      background-color: var(--color-gray01);
    }

    &::after{
      content:'v';
      position:relatve;
      color:#373D4A;
      background-color: #373D4A;
    }
  }

  &.currentChapitre {
    font-weight: 600;
  }
}

.contentmd{
  padding: 0px 50px;
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
