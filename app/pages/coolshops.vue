<template>
  <div class="content">
    <article class="page">
      <header class="page-header">
        <div class="page-title-block">
          <h1 class="page-title">
            Cool Shops
          </h1>
        </div>
      </header>
      <div class="page-content">
        <main>
          <AdHeader />
          <div class="page-copy">
            <p>Bike shops that carry Dirt Rag magazine. Find one near you!</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <div 
                v-for="shop in shops" 
                :key="shop.index" 
                style="width: 48%"
              >
                <h3 style="margin-bottom: 0">
                  {{ shop.store }}
                </h3>
                <address style="font-style: normal">
                  {{ shop.address }}
                  <br>
                  {{ shop.city }}, {{ shop.state }}
                  <br>
                  {{ shop.zip }}
                </address>
              </div>
            </div>
            <hr>
            <p>We love our local bike shops, and we'd love to have you listed here.</p>
            <p>
              Head over to our
              <a
                href="https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=DRM&amp;cds_page_id=221362"
                target="_blank"
                rel="noopener noreferrer"
              >sign up page</a>, and start carrying Dirt Rag magazine!
            </p>
            <p>
              Need to update your shop information? Use our&nbsp;
              <a
                href="https://w1.buysub.com/pubs/RG/DRM/login.jsp?cds_page_id=164761&amp;cds_mag_code=DRM"
              >customer service</a>&nbsp;page.
            </p>
            <p>
              If you have any questions about the program, feel free to email us at
              <a
                href="mailto:bikeshops@dirtragmag.com"
              >bikeshops@dirtragmag.com</a>
            </p>
          </div>
        </main>
        <aside class="advertising">
          <no-ssr>
            <ad-sidebar :sidebarData="ads" />
          </no-ssr>
        </aside>
      </div>
    </article>
  </div>
</template>

<script>
import AdHeader from '@/components/PageComponents/AdHeader'
import AdSidebar from '@/components/PageComponents/AdSidebar'

export default {
  components: {
    AdSidebar,
    AdHeader
  },
  computed: {
    shops() {
      // Return the list of shops set explicitly in the store
      const shops = this.$store.state.shops
      return shops.sort((a, b) => parseFloat(a.zip) - parseFloat(b.zip))
    },
    ads() {
      // Return the ads set explicitly in the store
      return this.$store.state.advertising.rectangle
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  head() {
    return {
      title: 'Cool Shops · Dirt Rag',
      bodyAttrs: {
        class: 'single page'
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Rad bike shops across the country who stock Dirt Rag Magazine'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Cool Shops | Dirt Rag'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Rad bike shops across the country who stock Dirt Rag Magazine'
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

.page a {
  color: #eb181d;
}

.page-header {
  grid-column: full;
  background: #292724;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 1000px) {
    background: #f5f3ef;
    min-height: 12.5em;
    justify-content: center;
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
