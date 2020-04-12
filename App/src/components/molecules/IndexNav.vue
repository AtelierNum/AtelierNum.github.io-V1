<template>
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
</template>

<script>
export default {
    name: 'NavIndex',
    props: {
        parentChilds: {
            type: Array,
            required: true,
            default: () => []
        }
    },
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
    methods : {
        moveToSection(index, el){
            let scrollTarget = this.parentChilds.find( node => node.innerText == el) ;
            this.current.section.index = index ; 
            this.current.section.offsetTop = scrollTarget ; 

            console.log(scrollTarget);
            location.hash = '#' + this.hrefAnchor(el);
        },
        createIndex(md_childs){
            this.index =  [];
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

                } else {
                    let section = this.index.find( section => section.offsetTop == this.current.section.offsetTop)
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
    }
}

</script>

<style scoped lang="scss">

.indexBar{
  display:flex;
  justify-content: center;
  padding-left:20px;
  width:calc(25% - 12px);
  height:min-content;
  position: -webkit-sticky;
  position: sticky;
  top: 20vh;
  max-height:75vh;
  overflow-y:scroll;
  // scrollbar-width: none;
  scrollbar-color :rgb(233, 233, 233)  #373D4A;
  scrollbar-width: thin;

  // &::-webkit-scrollbar-thumb {
  //   z-index:12;

  //   position:absolute;
  //     left: 0;
  //     top: 0;
  //     width: 12px;
  //     height:100%;
  //     background-color:#373D4A;
  //     border-radius:4px;
  //   background-color:rgb(233, 233, 233);
  // }

  /* invert side of scrollbar */
  transform:rotateY(180deg);
  -ms-transform:rotateY(180deg); /* IE 9 */
  -webkit-transform:rotateY(180deg); /* Safari and Chrome */

  

  & > ul{
    min-width:70%;
    width:95%;
    height:min-content;
    position:relative;
    transform:rotateY(-180deg);
    -ms-transform:rotateY(180deg); /* IE 9 */
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */

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
</style>