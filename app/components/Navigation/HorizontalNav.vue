<template lang="html">
  <div class="horizontal-nav">
    <nav>
      <NavItem
        v-for="navLink in navLinks"
        :key="navLink.index"
        :text="navLink.name"
        :link="navLink.href"
      />
      <Search />
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

.horizontal-nav .search-component {
  min-width: 23em;
  width: 0;
  margin: 0;
  font-size: 70%
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 800px) {
    flex-wrap: wrap;
    padding-left: 1rem;
    > div {
      width: 25%;
    }
    .search-component {
      align-self: flex-end;
      width: 100% !important;
      margin-top: 1em !important;
    }
  }
  @media (min-width: 1150px) {
    flex-wrap: nowrap;
    > div {
      width: auto;
    }
    .search-component {
      align-self: flex-end;
      width: auto !important;
      margin-top: 0 !important;
    }
  }
}


</style>
