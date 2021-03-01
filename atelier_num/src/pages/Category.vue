<template>
  <div id="page">
    <svg-curved content="p5"></svg-curved>

    <h2 class="section-title">{{category_resume[$route.name].title}}</h2>

    <p>{{category_resume[$route.name].excerpt}}</p>
   
}}
    <input-search name="projectSearch" :category="$route.name"></input-search>

    <v-grid :cols=" windowWidth < 800 ? 1 : 3">
      <v-projectCard
        class="tall"
        v-for="(content, i) in getListByDate[$route.name].slice(0, max)"
        :key="i"
        :r_action="$route.name"
        :title="content.name"
        :id="content.id"
        :desc="content.desc"
        :thumbnailUrl="content.thumbnail"
        :tags="content.tags"
        :externalLink=" $route.name == 'ressources' ? content.url : ''"
      ></v-projectCard>
    </v-grid>

    <div v-show="getListByDate[$route.name].length == 0 ? true : false" class="placeholder_nocards">
      <img src="@/../public/img/roi_loth_gif.gif" alt="citation latine du roi loth, kaamelott">
      <p> Ce qui ne veut rien dire, mais et si on essayait de retirer un filtre ?</p>
    </div>

    <v-button v-show="isDisplayed" :outlined="true" :label="$route.name"  @click.native="more()">Plus</v-button>

  </div>
</template>

<script>
import card_project from "@/components/molecules/card_project";
import svgCurved from "@/components/atoms/svgCurved";
import Button from "@/components/atoms/button";
import inputSearch from '@/components/molecules/inputSearch'

import { mapGetters } from 'vuex';

export default {
  components: {
    "v-projectCard": card_project,
    "svg-curved": svgCurved,
    "v-button": Button,
    'input-search' : inputSearch
  },
  data() {
    return {
      category_resume: {
        projects: {
          title: "Projets",
          excerpt: "Vous pourrez trouver ici des rendus réalisés par les étudiants dans le cadre de cours ou workshops dispensés à l'atelier "
        },
        courses: {
          title: "Cours",
          excerpt: "Cette catégorie centralise des supports de cours et des ressouces internes à l'atelier sur divers sujets."
        },
        ressources: {
          title: "Ressources",
          excerpt: "Cette catégorie regroupe des ressources externes sélectionnées avec soin."
        }
      },
      max: 12,
      isDisplayed : true,
      windowWidth: window.innerWidth
      
    };
  },
  computed: {
    ...mapGetters(['getTagsList', 'getListByDate'])
  },
  methods:{
    more(){     
      this.max += 3;
      if (this.max > this.getListByDate[this.$route.name].length){
        this.isDisplayed = false ;
      }
    }
  },
  mounted(){
    if (this.getListByDate[this.$route.name].length < this.max){
      this.isDisplayed = false;
    }
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })

    console.log(this.$route)
  }
};
</script>

<style lang="scss">
.placeholder_nocards{
  margin-left:auto;
  margin-right:auto;
  text-align:center;

  display:inline_block;
  max-width:max-content;
  padding:50px 50px;
  // background: linear-gradient(to bottom, #ffffff 30% , #F7F7F7);
  background-color: #F7F7F7;
  border-radius:12px;

  & p {
    margin-top:30px;
    font-family: 'Open Sans';
    font-size:18px;
    font-weight:400;
    color:rgb(131, 130, 138);
    max-width:280px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

.spacer_height {
  height: 300px;
  width: 100%;
}

.section-title {
  max-width: 1150px;
  margin: auto;
  font-size: 40px;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  color: #1c1c1c;

  text-transform: capitalize;

  & + p , & + p + p{
    display: block;
    margin: 30px auto 50px auto;
    width: 70%;
    max-width: 900px;
    text-align: center;

    font-size: 20px;
    font-weight: 300;
    font-family: "Open Sans";
    color: var(--color-dark02);
  }
}

input {
  display: block;
  margin: 50px auto;
  padding: 20px 30px;
  width: 300px;

  border-radius: 8px;
  background-color: var(--color-gray01);
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.08);

  border: none;

  &:hover {
    cursor: not-allowed;
  }

  &::before {
    content: " ";
    position: relative;
    width: 20px;
    height: 20px;

    background: var(-color-dark02);
  }
}
</style>
