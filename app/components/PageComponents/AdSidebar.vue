<template>
  <div class="advertising">
    <div v-if="contestPosts">
      <div v-for="(post, index) in contestPosts" :key="index">
        <PostAtom
          :id="post.id"
          :key="post.index"
          :slug="post.slug"
          :title="post.title.rendered"
          :date="post.date"
          :excerpt="post.excerpt.rendered"
          :mode="`promotion`"
        />
      </div>
    </div>
    <template v-for="ad in sidebarData">
      <advertising
        :id="ad.id"
        :size="ad.size"
        :unit="ad.name"
        :key="ad.index"
      />
    </template>
  </div>
</template>

<script>
import Advertising from '@/components/Advertising'
import PostAtom from '@/components/PostAtom'

export default {
  name: 'adSidebar',
  props: ['sidebarData'],
  components: {
    Advertising,
    PostAtom
  },
  computed: {
    contestPosts: function() {
      return this.$store.state.contestPosts
    }
  },
  mounted () {
    this.$store.dispatch('getContestPosts')
  }
}
</script>

<style>
.advertising > div:not(:empty) {
  background: #f5f3ef;
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 0 1rem;
}
</style>
