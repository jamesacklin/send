<template>
  <main class="content">
    <section class="feed search-feed">
      <SectionHeader :sectionMeta="searchHeaderData" />
      <div class="feed-items">
        <feed :feedData="feedItems"/>
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

export default {
  components: {
    Feed,
    SectionHeader,
  },
  computed: {
    posts() {
      return this.$store.getters.getPostsByPage({
        page: parseInt(this.$route.params.page || 1),
        queryType: 'search',
        query: this.$route.params.slug
      })
    },
    feedItems() {
      return this.posts
    },
    searchHeaderData(){
      return {
        title: `Search Results for <em>${this.$route.params.slug}</em>`,
        content: `Page ${parseInt(this.$route.params.page || 1)}`
      }
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
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