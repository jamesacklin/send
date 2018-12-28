<template>
  <div>
    <main class="content">
      <article :id="'post-id-' + post.id" class="entry">
        <header class="entry-header">
          <h1 class="entry-title" v-html="post.title.rendered"></h1>
          <div class="post-author">
            <span>{{ post._embedded.author[0].name }}</span>
            <span class="post-date">
              &nbsp;—&nbsp; <span v-html="postDate"></span>
            </span>
          </div>
        </header>
        <div class="entry-content" v-html="post.content.rendered" />
      </article>
      <section class="advertising">
        <div style="margin-bottom: 1rem;" v-for="ad in ads" :key="ad.index">
          <no-ssr>
            <div v-for="ad in ads" :key="ad.index">
              <advertising :id="ad.id" :size="ad.size" :unit="ad.name" />
            </div>
          </no-ssr>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Advertising from '@/components/Advertising'

export default {
  components: {
    Advertising
  },
  computed: {
    post() {
      return this.$store.getters.getPostBySlug(this.$route.params.slug)
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    postDate: function() {
      return dayjs(this.date).format('MMMM D, YYYY')
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

<style>
.entry {
  font-family: 'Libre Franklin', sans-serif;
  line-height: 1.6;
  padding: 0 5vw;
}

.entry a {
  color: red;
}

.entry-header {
  margin-bottom: 3rem;
}

.entry-title {
  font-size: 3rem;
  line-height: 1;
  max-width: 45rem;
  margin-bottom: 0.5em;
}

.post-author {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
}

.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px) {
  .content {
    display: flex;
    justify-content: center;
  }
  .entry {
    width: calc(100% - 300px);
  }
  .advertising {
    padding: 0 1rem;
    width: auto;
  }
}

@media (min-width: 1600px) {
  .entry {
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>
