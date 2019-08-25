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
  addCategory(state, payload){
    const { catMeta, slug } = payload
    if (!state.categories[slug]) {
      state.categories[slug] = {}
    }
    state.categories[slug] = catMeta
    if (!state.categories[slug].pagination){
      state.categories[slug].pagination = {
        current: null,
        totalPosts: null,
        totalPostsPages: null,
        pages: []
      }
    }
  },
  paginate(state, payload) {
    const { page, prefetch, queryType, slug } = payload
    switch (queryType) {
      case 'category':
        state.categories[slug].pagination.pages.push(page)
      case 'search':
      case 'default':
    }
  },
  paginateTotals(state, payload) {
    const { totals, queryType, slug } = payload
    switch (queryType) {
      case 'category':
        state.categories[slug].pagination.totalPosts = totals.totalPosts
        state.categories[slug].pagination.totalPostsPages = totals.totalPostsPages
      case 'search':
      case 'default':
    }
  },
  currentPage(state, payload) {
    const { page, queryType, slug } = payload
    switch (queryType) {
      case 'category':
        state.categories[slug].pagination.current = page
        state.current.id = state.categories[slug].id
        state.current.slug = slug
      case 'search':
      case 'default':
        state.pagination[queryType].current = page
    }
  },
  currentStringQuery(state, payload) {
    state.current.slug = payload.slug
  },
  currentCatId(state, payload) {
    state.current.id = payload.categoryId
  },
  addContestPost(state, post) {
    state.contestPost.push(post)
  },
  toggleNavDrawer(state, onoff) {
    state.navDrawerOpen = onoff
  }
}
