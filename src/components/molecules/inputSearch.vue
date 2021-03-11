<template>
<div class="search">
  <input type="text" :placeholder="placeholderText" :name="name" :style="'padding-left:' + paddingPins" @click="focus()">

    <div class="flexPins" v-show="filters.length > 0">
        <input-pin
        :for="name" v-for="(filter, i) in filters" 
        :key="filter + i" 
        :category="category">{{filter}}</input-pin>
    </div>

  <ul class="predict" v-show="isThereAnyResult" >
      <tag-pin 
        v-for="(value, key) in results" 
        :key="reactiveKeys + key" 
        :tagName="key" 
        :occurences="value" 
        :category="category"
        @select="resetInput()">
        </tag-pin>
  </ul>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import tagPin from '../atoms/tagPin'
import inputPin from '../atoms/inputPin'

export default {
    name: 'InputSearch',
    components: {
        'tag-pin' : tagPin,
        'input-pin' : inputPin
    },
    data(){
        return {
            results: {},
            reactiveKeys : 'pazuh',
            paddingPins: '52px'
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
        },
        maxWidth: {
            type: [Number, String],
            required: false,
            default: () => 800
        }
    },
    methods:{
        ...mapActions({
            filterContent : 'filterContent'
        }),
        focus(){
            this.$el.classList.add('focus');
            document.addEventListener('click', (e) => {
                if (document.activeElement != this.$el.children[0]){
                    this.$el.classList.remove('focus');
                }
            })
        },
        typingInSearch(inputValue){
            if (inputValue.length >= 1){
                let filteredTags = this.getTagsList.filter( tag => {
                    let chaine = tag.toLowerCase().split(inputValue.toLowerCase()) ;
                    return chaine.length > 1 && chaine[0] == '' ;
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
        },
        resetInput(){
            this.$el.children[0].value = '';
            this.typingInSearch(this.$el.children[0].value);
        }
    },
    computed:{
        ...mapGetters(['getTagsList', 'getList', 'getCategoryContentsFiltered', 'getFilters']),
        placeholderText(){
            if (this.$slots) return 'Recherche par tags, par exemple "arduino", "processing" etc.' ;
            return this.$slots.default[0].text ;
        },
        isThereAnyResult(){
            return Object.keys(this.results).length >= 1 ;
        },
        filters(){
            return this.getFilters[this.category];
        }
    },
    mounted(){
        this.$el.children[0].oninput = (e) => {
            this.typingInSearch(this.$el.children[0].value);
        }
    },
    watch: {
        filters(oldval, newval){
            this.$nextTick( () => { // we have to wait tag are destroyed or created
                if (newval.length > 0){
                        let labelsWidth = Array.from(this.$el.children[1].children)
                            .filter( child => child.localName == 'label')
                            .reduce( (acc, curr) => {
                                return acc += curr.getBoundingClientRect().width + 15
                            }, 0);
                        this.paddingPins =  52 + labelsWidth + 'px';
                } else {
                    this.paddingPins = '52px';
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.search{
    position:relative;
    display:block;
    margin-left:auto;
    margin-right:auto;
    max-width:800px;
    
    border-radius:8px;

    &.focus{
        box-shadow: 0 0 8px 4px rgba(0,0,0,.12); 
    }

    @media (max-width: 850px) {
        max-width:80vw !important;

        input {
            min-width: unset !important;
            overflow-x:hidden;
            text-overflow: ellipsis;
        }
    }

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
        padding: 20px 20px 20px 52px;

        background-color: white;
        background: url('../../assets/icons/search.svg') no-repeat center left 16px;
        
        // border: none;
        border-radius: 8px;
        border: 1px solid #2c2c2e;

        color:var(--color-dark02);
        font-weight:500;

        &:focus{ 
            outline: none;
        }
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

    .flexPins{
        position:absolute;
        top:9px;
        left:52px;
        width:max-content;
        height:max-content;
        z-index:9;

        display:flex;
        flex-wrap: wrap;

        & > * {
            z-index:10;
            margin-right:15px;
        }
    }
}
</style>