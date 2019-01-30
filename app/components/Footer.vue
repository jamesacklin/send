<template lang="html">
  <footer role="colophon">
    <div class="footer-content">
      <small>&copy; 2019 Rotating Mass Media. All rights reserved.</small>
    </div>
    <div class="footer-sidebar">
      <ul>
        <li v-for="link in footerLinks" :key="link.index">
          <nuxt-link :to="link.href" tag="a"> {{ link.name }} </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    footerLinks: function() {
      // FIXME: Make footerLinks a Vuex getter
      return this.$store.state.footerLinks
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  font-family: 'Roboto Mono', monospace;
  line-height: 1.6;
  width: 100%;
  background: #000000;
  color: white;
  margin-top: 2rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
    [main-end] minmax(1em, 1fr) [full-end];
  grid-auto-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  @media (min-width: 1000px) {
    padding: 2rem 0;
    grid-template-columns:
      [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
      [main-end sidebar-start] 300px [sidebar-end] minmax(1em, 1fr) [full-end];
    grid-column-gap: 2em;
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em)
      [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
  }
}

ul {
  margin-top: 0;
  padding-left: 0;
}

ul li {
  list-style: none;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.footer-content {
  grid-column: main;
}

.footer-sidebar {
  grid-column: main;
  @media (min-width: 1000px) {
    grid-column: sidebar;
  }
}
</style>
