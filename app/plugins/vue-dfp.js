import Vue from 'vue'
import DoubleClick from 'vue-doubleclick'

/* Mappings for @ably/vue-dfp */
let mappings = {
  banner: [
    {
      window: [0, 0],
      sizes: [[970, 415], [970, 90], [728, 90]]
    }
  ],
  rectangle: [
    {
      window: [0, 0],
      sizes: [[300, 100], [300, 250], [300, 300], [300, 600]]
    }
  ]
}

let sizes = {
  banner: [[970, 415], [970, 90], [728, 90]],
  mobileBanner: [[300, 100], [320, 50], [300, 250]],
  rectangle: [[300, 100], [300, 250], [300, 300], [300, 600]]
}

/* Use @ably/vue-dfp with RMM Google DFP ID */
Vue.use(DoubleClick, {
  id: '28844187',
  mappings,
  sizes
})
