<template>
    <li class="tag" @click="filterTag()"> 
        <slot/>
    </li>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name : "tag",
    props : {
        category : {
            type: String,
            required : true,
            default : () => ''
        }
    },
    methods : {
        ...mapActions({
            filterContent : 'filterContent'
        }),
        filterTag(){
            this.filterContent({category : this.category, tag : this.$slots.default[0].text});
        }
    }
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
    height:60px;
    line-height: 60px;
    padding: 0 30px;

    &:hover{
        background-color: #1C1C1C;
        color: #F7F7F7;
        cursor: pointer;
    }


}
</style>