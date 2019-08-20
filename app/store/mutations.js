import merge from 'lodash/merge'

export default {
  addPage(state, page) {
    if (undefined === this.getters.getPageBySlug(page.slug)) {
      state.pages.push(page)
    }
  },
  addPosts(state, posts) {
    for (const post of posts) {
      const i = state.posts.findIndex((o) => o.id === post.id)
      if (state.posts[i]) {
        state.posts[i] = merge(state.posts[i], post)
      } else {
        state.posts.push(post)
      }
    }
  },
  paginate(state, payload) {
    state.pagination[payload.queryType].pages.push(payload.page)
  },
  paginateTotals(state, payload) {
    state.pagination[payload.queryType].totalPosts = payload.totals.totalPosts
    state.pagination[payload.queryType].totalPostsPages =
      payload.totals.totalPostsPages
  },
  currentPage(state, payload) {
    state.pagination[payload.queryType].current = payload.page
  },
  currentStringQuery(state, payload) {
    state.current.slug = payload.slug
  },
  currentCatId(state, payload) {
    state.current.id = payload.categoryId
  },
  addContestPosts(state, posts) {
    state.contestPosts = posts
  },
  toggleNavDrawer(state, onoff) {
    state.navDrawerOpen = onoff
  },
  addCategory(state, payload){
    state.categories.push(payload.catMeta)
  }
}
