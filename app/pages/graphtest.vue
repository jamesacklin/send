<template>
  <div style="padding-top: 5em">
    <PostAtom
      v-for="post in posts"
      :id="post.id"
      :key="post.cursor"
      :picture-url="`https://doglime.com/wp-content/uploads/2019/05/Standard-Red-Poodle.jpg`"
      :slug="`#`"
      :title="post.node.title"
      :date="post.node.date"
      :excerpt="post.node.excerpt"
    />
  </div>
</template>

<script>
import PostAtom from '@/components/PostAtom'

export default {
  name: 'GraphTest',
  components: {
    PostAtom
  },
  computed: {
    posts () {
      return this.$store.state.graphPosts
    }
  },
  async asyncData({ store }){
    await store.dispatch('getGraphPosts')
  }
}
</script>