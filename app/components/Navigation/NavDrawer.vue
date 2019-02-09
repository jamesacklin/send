<template lang="html">
  <div class="nav-drawer-wrapper" :class="drawerStatus">
    <div class="nav-drawer">
      <div class="nav-drawer-header">
        <div class="logo-wrapper">
          <Logo bgColor="black" orientation="horizontal" />
        </div>
        <button class="nav-toggle" @click="closeNav()">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      <nav>
        <NavItem
          v-for="navLink in navLinks"
          @click="closeNav()"
          :key="navLink.index"
          :text="navLink.name"
          :link="navLink.href"
        />
      </nav>
    </div>
  </div>
</template>

<script>
import NavItem from '@/components/Navigation/NavItem'
import Logo from '@/components/Logo'

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
    // FIXME: account for when route.to and route.from are the same
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
  transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
  background: #EB181D;
  padding: 2rem;
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
  justify-content: space-between;
  min-width: 25em;
  width: 50%;
}

.nav-drawer-header {
  margin: 1rem 0 2rem;
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
  padding: 0.13em 0.5em;
  margin: 0;
  cursor: pointer;
}

.nav-toggle:hover {
  background: #F5F3EF;
  color: #292724;
}

.logo-wrapper {
  width: 200px;
  background: #292724;
}
</style>
