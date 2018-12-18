<template>
  <div>
    <Ticker :tickerStories="tickerStories" />
    <div>
      <header style="margin-bottom: 1rem; padding: 1rem;">
        <div style="width: 200px; margin: 1rem auto;">
          <nuxt-link tag="div" :to="`/`">
            <Logo style="cursor: pointer;" orientation="horizontal" />
          </nuxt-link>
        </div>
      </header>
      <transition name="fade" appear> <nuxt /> </transition>
    </div>
  </div>
</template>

<script>
import Ticker from '@/components/Ticker'
import Logo from '@/components/Logo'

export default {
  components: {
    Ticker,
    Logo
  },
  computed: {
    tickerStories() {
      return this.$store.state.tickerStories
    }
  }
}
</script>
