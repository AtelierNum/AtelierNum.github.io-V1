<template>
  <div class="loader"></div>
</template>

<script>
export default {
name:'loader'
}
</script>

<style scoped lang="scss">
.loader{
    position:relative;
    width:100%;
    height:1em;
    background-color: var(--color-gray01);
    box-shadow:0 2px 2px 2px rgba(0,0,0,.02);
    border-radius:4px;
    overflow:hidden;
    margin: 12px 0;

    &::before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(to right, transparent 0%, rgb(240, 240, 247) 50%, transparent 100%);
        animation: load 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }

    @keyframes load {
        from {
            left: -150px;
        }
        to   {
            left: 100%;
        }
    }
}
</style>