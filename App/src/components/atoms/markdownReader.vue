<template>
     <router-view  class="contentmd mdReader" />

     <!-- <markdown-it-vue class="contentmd mdReader" :key="getReadme" :content="readme" /> -->
</template>

<script>

import MarkdownItVue from 'markdown-it-vue'

export default {
  name: 'markdownReader',
  components:{
    MarkdownItVue
  },
  data(){
    return{
      readme: '# Un super titre'
    }
  },
  computed:{
    getReadme(){
      var xmlhttp;
      console.log('c"est top')
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          this.readme =  xmlhttp.responseText ;
            console.log(this.readme)
            // return xmlhttp.responseText;
        }
      }

      xmlhttp.open("GET","https://raw.githubusercontent.com/R4ph3rd/workshop_alt_ctrl/master/README.md",true);
      xmlhttp.send();
    }
  }
}
</script>

<style lang="scss">

.mdReader{
  display:grid;
  margin-bottom:30px;

  & h1 {
    text-align: left;
    font-family: 'Rubik';
    font-weight:600;
    font-size:3.0em;
    letter-spacing: 0;
    color: #373D4A;

    position:relative;
    margin-bottom:50px;

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
  }

  & h3{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:2.0em;
    letter-spacing: 0;
    color: #373D4A; 

    margin-bottom:20px;
  }

  & p {
  text-align: left;
  font-family: 'Open Sans';
  font-weight:300;
  font-size:1.2em;
  letter-spacing: 0;
  line-height: 1.6em;
  color: #373D4A;
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
    font-size:1.2em;
    font-weight:400;
    letter-spacing: 0;
    color: #373D4A;

    background-color:#F8F8F8;
    border-radius:8px;
    padding:30px 40px 30px 40px;
    margin : 50px 0;


    &::after{
      position:absolute;
      bottom: 20px;
      right:20px;
      content: '<> Copy the code';
      padding: 10px 20px;
      border-radius: 8px;

      text-align: center;
      font-family:'Rubik';
      font-size: 1em;
      color: #F8F8F8;
      background-color: #373D4A;
    }
  }



  & img{
    display:block;
    border-radius:4px;
    box-shadow: 0px 3px 4px #00000029;
    height:100%;
    object-fit: cover;
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
      font-size:1.2em;
      letter-spacing: 0;
      line-height: 1.6em;
      color: #373D4A;
    }
  }

}



</style>
