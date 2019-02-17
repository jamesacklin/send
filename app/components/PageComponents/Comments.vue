<template>
  <div class="comments">
    <vue-disqus 
      shortname="dirt-rag-mag" 
      :identifier="page_url"
      :url="page_url"
    />
  </div>
</template>

<script>
export default {
  name: 'Comments',
  computed: {
    page_url() {
      // This isn't the *acutal* page URL, but it lines up with the permalink scheme
      // from the old site (which doesn't have an /articles/%postname% prefix).
      // Whatever, the Disqus comments seem to work, so let's leave it at that.
      return `https://www.dirtragmag.com/${this.$route.params.slug}`
    }
  }
}
</script>

<style>
</style>
