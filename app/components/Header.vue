<template lang="html">
  <div ref="banner" :class="{ block: pastHeader }">
    <header role="banner" :class="{ sticky: pastHeader }">
      <div class="header-content">
        <button class="nav-toggle" @click="openNav()">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
        <div class="logo-wrapper">
          <nuxt-link tag="a" :to="`/`">
            <Logo style="cursor: pointer;" orientation="horizontal" />
          </nuxt-link>
        </div>
      </div>
      <div class="header-sidebar"><OutsideFeed /></div>
      <Ticker ref="ticker" :tickerStories="tickerStories" />
    </header>
  </div>
</template>

<script>
// TODO: Banner ad in header
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
      // FIXME: Make tickerStories a Vuex getter
      return this.$store.state.tickerStories
    }
  },
  methods: {
    scrollHeader() {
      // On scroll, evaluate window scroll position and decide if we should
      // fix the header or not
      const scrollY = window.scrollY
      const tickerHeight = 30
      if (scrollY >= tickerHeight) {
        return true
      } else {
        return false
      }
    },
    openNav() {
      this.$store.dispatch('openNavDrawer')
    }
  },
  beforeMount() {
    // Add our scroll listener for the fixed header
    document.addEventListener('scroll', () => {
      this.pastHeader = this.scrollHeader()
    })
  },
  beforeDestroy() {
    // Destroy our scroll listener for the fixed header
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
  background: #292724;
  /* transition: background-color 0.2s ease, height 0.2s ease; */
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
    [main-end] minmax(1em, 1fr) [full-end];
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
  color: #F5F3EF;
}

header a:focus,
header a:active {
  color: #EB181D;
}

header a.nuxt-link-exact-active {
  color: #EB181D;
}

.block {
  position: relative;
  @media (min-width: 812px) {
    height: 200px;
  }
  background: #292724;
}

header.sticky {
  position: fixed;
  z-index: 2;
  background: transparent;
}

.header-content {
  grid-column: main;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-toggle {
  -webkit-appearance: none;
  background: #292724;
  border: none;
  outline: none;
  font-size: 2em;
  color: #F5F3EF;
  padding: 0 0.33em;
  margin: 0;
  cursor: pointer;
}

.nav-toggle:hover {
  background: #EB181D;
}

.logo-wrapper {
  width: 200px;
  background: #292724;
}

header.sticky .logo-wrapper {
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
  width: 300px;
}

header.sticky .outside-player {
  position: absolute;
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
