<template>
    <div :class="classes" >
        <slot/>
    </div>
</template>

<script>
export default {
    props : {
        cols : {
            type : Number,
            default : 1
        }
    },
    computed : {
        classes(){
            return ['grid',`grid-${this.cols}`]
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>