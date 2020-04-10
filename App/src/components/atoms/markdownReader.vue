<template>
    <vue-markdown  :key="keyId" class="contentmd mdReader">{{readme}}</vue-markdown>

</template>

<script>
import VueMarkdown from 'vue-markdown'
import 'prismjs'
// import "prismjs/themes/prism-okaidia.css";  // theme
// import 'prismjs/components/prism-go.min';  // language

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'markdownReader',
  components:{
    'vue-markdown': VueMarkdown
  },
  data(){
    return{
      readme: '# Un super titre',
      md_loaded : false,
      keyId: 0,
      internalLinks : []
    }
  },
  computed:{
    ...mapGetters(['getContent', 'getList', 'getUrlofInternalContents'])
  },
  methods: {
    ...mapActions({
      setContent : 'setContent',
      setByUrl : 'setByUrl'
    }),
    getReadmeFromExternal(){
      var xmlhttp;
      let _vue = this ;
      
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          _vue.readme = _vue.parseURL(xmlhttp.responseText, _vue.getContent.url) ;
          _vue.md_loaded = true ;
          _vue.keyId ++ ;
          _vue.$emit('mdloaded', true)

          _vue.$nextTick(() => {
            Prism.highlightAll();
            _vue.routerLinks(Array.from(_vue.$children[0].$el.childNodes));
          })
        }
      }

      xmlhttp.open("GET", this.getContent.url, true);
      xmlhttp.send();
    },
    parseURL(data, url){

      let urlSplited = url.split('/');
      let author = urlSplited[3] ;
      let repo = urlSplited[4] ;

      // parse intern paths 
      let intern_paths = this.getUrlofInternalContents;

      let credentials_paths = intern_paths.map( path => ({
        author : path.split('/')[3],
        repo : path.split('/')[4],
      }))

      let repo_paths = data.split('](');

      repo_paths.forEach( (path) => {
        if (path.includes(')')){
          let repopath = path.split(')')[0];

          // case path to another repo listed in projects or courses
          let correspondance = credentials_paths.find(teststring => (repopath.includes(teststring.author) && repopath.includes(teststring.repo)));
            if (correspondance != undefined){
              let targetrepo = `https://raw.githubusercontent.com/${correspondance.author}/${correspondance.repo}/master/README.md`  
            
              data = data.replace(new RegExp(repopath, 'g'), (correspondance, decalage) => {
                if (data.substring(decalage - 2, decalage) == ']('){
                  return targetrepo ;
                } else {
                  return repopath ;
                }
              });

              if (!this.internalLinks.includes(targetrepo)){
                this.internalLinks.push(targetrepo);
              }
            }
          } else {
            if (repopath.includes('https') || repopath.includes('www')){
              console.log('external link', repopath);
            } else {
              if (repopath.includes('.md')){
                console.log('should be recursive repo');
              } else {
                console.log('should be relative path to image');
              }
            }
          }
      })
      

      //  PARSE URL FOR CORRECT IMPORT IMAGES IN MARKDOWNS
      let url_md = data.split('![') // target only images
      
      url_md.forEach( (string) => {
        if (string.includes('](')){
            let string_to_replace = string.split('](')[1].split(')')[0];
            let path = string_to_replace.split('./')
            let newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${path[path.length - 1]}`;

            data = data.replace(new RegExp(string_to_replace, 'g'), (correspondance, decalage) => {
              if (data.substring(decalage - 2, decalage) == ']('){
                return newUrl ;
              } else {
                return string_to_replace ;
              }
            });
          }
      })


      // PARSE URL FOR BAD PERSONS WHO USE HTML BALISE TO IMPORT IMAGES 

      let img_url =  data.split('<img');

      img_url.forEach( (string) => {
          if (string.includes('src="')){
              let string_to_replace = string.split('src="')[1].split('"')[0];
              let path = string_to_replace.split('./')
              let newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${path[path.length - 1]}`;
              
              data = data.replace(new RegExp(string_to_replace, 'g'), (correspondance, decalage) => {
                if (data.substring(decalage - 5, decalage) == 'src="'){
                  return newUrl ;
                } else {
                  return string_to_replace ;
                }
              }); 
          }
      })

      return data ;
    },
    routerLinks(array){
      array.forEach( (node) => {
        if (Array.from(node.childNodes).length > 0 && ['ul', 'li', 'ol', 'p'].includes(node.localName)){ // needed to avoid to much revursioin because of code sections or others unwanted
          this.routerLinks(Array.from(node.childNodes));
          
        } else {
          if (node.localName == 'a'){
            let path = this.internalLinks.find(link => link == node.href);

            if (path != undefined){
              node.addEventListener('click', (event) => {
                this.setByUrl(path);
                this.$router.push('/' + this.$route.name.split('_content')[0] + '/' + this.getContent.id)
                event.preventDefault();
              })
            }
          }
        }
      })
    }
  },
  watch: {
    $route(newval, oldval){
      console.log(oldval, newval)
      console.log(this.$route)
      this.getReadmeFromExternal();
      
    }
  },
  created(){
    if (this.getContent.url != undefined){
      this.getReadmeFromExternal();
    }
  }
}
</script>

