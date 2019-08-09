import merge from 'lodash/merge'

const mutations = {
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
      // either merge with the existing item or push onto state array
      const i = state.posts.findIndex(o => o.id === post.id)
      if (state.posts[i]) {
        state.posts[i] = merge(state.posts[i], post)
      } else {
        state.posts.push(post)
      }
    }
  },
  searchLoadingStatus(state, status) {
    state.searchLoading = status
  },
  addSearchPosts(state, posts) {
    state.searchPosts.posts = posts
  },
  clearSearchPosts(state) {
    state.searchPosts.posts = []
  },
  addContestPosts(state, posts) {
    state.contestPosts = posts
  },
  // paginate
  paginate(state, page) {
    state.pagination.pages.push(page)
  },
  // paginate
  paginateSearch(state, page) {
    state.searchPosts.pagination.pages.push(page)
  },
  // current page
  currentPage(state, page) {
    state.pagination.current = page
  },
  // current search page
  currentSearchPage(state, page) {
    state.searchPosts.pagination.current = page
  },
  // paginate
  paginateCategory(state, params) {
    state.categories.categories[params.cat].pagination.pages.push(params.page)
  },
  // current category page
  currentCategoryPage(state, params) {
    state.categories.categories[params.cat].pagination.current = params.page
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
  paginateSearchTotals(state, totals) {
    state.searchPosts.pagination.totalPosts = totals.totalPosts
    state.searchPosts.pagination.totalPostsPages = totals.totalPostsPages
  },
  // pagination totals from API
  paginateCategoryTotals(state, params) {
    state.categories.categories[params.cat].pagination.totalPosts =
      params.totalPosts
    state.categories.categories[params.cat].pagination.totalPostsPages =
      params.totalPostsPages
  },
  // enable / disable pagination
  paginateToggle(state, onoff) {
    state.pagination.paginate = onoff
  },
  // open or close nav drawer
  toggleNavDrawer(state, onoff) {
    state.navDrawerOpen = onoff
  }
}

export default mutations