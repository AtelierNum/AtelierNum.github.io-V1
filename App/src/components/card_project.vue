<template>
    <article class="card_project">
     
     
     
    </article>
</template>

<script>
import image from '@/components/image'

export default {
  components : {
    'v-image' : image
  }
}
</script>

<style lang="scss" scoped>
.card_project{
    max-width: 350px;
    border: 1px solid red;

    &_image{
        
    }
    &_bottom{
        height:200px;
    }
}
</style>