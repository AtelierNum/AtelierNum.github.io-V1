<template>
<div class="search">
  <input type="text" :placeholder="placeholderText" :name="name">
  <ul class="predict" v-show="isThereAnyResult" >
      <tag-pin v-for="(value, key) in results" :key="reactiveKeys + key" :tagName="key" :occurences="value" :category="category"></tag-pin>
  </ul>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import tagPin from '../atoms/tagPin'

export default {
    name: 'InputSearch',
    components: {
        'tag-pin' : tagPin
    },
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
                        let qte = this.howManyContent(tag)
                        if (qte > 0){ // inutile d'afficher un tag qui n'a pas de contenus
                            this.$set(this.results, tag, qte); // set a property through vue otherwise it does not watch the change
                        }
                    }
                })

                // remove those ones which not in
                if (Object.keys(this.results).length > filteredTags.length){ 
                    Object.keys(this.results).forEach( key => {
                        if(!filteredTags.includes(key)){
                            delete this.results[key];
                            this.updateComponent(); // force change after deleting by changing the key of the component
                        }
                    })
                }
            } else {
                this.results = {}
            }
        },
        howManyContent(tag){            
            return this.getList[this.category].filter( content => content.tags.includes(tag)).length
        },
        updateComponent(){
            this.reactiveKeys = Object.keys(this.results).reduce( (acc, curr) => acc += curr.toString(), '');
        }
    },
    computed:{
        ...mapGetters(['getTagsList', 'getList', 'getCategoryContentsFiltered']),
        placeholderText(){
            if (this.$slots) return 'Dessiner une blanquette avec Processing...' ;
            return this.$slots.default[0].text ;
        },
        isThereAnyResult(){
            return Object.keys(this.results).length >= 1 ;
        },
    },
    mounted(){
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
}
</style>