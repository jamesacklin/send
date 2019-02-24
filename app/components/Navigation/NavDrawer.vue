<template lang="html">
  <div class="nav-drawer-wrapper" :class="drawerStatus">
    <div class="nav-drawer">
      <div class="nav-drawer-header">
        <NavLogo variant="drawer" />
      </div>
      <search />
      <nav>
        <NavItem
          v-for="navLink in navLinks"
          @click.native="closeNav()"
          :key="navLink.index"
          :text="navLink.name"
          :link="navLink.href"
        />
      </nav>
      <div class="nav-drawer-footer">
        <small>&copy; 2019 Rotating Mass Media. All rights reserved.</small>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import NavItem from '@/components/Navigation/NavItem'
import NavLogo from '@/components/Navigation/NavLogo'

export default {
  name: 'NavDrawer',
  components: {
    NavItem,
    Search,
    NavLogo
  },
  computed: {
    navLinks: function() {
      // FIXME: Make navlinks a Vuex getter
      return this.$store.state.navItems
    },
    drawerStatus: function() {
      // Return a class depending on the boolean value of navDrawerOpen in Vuex
      return {
        'nav-drawer-hide': !this.$store.state.navDrawerOpen,
        'nav-drawer-show': this.$store.state.navDrawerOpen
      }
    }
  },
  methods: {
    closeNav() {
      // Dispatch vuex action to flip navDrawerOpen to false
      this.$store.dispatch('closeNavDrawer')
    }
  },
  watch: {
    // Watch route, close nav on route change
    // https://stackoverflow.com/questions/46402809/vuejs-event-on-route-change
    $route(to, from) {
      this.closeNav()
    }
  }
}
</script>

<style lang="scss" scoped>
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
  background: #292724;
  box-shadow: -20em 0 0 #292724;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.nav-drawer nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  // align-items: stretch;
  justify-content: stretch;
  min-width: 20em;
  width: 50%;
}

.nav-drawer-header {
  margin: 1rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-logo-wrapper {
  display: inline-flex;
  background: #292724;
  align-content: center;
  align-items: center;
}

.nav-toggle {
  -webkit-appearance: none;
  background: #292724;
  border: none;
  outline: none;
  font-size: 2em;
  color: #f5f3ef;
  padding: 0 0.33em;
  margin: 0;
  cursor: pointer;
}

.nav-toggle:hover {
  background: #eb181d;
}

.logo-wrapper {
  width: 200px;
  background: #292724;
}

.nav-toggle:hover {
  background: #f5f3ef;
  color: #292724;
}

.logo-wrapper {
  width: 200px;
  background: #292724;
}

.nav-drawer-footer {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.25);
  color: #f5f3ef;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  font-size: 80%;
}

.search-component {
  min-width: 20em;
  width: 50%;
}
</style>
