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

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export default {
  components: {
    Feed,
    AdSidebar,
    SectionHeader
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
        queryType: 'category',
        query: this.$store.state.current.id
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
    categoryHeaderData(){
      const categoryMeta = this.$store.getters.getCategoryBySlug(this.$route.params.slug)
      return {
        title: titleCase(categoryMeta.name),
        bg: categoryMeta.acf.category_background_image
      }
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    await store.dispatch('getCategory', {
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
        class: 'archive category-archive'
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