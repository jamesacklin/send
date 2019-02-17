<template>
  <div class="comments">
     <vue-disqus shortname="dirtragmag" :identifier="page_id" :url="page_url"></vue-disqus>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  computed: {
    page_id() {
      return this.$route.fullPath
    },
    page_url() {
      return `https://www.dirtragmag.com${this.$route.fullPath}`
    }
  }
}
</script>

<style>

</style>
