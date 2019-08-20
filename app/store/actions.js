import { reject } from 'q'

export default {
  setCurrents({ commit }, params) {
    const { slug } = params
    const categoryId = params.id
    commit('currentStringQuery', { slug })
    commit('currentCatId', { categoryId })
  },
  async getCategory({ commit }, params) {
    const categoryMeta = await this.$axios.$get('categories', {
      params: {
        slug: params.slug
      }
    })
    const categoryId = categoryMeta[0].id
    const catMeta = categoryMeta[0]
    commit('currentCatId', { categoryId })
    commit('addCategory', { catMeta })
  },
  async getPosts({ commit, state }, params) {
    const { page, prefetch, queryType, slug } = params
    if (!prefetch) {
      commit('currentPage', { page, queryType })
    }
    if (
      state.pagination[queryType].pages.length === 0 ||
      (page &&
        !state.pagination[queryType].pages.includes(page) &&
        page <= state.pagination[queryType].totalPostsPages) ||
      (prefetch &&
        page &&
        !state.pagination[queryType].pages.includes(page) &&
        page <= state.pagination[queryType].totalPostsPages)
    ) {
      commit('paginate', { page, queryType })
      const params = {
        per_page: state.pagination[queryType].postsPerPage,
        page
      }
      switch (queryType) {
        case 'category':
          commit('currentStringQuery', { slug })
          params.categories = state.current.id
          break
        case 'search':
          commit('currentStringQuery', { slug })
          params.search = slug
          params.orderby = 'relevance'
          break
        case 'default':
          break
      }
      const posts = await this.$axios.get('posts?_embed', { params })
      if (posts) {
        const totals = {
          totalPosts: parseInt(posts.headers['x-wp-total']),
          totalPostsPages: parseInt(posts.headers['x-wp-totalpages'])
        }
        commit('paginateTotals', { totals, queryType })
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