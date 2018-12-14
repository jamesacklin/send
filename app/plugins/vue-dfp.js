import Vue from 'vue'
import DoubleClick from 'vue-doubleclick'

let mappings = {
  banner: [
    {
      window: [0, 0],
      sizes: [[300, 100], [320, 50], [728, 90], [970, 90], [970, 415]]
    }
  ],
  rectangle: [
    { window: [0, 0], sizes: [[300, 100], [300, 250], [300, 300], [300, 600]] }
  ]
}

Vue.use(DoubleClick, {
  id: '28844187',
  mappings
})
