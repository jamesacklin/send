import _ from 'lodash'

export default {
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
  getPostsWithAds: state => {
    // sort posts by date
    const posts = state.posts.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
    // get ads
    const ads = state.advertising.rectangle
    // insert ad into every 3 posts
    function insertAds(posts) {
      return _.compact(_.flattenDeep(_.zip(_.chunk(posts, 3), ads)))
    }
    // chunk posts by 30 (page length)
    var chunkedPosts = _.chunk(posts, 30)
    // smush chunks (with insterted ads) back together
    const postsWithAds = _.flattenDeep(_.map(chunkedPosts, insertAds))
    // return new array
    return postsWithAds
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
}
