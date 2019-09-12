<template>
  <div class="nav-logo-wrapper">
    <button class="nav-toggle" @click="openNav()" v-if="!isOpen">
      <font-awesome-icon :icon="['fas', 'bars']"/>
    </button>
    <button class="nav-toggle" @click="closeNav()" v-if="isOpen">
      <font-awesome-icon :icon="['fas', 'times']"/>
    </button>
    <div class="logo-wrapper">
      <nuxt-link tag="a" :to="`/`">
        <Logo style="cursor: pointer;" variant="30annv"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'NavLogo',
  props: ['variant'],
  components: {
    Logo
  },
  computed: {
    isOpen() {
      return this.$store.state.navDrawerOpen
    }
  },
  methods: {
    openNav() {
      // Dispatch vuex action to flip navDrawerOpen to true
      this.$store.dispatch('openNavDrawer')
    },
    closeNav() {
      // Dispatch vuex action to flip navDrawerOpen to false
      this.$store.dispatch('closeNavDrawer')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  @media (min-width: 945px) {
    display: none;
  }
}

.nav-toggle:hover {
  background: #eb181d;
}

.logo-wrapper {
  width: 200px;
  background: #292724;
}
</style>
