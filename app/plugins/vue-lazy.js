import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import SocialSharing from 'vue-social-sharing'

Vue.use(SocialSharing);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare, faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.use(VueLazyload, {
  preLoad: 1.6,
  throttleWait: 600,
  error: '/og-card.png',
  loading: '/bike-animated-loop.svg'
})

library.add(faFacebookSquare, faTwitter, faReddit, faLink)
Vue.component('font-awesome-icon', FontAwesomeIcon)
