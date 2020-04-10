<template>
<div id ="page">

  <svg-curved content="p5"></svg-curved>


    <h2 class="section-title"> {{category_resume[$route.name].title}} </h2>

    <p>{{category_resume[$route.name].excerpt}}</p>

    <!-- <input type="text" v-model="keyterms" placeholder="This feature will be avalaible soon "> -->

    <v-tag-list>
      <v-tag v-for="tag in tags.projects" :key="'projects-' + tag" category="projects">{{tag}}</v-tag>
    </v-tag-list>
    

    <v-grid :cols="3">
      <v-projectCard v-for="(content, i) in pages[$route.name]" :key="i" 
        :r_action="$route.name"
        :title="content.name"
        :id="content.id"
        :desc="content.desc"
        :thumbnailUrl="content.thumbnail"
        :tags="content.tags">
        </v-projectCard>
    </v-grid>

    <!-- <v-button :outlined="true" label="projects" :disabled="disabled.projects" @click.native="more('projects')">Load more</v-button>
     -->
    
</div>
</template>

<script>
import card_project from '@/components/molecules/card_project'
import svgCurved from '@/components/atoms/svgCurved'
import Button from '@/components/atoms/button'
import Pages from '../assets/globalList.json'

export default {
    components : {
        'v-projectCard' : card_project,
        'svg-curved' : svgCurved,
        'v-button' : Button
  },
  data(){
    return {
      category_resume: {
        projects :{
          title : "Projets",
          excerpt: "Voici la description d'une catégorie. Il paraitrait que le covid peut s'annuler si l'on se frotte des oignons pelés sous l'aisselles après s'être préalablement frotté celles-ci avec du papier à poncer à faible grain. Les propriétés analphogésiques des particules ainsi formées créent une protection antalgisante face à l'agression sans scrupule du virus sur nos pauvres petites cellules. ",
        },
        courses :{
          title : "Cours",
          excerpt: "Voici la description d'une catégorie. Il paraitrait que le covid peut s'annuler si l'on se frotte des oignons pelés sous l'aisselles après s'être préalablement frotté celles-ci avec du papier à poncer à faible grain. Les propriétés analphogésiques des particules ainsi formées créent une protection antalgisante face à l'agression sans scrupule du virus sur nos pauvres petites cellules. ",
        },
        projects :{
          title : "Ressources",
          excerpt: "Voici la description d'une catégorie. Il paraitrait que le covid peut s'annuler si l'on se frotte des oignons pelés sous l'aisselles après s'être préalablement frotté celles-ci avec du papier à poncer à faible grain. Les propriétés analphogésiques des particules ainsi formées créent une protection antalgisante face à l'agression sans scrupule du virus sur nos pauvres petites cellules. ",
        }
      },
      tags : {
        projects : ['P5', 'Digital Art', 'Processing', 'P5JS', 'FR'],
        courses : ['P5', 'Generative art', 'Processing', 'p5js', 'FR'],
        ressources : ['P5', 'Digital Art', 'Processing', 'p5js', 'EN']
      }
    }
  },
  computed: {
    pages() {
      return Pages
    },
    category(){
        return {
            title: this
        }
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Rubik:300,400,500,500i,700&display=swap');
*,*:before,*:after{
  box-sizing: border-box;
  padding: 0;
  margin:0;
}

.test_desc{
  position: absolute;
  top: 340px;
  left: 50px;
}

.spacerY{
  height:20%;
  min-height:450px;
  display:flex;
  align-items: center;
  justify-content: center;

  .scroll{
    display: block;
    margin:0;
  }
}

.grid{
  max-width: 1150px;
  display: grid;
  grid-template-columns: repeat(1,1fr);
  grid-gap: 45px;
  margin: 120px auto 300px auto;
  &.grid-3{
    grid-template-columns: repeat(3,1fr);
    @media screen and (max-width: 600px){
      grid-template-columns: repeat(1,1fr);
      max-width: 80vw;
    }
  }
  &.grid-2{
    grid-template-columns: repeat(2,1fr);
  }
}



a{
  color: inherit;
  text-decoration: none;
}

.spacer_height{
  height:300px;
  width:100%;
}

.section-title{
  max-width: 1150px;
  margin:auto;
  font-size: 40px;
  text-align:center;
  font-family: 'Open Sans', sans-serif;
  color:#1C1C1C;

  text-transform: capitalize;

  & + p{
      display:block;
      margin: 30px auto 230px auto;
      width:70%;
      max-width:900px;
      text-align:center;

      font-size:20px;
      font-weight:300;
      font-family: 'Open Sans';
      color: var(--color-dark02);
  }
}

input {
    display:block;
    margin:50px auto;
    padding:20px 30px;
    width:300px;

    border-radius:8px;
    background-color:var(--color-gray01);
    box-shadow: 1px 4px 12px rgba(0,0,0,.08);

    border:none;

    &:hover{
        cursor:not-allowed;
    }

    &::before{
        content: ' ';
        position:relative;
        width:20px;
        height:20px;

        background:  var(-color-dark02);
    }
}

</style>
