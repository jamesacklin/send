import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => {
  return new Vuex.Store({
    strict: false,
    state: {
      pagination: {
        current: false,
        totalPosts: 0,
        pages: [],
        totalPostsPages: 0,
        postsPerPage: 10,
        paginate: true
      },
      posts: [],
      pages: [],
      advertising: {
        rectangles: [
          'DR_300x250_Square1',
          'DR_300x250_Square2',
          'DR_300x250_Square3',
          'DR_300x250_Square4',
          'DR_300x250_Square5',
          'DR_300x250_Square6',
          'DR_300x250_Square7',
          'DR_300x250_Square8',
          'DR_300x250_SquareNine',
          'DR_300x250_SquareTen'
        ]
      }
    },
    actions,
    mutations,
    getters
  })
}
