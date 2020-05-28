<template>
<div class="indexBar">
    <ul>
    <li v-for="(section, i) in index" :key="i" :class="sectionClasses(i)" >        
        <a @click="moveToSection(i, section.section)">{{section.section}}</a>
        <div v-if="section.children.length > 0" class="toggleSection" @click="openSection(i)">+</div>

        <ul v-if="section.children.length > 0">
            <li 
            v-for="(subsection,k) in section.children" 
            :key="k" 
            :class="current.subsection.index == k ? 'currentSubsection' : ''">
                <a @click="moveToSection(i, section.section, k, subsection.innerText)" >{{subsection.innerText}}</a>
            </li>
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
            },
            openedSections : []
        }
    },
    methods : {
        sectionClasses(i){
            if (this.current.section.index == i){
                if (this.openedSections.includes(i)){
                    return 'currentSection openedSection';
                } else {
                    return 'currentSection';
                }
            } else {
                if (this.openedSections.includes(i)){
                    return 'openedSection';
                } else {
                    return 'top';
                }
            }
        },
        openSection(index){
            if(this.openedSections.includes(index)){
                this.openedSections.splice(this.openedSections.indexOf(index), 1);
            } else {
                this.openedSections.push(index);
            }
        },
        moveToSection(i, el, k, sub_el){
            if (sub_el != undefined){
                 // in case user open the dropdown and click directly on a subsection, we have to set also the parent one
                if (this.current.section.index != i){
                    this.current.section.index = i ; 
                    this.current.section.offsetTop = this.parentChilds.find( node => node.innerText == el) ;
                }

                this.current.subsection.index = k;
                this.current.subsection.offsetTop = this.parentChilds.find( node => node.innerText == sub_el) ;
                this.$router.replace(this.$route.path + '#' + this.hrefAnchor(sub_el) );

            } else {
                this.openSection(i); // in case of sub_el defined, it means that user already open the section, so ne need to do it again
                this.current.section.index = i ; 
                this.current.section.offsetTop = this.parentChilds.find( node => node.innerText == el) ; 
                this.$router.replace(this.$route.path + '#' + this.hrefAnchor(el) );
            }
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
            return title.split(/[^\w]/g).join('_') ;
        },
        handleScroll(event){
            let currentnode = this.index.find( section => section.offsetTop > this.current.section.offsetTop);
            
            if (currentnode != undefined){
                if (window.scrollY > currentnode.offsetTop){
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
    padding-right:35px;
    border-radius:8px;
    transition: .2s ease-out;

    & .toggleSection{
    //   background: no-repeat center / contain  url('~/icons/triangle_right.svg');
        position: absolute;
        right:5px;
        top:0;
        // width:22px;
        // height:22px;
        transition: .2s ease-out;
        font-weight:700;
        font-size:24px;
        transform-origin: center;
        display:inline;
        line-height:22px;
        text-align:center;
    }

    & > ul {
      display:none;
      transform:translateY(-10px);
      padding-left:20px;
      opacity: 0;
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
  }

  .openedSection{
    transition: .3s ease-out;

    & .toggleSection {
        transform:rotate(90deg);
        transition: .2s ease-out;
    }

    & > ul{
      display:block;
      transform: translateY(0);
      opacity: 1;
      transition: .3s ease-out;    
    }
  }


  .currentSection{
    background: linear-gradient(var(--color-gray01), 100%, rgba(255, 255, 255, 0) 120%);
    font-weight: 700;
    font-size:20px;
    transition: .3s ease-out;

    .currentSubsection {
      font-weight: 700;
      transition: .3s ease-out;
    }
  }
}
</style>