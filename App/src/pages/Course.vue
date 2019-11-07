<template>
<div id ="page">

  <svg-curved content="image" src="https://source.unsplash.com/random"></svg-curved>
    
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'

export default {
  name: 'CoursePage',
  components:{
    'svg-curved' : svgCurved
  }
}
</script>

<style lang="scss">


</style>
