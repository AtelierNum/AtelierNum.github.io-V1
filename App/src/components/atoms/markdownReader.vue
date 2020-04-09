<template>
    <vue-markdown v-if="md_loaded"  class="contentmd mdReader">{{readme}}</vue-markdown>

</template>

<script>
import VueMarkdown from 'vue-markdown'
import 'prismjs'
import {mapGetters} from 'vuex'

export default {
  name: 'markdownReader',
  components:{
    'vue-markdown': VueMarkdown
  },
  data(){
    return{
      readme: '# Un super titre',
      md_loaded : false,
    }
  },
  computed:{
    ...mapGetters(['getContent'])
  },
  methods: {
    parseURL(data, url){
                  //  PARSE URL FOR CORRECT IMPORT IMAGES IN MARKDOWNS
            let url_save = data.split('![')
            
            url_save.forEach( (string) => {
                if (string.includes('](')){
                    let string_to_replace = string.split('](')[1].split(')')[0];
                    let path = string_to_replace.split('./')
                    let newUrl = `https://raw.githubusercontent.com/${url.split('/')[3]}/${url.split('/')[4]}/master/${path[path.length - 1]}`;
                    
                    data = data.replace(string_to_replace, newUrl);
                }
            })


            // PARSE URL FOR BAD PERSONS WHO USE HTML BALISE TO IMPORT IMAGES 

            let img_url =  data.split('<img');

            img_url.forEach( (string) => {
                if (string.includes('src="')){
                    let string_to_replace = string.split('src="')[1].split('"')[0];
                    let path = string_to_replace.split('./')
                    let newUrl = `https://raw.githubusercontent.com/${url.split('/')[3]}/${url.split('/')[4]}/master/${path[path.length - 1]}`;
                    
                    data = data.replace(string_to_replace, newUrl);
                }
            })

            return data ;
    }
  },
  created(){
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
          _vue.$emit('mdloaded', true)

          _vue.$nextTick(() => {
            Prism.highlightAll();
          })
        }
      }

      xmlhttp.open("GET", this.getContent.url, true);
      xmlhttp.send();
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
