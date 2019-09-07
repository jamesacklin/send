<template lang="html">
  <div>
    <nuxt-link 
      v-if="!isUrl(link)" 
      :to="link" 
      tag="a" 
      class="nav-item"
    >
      {{ text }}
    </nuxt-link>
    <a 
      v-if="isUrl(link)" 
      :href="link" 
      target="_blank" 
      class="nav-item nav-item-external"
      :style="linkColor"
    >
      {{ text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: ['text', 'link', 'color'],
  computed: {
    linkColor() {
      if (this.color) {
        // FIXME: obviously this does not work
        return `
        background: ${this.color};
        @media (min-width: 800px){
          background: transparent;
          color: ${this.color};
        }`
      } else {
        return ``
      }
    }
  },
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
