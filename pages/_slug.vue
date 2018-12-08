<template>
  <article
    :id="'post-id-' + post.id"
    class="post hentry"
  >
    <header class="entry-header">
      <time
        class="entry-date published"
        datetime="post.date"
      >
        {{ post.date }}
      </time>
      <h1
        class="entry-title"
        v-html="post.title.rendered"
      >
      </h1>
    </header>
    <div
      class="entry-content"
      v-html="post.content.rendered"
    />
  </article>
</template>

<script>
export default {
  components: {},
  computed: {
    post() {
      return this.$store.getters.getPostBySlug(this.$route.params.slug)
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    // payload set during static generation
    if (payload && isStatic) {
      store.commit('addPosts', [payload])
    } else {
      await store.dispatch('getPost', params)
    }
  },
  methods: {
    featuredImage() {
      let featuredImage = this.post._embedded['wp:featuredmedia']
      if (featuredImage && featuredImage[0].media_details) {
        return (
          featuredImage[0].media_details.sizes.large.source_url ||
          featuredImage[0].media_details.sizes.full.source_url
        )
      } else {
        return '/og-card.png'
      }
    }
  },
  head() {
    return {
      title: this.post.title.rendered,
      bodyAttrs: {
        class: 'single post post-id-' + this.post.id
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.excerpt.rendered
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title.rendered + ' • Scott Evans'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.excerpt.rendered
        },
        {
          hid: 'og:image',
          property: 'og:image'
          // content: this.featuredImage()
        }
      ]
    }
  }
}
</script>
