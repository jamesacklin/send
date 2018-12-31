<template>
  <main class="content">
    <article :id="'post-id-' + post.id" class="article">
      <header class="article-header">
        <div class="article-artwork">
          <img class="" :src="featuredImage()" alt="" />
        </div>
        <div class="article-title-block">
          <h1 class="article-title" v-html="post.title.rendered"></h1>
          <div class="article-author">
            <span>{{ post._embedded.author[0].name }}</span>
            <span class="article-date">
              &nbsp;—&nbsp; <span v-html="postDate"></span>
            </span>
          </div>
        </div>
      </header>
      <div class="article-content" v-html="post.content.rendered" />
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
          // featuredImage[0].media_details.sizes.large.source_url ||
          featuredImage[0].media_details.sizes.full.source_url
        )
      } else {
        return '/static/og-card.png'
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
          property: 'og:image',
          content: this.featuredImage()
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.article {
  font-family: 'Libre Franklin', sans-serif;
  line-height: 1.6;
}

.article a {
  color: red;
}

.article-header {
  background: black;
  position: relative;
  padding-bottom: 66%;
  @media (min-width: 1024px) {
    background: white;
    padding-bottom: 0;
    padding-top: 50%;
  }
}

.article-artwork {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  overflow: hidden;
  padding-bottom: 66%;
  img {
    width: 100%;
  }
  @media (min-width: 1024px) {
    top: 0;
    padding-bottom: 50%;
  }
}

.article-title-block {
  color: white;
  padding: 1rem 5vw 2rem;
  @media (min-width: 1024px) {
    color: black;
    padding: 2rem 5vw;
    max-width: 1000px;
    margin: 0 auto;
    border-bottom: 1px solid #efefef;
  }
}

.article-title {
  font-size: 2.5rem;
  line-height: 1;
  max-width: 45rem;
  margin-bottom: 0.5em;
  margin-top: 0;
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
}

.article-author {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
}

.article-content {
  padding: 1rem 5vw;
  max-width: 1000px;
  margin: 0 auto;
}

.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px) {
  .article-content {
  }
}

@media (min-width: 1600px) {
}
</style>
