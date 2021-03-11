<template>
    <li class="tagPin" @click="filterTag(tagName)" v-if="isAlreadyChecked">
          <p>{{tagName}}</p>
          <p>{{occurences}}</p>
    </li>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'TagPin',
    props: {
        tagName: {
            type: String,
            required: true
        },
        occurences: {
            type: [String, Number],
            required: true
        },
        category: {
            type: String,
            required: true
        },
        inputPin: {
            type: Boolean
        }
    },
    methods:{
        ...mapActions({
            filterContent : 'filterContent'
        }),
        filterTag(tag){
            this.filterContent({category: this.category, tag: tag});
            this.$emit('select');
        }
    },
    computed: {
        ...mapGetters(['getCategoryContentsFiltered', 'getFilters']),
        isAlreadyChecked(){
            return !this.getFilters[this.category].includes(this.tagName) ; // hiding it if it's already checked because it's displayed elsewhere
        }
    }
}
</script>

<style scoped lang="scss">
.tagPin{
    width:max-content;
    height:max-content;
    padding: 15px 20px;
    margin-right:30px;
    margin-bottom:30px;

    box-shadow: 0 0 8px 4px rgba(0,0,0,.04); 
    border: none;
    border-radius: 8px;
    background-color:var(--color-gray01);
    transition: .3s ease-out ;

    &:hover{
        cursor:pointer;
        background-color: #e3e4ec;
        box-shadow: 0 0 8px 4px rgba(0,0,0,.08);
        transition: .3s ease-out ; 
    }
    

    p{
        display: inline;
        color:var(--color-dark01);
        font-weight:600;
        font-family: 'Open Sans', sans-serif;

        &:last-child{
            margin-left:20px;
            color:#9ea2aa;
        }
    }
}
</style>