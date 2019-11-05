<template>
  <main class="content">
    <section class="feed search-feed">
      <SectionHeader :section-meta="searchHeaderData" />
      <div class="feed-items">
        <feed :feed-data="feedItems" />
      </div>
      <div
        v-if="!isMobile"
        class="sidebar-ads"
      >
        <ad-sidebar :sidebar-data="sidebarAds" />
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
    SectionHeader,
    AdSidebar
  },
  computed: {
    isMobile: function() {
      if (this.$device.isMobile) {
        return true
      } else {
        return false
      }
    },
    posts() {
      return this.$store.getters.getPostsByPage({
        page: parseInt(this.$route.params.page || 1),
        queryType: 'search',
        query: this.$route.params.slug
      })
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      if (this.isMobile) {
        return compact(flattenDeep(zip(chunk(this.posts, 3), this.ads)))
      } else {
        return this.posts
      }
    },
    sidebarAds() {
      if (!this.isMobile) {
        return this.$store.state.advertising.rectangle
      } else {
        return []
      }
    },
    searchHeaderData(){
      return {
        title: `Search Results for <em>${this.$route.params.slug}</em>`,
        content: `Page ${parseInt(this.$route.params.page || 1)}`
      }
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('getPosts', {
      queryType: 'search',
      slug: params.slug,
      page: parseInt(params.page || 1)
    })
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'archive search-archive'
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