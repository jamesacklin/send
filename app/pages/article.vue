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
            <span v-html='postAuthor'></span>
            <span class="article-date">
              &nbsp;—&nbsp; <span v-html="postDate"></span>
            </span>
          </div>
          <no-ssr>
            <div class="article-sharing">
              <social-sharing
                :url="thisUrl"
                :title="post.title.rendered"
                :description="post.excerpt.rendered"
                network-tag="a"
                inline-template
              >
                <span>
                  <network network="facebook">
                    <font-awesome-icon :icon="['fab', 'facebook-square']" />
                  </network>
                  <network network="twitter">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                  </network>
                  <network network="reddit">
                    <font-awesome-icon :icon="['fab', 'reddit']" />
                  </network>
                </span>
              </social-sharing>
              <a :href="thisUrl">
                <font-awesome-icon :icon="['fas', 'link']" />
              </a>
            </div>
          </no-ssr>
        </div>
      </header>
      <div class="article-content">
        <div
          class="article-copy"
          @click="zoomFigure"
          v-html="post.content.rendered"
        />
        <section class="advertising">
          <div style="margin-bottom: 1rem;" v-for="ad in ads" :key="ad.index">
            <no-ssr>
              <div v-for="ad in ads" :key="ad.index">
                <advertising :id="ad.id" :size="ad.size" :unit="ad.name" />
              </div>
            </no-ssr>
          </div>
        </section>
        <section class="article-author-bio" v-if="postAuthorBio">
          <div v-if="postAuthorPic" class="author-image">
            <img :src="postAuthorPic" :alt="postAuthor">
          </div>
          <div class="author-bio">
            <h3>{{ postAuthor }}</h3>
            <p>{{ postAuthorBio }}</p>
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
    },
    thisUrl() {
      return `https://dirtragmag.com${this.$route.path}`
    },
    postAuthor() {
      const post = this.post
      if (post.author === 74318) {
        if (post.acf.contributor_name){
          return post.acf.contributor_name
        } else {
          return post._embedded.author[0].name
        }
      } else {
        return post._embedded.author[0].name
      }
    },
    postAuthorBio() {
      const post = this.post
      if (post.author === 74318){
        if (post.acf.contributor_bio){
          return post.acf.contributor_bio
        } else {
          return false
        }
      } else {
        return false
      }
    },
    postAuthorPic() {
      const post = this.post
      if (post.author === 74318){
        if (post.acf.contributor_photo){
          return post.acf.contributor_photo
        } else {
          return false
        }
      } else {
        return false
      }
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
    },
    zoomFigure(event) {
      const e = event.target
      if (e.tagName === 'IMG' && e.parentNode.tagName === 'FIGURE') {
        console.log('yahtzee')
        const f = e.parentNode
        f.classList.toggle('zoomed')
      } else {
        return
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
          content: this.post.title.rendered + ' · Dirt Rag'
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
  grid-column: full;
  background: black;
  position: relative;
  @media (min-width: 1000px) {
    background: white;
  }
  &.has-artwork {
    padding-bottom: 66%;
    @media (min-width: 1000px) {
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
  @media (min-width: 1000px) {
    top: 0;
    padding-bottom: 50%;
  }
}

.article-title-block {
  color: white;
  padding: 1rem 0;
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr)
    [main-start] minmax(0, 45em) [main-end]
    minmax(1em, 1fr) [full-end];
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-auto-rows: auto;
  @media (min-width: 1000px) {
    padding: 2rem 0;
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 45em) [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
    grid-column-gap: 2rem;
    color: black;
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em)
      [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
  }

  .article-title {
    grid-column: main;
    font-size: 2.5rem;
    margin: 0;
    line-height: 1;
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  .article-author {
    grid-column: main;
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
  }

  .article-sharing {
    grid-column: main;
    font-size: 1.5em;
    a { cursor: pointer; }
    @media (min-width: 1000px) {
      margin-top: 0;
      grid-column: sidebar;
    }
  }
}

.article-content {
  padding: 0 2%;
  border-top: 1px solid #efefef;
  @media (min-width: 1000px) {
    padding: 0;
    display: grid;
    grid-row-gap: 1em;
    grid-column-gap: 2em;
    grid-template-columns:
      [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
      [main-end sidebar-start] 300px [sidebar-end] minmax(1em, 1fr) [full-end];
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em)
      [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
  }
}

.article-copy {
  grid-column: main;
}

.article-copy img {
  width: 100% !important;
}

@media (min-width: 1000px) {
  .article-copy figure {
    position: relative;
    z-index: 3;
    transition: all 0.2s ease;
  }
  .article-copy figure img {
    cursor: zoom-in;
  }
  .article-copy figure.zoomed {
    width: calc(100% + 300px + 2em) !important;
    background: black;
    color: white;
    outline: 1em solid black;
    box-shadow: 0 0 4em rgba(0, 0, 0, 0.25);
    margin: 2em 0;
  }
  .article-copy figure.zoomed img {
    cursor: zoom-out;
  }
}

.article-author-bio {
  grid-column: main;
  background: #DCDCDC;
  display: flex;
  .author-image {
    flex-grow: 0;
    margin: 1em 0 0.75em 1em;
    max-width: 15%;
  }
  .author-bio {
    flex-grow: 1;
    padding-left: 1em;
  }
}

.advertising {
  grid-column: sidebar;
}

.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}
</style>
