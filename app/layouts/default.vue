<template>
  <div>
    <Header />

    <nuxt />
    <Pagination />
  </div>
</template>

<script>
import Header from '@/components/Header'

import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    Header,

    Pagination
  }
}
</script>
