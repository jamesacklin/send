<template lang="html">
  <div ref="banner">
    <header role="banner">
      <div class="header-content">
        <NavLogo variant="banner" />
        <HorizontalNav />
      </div>
    </header>
  </div>
</template>

<script>
import NavLogo from '@/components/Navigation/NavLogo'
import HorizontalNav from '@/components/Navigation/HorizontalNav'

export default {
  components: {
    HorizontalNav,
    NavLogo
  },
  methods: {
    openNav() {
      this.$store.dispatch('openNavDrawer')
    }
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
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] minmax(0, 72.5em)
    [main-end] minmax(1em, 1fr) [full-end];
  grid-auto-rows: auto;
  grid-row-gap: 0;
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

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  grid-column: main;
}
</style>
