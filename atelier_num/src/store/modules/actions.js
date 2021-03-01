export default {
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