<template>
    <li class="tag"> 
        <a href="">
            <slot/>
        </a> 
    </li>
</template>

<script>
export default {
    name : "tag"
}
</script>

<style lang="scss" scoped>
.tag{
    list-style: none;
    background: #F7F7F7;
    border-radius: 12px;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    margin: 5px;
    transition: background .3s ease, color .2s ease;
    &:hover{
        background-color: #1C1C1C;
        color: #F7F7F7;
    }
    a{
        height:60px;
        line-height: 60px;
        padding: 0 30px;
    }
}
</style>