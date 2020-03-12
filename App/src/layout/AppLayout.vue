<template>
  <div id="app">
     <v-header/>

      <!-- this is where the Pages are injected -->
      <div>
        <router-view></router-view>
      </div>

      <random-pages v-if="whichPage.page" :title="whichPage.title" :type="whichPage.type"></random-pages>

      <v-footer/>
  </div>
</template>

<script>
import randomPages from '@/components/organismes/randomPages'
export default {
  components:{
    'random-pages' : randomPages
  },
  computed:{
    whichPage(){
      if (this.$route.path == '/course' || this.$route.path == '/project'){
        return {
          page: true,
          title: 'Other ' + this.$route.path.split('/')[1] + 's',
          type: this.$route.path
        }
      } else {
        return {
          page: false,
          title: '',
          type: ''
        }
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

.scroll{
  display: block;
  margin: 100px auto 200px;
}

a{
  color: inherit;
  text-decoration: none;
}

</style>
