export default {
  getPageBySlug: state => slug => {
    return state.pages.filter(page => page.slug === slug)[0]
  },
  getPageById: state => id => {
    return state.pages.filter(page => page.id === id)[0]
  },
  getPostBySlug: state => slug => {
    return state.posts.filter(post => post.slug === slug)[0]
  },
  getPostById: state => id => {
    return state.posts.filter(post => post.id === id)[0]
  },
  getPostsByPage: (state) => ({ page, queryType, query }) => {
    switch (queryType) {
      case 'category':
        return state.posts
          .filter((post) => post.categories.includes(query))
          .filter((post) => post.categoryPage === page)
      case 'search':
        return state.posts
          .filter((post) => post.searchTerm === query)
          .filter((post) => post.searchPage === page)
      case 'default':
        return state.posts
          .filter((post) => post.indexPage === page)
          .sort((a, b) => {
            return a.date < b.date ? 1 : -1
          })
    }
  },
  getCategoryBySlug: state => slug => {
    return state.categories[slug]
  }
}
