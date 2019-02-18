<template>
  <main class="content">
    <article :id="'post-id-' + post.id" class="article">
      <header class="article-header" :class="{ 'has-artwork': featuredMedia }">
        <featured-media v-if="featuredMedia" :media="post._embedded['wp:featuredmedia'][0]"/>
        <div class="article-title-block">
          <h1 class="article-title" v-html="post.title.rendered"></h1>
          <div class="article-author">
            <span v-html="postAuthor"></span>
            <span class="article-date">
              &nbsp;—&nbsp;
              <span v-html="postDate"></span>
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
                    <font-awesome-icon :icon="['fab', 'facebook-square']"/>
                  </network>
                  <network network="twitter">
                    <font-awesome-icon :icon="['fab', 'twitter']"/>
                  </network>
                  <network network="reddit">
                    <font-awesome-icon :icon="['fab', 'reddit']"/>
                  </network>
                </span>
              </social-sharing>
              <a :href="thisUrl">
                <font-awesome-icon :icon="['fas', 'link']"/>
              </a>
            </div>
          </no-ssr>
        </div>
      </header>
      <div v-if="this.post.acf.contest_platform">
        <no-ssr placeholder="Loading contest...">
          <contest 
            :key="randomKey"
            :platform="this.post.acf.contest_platform" 
            :embedCode="this.post.acf.embed_code"
          />
        </no-ssr>
      </div>
      <div class="article-content">
        <div class="article-copy" @click="zoomFigure" v-html="post.content.rendered"/>
        <section class="advertising">
          <no-ssr>
            <ad-sidebar 
              :sidebarData="ads" />
          </no-ssr>
        </section>
        <section class="article-author-bio" v-if="postAuthorBio">
          <div v-if="postAuthorPic" class="author-image">
            <img :src="postAuthorPic" :alt="postAuthor">
          </div>
          <div class="author-bio">
            <h3>{{ postAuthor }}</h3>
            <div v-html="postAuthorBio"></div>
          </div>
        </section>
        <section class="article-comments">
          <no-ssr>
            <comments />
          </no-ssr>
        </section>
      </div>
    </article>
  </main>
</template>

<script>
import AdSidebar from '@/components/PageComponents/AdSidebar'
import Contest from '@/components/PageComponents/Contest'
import Comments from '@/components/PageComponents/Comments'
import FeaturedMedia from '@/components/PageComponents/FeaturedMedia'
import dayjs from 'dayjs'

export default {
  components: {
    FeaturedMedia,
    Comments,
    Contest,
    AdSidebar
  },
  computed: {
    post() {
      // Return the post for whatever post we're looking for in route.params
      return this.$store.getters.getPostBySlug(this.$route.params.slug)
    },
    ads() {
      // Return the ads set explicitly in the store
      return this.$store.state.advertising.rectangle
    },
    postDate: function() {
      // Pretty-format the post date (January 1, 2019)
      return dayjs(this.date).format('MMMM D, YYYY')
    },
    thisUrl() {
      // Prepend our URL to the route path to get an absolute URL without
      // relying on WordPress's permalink
      return `https://dirtragmag.com${this.$route.path}`
    },
    featuredMedia() {
      // Check for the existence of featured media on the post.
      // If so, return it. If not, return false.
      if (this.post._embedded['wp:featuredmedia']) {
        return this.post._embedded['wp:featuredmedia'][0].media_details.sizes
          .medium.source_url
      } else {
        return false
      }
    },
    postAuthor() {
      // If the post author is "Dirt Rag Contributor" (ID 74318), see if we can
      // return the contributor's real name (as provided in ACF fields)
      const post = this.post
      if (post.author === 74318) {
        if (post.acf.contributor_name) {
          return post.acf.contributor_name
        } else {
          return post._embedded.author[0].name
        }
      } else {
        return post._embedded.author[0].name
      }
    },
    postAuthorBio() {
      // If the post author is "Dirt Rag Contributor" (ID 74318), see if we can
      // return the contributor's biography (as provided in ACF fields)
      const post = this.post
      if (post.author === 74318) {
        if (post.acf.contributor_bio) {
          return post.acf.contributor_bio
        } else {
          return false
        }
      } else {
        return false
      }
    },
    postAuthorPic() {
      // If the post author is "Dirt Rag Contributor" (ID 74318), see if we can
      // return the contributor's photo (as provided in ACF fields)
      const post = this.post
      if (post.author === 74318) {
        if (post.acf.contributor_photo) {
          return post.acf.contributor_photo
        } else {
          return false
        }
      } else {
        return false
      }
    },
    randomKey(){
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    if (payload && isStatic) {
      store.commit('addPosts', [payload])
    } else {
      await store.dispatch('getPost', params)
    }
  },
  methods: {
    // When the user clicks on an image within figure, toggle a 'zoomed'
    // class on the parent figure (expands the image inline over the sidebar on
    // large screens)
    zoomFigure(event) {
      const e = event.target
      if (e.tagName === 'IMG' && e.parentNode.tagName === 'FIGURE') {
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
  mounted() {

    




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
          content: this.featuredMedia
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
  color: #eb181d;
}

.article-header {
  grid-column: full;
  background: #292724;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 1000px) {
    background: #f5f3ef;
  }
  &.has-artwork {
    .article-title-block { order: 1; }
    .article-artwork { order: 2; }
    @media (min-width: 1000px) {
      .article-title-block { order: 2; }
      .article-artwork { order: 1; }
    }
  }
}

.article-title-block {
  color: #f5f3ef;
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
    color: #292724;
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
    a {
      cursor: pointer;
    }
    @media (min-width: 1000px) {
      margin-top: 0;
      grid-column: sidebar;
    }
  }
}

.article-content {
  padding: 0 2%;
  border-top: 1px solid rgba(0,0,0,0.1);
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
  padding-top: 1em;
}

.article-copy iframe {
  max-width: 100%;
}

.article-copy .wp-caption.aligncenter,
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
    background: #292724;
    color: #f5f3ef;
    outline: 1em solid #292724;
    box-shadow: 0 0 4em rgba(0, 0, 0, 0.25);
    margin: 2em 0;
  }
  .article-copy figure.zoomed img {
    cursor: zoom-out;
  }
}

.article-author-bio {
  grid-column: main;
  background: #dcdcdc;
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
  padding-top: 2rem;
}

.article-comments {
  grid-column: main;
  margin-top: 2rem;
}

</style>
