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
        rectangle: [
          {
            name: 'DR_300x250_Square1',
            id: 'div-gpt-ad-1545012093060-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square2',
            id: 'div-gpt-ad-1545012247418-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square3',
            id: 'div-gpt-ad-1545012276260-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square4',
            id: 'div-gpt-ad-1545012307510-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square5',
            id: 'div-gpt-ad-1545012331175-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square6',
            id: 'div-gpt-ad-1545012351438-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square7',
            id: 'div-gpt-ad-1545012376898-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_Square8',
            id: 'div-gpt-ad-1545012399546-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_SquareNine',
            id: 'div-gpt-ad-1545012424403-0',
            size: 'rectangle'
          },
          {
            name: 'DR_300x250_SquareTen',
            id: 'div-gpt-ad-1545012446845-0',
            size: 'rectangle'
          }
        ]
      }
    },
    actions,
    mutations,
    getters
  })
}
