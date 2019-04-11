<template lang="html">
  <div ref="banner" :class="{ block: pastHeader }">
    <header role="banner" :class="{ sticky: pastHeader }">
      <div class="header-content">
        <NavLogo variant="banner" />
      </div>
      <div class="header-sidebar"><OutsideFeed /></div>
    </header>
  </div>
</template>

<script>
// import Advertising from '@/components/Advertising'
import NavLogo from '@/components/Navigation/NavLogo'
import OutsideFeed from '@/components/HeaderComponents/OutsideFeed'
// import Ticker from '@/components/HeaderComponents/Ticker'

export default {
  components: {
    // Advertising,
    NavLogo,
    OutsideFeed,
    // Ticker
  },
  data() {
    return {
      pastHeader: false,
      bannerHeight: null
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
  position: relative;
  z-index: 1;
  /* transition: background-color 0.2s ease, height 0.2s ease; */
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
    [main-end] minmax(1em, 1fr) [full-end];
  grid-auto-rows: auto;
  grid-row-gap: 0;
  @media (min-width: 800px) {
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
  color: #f5f3ef;
}

header a:focus,
header a:active {
  color: #eb181d;
}

header a.nuxt-link-exact-active {
  color: #eb181d;
}

.block {
  position: relative;
  @media (min-width: 812px) {
    height: 122px;
  }
  background: #292724;
}

header.sticky {
  position: fixed;
  z-index: 2;
  background: transparent;
  div[data-google-query-id] {
    display: none;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  grid-column: main;
}

header .header-sidebar {
  grid-column: sidebar;
  position: relative;
}

@media (max-width: 812px) {
  header .outside-player {
    display: none;
  }
}

header .outside-player:not(:empty) {
  width: 300px;
  position: absolute;
  top: 100px;
}

header.sticky .outside-player {
  top: 1.5em;
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
