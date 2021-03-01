<template>
    <li class="tag" :class="activated ? 'activated' : '' " @click="activated ? resetTag() : filterTag()"> 
        <slot/>
    </li>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name : "tag",
    data(){
        return {
            activated:false
        }
    },
    props : {
        category : {
            type: String,
            required : true,
            default : () => ''
        }
    },
    methods : {
        ...mapActions({
            filterContent : 'filterContent',
            resetFilter : 'resetFilter'
        }),
        filterTag(){
            this.activated = !this.activated;
            this.filterContent({category : this.category, tag : this.$slots.default[0].text});
        },
        resetTag(){
            this.activated = !this.activated;
            this.resetFilter({category : this.category, tag : this.$slots.default[0].text});
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
        background-color: rgb(126, 126, 145);
        transition: background .3s ease, color .2s ease;
        color: #F7F7F7;
        cursor: pointer;
    }
}

.activated {
    background-color: #1C1C1C !important;
    color: #F7F7F7 !important;
}
</style>