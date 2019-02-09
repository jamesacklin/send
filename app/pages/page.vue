<template>
  <main class="content">
    <article :id="'page-id-' + this.post.id" class="page">
      <header class="page-header" :class="{ 'has-artwork': featuredMedia }">
        <featured-media
          v-if="featuredMedia"
          :media="post._embedded['wp:featuredmedia'][0]"
        />
        <div class="page-title-block">
          <h1 class="page-title" v-html="post.title.rendered"></h1>
        </div>
      </header>
      <div class="page-content">
        <div class="page-copy" v-html="post.content.rendered" />
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
      // Return the page for whatever page we're looking for in route.params
      return this.$store.getters.getPageBySlug(this.$route.params.slug)
    },
    ads() {
      // Return the ads set explicitly in the store
      return this.$store.state.advertising.rectangle
    },
    postDate: function() {
      // Pretty-format the post date (January 1, 2019)
      return dayjs(this.date).format('MMMM D, YYYY')
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
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    if (payload && isStatic) {
      store.commit('addPage', [payload])
    } else {
      await store.dispatch('getPage', params)
    }
  },
  scrollToTop: true,
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  head() {
    return {
      title: this.post.title.rendered + ' · Dirt Rag',
      bodyAttrs: {
        class: 'single page page-id-' + this.post.id
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
          content: this.featuredMedia
        }
      ]
    }
  }
}
</script>

<style lang="scss">
article.page {
  font-family: 'Libre Franklin', sans-serif;
  line-height: 1.6;
}

article.page a {
  color: #EB181D;
}

.page-header {
  grid-column: full;
  background: #292724;
  position: relative;
  @media (min-width: 1000px) {
    background: #F5F3EF;
  }
  &.has-artwork {
    padding-bottom: 66%;
    @media (min-width: 1000px) {
      padding-bottom: 0;
      padding-top: 50%;
    }
  }
}

.page-artwork {
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

.page-title-block {
  color: #F5F3EF;
  padding: 1rem 0;
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr)
    [main-start] minmax(0, 45em) [main-end]
    minmax(1em, 1fr) [full-end];
  grid-column-gap: 1rem;
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

  .page-title {
    grid-column: main;
    font-size: 2.5rem;
    margin: 0;
    line-height: 1;
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  .page-author {
    grid-column: main;
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
  }

  .page-sharing {
    grid-column: main;
    margin-top: 1rem;
    @media (min-width: 1000px) {
      margin-top: 0;
      grid-column: sidebar;
    }
  }
}

.page-content {
  padding: 0 2%;
  border-top: 1px solid #efefef;
  @media (min-width: 1000px) {
    padding: 0;
    display: grid;
    grid-row-gap: 2em;
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

.page-copy {
  grid-column: main;
}

.page-copy img {
  width: 100% !important;
}

@media (min-width: 1000px) {
  .page-copy figure {
    position: relative;
    z-index: 3;
    transition: all 0.2s ease;
  }
  .page-copy figure img {
    cursor: zoom-in;
  }
  .page-copy figure.zoomed {
    width: calc(100% + 300px + 2em) !important;
    background: #292724;
    color: #F5F3EF;
    outline: 1em solid #292724;
    box-shadow: 0 0 4em rgba(0, 0, 0, 0.25);
    margin: 2em 0;
  }
  .page-copy figure.zoomed img {
    cursor: zoom-out;
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
