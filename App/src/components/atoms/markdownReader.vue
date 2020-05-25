<template>
    <vue-markdown  :key="keyId" class="contentmd mdReader">{{readme}}</vue-markdown>

</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs';
// import 'prismjs/components/'
// import "prismjs/themes/prism-okaidia.css";  // theme
// import 'prismjs/components/prism-go.min';  // language

import {mapGetters, mapActions} from 'vuex'


// loadLanguages(['js', 'processing', 'py', 'java', 'json', 'c', 'cpp', 'md', 'scss', 'regex', ]) 

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
    ...mapGetters(['getContent', 'getUrlofInternalContents'])
  },
  methods: {
    ...mapActions({
      setContent : 'setContent',
      setSubContent : 'setSubContent',
      setContentByObject : 'setContentByObject',
      setByUrl : 'setByUrl'
    }),
    getReadmeFromExternal(url){
      var xmlhttp;
      let _vue = this ;

      if (_vue.md_loaded){
        _vue.md_loaded = !_vue.md_loaded ;
      }
      
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

          _vue.readme = _vue.parseURL(xmlhttp.responseText, url) ;

          _vue.md_loaded = true ;
          _vue.keyId ++ ;
          _vue.$emit('mdloaded', true)

          _vue.$nextTick(() => {
            Prism.highlightAll();
            _vue.routerLinks(Array.from(_vue.$children[0].$el.childNodes));
            _vue.transformMainTitle(Array.from(_vue.$children[0].$el.childNodes));
            // _vue.createCopyCode(Array.from(_vue.$children[0].$el.childNodes));

            if (_vue.$route.params.subcontent != undefined){
              let firstTitle = _vue.readme.slice(
                _vue.readme.indexOf('#') + 2,
                _vue.readme.indexOf('\n', _vue.readme.indexOf('#'))
              );

              let subthumbnail = _vue.readme.split('![')[1].split('](')[1].split(')')[0];

              _vue.setContentByObject({
                author: _vue.getContent.author,
                url: url,
                tags: _vue.getContent.tags,
                name: firstTitle,
                id: firstTitle.trim(),
                thumbnail: subthumbnail,
                last_update : _vue.getContent.last_update,
                desc: _vue.getContent.desc
              })
            }
          })
        }
      }

      if (url != undefined){
        xmlhttp.open("GET", url, true);
      } else { // to avoid erros
        xmlhttp.open("GET", this.getContent.url, true);
      }
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
          
          let beforePath = repo_paths[repo_paths.findIndex( p => p == path) - 1];
          if (beforePath != undefined){
            if (beforePath.slice(beforePath.length - 6, beforePath.length) != 'github'){

              let repopath = path.split(')')[0];

              // case path to another repo listed in projects or courses, 'includes github.com' to be sure to target repos, not github pages
              let correspondance = credentials_paths.find(teststring => (repopath.includes(teststring.author) && repopath.includes(teststring.repo) && repopath.includes('github.com')));
                if (correspondance != undefined && !repopath.includes('pdf')){ 
                  let targetrepo = `https://raw.githubusercontent.com/${correspondance.author}/${correspondance.repo}/master/README.md`  
                
                  data = data.replace(new RegExp(repopath, 'g'), (correspondance, decalage) => {
                    if (data.substring(decalage - 2, decalage) == '](' && data.substring(decalage + correspondance.length, decalage + correspondance.length + 1) == ')'){
                      if (!this.internalLinks.includes(targetrepo)){
                        this.internalLinks.push({path: targetrepo, recursive : false});
                      }
                      return targetrepo ;
                    } else {
                      return repopath ;
                    }
                  });

                } else {
                  if (repopath.includes('http') || repopath.includes('www') || repopath.slice(0,1) == '#' || repopath.includes('pdf')){
                    // if a global url is given, we guess it's because it was wanted to show it on external source
                    // same for anchors links
                    // console.log(repopath)
                  } else {
                    if (!repopath.includes('..')){
                      if (repopath.includes('.md')){
                        let recursiveRepo = this.getContent.url.replace(/readme.md/i,repopath);

                        data = data.replace(new RegExp(repopath, 'g'), (correspondance, decalage) => {
                          if (data.substring(decalage - 2, decalage) == '](' && data.substring(decalage + correspondance.length, decalage + correspondance.length + 1) == ')'){
                            if (!this.internalLinks.includes(recursiveRepo)){
                              this.internalLinks.push({path: recursiveRepo, recursive : true});
                            }
                            return recursiveRepo ;
                          } else {
                            return repopath ;
                          }
                        });

                      } else { // else should be recursive path to images
                        //  PARSE URL FOR MARKDOWN-LIKE IMPORTS OF IMAGES
                        let image_path = repopath.split('./');
                        if (this.$route.params.subcontent != undefined){
                          var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${this.$route.params.subcontent}/${image_path[image_path.length - 1]}`;
                        } else {
                          var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${image_path[image_path.length - 1]}`;
                        }

                        data = data.replace(new RegExp(repopath, 'g'), (correspondance, decalage) => {
                            if (data.substring(decalage - 2, decalage) == ']('){
                              return newUrl ;
                            } else {
                              return repopath ;
                            }
                          });
                      }
                    }
                  }
                }
            }
          }
        } 
      })

      // PARSE URL FOR HTML IMPORTS OF IMAGES
      let img_url =  data.split('<img');
      img_url.forEach( (string) => {
          if (string.includes('src="')){
              let string_to_replace = string.split('src="')[1].split('"')[0];
              let path = string_to_replace.split('./')

              if (!path[path.length-1].includes("http") || !path[path.length-1] .includes('www')){
                if (this.$route.params.subcontent != undefined){
                  var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${this.$route.params.subcontent}/${path[path.length - 1]}`;
                } else {
                  var newUrl = `https://raw.githubusercontent.com/${author}/${repo}/master/${path[path.length - 1]}`;
                }
                
                data = data.replace(new RegExp(string_to_replace, 'g'), (correspondance, decalage) => {
                  if (data.substring(decalage - 5, decalage) == 'src="'){
                    return newUrl ;
                  } else {
                    return string_to_replace ;
                  }
                }); 
              }  
          }
      })
      return data ;
    },
    transformMainTitle(childrenArray){
      let mainTitle = childrenArray.find( node => node.localName == 'h1');
      mainTitle.innerText = mainTitle.innerText.split('_').join(' ');
    },
    routerLinks(nodesArray){
      nodesArray.forEach( (node) => {
        if (Array.from(node.childNodes).length > 0 && ['ul', 'li', 'ol', 'p'].includes(node.localName)){ // needed to avoid to much revursioin because of code sections or others unwanted
          this.routerLinks(Array.from(node.childNodes));
        
        } else {
          if (node.localName == 'a'){
            let path_test = this.internalLinks.find(link => link.path == node.href);

            // path to subrepos
            if (path_test != undefined){
              if (path_test.recursive){
                node.addEventListener('click', (event) => {
                  this.getReadmeFromExternal(path_test.path);

                  let subcontentName = path_test.path.split('/');
                  subcontentName = subcontentName[subcontentName.length - 2];

                  if (this.$route.params.subcontent){
                    this.$router.push(this.$route.path) ;
                  } else {
                    this.$router.push(this.$route.path + '/' + subcontentName.trim());
                  }
                  event.preventDefault();
                })
              } else {
                node.addEventListener('click', (event) => {
                  this.setByUrl(path_test.path);
                  this.$router.push(this.$route.path.slice(0, this.$route.path.lastIndexOf('/') + 1) + this.getContent.id)
                  event.preventDefault();
                })
              }
            }
            
            // change return home hard link to router links
            if (this.$route.params.subcontent != undefined){
              if (/..\/README.md/ig.test(node.href)){
                node.addEventListener('click', (event) => {
                  this.$router.push(this.$router.history.go(- 1));
                  event.preventDefault();
                })
              }
            }
            
            // avoid hard replacement of hash in location because we use hash mode now
            if (node.href.includes('#')){
              node.addEventListener('click', (event) => {
                  this.$router.replace(this.$route.path + '#' + node.href.split('#')[1] );
                  event.preventDefault();
                })
            }
          }
        }
      })
    },
    createCopyCode(nodesArray){
      nodesArray.filter( (node) => node.localName == 'pre').forEach( (preNode) => {
        let copyCodeButton = document.createElement('div');
        copyCodeButton.classList.add('copyCode')
        copyCodeButton.innerHTML = `<p> Copy code </p>`;
        copyCodeButton.addEventListener('click', function(event){
          let copyCodeNode = this.parentNode.children[0];
          let correspondingCodeNodes = document.querySelectorAll('code.' + copyCodeNode.className.trim());
          // Array.from(correspondingCodeNodes)
          //     .find( (codeNode) => codeNode.innerText == copyCodeNode.innerText)
          //     .select();
          document.querySelector('code.' + copyCodeNode.className.trim()).select()
          document.execCommand('copy');


        })

        preNode.appendChild(copyCodeButton);
      })
    }
  },
  watch :{
    $route(newval, oldval){
      // reload readme on return (by browser feature)
      if (newval.params.subcontent == undefined){
        this.setContent(this.$route.params.content).then( () => {
          this.getReadmeFromExternal(this.getContent.url);
        })
      }
    }
  },
  created(){
    if (this.getContent.url != undefined){
      this.getReadmeFromExternal(this.getContent.url);
    } else {
      if (this.$route.params.subcontent != undefined){
        this.setSubContent({'id' : this.$route.params.content, 'subcontent' : this.$route.params.subcontent}).then( () => {
          this.getReadmeFromExternal(this.getContent.url);
        })
      } else {
        this.setContent(this.$route.params.content).then( () => {
          this.getReadmeFromExternal(this.getContent.url);
        })
      }
    }

    // console.log(Prism)
  }
}
</script>