<style lang="scss">
@import '../../../node_modules/prismjs/themes/prism.css';

.mdReader{

  * {
    max-width:100%;
  }

  & h1 {
    text-align: left;
    font-family: 'Rubik';
    font-weight:600;
    font-size:3.0em;
    letter-spacing: 0;
    color: #373D4A;

    position:relative;
    margin-bottom:50px;
    margin-top:50px;

    &::after{
      content: ' ';
      position: absolute;
      bottom : -8px;
      left : 0;
      width:75%;
      height : 2px;
      border-radius:2px;
      background-color:#373D4A;
    }
  }



  & h2 {
    text-align: left;
    font-family: 'Rubik';
    font-weight:600;
    font-size:2.6em;
    letter-spacing: 0;
    color: #373D4A;

    margin-bottom:30px;
    margin-top:40px;
  }

  & h3{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:2.0em;
    letter-spacing: 0;
    color: #373D4A; 

    margin-bottom:20px;
    margin-top:30px;
  }
  
  & h4{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:1.7em;
    color: #373D4A; 

    margin-bottom:20px;
    margin-top:20px;
  }
  
  & h5{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:1.4em;
    color: #373D4A; 

    margin-bottom:20px;
    margin-top:20px;
  }
  
  & h6{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:1.2em;
    color: #373D4A; 

    margin-bottom:10px;
    margin-top:10px;
  }

  & p {
  text-align: left;
  font-family: 'Open Sans';
  font-weight:300;
  font-size:18px;
  letter-spacing: 0;
  line-height: 26px;
  color: #373D4A;
  margin-bottom: 30px;
  }
  
  & li {
  text-align: left;
  font-family: 'Open Sans';
  font-weight:300;
  font-size:1.2em;
  letter-spacing: 0;
  line-height: 1.6em;
  color: #373D4A;

    & p{
      margin-bottom:12px;
    }
  }

  a{
    position:relative;

    &::after{
      content: ' ';
      position: absolute;
      bottom : -4px;
      left : 0;
      width:100%;
      height : 3px;
      border-radius:2px;
      background-color:#373D4A;
    }

  }


  & pre {
    position:relative;

    text-align: left;
    font-family: 'DejaVu Sans Mono';
    font-size:16px;
    font-weight:400;
    letter-spacing: 0;
    color: #373D4A;

    background-color:#F8F8F8;
    border-radius:8px;
    padding:30px 40px 30px 40px;
    margin : 50px 0;
    overflow-x: scroll;

    &::after{
      // position:absolute;
      // bottom: 20px;
      // right:20px;
      // content: '<> Copy the code';
      // padding: 10px 20px;
      // border-radius: 8px;

      // text-align: center;
      // font-family:'Rubik';
      // font-size: 1em;
      // color: #F8F8F8;
      // background-color: #373D4A;
    }
  }



  & img{
    display:block;
    margin:12px auto;
    border-radius:4px;
    object-fit: contain;
    justify-self: center;

    & + p {
      text-align:center;

      & > * {
        display:inline-block;
        text-align:center;
      }
    }
  }

  & ul {
    margin-top:20px;
    margin-bottom:20px;
    padding-left:40px;

    & li {
      text-decoration: #373D4A dotted;  
      list-style: disc;
      text-align: left;

      font-family: 'Open Sans';
      font-weight:300;
      font-size:18px;
      letter-spacing: 0;
      line-height: 1.6em;
      color: #373D4A;
    }
  }

}


@media (max-width:900px){
  .mdReader{
    & pre{
      overflow-x: scroll;
    }
  }
}


</style>
