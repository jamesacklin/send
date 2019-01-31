import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faLink, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faTwitter,
  faReddit
} from '@fortawesome/free-brands-svg-icons'

library.add(faFacebookSquare, faTwitter, faReddit, faLink, faBars, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
