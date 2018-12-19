<template>
  <div>
    <Header />
    <transition name="fade" appear> <nuxt /> </transition>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>
