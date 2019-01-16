import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faTwitter,
  faReddit
} from '@fortawesome/free-brands-svg-icons'

library.add(faFacebookSquare, faTwitter, faReddit, faLink)

Vue.component('font-awesome-icon', FontAwesomeIcon)
