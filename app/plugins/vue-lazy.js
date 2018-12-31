import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.6,
  throttleWait: 600,
  error: '/og-card.png',
  loading: '/og-card.png'
})
