<template lang="html">
  <div ref="banner" :class="{ block: pastHeader }">
    <header role="banner" :class="{ sticky: pastHeader }">
      <div class="logo-wrapper">
        <nuxt-link tag="a" :to="`/`">
          <Logo style="cursor: pointer;" orientation="horizontal" />
        </nuxt-link>
      </div>
      <OutsideFeed />
      <Ticker ref="ticker" :tickerStories="tickerStories" />
    </header>
  </div>
</template>

<script>
import Ticker from '@/components/Ticker'
import Logo from '@/components/Logo'
import OutsideFeed from '@/components/OutsideFeed'

export default {
  components: {
    Ticker,
    OutsideFeed,
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
  background: #000000;
  transition: all 0.2s ease;
}

header a {
  font-family: "Roboto Mono";
  color: white;
}

header a:focus,
header a:active {
  color: red;
}

header a.nuxt-link-exact-active {
  color: red;
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
  padding: 1rem 0 1rem 2%;
  transition: all 0.2s ease;
  /* margin: 0 auto; */
}

header.sticky .logo-wrapper {
  width: 125px;
  padding: 0.25rem 0 0.25rem 2%;
}

@media (max-width: 812px){
  header .outside-player {
    display: none;
  }
}

header .outside-player {
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 2%;
  width: 16em;
  transition: all 0.2s ease;
}

header .outside-player:not(:empty){
  outline: 1em solid black;
}

header.sticky .outside-player:not(:empty){
  outline: 0.5em solid black;
  transform: translateX(0.25em)
}

header.sticky .outside-player {
  width: 12em;
}
</style>
