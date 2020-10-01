<template>
<div class="search">
  <input type="text" :placeholder="placeholderText" :name="name">
  <ul class="predict" v-show="isThereAnyResult" >
      <li v-for="(value, key) in results" :key="reactiveKeys + key" class="tagPin" >
          <p>{{key}}</p>
          <p>{{value}}</p>
      </li>
  </ul>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'InputSearch',
    data(){
        return {
            results: {},
            reactiveKeys : 'pazuh'
        }
    },
    props:{
        name: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        }
    },
    methods:{
        ...mapActions({
            filterContent : 'filterContent'
        }),
        typingInSearch(e, inputValue){
            if (inputValue.length >= 1){
                let filteredTags = this.getTagsList.filter( tag => {
                    return tag.split(inputValue).length > 1
                })

                //add new tags to the list
                filteredTags.forEach( tag => {
                    if(!Object.keys(this.results).includes(tag)){
                        this.$set(this.results, tag, 3);
                    }
                })

                // remove those ones which not in
                if (Object.keys(this.results).length > filteredTags.length){ 
                    Object.keys(this.results).forEach( key => {
                        if(!filteredTags.includes(key)){
                            delete this.results[key];
                            this.updateComponent();
                        }
                    })
                }
            } else {
                this.results = {}
            }
        },
        filterTag(result, i){
            console.log(result, i)
        },
        updateComponent(){
            this.reactiveKeys = Object.keys(this.results).reduce( (acc, curr) => acc += curr.toString(), '');
        }
    },
    computed:{
        ...mapGetters(['getTagsList']),
        placeholderText(){
            if (this.$slots) return 'Dessiner une blanquette avec Processing' ;
            return this.$slots.default[0].text ;
        },
        isThereAnyResult(){
            return Object.keys(this.results).length >= 1 ;
        },
    },
    mounted(){
        console.log(this)
        this.$el.children[0].oninput = (e) => {
            this.typingInSearch(e, this.$el.children[0].value);
        }
    }
}
</script>

<style scoped lang="scss">
.search{
    display:block;
    margin-left:auto;
    margin-right:auto;
    max-width:800px;

    box-shadow: 0 0 8px 4px rgba(0,0,0,.12); 
    border-radius:8px;

    input{
        position:relative;
        z-index: 2;
        display:block;
        width:100%;
        min-width:max-content;
        height: max-content;

        margin-top:50px;
        margin-left:auto;
        margin-right:auto;
        padding: 15px 20px 15px 52px;

        background-color: white;
        background: url('../../assets/icons/search.svg') no-repeat center left 16px;
        
        border: none;
        border-radius: 8px;

        color:var(--color-dark02);
        font-weight:500;
    }

    ul {
        position:relative;
        z-index:1;
        width:100%;
        display:flex;
        flex-flow: wrap;
        padding:20px;
        // transform: translateY(-10px);

        background-color:var(--color-gray01);
        // box-shadow: 0 3px 8px 4px rgba(0,0,0,.12); 
        border: none;
        border-radius: 1px 1px 8px 8px;
    }

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

        &:hover{
            cursor:pointer;
            box-shadow: 0 0 8px 4px rgba(0,0,0,.08); 
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
}
</style>