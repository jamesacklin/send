<template lang="html">
  <nav class="page-navigation">
    <ul class="pagination">
      <li>
        <NuxtLink
          v-if="parseInt(this.$route.params.page || 1) >= 2 
                && navScheme === 'traversePages'" 
          :to="pagePrev">
          &larr; Previous
        </NuxtLink>
        <NuxtLink
          v-if="navScheme === 'goHome'"
          :to="'/'">
          &larrb; Go Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          v-if="navScheme === 'traversePages'"
          :to="pageNext">
          Next &rarr;
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    navScheme() {
      return this.$route.meta.navigationScheme
    },
    pagePrev() {
      const { navigationScheme, siblings } = this.$route.meta
      const { page, slug } = this.$route.params
      const pageInt = parseInt(page || 1) - 1
      if (siblings === 'index'){
          return `/page/${pageInt}`
      } else if (siblings === 'search' || 'category'){
          return `/${siblings}/${slug}/page/${pageInt}`
      } else {
        return "#"
      }
    },
    pageNext() {
      const { navigationScheme, siblings } = this.$route.meta
      const { page, slug } = this.$route.params
      const pageInt = parseInt(page || 1) + 1
      if (siblings === 'index'){
          return `/page/${pageInt}`
      } else if (siblings === 'search' || 'category'){
          return `/${siblings}/${slug}/page/${pageInt}`
      } else {
        return "#"
      }
    }
  }
}
</script>

<style lang="scss">
.page-navigation {
  position: fixed;
  z-index: 4;
  bottom: 0;
  left: 0;
  width: 100%;
}
.pagination {
  list-style: none;
  background: #292724;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    text-align: center;
    width: 50%;
    height: 100%;
    a {
      align-items: center;
      background: #eb181d;
      color: #f5f3ef;
      display: flex;
      font-family: "Roboto Mono", monospace;
      font-weight: 500;
      justify-content: center;
      outline: none;
      padding: 1rem 0;
      text-decoration: none;
      white-space: nowrap;
      &:hover {
        background: #961f21;
      }
    }
  }
}
</style>
