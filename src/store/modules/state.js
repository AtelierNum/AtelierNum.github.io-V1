import axios from 'axios'

axios.get('/data/globalList.json').then(response => {
                // console.log(response.data);
                data.list = response.data ;
                data.tagsFilters = response.data.tags ;
              })
              .catch(error => console.log(error))

const data =  {
    list: {
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
    tagsFilters: []
}

export default data;