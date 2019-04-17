<template lang="html">
  <div class="horizontal-nav">
    <nav>
      <NavItem
        v-for="navLink in navLinks"
        :key="navLink.index"
        :text="navLink.name"
        :link="navLink.href"
      />
    </nav>
  </div>
</template>

<script>
// import Search from '@/components/Search'
import NavItem from '@/components/Navigation/NavItem'

export default {
  name: 'HorizontalNav',
  components: {
    NavItem
  },
  computed: {
    navLinks: function() {
      // FIXME: Make navlinks a Vuex getter
      return this.$store.state.navItems
    }
  },
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.horizontal-nav {
  flex-grow: 1;
  display: none;
  @media (min-width: 800px) {
    display: block;
  }
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 800px) {
    padding-left: 3rem;
  }
  @media (min-width: 1200px) {
    padding-left: 10em;
  }
}
</style>
