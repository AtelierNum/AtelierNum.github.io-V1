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
  }
}


const mutations = {
  setContent(state, payload){
    for (let type in state.list) {
      let plop = state.list[type].find( content => content.id == payload );

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
  filterContent(context, payload){
    context.commit('filterContent', payload);
    context.commit('updateFilteredContent', payload.category);
  },
  resetFilter(context, payload){
    context.commit('resetFilter', payload);
    context.commit('updateFilteredContent', payload.category);
  }
}

const getters = {
  getContent(state){
      return state.current_content ;
  },
  getList(state){
    return state.list ;
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


