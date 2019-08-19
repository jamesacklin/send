<template>
  <main class="content">
    <section class="feed category-feed">
      <SectionHeader :sectionMeta="categoryHeaderData" />
      <div class="feed-items">
        <feed :feedData="feedItems" />
      </div>
      <div v-if="!isMobile" class="sidebar-ads">
        <ad-sidebar :sidebarData="sidebarAds" />
      </div>
    </section>
  </main>
</template>

<script>
import compact from 'lodash/compact'
import flattenDeep from 'lodash/flattenDeep'
import zip from 'lodash/zip'
import chunk from 'lodash/chunk'

import SectionHeader from '@/components/PageComponents/SectionHeader'
import Feed from '@/components/PageComponents/Feed'
import AdSidebar from '@/components/PageComponents/AdSidebar'

export default {
  components: {
    Feed,
    AdSidebar,
    SectionHeader
  },
  computed: {
    isMobile: function() {
      // Return true if the device user-agent is "mobile" (as deterimined by 'nuxt-device-detect' module)
      if (this.$device.isMobile) {
        return true
      } else {
        // Otherwise return false and assume we have a desktop or tablet
        return false
      }
    },
    posts() {
      return this.$store.getters.getPostsByPage({
        page: parseInt(this.$route.params.page || 1),
        queryType: 'category',
        query: this.$store.state.current.id
      })
    },
    ads() {
      // Return the ads explicitly set in the store
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      if (this.isMobile) {
        // If the user-agent is "mobile", compose a feed, with an ad
        // inserted every 3 posts. We should have:
        // - 30 posts (set back in the Vuex store as state.postsPerPage),
        // - 10 ad slots (explicitly set back in the Vuex store).
        return compact(flattenDeep(zip(chunk(this.posts, 3), this.ads)))
      } else {
        // If the user-agent is not "mobile", simply return posts.
        return this.posts
      }
    },
    sidebarAds() {
      // If the user agent is not "mobile", return ads from the store
      if (!this.isMobile) {
        return this.$store.state.advertising.rectangle
      } else {
        // Otherwise return an empty array
        return []
      }
    },
    categoryHeaderData(){
      return {
        title: this.$route.params.slug
      }
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    await store.dispatch('getCategoryIdFromSlug', {
      slug: params.slug
    })
    await store.dispatch('getPosts', {
      queryType: 'category',
      slug: params.slug,
      page: parseInt(params.page || 1)
    })
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'home archive category-archive'
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dirt Rag Magazine'
        }
      ]
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
</script>

<style lang="scss">
.feed {
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: auto;
  grid-template-columns:
    [full-start] 0
    [main-start] minmax(0, 1000px) [main-end]
    0 [full-end];
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

.feed-items {
  grid-column: main;
}

.sidebar-ads {
  grid-column: main;
  @media (min-width: 1000px) {
    grid-column: sidebar;
  }
}
</style>
