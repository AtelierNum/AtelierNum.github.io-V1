import Vue from 'vue'
import Vuex from 'vuex'
import listJSON from '../assets/globalList.json'


Vue.use(Vuex)

const state = {
  list : listJSON,
  current_content : {}
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
    console.log(state.list[payload.category])
    state.list[payload.category] = state.list[payload.category].filter( content => content.tags.includes(payload.tag))

    console.log(state.list[payload.category])
  },
  resetFilters(state){
    state.list = listJSON ;
  }
}

const actions = {
  setContent(context, payload){
      context.commit('setContent', payload);
  },
  filterContent(context, payload){
    context.commit('filterContent', payload);
  },
  resetFilters(context){
    context.commit('resetFilters');
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


