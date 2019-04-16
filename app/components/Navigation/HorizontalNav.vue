<template lang="html">
  <div>
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
nav {
  display: flex;
  flex-direction: row;
}
</style>
