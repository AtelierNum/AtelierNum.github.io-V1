export default {
    generateJSON(state, payload){
      state.list = Object.assign({}, payload);
    },
    setContent(state, payload){
      for (let type of [state.list.projects, state.list.courses]) {
        let plop = type.find( content => content.id == payload );
  
        if (plop != undefined){
          state.current_content = plop;
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