<style lang="scss">
@import '../../../node_modules/prismjs/themes/prism-okaidia.css';

.mdReader{

  @media(max-width:620px){
    padding:0 20px;
  }

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
    text-transform:capitalize;

    position:relative;
    margin-bottom:50px;
    margin-top:50px;

    @media(max-width:880px){
      font-size:290%;
      word-break: break-word;
    }

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

    @media(max-width:880px){
      font-size:220%;
      word-break: break-word;
    }
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

    @media(max-width:880px){
      font-size:190%;
      word-break: break-word;
    }
  }
  
  & h4{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:1.7em;
    color: #373D4A; 

    margin-bottom:20px;
    margin-top:20px;

    @media(max-width:880px){
      font-size:160%;
      word-break: break-word;
    }
  }
  
  & h5{
    text-align: left;
    font-family: 'Rubik';
    font-weight:500;
    font-size:1.4em;
    color: #373D4A; 

    margin-bottom:20px;
    margin-top:20px;

    @media(max-width:880px){
      font-size:130%;
      word-break: break-word;
    }
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
  word-break:break-word;
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
    word-break:break-word;

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
    //color: #373D4A;

    // background-color:#F8F8F8;
    border-radius:8px;
    padding:30px 40px 30px 40px;
    margin : 50px 0;
    overflow-x: scroll;
    scrollbar-color:#1C1C1C rgb(73, 80, 95);

    // &::after{
    //   // position:absolute;
    //   // bottom: 20px;
    //   // right:20px;
    //   // content: '<> Copy the code';
    //   // padding: 10px 20px;
    //   // border-radius: 8px;

    //   // text-align: center;
    //   // font-family:'Rubik';
    //   // font-size: 1em;
    //   // color: #F8F8F8;
    //   // background-color: #373D4A;
    // }

    & .copyCode {
      position: absolute;
      top:20px;
      right:20px;
      width:max-content;
      height:max-content;
      background-color:#373D4A;
      border-radius:8px;
      padding:14px 30px;

      & p {
        color:var(--color-gray01);
        font-weight:700;
        margin:0;
      }

      &:hover{
        cursor:pointer;
      }
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

.video_container{
  padding-bottom:56.25%;
  position:relative;

  & iframe {
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
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
