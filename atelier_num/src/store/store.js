import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.get('/data/globalList.json').then(response => {
                // console.log(response.data);
                state.list = response.data ;
                state.tagsFilters = response.data.tags ;
              })
              .catch(error => console.log(error))


Vue.use(Vuex)

const state = {
  list : {
    'projects':[],
    'ressources':[],
    'courses':[],
    'tags':[]
  },
  current_content : {},
  filters: {
    courses : [],
    ressources : [],
    projects : []
  },
  tagsFilters : []
}


const mutations = {
  generateJSON(state, payload){
    state.list = Object.assign({}, payload);
  },
  setContent(state, payload){
    for (let type of [state.list.projects, state.list.courses]) {
      let plop = type.find( content => content.id == payload );

      if (plop != undefined){
        state.current_content = plop;
        return ;
      }
    }
  },
  setByUrl(state, payload){
    for (let type of [state.list.projects, state.list.courses]) {
      let plop = type.find( content => content.url == payload );
      
      if (plop != undefined){
        state.current_content = plop;

        return ;
      }
    }
  },
  setSubContent(state, payload){
    for (let type of [state.list.projects, state.list.courses]) {
      let plop = type.find( content => content.id == payload.id );
      
      if (plop != undefined){
        state.current_content = plop;
        let newurl = state.current_content.url.split('/')
        newurl.splice(newurl.length - 1, 0, payload.subcontent)
        state.current_content.url = newurl.join('/')

        return ;
      }
    }
  },
  setContentByObject(state, payload){
    if (payload.url != undefined 
      && payload.thumbnail != undefined 
      && payload.author != undefined 
      && payload.name != undefined 
      && payload.tags != undefined
      && payload.id != undefined
      && payload.last_update != undefined
      && payload.desc != undefined){
        state.current_content = payload ;
      }
  },
  filterContent(state, payload){ // update LIST of tag
    if (!state.filters[payload.category].includes(payload.tag)){
      state.filters[payload.category].push(payload.tag) ;
    } else {
      state.filters[payload.category].splice(
        state.filters[payload.category].findIndex(filter => filter == payload.tag),
        1
      );
    }
  },
  updateFilteredContent(state, payload){ // update CONTENT synch to list of tags
    state.list[payload.category] = listJSON[payload.category] ;

    for (let filter of state.filters[payload.category]){
      state.list[payload.category] = state.list[payload.category].filter( content => content.tags.includes(filter))
    }
  },
  resetFilter(state){
    state.filters = {
      courses : [],
      ressources : [],
      projects : []
    }
  }
}

const actions = {
  generateJSON(context, payload){
    context.commit('generateJSON', payload);
  },
  setContent(context, payload){
    context.commit('setContent', payload);
  },
  setSubContent(context, payload){
    context.commit('setSubContent', payload);
  },
  setContentByObject(context, payload){
    context.commit('setContentByObject', payload)
  },
  filterContent(context, payload){
    context.commit('filterContent', payload);
    // context.commit('updateFilteredContent', payload);
  },
  resetFilter(context, payload){
    context.commit('resetFilter', payload);
    context.commit('updateFilteredContent', payload.category);
  },
  setByUrl(context, payload){
    context.commit('setByUrl', payload);
  }
}

const getters = {
  getContent(state){
      return state.current_content ;
  },
  getList(state){
    return state.list ;
  },
  getListByDate(state){
    return Object.fromEntries(Object.entries(state.list).map(([key, value]) => {
      if (key != 'tags'){
        return [key, value.sort((a,b) => { // range par date décroissante
          let dateA = a.last_update.split('/').reverse() ; // last_update est écrite comme suit : dd/mm/yy
          let dateB = b.last_update.split('/').reverse();
          return new Date(dateB[0] + 2000, dateB[1], dateB[2]).valueOf() - new Date(dateA[0] + 2000, dateA[1], dateA[2]).valueOf(); // il faut donc ajouter 2000 à yy
        })]
      } else {
        return [key,value] ; // on renvoie la paire key, value pour recréer un object grâce à Object.fromEntries.
      } // Object.fromEntries récupère les paires [key,value] dans le tableau Object.entries, lui même crée à partir des "entrées" key,values de l'objet state.list
    })) ;

  },
  getUrlofInternalContents(state){
    return [
      ...state.list.projects.map( project => project.url),
      ...state.list.courses.map( course => course.url)
    ]
  },
  getTagsList(state){
    return state.tagsFilters;
  },
  getFilters(state){
    return state.filters;
  },
  getCategoryContentsFiltered(state){
    let filteredContents = {}
    for (let category in state.list){
      if (category != 'tags'){
        filteredContents[category] = state.list[category].filter( content => {
          //return content.tags.some( tag => state.filters[category].includes(tag))
          return state.filters[category].every(tag => content.tags.includes(tag));
        })
        console.log(filteredContents[category])

        //order by date 
        filteredContents[category].sort((a,b) => {
          let dateA = a.last_update.split('/').reverse() ; // last_update est écrite comme suit : dd/mm/yy
          let dateB = b.last_update.split('/').reverse();
          return new Date(dateB[0] + 2000, dateB[1], dateB[2]).valueOf() - new Date(dateA[0] + 2000, dateA[1], dateA[2]).valueOf();
        })
      }
    }

    return filteredContents ;
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


