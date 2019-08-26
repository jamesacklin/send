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
  position: fixed;
  z-index: 10;
}

header a {
  font-family: 'Roboto Mono';
  color: #f5f3ef;
}

header a:focus,
header a:active {
  color: #eb181d;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  grid-column: main;
  @media (min-width: 800px){
    padding: 0.5rem 1.5rem 0.5rem 0;
  }
  @media (min-width: 1150px){
    padding: 0.5rem 1.5rem 0.5rem 0;
  }
}
</style>
