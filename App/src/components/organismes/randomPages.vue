<template>
    <div class="randomPages">

      <h2>{{title}}</h2>

      <div>
        <card-project :has_action="true" r_action="course" v-for="(course, i) in pages" :key="i"
        class="long inversed" 
        r-action="courses"
        :title="course.name"
        :id="course.id"
        :desc="course.desc"
        :tags="course.tags"></card-project>
      </div>

    </div>
</template>

<script>
  import card_project from '@/components/molecules/card_project'
  import Pages from '../../assets/coursesList.json'

  export default {
    name: 'RandomPages',
    components:{
        'card-project': card_project
    },
    props: {
      title: {
          type: String,
          default : () => 'Random pages',
          required:true
      },
      type: {
          type: String,
          default: () => 'page',
          required: true
      }
    },
    computed:{
      path(){
        return this.$route.name
      },
      pages() {

        let keycourses = Pages.courses ;
        let courses = []

        courses.push(keycourses[Math.floor(Math.random() * keycourses.length)])
        courses.push(keycourses[Math.floor(Math.random() * keycourses.length)])   

        return courses;
      }
    }
  }
</script>

<style lang="scss">

.randomPages{
  width:90%;
  margin-left:5%;

  h2 {
    text-align: center;
    font-family: 'Rubik';
    font-weight:600;
    font-size:2.6em;
    letter-spacing: 0;
    color: #373D4A;

    margin-bottom:80px;
  }

  > div {
    display:grid;
    grid-template-columns: auto auto ;
    grid-column-gap:5%;
  }
}

</style>