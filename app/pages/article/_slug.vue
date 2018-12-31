<template>
  <main class="content">
    <article :id="'post-id-' + post.id" class="article">
      <header
        class="article-header"
        :class="{ 'has-artwork': featuredImage() }"
      >
        <div class="article-artwork">
          <img
            class=""
            v-if="featuredImage()"
            v-lazy="featuredImage()"
            alt=""
          />
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
      <div class="article-content">
        <div class="article-copy" v-html="post.content.rendered" />
        <section class="advertising">
          <div style="margin-bottom: 1rem;" v-for="ad in ads" :key="ad.index">
            <no-ssr>
              <div v-for="ad in ads" :key="ad.index">
                <advertising :id="ad.id" :size="ad.size" :unit="ad.name" />
              </div>
            </no-ssr>
          </div>
        </section>
      </div>
    </article>
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
        return featuredImage[0].media_details.sizes.full.source_url
      } else {
        return false
      }
    }
  },
  scrollToTop: true,
  transition: {
    name: 'fade',
    mode: 'out-in'
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
          content: this.post.title.rendered + ' | Dirt Rag'
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
  @media (min-width: 1024px) {
    background: white;
  }
  &.has-artwork {
    padding-bottom: 66%;
    @media (min-width: 1024px) {
      padding-bottom: 0;
      padding-top: 50%;
    }
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
    transition: all 0.25s ease;
  }
  img[lazy='error'] {
    height: 0px;
    width: 0px;
  }
  img[lazy='loading'] {
    transform: translateX(5em);
    opacity: 0;
  }
  img[lazy='loaded'] {
    transform: translateX(0);
    opacity: 1;
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
  }
  @media (min-width: 1200px) {
    max-width: 48rem;
    margin: 0 auto;
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
  border-top: 1px solid #efefef;
  padding: 1rem 5vw;
  margin: 0 auto;
}

.article-copy {
  max-width: 45rem;
  img {
    width: 100% !important;
  }
}

.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px) {
  .article-content {
    display: flex;
    justify-content: center;
  }
  .advertising {
    padding-left: 3rem;
    text-align: center;
  }
}

@media (min-width: 1600px) {
}
</style>
