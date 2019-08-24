<template>
  <div class="app-view">
    <Header/>
    <!-- <NavDrawer/> -->
    <nuxt/>
    <Footer/>
    <Pagination/>
    <svg id="filters" xmlns="http://www.w3.org/2000/svg" height="0">
      <filter id="red">
        <feColorMatrix type="matrix" values="0.1 2 0 0.7 0.1 0 1 0 0 0 0 1 0 0 0 0 1 0 1 0 "></feColorMatrix>
      </filter>
    </svg>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponents/Header'
import Footer from '@/components/Footer'
// import NavDrawer from '@/components/Navigation/NavDrawer'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    Header,
    Footer,
    // NavDrawer,
    Pagination
  }
}
</script>

<style lang="css" scoped>
.app-view {
  background-color: #f5f3ef;
  padding-bottom: 34px;
}
</style>
