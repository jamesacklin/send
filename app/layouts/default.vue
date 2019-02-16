<template>
  <div class="app-view">
    <Header />
    <NavDrawer />
    <nuxt />
    <Footer />
    <Pagination />
  </div>
</template>

<script>
import Header from '@/components/HeaderComponents/Header'
import Footer from '@/components/Footer'
import NavDrawer from '@/components/Navigation/NavDrawer'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    Header,
    Footer,
    NavDrawer,
    Pagination
  }
}
</script>

<style lang="css" scoped>
/* FIXME: Figure out some way to pad the bottom of the page based on the pagination height */
.app-view {
  background-color: #F5F3EF;
  padding-bottom: 40px;
}
</style>
