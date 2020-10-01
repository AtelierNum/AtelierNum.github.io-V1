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
  margin: 120px auto 80px auto;
  &.grid-3{
    grid-template-columns: repeat(3,1fr);
    justify-content: center;
  }
  &.grid-2{
    grid-template-columns: repeat(2,1fr);
  }
}

@media (max-width:1300px){
  .grid{
    grid-gap:20px;
    height:max-content;
    max-width: 80vw;

    &.grid-3{
        grid-template-columns: repeat(1,1fr) !important;
        grid-gap:60px;

        &.smallGrid{
          max-width:70vw;
        }
    }
  }
}

@media(max-width:480px){
  .smallGrid{
    max-width:90vw !important;
  }
}
</style>