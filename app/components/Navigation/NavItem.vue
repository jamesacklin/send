<template lang="html">
  <div :style="cssProps">
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
    >
      {{ text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    'text': String, 
    'link': String, 
    'color': String
  },
  computed: {
    cssProps() {
      if (this.color) {
        return {'--link-color': this.color}
      } else {
        return {'--link-color': '#eb181d'}
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
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  margin-bottom: 0.25em;
  padding: 2vh;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  text-decoration: none;
  background: var(--link-color);
  color: white;
  cursor: pointer;
  &:hover {
    background: white;
    color: #eb181d;
  }
  @media (min-width: 945px){
    margin-bottom: 0;
    padding: 0 0.25em;
    // text-align: left;
    background: transparent;
    &.nav-item-external {
      color: var(--link-color);
    }
    &:hover {
      background: var(--link-color);
      color: white;
    }
  }
}
</style>
