<template>
  <div>
    <header style="background: red; margin-bottom: 1rem; padding: 1rem;">
      <div style="background: white; width: 200px; margin: 1rem auto;">
        <Logo orientation="horizontal" />
      </div>
    </header>
    <section class="posts">
      <google-ad unit="DR_300x250_Square1" size="rectangle" />
      <div v-for="post in posts" :key="post.id">
        <nuxt-link class="story-link" tag="div" :to="post.slug">
          <PostAtom
            :pictureUrl="featuredImage(post)"
            :title="post.title.rendered"
            :author="post._embedded.author[0].name"
            :date="post.date"
            :excerpt="post.excerpt.rendered"
            :isMedia="post.format == 'video' ? true : false"
            :mode="post.meta.featuredPost.length ? 'enhanced' : 'default'"
          />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import PostAtom from '@/components/PostAtom'
import Logo from '@/components/Logo'

export default {
  components: {
    PostAtom,
    Logo
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
  computed: {
    posts() {
      return this.$store.getters.getPostsPage(
        parseInt(this.$route.params.id) || 1
      )
    },
    ads() {
      return this.$store.state.advertising.rectangles
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
    featuredImage: function(post) {
      let featuredImage = post._embedded['wp:featuredmedia'][0]
      if (featuredImage && featuredImage.media_details) {
        return (
          featuredImage.media_details.sizes.medium.source_url ||
          featuredImage.media_details.sizes.full.source_url
        )
      } else {
        return '/og-card.png'
      }
    }
  }
}
</script>

<style lang="css">
.story-link,
.story-link h4,
.story-link .post-image .post-image-crop,
.story-link .post-image img {
  transition: all 0.2s ease;
}

.story-link:hover {
  background-color: rgba(255,0,0,0.125);
}

.story-link:hover h4,
.story-link:hover a,
.story-link:hover {
  color: red;
  cursor: pointer;
}

.story-link:hover .post-image .post-image-crop {
  background: red;
}

.story-link:hover .post-image img {
  filter: grayscale(100%);
  mix-blend-mode: multiply;
}
</style>
