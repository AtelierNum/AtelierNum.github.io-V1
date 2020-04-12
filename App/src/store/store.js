import Vue from 'vue'
import Vuex from 'vuex'
import listJSON from '../assets/globalList.json'


Vue.use(Vuex)

const state = {
  list : Object.assign({}, listJSON),
  current_content : {},
  filters: {
    courses : [],
    ressources : [],
    projects : []
  },
  tagsFilters : Object.assign({}, listJSON.tags)
}


const mutations = {
  setContent(state, payload){
    for (let type of [state.list.projects, state.list.courses]) {
      let plop = type.find( content => content.id == payload );

      if (plop != undefined){
        state.current_content = plop;
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
  setByUrl(state, payload){
    for (let type of [state.list.projects, state.list.courses]) {
      let plop = type.find( content => content.url == payload );

      if (plop != undefined){
        state.current_content = plop;
        return ;
      }
    }
  },
  filterContent(state, payload){
    if (!state.filters[payload.category].includes(payload.tag)){
      state.filters[payload.category].push(payload.tag) ;
    }
  },
  updateFilteredContent(state, payload){
    state.list[payload] = listJSON[payload] ;

      for (let filter of state.filters[payload]){
        state.list[payload] = state.list[payload].filter( content => content.tags.includes(filter))
      }
  },
  resetFilter(state, payload){
    if (state.filters[payload.category].includes(payload.tag)){
      let i = state.filters[payload.category].findIndex( filter => filter == payload.tag);
      state.filters[payload.category].splice(i,1);
    }
  }
}

const actions = {
  setContent(context, payload){
      context.commit('setContent', payload);
  },
  setContentByObject(context, payload){
    context.commit('setContentByObject', payload)
  },
  filterContent(context, payload){
    context.commit('filterContent', payload);
    context.commit('updateFilteredContent', payload.category);
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
  getUrlofInternalContents(state){
    return [
      ...state.list.projects.map( project => project.url),
      ...state.list.courses.map( course => course.url)
    ]
  },
  getTagsList(state){
    return state.tagsFilters;
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


