<template lang="html">
  <div ref="banner" :class="{ block: pastHeader }">
    <Ticker ref="ticker" :tickerStories="tickerStories" />
    <header role="banner" :class="{ sticky: pastHeader }">
      <div class="logo-wrapper">
        <nuxt-link tag="a" :to="`/`">
          <Logo
            style="cursor: pointer;"
            orientation="horizontal"
            :fillColor="logoFill"
          />
        </nuxt-link>
      </div>
    </header>
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
  data() {
    return {
      pastHeader: false,
      bannerHeight: null
    }
  },
  computed: {
    tickerStories() {
      return this.$store.state.tickerStories
    },
    logoFill() {
      if (this.$route.name === 'article-slug' || 'index') {
        return '#FFFFFF'
      } else {
        return '#000000'
      }
    }
  },
  methods: {
    scrollHeader() {
      const scrollY = window.scrollY
      const tickerHeight = 30
      if (scrollY >= tickerHeight) {
        return true
      } else {
        return false
      }
    }
  },
  beforeMount() {
    document.addEventListener('scroll', () => {
      this.pastHeader = this.scrollHeader()
    })
  },
  beforeDestroy() {
    document.removeEventListener('scroll', () => {
      this.pastHeader = this.scrollHeader()
    })
  }
}
</script>

<style lang="css" scoped>

header[role='banner']{
  top: 0;
  width: 100%;
  background: white;
  /* margin-bottom: 1rem; */
  border-bottom: 1px solid #CCC;
  transition: all 0.2s ease;
}

.block {
  position: relative;
  height: 77px;
}

header.sticky {
  position: fixed;
  z-index: 2;
}

.logo-wrapper {
  width: 200px;
  padding: 1rem 0;
  margin: 0 auto;
}

header.sticky .logo-wrapper {
  width: 100px;
  padding: 0.5rem 0;
  margin: 0 auto;
}

.post header {
  background: black;
  border-color: transparent;
}

.post .block {
  background: black;
}

.home header {
  background: black;
  border-color: transparent;
}
</style>
