import merge from 'lodash/merge'

export default {
  // Open or close nav drawer
  openNavDrawer({ commit, state }) {
    commit('toggleNavDrawer', true)
  },
  closeNavDrawer({ commit, state }) {
    commit('toggleNavDrawer', false)
  },

  // page
  async getPage({ commit, state }, params) {
    // check store for page already, bail if found
    if (!this.getters.getPageBySlug(params.slug)) {
      const page = await this.$axios.$get('pages?_embed', {
        params: {
          slug: params.slug
        }
      })
      commit('addPage', page[0])
    }
  },

  // category from slug
  async getCategoryFromSlug({ commit, state }, params) {
    // if we don't have the category in the store, go get it and store it
    if (!this.getters.getCategoryBySlug(params.slug)) {
      const cat = await this.$axios.$get('categories', {
        params: {
          slug: params.slug
        }
      })
      // instantiate pagination store model, merge with what we get from the API
      const storeCat = merge(cat[0], {
        pagination: { current: false, pages: [] }
      })
      commit('storeCategory', storeCat)
    }
  },

  // post
  async getPost({ commit, state }, params) {
    // check store for post already, bail if found
    if (!this.getters.getPostBySlug(params.slug)) {
      const post = await this.$axios.$get('posts?_embed', {
        params: {
          slug: params.slug
        }
      })
      commit('addPosts', post)
    }
  },

  async getPosts({ commit, state }, params) {
    const { page } = params
    const { prefetch } = params

    // which page are we on?
    if (!prefetch) {
      commit('currentPage', page)
    }
    // check before requesting more pages
    if (
      // we have no posts, get some
      0 === state.pagination.pages.length ||
      // we have requested a new page and not hit total pages
      (page &&
        !state.pagination.pages.includes(page) &&
        page <= state.pagination.totalPostsPages) ||
      // we are prefetching and the prefetched page does not yet exist
      (prefetch &&
        page &&
        !state.pagination.pages.includes(page) &&
        page <= state.pagination.totalPostsPages)
    ) {
      // paginate - add this to our object of seen pages
      commit('paginate', page)
      // request posts from API
      const posts = await this.$axios.get('posts?_embed', {
        params: {
          per_page: state.pagination.postsPerPage,
          page: page
        }
      })

      if (posts) {
        // update pagination totals in store from API response
        commit('paginateTotals', {
          totalPosts: parseInt(posts.headers['x-wp-total']),
          totalPostsPages: parseInt(posts.headers['x-wp-totalpages'])
        })
        // add page to returned data so we can grab posts by page later
        posts.data.forEach(post => {
          // store empty categoryPage info in case we need to add category:page later
          if (!post.categoryPage) {
            post.categoryPage = {}
          }
          // but add the separate "page" counter anyway, in case we need it again on the index
          post.page = page
        })
        // add posts to store
        commit('addPosts', posts.data)
      }
    }
  },

  // get posts by category
  async getPostsByCategory({ commit, state }, params) {
    // page from route params
    const { page } = params
    // category slug from route params
    const { cat } = params
    const { prefetch } = params
    // get the ID for the category slug we're on
    const currentCategory = state.categories.categories[cat].id
    // tell the store which category we're on
    commit('currentCategory', currentCategory)
    // which page are we on?
    commit('currentCategoryPage', { cat: cat, page: page })
    // check before requesting more pages
    if (
      // we have no posts, get some
      0 === state.categories.categories[cat].pagination.pages.length ||
      // we have requested a new page and not hit total pages
      (page &&
        !state.categories.categories[cat].pagination.pages.includes(page) &&
        page <= state.categories.categories[cat].pagination.totalPostsPages) ||
      // check if the we don't have this category in the store already
      (currentCategory &&
        !state.categories.categoryIds.includes(currentCategory))
    ) {
      // paginate - add this to our category-specific object of seen category pages
      commit('paginateCategory', { cat: cat, page: page })
      // Add this category ID to the list of category IDs we've already gotten
      commit('storeCategoryId', currentCategory)

      // request posts from API
      const posts = await this.$axios.get('posts?_embed', {
        params: {
          per_page: state.pagination.postsPerPage,
          page: page,
          categories: state.categories.current
        }
      })

      if (posts) {
        // update category-specific pagination totals in store from API response
        commit('paginateCategoryTotals', {
          cat: cat,
          totalPosts: parseInt(posts.headers['x-wp-total']),
          totalPostsPages: parseInt(posts.headers['x-wp-totalpages'])
        })
        // add category:page to returned data so we can grab posts by category:page later
        posts.data.forEach(post => {
          if (!post.categoryPage) {
            post.categoryPage = {}
          }
          post.categoryPage = merge(post.categoryPage, {
            [currentCategory]: page
          })
        })
        // add posts to store
        commit('addPosts', posts.data)
      }
    }
  }
}
