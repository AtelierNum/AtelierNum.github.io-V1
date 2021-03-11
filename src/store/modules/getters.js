export default {
  getContent(state){
    // console.log(state.current_content)
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