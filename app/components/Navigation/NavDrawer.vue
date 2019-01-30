<template lang="html">
  <div class="nav-drawer-wrapper" :class="drawerStatus">
    <div class="nav-drawer">
      <button @click="closeNav()">close nav</button>
      <div class="nav-logo">
        <Logo bgColor="black" orientation="horizontal" />
      </div>
      <nav>
        <NavItem
          v-for="navLink in navLinks"
          :key="navLink.index"
          :text="navLink.name"
          :link="navLink.href"
        />
      </nav>
    </div>
  </div>
</template>

<script>
import NavItem from './NavItem'
import Logo from '../Logo'

export default {
  name: 'NavDrawer',
  components: {
    NavItem,
    Logo
  },
  computed: {
    navLinks: function() {
      // FIXME: Make navlinks a Vuex getter
      return this.$store.state.navItems
    },
    drawerStatus: function() {
      return {
        'nav-drawer-hide': !this.$store.state.navDrawerOpen,
        'nav-drawer-show': this.$store.state.navDrawerOpen
      }
    }
  },
  methods: {
    closeNav() {
      this.$store.dispatch('closeNavDrawer')
    }
  }
}
</script>

<style lang="scss">
.nav-drawer-wrapper {
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.nav-drawer-hide {
  visibility: hidden;
  opacity: 0;
  top: 0;
  left: -20rem;
}

.nav-drawer-show {
  visibility: visible;
  opacity: 1;
  top: 0;
  left: 0;
}

.nav-drawer {
  background: red;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.nav-logo {
  margin: 0 auto;
  padding: 1rem 25vw 5rem;
}

.nav-drawer nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 25em;
  width: 50%;
}
</style>
