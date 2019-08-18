<template lang="html">
  <nav class="page-navigation">
    <ul class="pagination">
      <li>
        <NuxtLink :to="`/page/${ pagePrev }`">Previous</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/page/${ pageNext }`">Next</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    pagePrev() {
      return parseInt(this.$route.params.page || 1) - 1
    },
    pageNext() {
      return parseInt(this.$route.params.page || 1) + 1
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
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  li {
    text-align: center;
    width: 50%;
    height: 100%;
    float: left;
    a {
      font-family: "Roboto Mono", monospace;
      font-weight: 500;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f5f3ef;
      text-decoration: none;
      padding: 1rem 0;
      background: #eb181d;
      svg {
        fill: #f5f3ef;
      }
      &:hover {
        background: #292724;
      }
    }
  }
}
</style>
