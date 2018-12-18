import Vue from 'vue'
import DoubleClick from 'vue-doubleclick'
import MarqueeText from 'vue-marquee-text-component'

/* Mappings for @ably/vue-dfp */
let mappings = {
  banner: [
    {
      window: [0, 0],
      sizes: [[728, 90], [970, 90], [970, 415]]
    }
  ],
  rectangle: [
    {
      window: [0, 0],
      sizes: [[300, 100], [300, 250], [300, 300], [300, 600]]
    }
  ]
}

/* Use @ably/vue-dfp with RMM Google DFP ID */
Vue.use(DoubleClick, {
  id: '28844187',
  mappings
})

/* Component registration for @EvodiaAut/vue-marquee-text-component */
Vue.component('marquee-text', MarqueeText)
