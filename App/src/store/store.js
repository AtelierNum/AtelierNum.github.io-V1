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
  }
}

const actions = {
  setContent(context, payload){
      context.commit('setContent', payload);
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


