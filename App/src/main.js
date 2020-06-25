import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store/store'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/* -Atoms- */
import image from '@/components/atoms/image.vue'
import grid from '@/components/atoms/grid.vue'
import tag from '@/components/atoms/tag.vue'

Vue.component('v-lazy-image',image)
Vue.component('v-tag',tag)
Vue.component('v-grid',grid)


/* -Molecules- */
import card_project from '@/components/molecules/card_project.vue'
import tag_list from '@/components/molecules/tag_list.vue'

Vue.component('v-card-project',card_project)
Vue.component('v-tag-list',tag_list)


/* -Organismes- */
import footer from '@/components/organismes/footer.vue'
import header from '@/components/organismes/header.vue'

Vue.component('v-footer',footer)
Vue.component('v-header',header)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
