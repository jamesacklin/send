<template lang="html">
  <div class="horizontal-nav">
    <nav>
      <NavItem
        v-for="navLink in navLinks"
        :key="navLink.index"
        :text="navLink.name"
        :link="navLink.href"
        :color="navLink.color"
      />
      <div class="search-component">
        <Search />
      </div>
    </nav>
  </div>
</template>

<script>
import Search from '@/components/Search'
import NavItem from '@/components/Navigation/NavItem'

export default {
  name: 'HorizontalNav',
  components: {
    NavItem,
    Search
  },
  computed: {
    navLinks: function() {
      // FIXME: Make navlinks a Vuex getter
      return this.$store.state.navItems
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.horizontal-nav {
  flex-grow: 1;
  display: none;
  @media (min-width: 945px) {
    display: block;
  }
}

.horizontal-nav .search-component {
  min-width: 23em;
  width: 0;
  margin: 0;
  font-size: 66%;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 945px) {
    flex-wrap: wrap;
    > div {
      width: auto;
    }
    .search-component {
      align-self: flex-end;
      padding: 0 1em;
      width: 100% !important;
      margin-top: 1em !important;
    }
  }
  @media (min-width: 1200px) {
    flex-wrap: nowrap;
    .search-component {
      align-self: flex-end;
      padding: 0;
      width: auto !important;
      margin-top: 0 !important;
    }
  }
}
</style>
