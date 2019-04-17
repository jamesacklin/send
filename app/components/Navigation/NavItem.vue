<template lang="html">
  <div>
    <nuxt-link v-if="!isUrl(link)" :to="link" tag="a" class="nav-item"> {{ text }} </nuxt-link>
    <a v-if="isUrl(link)" :href="link" class="nav-item nav-item-external">{{ text }}</a>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: ['text', 'link'],
  methods: {
    isUrl(link) {
      let pattern = /^((http|https|ftp):\/\/)/
      if (pattern.test(link)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.nav-item {
  font-family: 'Libre Franklin', sans-serif;
  color: white;
  font-weight: 900;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    color: #eb181d;
  }
}
</style>
