const getters = {
  // get a page by slug
  getPageBySlug: state => slug => {
    return state.pages.filter(page => page.slug === slug)[0]
  },
  // get a page by id
  getPageById: state => id => {
    return state.pages.filter(page => page.id === id)[0]
  },
  // get a post by slug
  getPostBySlug: state => slug => {
    return state.posts.filter(post => post.slug === slug)[0]
  },
  // get a post by id
  getPostById: state => id => {
    return state.posts.filter(post => post.id === id)[0]
  },
  // get all posts
  getPosts: state => {
    // sort by date
    const posts = state.posts.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
    return posts
  },
  getSearchPosts: state => {
    return state.searchPosts
  },
  getCategoryBySlug: state => slug => {
    return state.categories.categories[slug]
  },
  // get category-page of posts
  getCatPostsPage: state => (page, cat) => {
    const posts = state.posts
      // Posts should be aware of what category-page they're on,
      // so grab posts by category
      .filter(post => post.categories.includes(cat))
      // then filter just the current category-page
      .filter(post => post.categoryPage[cat] === page)
    // sort by date
    return posts.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
  },
  // get page of posts
  getPostsPage: state => page => {
    // filter just the current page
    const posts = state.posts.filter(post => post.page === page)
    // sort by date
    return posts.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
  }
};

export default getters