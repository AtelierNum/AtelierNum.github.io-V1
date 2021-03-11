<template>
    <ul class="tag-list">
      <slot/>
    </ul>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.tag-list{
  display: flex;
  max-width: 1150px;
  justify-content: center;
  margin: 50px auto 50px;
  flex-wrap: wrap;
}
</style>