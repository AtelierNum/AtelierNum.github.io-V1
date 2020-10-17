<template>
  <label>
        {{filter}}
        <button @click="deleteFilter()"></button>
  </label>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'InputPin',
    props:{
        category: {
            type: String,
            required: true
        }
    },
    computed: {
        filter(){
            return this.$slots.default[0].text;
        }
    },
    methods: {
        ...mapActions({
            filterContent: 'filterContent'
        }),
        deleteFilter(){
            this.filterContent({category: this.category, tag: this.filter});
        }
    }
}
</script>

<style scoped lang="scss">
    label{
        width:max-content;
        height:max-content;
        display: flex;
        align-items:center;
        padding:10px 15px;

        background-color:var(--color-gray01);
        box-shadow: 0 0 8px 0 rgba(0,0,0,.02); 
        border-radius:8px;

        font-weight:600;
        font-family: 'Open Sans';

        &:hover{
            box-shadow: 0 0 4px 0 rgba(0,0,0,.08); 
        }


        button{
            width:20px;
            height:20px;
            margin-left:8px;
            background: url('../../assets/icons/x-circle.svg') no-repeat center;
            background-size:contain;
            border:none;

            &:hover{
                cursor:pointer;
            }
        }
    }
</style>