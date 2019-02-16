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
    isUrl(link){
      let pattern = /^((http|https|ftp):\/\/)/;
      if(pattern.test(link)){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="css">
.nav-item {
  display: block;
  background: #eb181d;
  width: 100%;
  color: #F5F3EF;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  text-align: center;
  padding: 1em;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 1vh;
}

.nav-item.nav-item-external {
  background: rgb(14,121,193);
}

.nav-item:hover {
  color: #292724;
  background: #F5F3EF;
}
</style>
