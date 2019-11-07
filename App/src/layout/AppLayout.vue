<template>
  <div id="app">
     <v-header/>

      <!-- this is where the Pages are injected -->
      <div>
        <router-view></router-view>
      </div>

      <v-footer/>
  </div>
</template>

<script>
export default {
  
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
