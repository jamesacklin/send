<template>
  <div>
    <Ticker :tickerStories="tickerStories" />
    <transition name="fade" appear> <nuxt /> </transition>
  </div>
</template>

<script>
import Ticker from '@/components/Ticker'

export default {
  components: {
    Ticker
  },
  computed: {
    tickerStories() {
      return this.$store.state.tickerStories
    }
  }
}
</script>
