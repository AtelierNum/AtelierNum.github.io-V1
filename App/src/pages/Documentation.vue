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
    <div class="indexBar">
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
    </div>

    <div class="separator"></div>

    <md-reader @mdloaded="waitingFunctions"></md-reader>
  </section>  
  <p class="last_update">Last update {{getContent.last_update}}</p>
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'
import mdReader from '@/components/atoms/markdownReader'
// import VueClipboard from 'vue-clipboard2'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'CoursePage',
  data(){
    return{
      index: [],
      current : {
        section : {
          index : 0,
          offsetTop : 0,
        },
        subsection : {
          index : 0,
          offsetTop : 0,
        }

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
    ...mapActions({
      setContent : 'setContent'
    }),
    moveToSection(index, el){
      let scrollTarget = Array.from(this.$children[1].$el.childNodes).find( node => node.innerText == el) ;
      this.current.section.index = index ; 
      this.current.section.offsetTop = scrollTarget ; 

      location.hash = '#' + this.hrefAnchor(el);
    },
    waitingFunctions(){
      this.$nextTick( () => {
        let md_childs = Array.from(this.$children[1].$el.childNodes);
        this.createIndex(md_childs);
        this.setAnchor(md_childs);
        // this.setCopyCodeButtons();
      })
    },
    createIndex(md_childs){
        let higherTitle = 1 ;
        let h1_sections = md_childs.filter( child => child.localName == `h${higherTitle}`);

        while (h1_sections.length < 2){
          h1_sections = md_childs.filter( child => child.localName == `h${higherTitle}`);
          higherTitle ++ ;
        }

        for (let w = 0 ; w < h1_sections.length ; w ++){

            let i0 = md_childs.findIndex( (i) => i.innerText == h1_sections[w].innerText);

            if (w == h1_sections.length - 1){
              var indexSection = {
                section : h1_sections[w].innerText,
                offsetTop : h1_sections[w].offsetTop,
                children : md_childs.slice(i0 + 1, md_childs.length).filter( child => child.localName == `h${higherTitle}`)
              }
            } else {
              let i1 = md_childs.findIndex( (i) => i.innerText == h1_sections[w + 1].innerText);
      
              var indexSection = {
                section : h1_sections[w].innerText,
                offsetTop : h1_sections[w].offsetTop,
                children : md_childs.slice(i0 + 1, i1).filter( child => child.localName == 'h3')
              }
            }

            this.index.push(indexSection);
        }

        window.addEventListener('scroll', this.handleScroll);    
    },
    hrefAnchor(title){
      return title.split(' ').join('-'); 
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
    },
    handleScroll(event){

      let currentnode = this.index.find( section => section.offsetTop > this.current.section.offsetTop);
      
      if (currentnode != undefined){
        if (window.scrollY - (window.innerHeight / 2) > currentnode.offsetTop){
          this.current.section.index = this.index.findIndex( section => section == currentnode);
          this.current.section.offsetTop = currentnode.offsetTop; 
          
          if (this.index[this.current.section.index].children.length > 0){
            this.current.subsection.index = 0 ;
          
          } else {
            this.current.subsection.index = undefined;
          }

        } 
        else {
          let section = this.index.find( section => section.offsetTop == this.current.section.offsetTop)

          // console.log(section, currentSubnode)

          if (section != undefined ){
            let currentSubnode = section.children.find( sub => sub.offsetTop > this.current.subsection.offsetTop);

            if (currentSubnode != undefined){
              if (window.scrollY - (window.innerHeight / 2) > currentSubnode.offsetTop){
                this.current.subsection.index = section.children.findIndex( sub => sub.offsetTop == currentSubnode.offsetTop);
                this.current.subsection.offsetTop = currentSubnode.offsetTop ;
              }
            }
          }      
        }  
      }
    }
  },
  created(){
    if (this.getContent.url == undefined || this.getContent.id != this.$route.params.id){
      this.setContent(this.$route.params.id);
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
  padding-bottom: 100px; 
  padding-top: 50px; 
  margin-bottom:50px;

  clip-path: url('../assets/masks/top_content_mask.svg');
  
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


.indexBar{
  display:flex;
  justify-content: center;
  padding-left:20px;
  width:calc(25% - 12px);
  height:min-content;
  position: -webkit-sticky;
  position: sticky;
  top: 20vh;

  & > ul{
    min-width:70%;
    width:95%;
    height:min-content;
    position:relative;

    &:hover{
      cursor:pointer;
    }

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
    font-size:18px;
    color: #373D4A;
    position: relative;
    margin-bottom:10px;
    padding-left:30px;
    padding-right:30px;
    transition: .2s ease-out;

    & > ul {
      display:none;
      transform:translateY(-10px);
      opacity: 0;
      transition: .3s ease-out;
    }
  }


  .currentSection{
    border-radius:8px;
    background: linear-gradient(var(--color-gray01), 100%, rgba(255, 255, 255, 0) 120%);
    font-weight: 700;
    font-size:20px;
    transition: .3s ease-out;

    &::after{
      content:' ';
      position:relatve;
      color:#373D4A;
      // mask-image: url('../assets/icons/triangle_right.svg');

      position: absolute;
      right:10px;
      top:0;
    }

    & > ul{
      display:block;
      transform: translateY(0);
      opacity: 1;
      padding-left:20px;
      transition: .3s ease-out;

      & > li {
        margin-top:10px;
        text-align: left;
        font-family: 'Open Sans';
        font-weight:400;
        font-size:.88em;
        color: #373D4A;
        transition: .3s ease-out;
      }
    }

    .currentSubsection {
      font-weight: 700;
      transition: .3s ease-out;
    }
  }
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
