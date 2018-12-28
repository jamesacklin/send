<template>
  <div>
    <main class="content">
      <section class="posts">
        <div v-for="post in posts" :key="post.id">
          <nuxt-link class="story-link" tag="div" :to="`/` + post.slug">
            <PostAtom
              :pictureUrl="featuredImage(post)"
              :titleCallout="titleCallout(post)"
              :title="post.title.rendered"
              :author="post._embedded.author[0].name"
              :date="post.date"
              :excerpt="post.excerpt.rendered"
              :isMedia="post.format == 'video' ? true : false"
              :isContest="post.categories[0] == '589' ? true : false"
              :mode="postMode(post)"
            />
          </nuxt-link>
        </div>
      </section>
      <section class="advertising">
        <no-ssr>
          <div v-for="ad in ads" :key="ad.index">
            <keep-alive>
              <advertising :id="ad.id" :size="ad.size" :unit="ad.name" />
            </keep-alive>
          </div>
        </no-ssr>
      </section>
    </main>
    <Pagination />
  </div>
</template>

<script>
import find from 'lodash/find'
import PostAtom from '@/components/PostAtom'
import Advertising from '@/components/Advertising'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    PostAtom,
    Advertising,
    Pagination
  },
  mixins: {
    longTimestamp: Function,
    widont: Function
  },
  async asyncData({ payload, isStatic, store, params }) {
    // payload set during static generation
    if (payload && isStatic) {
      // setup the store as it would be in SPA mode
      // const page = parseInt( params.id ) || 1
      const page = payload.meta.page
      store.commit('currentPage', page)
      store.commit('paginate', page)
      store.commit('paginateTotals', {
        totalPosts: payload.meta.totalPosts,
        totalPostsPages: payload.meta.totalPostsPages
      })
      store.commit('addPosts', payload.payload)
    } else {
      await store.dispatch('getPosts', { page: parseInt(params.id || 1) })
    }
  },
  fetch({ params, redirect, route }) {
    // redirect page 1 or /page/
    if (
      1 === parseInt(params.id) ||
      '/page' === route.path.replace(/\/$/, '')
    ) {
      redirect(301, '/')
    }
  },
  mounted() {
    // prefetch pages either side of this one
    const nextPage = parseInt(this.$route.params.id) + 1 || 2
    this.$store.dispatch('getPosts', { page: nextPage, prefetch: true })
    const previousPage = this.$route.params.id
      ? parseInt(this.$route.params.id - 1)
      : false
    if (previousPage) {
      this.$store.dispatch('getPosts', { page: previousPage, prefetch: true })
    }
  },
  computed: {
    posts() {
      return this.$store.getters.getPostsPage(
        parseInt(this.$route.params.id) || 1
      )
    },
    ads() {
      return this.$store.state.advertising.rectangle
    }
  },
  head() {
    return {
      title: 'Dirt Rag Magazine • Page ' + (this.$route.params.id || 1),
      bodyAttrs: {
        class: this.$route.params.id
          ? 'archive page page-' + this.$route.params.id
          : 'home archive'
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dirt Rag Magazine • Page ' + (this.$route.params.id || 1)
        }
      ]
    }
  },
  methods: {
    titleCallout: function(post) {
      if (
        find(post.categories, function(cat) {
          return cat == '589'
        })
      ) {
        return 'Contest'
      } else if (
        find(post._embedded['wp:term'][1], function(tag) {
          return tag.id == '2339'
        })
      ) {
        return 'Holiday Gift Guide'
      }
    },
    postMode: function(post) {
      if (post.categories[0] == '589') {
        return 'promotion'
      } else if (post.meta.featuredPost.length) {
        return 'enhanced'
      } else {
        return 'default'
      }
    },
    featuredImage: function(post) {
      if (post._embedded['wp:featuredmedia']) {
        let featuredImage = post._embedded['wp:featuredmedia'][0]
        if (featuredImage && featuredImage.media_details.sizes.medium) {
          return (
            featuredImage.media_details.sizes.medium.source_url ||
            featuredImage.media_details.sizes.full.source_url
          )
        } else {
          return '/og-card.png'
        }
      } else {
        return '/og-card.png'
      }
    }
  }
}
</script>

<style lang="css">

.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px){
  .content {
    display: flex;
    justify-content: center;
  }
  .posts {
    width: calc(100% - 300px);
  }
  .advertising {
    padding: 0 1rem;
    width: auto;
  }
}

@media (min-width: 1600px){
  .posts {
    max-width: 1000px;
    margin: 0 auto;
  }
}

.story-link .post-atom {
  transition: background-color 0.2s ease;
}

.story-link:hover .post-atom {
  cursor: pointer;
  background-color: rgba(255,0,0,0.125);
}
</style>
