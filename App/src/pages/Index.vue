<template>
<div id ="page">

  <svg-curved content="p5"></svg-curved>

    <section>
      <div class="alternativeShape">
        <h1>AtelierNum</h1>
        <h2>L’	&#201;cole de design Nantes Atlantique</h2>
        <p>AtelierNum regroupe des travaux d’étudiants de l’ &#201;cole de design et quelques ressources à leur disposition.</p>
      </div>
      <svg class="scroll"  width="77" height="77" viewBox="0 0 77 77">
        <g transform="translate(-922 -945)">
          <path  d="M38.5,0C8.692,0,0,8.692,0,38.5H0C0,68.308,8.692,77,38.5,77h0C68.308,77,77,68.308,77,38.5h0C77,8.692,68.308,0,38.5,0Z" transform="translate(922 945)" fill="#f7f7f7"/>
          <path  d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(972.006 996) rotate(180)"/>
        </g>
      </svg>
    </section>

    <v-spacer height="5%" class="spacerY"></v-spacer>

    <h2 class="section-title"> 
      <router-link to="/projects">
        Projets 
      </router-link>
    </h2>

    <input-search name="projectSearch" category="projects"></input-search>
    <!-- <v-tag-list>
      <v-tag v-for="tag in getTagsList" :key="'projects-' + tag" category="projects">{{tag}}</v-tag>
    </v-tag-list> -->
    

    <v-grid :cols="3">
      <v-projectCard v-for="(project, i) in sortedContentOrNot('projects')" :key="i" 
        class="tall"
        r_action="projects"
        :title="project.name"
        :id="project.id"
        :desc="project.desc"
        :thumbnailUrl="project.thumbnail"
        :tags="project.tags">
        </v-projectCard>
    </v-grid>

    <v-button :outlined="true" label="projects" :disabled="disabled.projects" @click.native="more('projects')"> Plus </v-button>
          
    <v-spacer width="100%" height="300px"></v-spacer>

    
    <h2 class="section-title"> 
      <router-link to="/courses">
        Cours 
      </router-link>
    </h2>

    <!-- <v-tag-list>
      <v-tag v-for="tag in getTagsList" :key="'courses-' + tag" category="courses">{{tag}}</v-tag>
    </v-tag-list> -->

    <input-search name="projectSearch" category="courses"></input-search>

    <v-grid :cols=" windowWidth > 800 ? 1 : 3">
      <v-projectCard v-for="(course, i) in sortedContentOrNot('courses')" :key="i" 
        :class=" windowWidth > 620 ? 'long' : 'tall'"
        r_action="courses"
        :title="course.name"
        :id="course.id"
        :desc="course.desc"
        :thumbnailUrl="course.thumbnail"
        :tags="course.tags">
      </v-projectCard>
    </v-grid>

    <v-button label="courses" :outlined="true" :disabled="disabled.courses" @click.native="more('courses')"> Plus </v-button>


    <v-spacer width="100%" height="300px"></v-spacer>   


    <h2 class="section-title"> 
      <router-link to="/ressources">
        Ressources 
      </router-link>
    </h2>

    <!-- <v-tag-list>
      <v-tag v-for="tag in getTagsList" :key="'ressources-' +tag" category="courses">{{tag}}</v-tag>
    </v-tag-list> -->

    <input-search name="projectSearch" category="ressources"></input-search>

    <v-grid :cols="3" class="smallGrid">
      <v-projectCard v-for="(ressource, i) in sortedContentOrNot('ressources')" :key="i" 
        class="small"
        r_action="ressources"
        :title="ressource.name"
        :id="ressource.id"
        :desc="ressource.desc"
        :thumbnailUrl="ressource.thumbnail"
        :externalLink="ressource.url"
        :tags="ressource.tags">
      </v-projectCard>
    </v-grid>

    <v-button label="ressources" :outlined="true" :disabled="disabled.ressources" @click.native="more('ressources')"> Plus </v-button>
    
</div>
</template>

<script>
import card_project from '@/components/molecules/card_project'
import svgCurved from '@/components/atoms/svgCurved'
import Button from '@/components/atoms/button'
import spacer from '@/components/atoms/spacer'
import inputSearch from '@/components/molecules/inputSearch'
import {mapGetters} from 'vuex'

export default {
    components : {
        'v-projectCard' : card_project,
        'svg-curved' : svgCurved,
        'v-button' : Button,
        'v-spacer' : spacer,
        'input-search' : inputSearch
  },
  data(){
    return {
      max: {
        courses: 3,
        ressources: 3,
        projects: 3
      },
      disabled: {
        courses: false,
        ressources: false,
        projects: false
      },
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters(['getListByDate', 'getTagsList', 'getCategoryContentsFiltered', 'getFilters']),
    
  },
  methods: {
    more(type){     
      this.max[type] += 3;
      if (this.max[type] > this.getListByDate[type].length){
        this.disabled[type] = true ;
      }
    },
    githubAteliernum(){
      window.open('https://github.com/AtelierNum', '_blank');
    },
    sortedContentOrNot(category){
      if (this.getFilters[category].length >= 1){
        return this.getCategoryContentsFiltered[category];
      } else {
        return this.getListByDate[category].slice(0, this.max[category])
      }
    }
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })
  }
}
</script>

<style scoped lang="scss">

.section-title{
  max-width: 1150px;
  margin:auto;
  font-size: 40px;
  text-align:center;
  font-family: 'Open Sans', sans-serif;
  color:#1C1C1C;
}

section{
  position: absolute;
  top:20vw;
  left:0;
  width:100%;

  .alternativeShape{
    background-color: #191a1a;
    margin-left:50px;
    padding:220px 20vw 180px 12vw;
    mask: url('../assets/masks/mask_1.svg') no-repeat;
    mask-size:contain;
    -webkit-mask-size:contain;
    -ms-mask-size:contain;
    width: 70vw;
    max-width:1028px;
    max-height:697px;

    h1 {
      font-family:'Rubik';
      font-weight: 700;
      font-size:11vw;
      color: #fff;

      & + h2 {
        font-family:'Open Sans';
        font-weight: 300;
        font-size:1.2em;
        font-style:italic;
        color: #fff;

        & + p {
          margin-top:50px;
          font-family:'Open Sans';
          font-weight: 300;
          font-size:1.2em;
          color: #fff;
        }
      }
    }

    @media(max-width:1220px){
      padding:15vw 20vw 180px 14vw;
    }

    @media(min-width:800px){
      h1{ font-size:78px }
      h2{ font-size:24px }
      p { font-size:22px }

    }
  }

  @media(max-width: 1000px){
      top:0;
      z-index:-999;
      
      .alternativeShape{
        margin-left:0;
        width:100%;
        mask:url('../assets/masks/top_content_mask.svg');
        mask-position-y:bottom;
        -webkit-mask-position-y:bottom;
        -ms-mask-position-y:bottom;
        mask-size:cover;
        -webkit-mask-size:cover;
        -ms-mask-size:cover;
        padding-top:45vh;
        padding-bottom:230px;
        max-height:unset;
      }

      .scroll{
        position:absolute;
        bottom:90px;
        left:calc(50% - 54px);
      }
    }


  .scroll{
      display: block;
      margin:0 auto;
      

      @media(max-width:1200px){
        width:5vw;
        min-width:44px;
      }
  }

}

.spacerY{
  min-height:450px;
  display:flex;
  align-items: center;
  justify-content: center;

  

  @media(max-width:880px){
    min-height:60vh;
  }
  @media(max-width:520px){
    min-height:70vh;
  }
  @media(max-width:5420px){
    min-height:90vh;
  }
}

</style>
