<template>
  <div class="content">
    <article :id="'page-id-' + this.post.id" class="page">
      <header class="page-header" :class="{ 'has-artwork': featuredMedia }">
        <featured-media v-if="featuredMedia" :media="post._embedded['wp:featuredmedia'][0]"/>
        <div class="page-title-block">
          <h1 class="page-title" v-html="post.title.rendered"></h1>
        </div>
      </header>
      <div class="page-content">
        <main>
          <AdHeader/>
          <div class="page-copy" v-html="post.content.rendered"/>
        </main>
        <aside class="advertising">
          <no-ssr>
            <ad-sidebar :sidebarData="ads"/>
          </no-ssr>
        </aside>
      </div>
    </article>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import AdHeader from '@/components/PageComponents/AdHeader'
import AdSidebar from '@/components/PageComponents/AdSidebar'

export default {
  components: {
    AdSidebar,
    AdHeader
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
      return dayjs(this.post.date).format('MMMM D, YYYY')
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
  async asyncData({ payload, isStatic, store, params, error, redirect }) {
    if (payload && isStatic) {
      store.commit('addPage', [payload])
    } else {
      try {
        await store.dispatch('getPage', params)
      } catch (error) {
        redirect(301, `/articles/${params.slug}`)
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
      title: this.post.title.rendered + ' · Dirt Rag',
      bodyAttrs: {
        class: 'single page page-id-' + this.post.id
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '')
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title.rendered + ' | Dirt Rag'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '')
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
.page {
  font-family: 'Libre Franklin', sans-serif;
  line-height: 1.6;
}

article.page a {
  color: #eb181d;
}

.page-header {
  grid-column: full;
  background: #292724;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 78px;
  @media (min-width: 800px){
    margin-top: 108.781px;
  }
  @media (min-width: 1000px) {
    background: #f5f3ef;
    min-height: 12.5em;
    justify-content: center;
  }
  @media (min-width: 1150px){
    margin-top: 67.5625px;
  }
  &.has-artwork {
    .page-title-block {
      order: 1;
    }
    .page-artwork {
      order: 2;
    }
    @media (min-width: 1000px) {
      .page-title-block {
        order: 2;
      }
      .page-artwork {
        order: 1;
      }
    }
  }
}

.page-title-block {
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

.page-content {
  padding: 0 2%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
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

main {
  grid-column: main;
}

aside {
  grid-column: main;
  @media (min-width: 1000px) {
    grid-column: sidebar;
  }
}

.page .advertising-header {
  margin: 1em 0 0;
  text-align: center;
}

.page-copy {
  padding-top: 1em;
}

.page-copy iframe {
  max-width: 100%;
}

.page-copy .wp-caption.aligncenter,
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
    color: #f5f3ef;
    outline: 1em solid #292724;
    box-shadow: 0 0 4em rgba(0, 0, 0, 0.25);
    margin: 2em 0;
  }
  .page-copy figure.zoomed img {
    cursor: zoom-out;
  }
}

.page-author-bio {
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
  padding-top: 2rem;
}

.page-comments {
  margin-top: 2rem;
}
</style>
