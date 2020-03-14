import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  current_content : {}
}


const mutations = {
  setContent(state, payload){
      state.current_content = payload ;
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
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


