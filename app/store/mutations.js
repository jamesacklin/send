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
  // paginate
  paginateCategory(state, page) {
    state.categories.pagination.pages.push(page)
  },
  // current category page
  currentCategoryPage(state, page) {
    state.categories.pagination.current = page
  },
  // store raw category info
  storeCategory(state, category) {
    state.categories.categories[category.slug] = category
  },
  // store category id
  storeCategoryId(state, cat) {
    state.categories.categoryIds.push(cat)
  },
  // current category
  currentCategory(state, category) {
    state.categories.current = category
  },
  // pagination totals from API
  paginateTotals(state, totals) {
    state.pagination.totalPosts = totals.totalPosts
    state.pagination.totalPostsPages = totals.totalPostsPages
  },
  // pagination totals from API
  paginateCategoryTotals(state, totals) {
    state.categories.pagination.totalPosts = totals.totalPosts
    state.categories.pagination.totalPostsPages = totals.totalPostsPages
  },
  // enable / disable pagination
  paginateToggle(state, onoff) {
    state.pagination.paginate = onoff
  }
}
