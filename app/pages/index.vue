<template>
  <main class="content">
    <section class="feed">
      <SectionHeader :sectionMeta="homeHeaderData" />
      <div class="feed-items">
        <feed :feedData="feedItems"/>
      </div>
      <div v-if="!isMobile" class="sidebar-ads">
        <ad-sidebar :sidebarData="sidebarAds"/>
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
  async asyncData({ payload, isStatic, store, params }) {
    await store.dispatch('setCurrents', {
      slug: '',
      id: null
    })
    await store.dispatch('getPosts', {
      queryType: 'default',
      page: parseInt(params.page || 1)
    })
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
        queryType: 'default',
        query: ''
      })
    },
    ads() {
      // Return the ads set explicitly in the store
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
    homeHeaderData() {
      return {
        title: 'Dirt Rag Magazine',
        content: '<p>Over 30 Years of Independent Mountain Bike Coverage! <a href="http://www.google.com">Subscribe Today!</a></p>',
        img: 'https://images.unsplash.com/photo-1522057306606-8d84daa75e87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
      }
    }
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'home archive'
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
