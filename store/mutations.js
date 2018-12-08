export default {
  // add one the pages state
  addPage(state, page) {
    // check the store for existing page before adding
    if (undefined === this.getters.getPageBySlug(page.slug)) {
      state.pages.push(page)
    }
  },
  // add one or many posts to the posts state
  addPosts(state, posts) {
    for (let post of posts) {
      // either replace the existing item or push onto state array
      const i = state.posts.findIndex(o => o.id === post.id)
      if (state.posts[i]) {
        state.posts[i] = post
      } else {
        state.posts.push(post)
      }
    }
  },
  // paginate
  paginate(state, page) {
    state.pagination.pages.push(page)
  },
  // current page
  currentPage(state, page) {
    state.pagination.current = page
  },
  // pagination totals from API
  paginateTotals(state, totals) {
    state.pagination.totalPosts = totals.totalPosts
    state.pagination.totalPostsPages = totals.totalPostsPages
  },
  // enable / disable pagination
  paginateToggle(state, onoff) {
    state.pagination.paginate = onoff
  }
}
