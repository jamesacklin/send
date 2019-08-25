import { reject } from 'q'

export default {
  setCurrents({ commit }, params) {
    const { slug } = params
    const categoryId = params.id
    commit('currentStringQuery', { slug })
    commit('currentCatId', { categoryId })
  },
  async getCategory({ commit, state }, params) {
    const { slug } = params
    if (!state.categories[slug]) {
      const categoryMeta = await this.$axios.$get('categories', {
        params: { slug }
      })
      const catMeta = categoryMeta[0]
      commit('addCategory', { slug, catMeta })
    }
  },
  async getPosts({ commit, state }, params) {
    const { page, prefetch, queryType, slug } = params
    if (!prefetch) {
      commit('currentPage', { page, queryType, slug })
    }
    const go = function() {
      // Return true if:
      // - if the array of seen pages is empty,
      // - the array of seen pages does not include this page and the page ID is 
      //   less than or equal to the number of totalpostspages,
      // - or we are prefetching and the above is true
      switch (queryType) {
        case 'category':
          if (
            (!prefetch) && 
            (state.categories[slug].pagination.pages.length === 0) ||
            (!state.categories[slug].pagination.pages.includes(page) && page <= state.categories[slug].pagination.totalPostsPages)
          ) return true
        case 'default':
          if (
            (!prefetch) && 
            (state.pagination.default.pages.length === 0) ||
            (!state.pagination.default.pages.includes(page) && page <= state.pagination.default.totalPostsPages)
          ) return true
        case 'search':
          // Always get posts for new searches
          return true
      }

    }
    if (go() === true) {
      commit('paginate', { page, queryType, slug })
      const params = {
        per_page: 10,
        page
      }
      switch (queryType) {
        case 'category':
          params.categories = state.categories[slug].id
          break
        case 'search':
          params.search = slug
          params.orderby = 'relevance'
          break
        case 'default':
          break
      }
      const posts = await this.$axios.get('posts?', { params })
      if (posts) {
        const totals = {
          totalPosts: parseInt(posts.headers['x-wp-total']),
          totalPostsPages: parseInt(posts.headers['x-wp-totalpages'])
        }
        commit('paginateTotals', { totals, queryType, slug })
        posts.data.forEach((post) => {
          if (queryType === 'default' && !post.indexPage) {
            post.indexPage = page
          }
          if (queryType === 'category' && !post.categoryPage) {
            post.categoryPage = page
          }
          if (queryType === 'search' && !post.searchPage) {
            post.searchPage = page
            post.searchTerm = slug
          }
          post.page = page
        })
        commit('addPosts', posts.data)
      }
    }
  },
  openNavDrawer({ commit }) {
    commit('toggleNavDrawer', true)
  },
  closeNavDrawer({ commit }) {
    commit('toggleNavDrawer', false)
  },
  async getPage({ commit }, params) {
    if (!this.getters.getPageBySlug(params.slug)) {
      const page = await this.$axios.$get('pages?_embed', {
        params: {
          slug: params.slug
        }
      })
      if (page.length === 0) {
        reject(error)
      } else {
        commit('addPage', page[0])
      }
    }
  },
  async getPost({ commit, state }, params) {
    if (!this.getters.getPostBySlug(params.slug)) {
      const post = await this.$axios.$get('posts?_embed', {
        params: {
          slug: params.slug
        }
      })
      commit('addPosts', post)
    }
  }
}