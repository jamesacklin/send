<template lang="html">
  <div>
    <nuxt-link :to="link" tag="a" class="nav-item"> {{ text }} </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: ['text', 'link']
}
</script>

<style lang="css">
.nav-item {
  display: block;
  background: black;
  width: 100%;
  color: white;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 900;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  text-decoration: none;
}

.nav-item:hover {
  color: black;
  background: white;
}
</style>
