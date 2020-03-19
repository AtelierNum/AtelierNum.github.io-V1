<template>
<div id ="page">

  <svg-curved content="p5"></svg-curved>


    <svg  class="test_desc" xmlns="http://www.w3.org/2000/svg" width="1027.917" height="696.966" viewBox="0 0 1027.917 696.966">
      <g id="Group_156" data-name="Group 156" transform="translate(-56 -357.489)">
        <path id="Path_165" data-name="Path 165" d="M-4794.871,11130.057c-243.148,38.48-518.707,520.771-367.411,643.055s880.741,6.842,972.594-153.922S-4551.722,11091.576-4794.871,11130.057Z" transform="translate(5261.513 -10769.759)" fill="#191a1a"/>
        <g id="Group_152" data-name="Group 152" transform="translate(0 19)">
          <text id="telierNum" transform="translate(351 529)" fill="#fff" font-size="77" font-family="AvenirNext-Bold, Avenir Next" font-weight="700"><tspan x="0" y="77">telierNum</tspan></text>
          <text id="AtelierNum_showcases_works_by_students_at_l_école_de_design_and_some_ressources_available_to_them._" data-name="AtelierNum showcases works by students at l’école de design, and some ressources available to them. " transform="translate(293 712)" fill="#fff" font-size="22" font-family="HKGrotesk-Medium, HK Grotesk" font-weight="500" opacity="0.77"><tspan x="0" y="20">AtelierNum showcases works by students at l’école de </tspan><tspan x="0" y="48">design, and some ressources available to them. </tspan></text>
          <text id="L_école_de_design_Nantes_Atlantique" data-name="L’école de design Nantes Atlantique" transform="translate(293 638)" fill="#fff" font-size="23" font-family="HKGrotesk-LightItalic, HK Grotesk" font-weight="300" font-style="italic" opacity="0.77"><tspan x="0" y="21">L’école de design Nantes Atlantique</tspan></text>
          <g id="Group_151" data-name="Group 151" transform="translate(-1194 -1097)">
            <path id="Path_7" data-name="Path 7" d="M21.9,0C4.945,0,0,4.945,0,21.9H0C0,38.86,4.945,43.8,21.9,43.8h0c16.957,0,21.9-4.945,21.9-21.9h0C43.8,4.945,38.86,0,21.9,0Z" transform="translate(1486.598 1974.402) rotate(-90)" fill="#f7f7f7"/>
            <path id="arrow-up" d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(1521 1940.994) rotate(90)"/>
          </g>
          <path id="Path_169" data-name="Path 169" d="M42.581,77,38.346,66.3h-21.1l-4,10.7H-1.078L21.791,22.484H34.573L57.211,77ZM27.951,37.037l-6.93,18.711H34.727Z" transform="translate(294 531)" fill="#fff"/>
        </g>
      </g>
    </svg>

    <div class="spacerY">
      <svg class="scroll"  width="77" height="77" viewBox="0 0 77 77">
        <g transform="translate(-922 -945)">
          <path  d="M38.5,0C8.692,0,0,8.692,0,38.5H0C0,68.308,8.692,77,38.5,77h0C68.308,77,77,68.308,77,38.5h0C77,8.692,68.308,0,38.5,0Z" transform="translate(922 945)" fill="#f7f7f7"/>
          <path  d="M17.71,11.29l-5-5a1.034,1.034,0,0,0-1.42,0l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,1,0,1.42-1.42Z" transform="translate(972.006 996) rotate(180)"/>
        </g>
      </svg>
    </div>

    
  <div/>

    <h2 class="section-title"> Projects </h2>

    <v-tag-list>
      <v-tag>Digital art</v-tag>
      <v-tag>Processing</v-tag>
      <v-tag>P5</v-tag>
      <v-tag>Pure data</v-tag>
    </v-tag-list>
    

    <v-grid :cols="3">
      <v-projectCard v-for="(project, i) in pages.projects.slice(0, max.projects)" :key="i" 
        r_action="projects"
        :title="project.name"
        :id="project.id"
        :desc="project.desc"
        :thumbnailUrl="project.thumbnail"
        :tags="project.tags">
        </v-projectCard>
    </v-grid>

    <v-button :outlined="true" label="projects" :disabled="disabled.projects" @click.native="more('projects')">Load more</v-button>
    

    <div class="spacer_height"></div>     


    <h2 class="section-title"> Resources </h2>

    <v-grid :cols="3" >
      <v-projectCard v-for="(ressource, i) in pages.ressources.slice(0, max.ressources)" :key="i" 
        class="small"
        r_action="ressources"
        :title="ressource.name"
        :id="ressource.id"
        :desc="ressource.desc"
        :thumbnailUrl="ressource.thumbnail"
        :tags="ressource.tags">
      </v-projectCard>
    </v-grid>

    <v-button label="ressources" :outlined="true" :disabled="disabled.ressources" @click.native="more('ressources')">Load more</v-button>
    
      
    <div class="spacer_height"></div>     

    <h2 class="section-title"> Courses </h2>

    <v-tag-list>
      <v-tag>P5</v-tag>
      <v-tag>Digital art</v-tag>
      <v-tag>Processing</v-tag>
      <v-tag>Pure data</v-tag>
    </v-tag-list>

    <v-grid>
      <v-projectCard v-for="(course, i) in pages.courses.slice(0, max.courses)" :key="i" 
        class="long"
        r_action="courses"
        :title="course.name"
        :id="course.id"
        :desc="course.desc"
        :thumbnailUrl="course.thumbnail"
        :tags="course.tags">
      </v-projectCard>
    </v-grid>

    <v-button label="courses" :outlined="true" :disabled="disabled.courses" @click.native="more('courses')">Load more</v-button>
    
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
      max: {
        courses: 3,
        ressources: 3,
        projects: 3
      },
      disabled: {
        courses: false,
        ressources: false,
        projects: false
      }
    }
  },
  computed: {
    pages() {
      return Pages
    },
  },
  methods: {
    more(type){     
      this.max[type] += 3;
      if (this.max[type] > this.pages[type].length){
        this.disabled[type] = true ;
      }
    }
  }
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
}

</style>
