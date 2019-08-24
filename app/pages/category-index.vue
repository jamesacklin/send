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
