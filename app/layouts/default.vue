<template>
  <div class="app-view">
    <Header />
    <nuxt />
    <Pagination />
  </div>
</template>

<script>
// TODO: Create a global footer
import Header from '@/components/Header'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    Header,
    Pagination
  }
}
</script>

<style lang="css" scoped>
/* FIXME: Figure out some way to pad the bottom of the page based on the pagination height */
.app-view {
  padding-bottom: calc(40px + 2rem);
}
</style>
