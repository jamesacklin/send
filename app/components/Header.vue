<template lang="html">
  <div ref="banner" :class="{ block: pastHeader }">
    <header role="banner" :class="{ sticky: pastHeader }">
      <div class="logo-wrapper">
        <nuxt-link tag="a" :to="`/`">
          <Logo style="cursor: pointer;" orientation="horizontal" />
        </nuxt-link>
      </div>
      <div class="header-sidebar"><OutsideFeed /></div>

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
      // FIXME: this
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

<style lang="scss" scoped>
header[role='banner'] {
  top: 0;
  width: 100%;
  background: #000000;
  /* transition: background-color 0.2s ease, height 0.2s ease; */
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
    [main-end] 300px minmax(1em, 1fr) [full-end];
  grid-auto-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 0;
  @media (min-width: 1000px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
      [main-end sidebar-start] 300px [sidebar-end] minmax(1em, 1fr) [full-end];
    grid-column-gap: 2em;
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em)
      [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
  }
}

header a {
  font-family: 'Roboto Mono';
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
  height: 200px;
}

header.sticky {
  position: fixed;
  z-index: 2;
  background: transparent;
}

.logo-wrapper {
  grid-column: main;
  width: 200px;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  /* transform: translateX(-0.5em) */
}

header.sticky .logo-wrapper {
  background: #000;
  width: 150px;
}

header .header-sidebar {
  grid-column: sidebar;
}

@media (max-width: 812px) {
  header .outside-player {
    display: none;
  }
}

header .outside-player:not(:empty) {
}

header.sticky .outside-player {
  position: absolute;
  width: 300px;
}

header.sticky .outside-player:not(:empty) {
}

header .ticker {
  grid-column: full;
  grid-row: 1;
}

header.sticky .ticker {
  visibility: hidden;
  height: 0px;
  grid-row: 1;
}
</style>
