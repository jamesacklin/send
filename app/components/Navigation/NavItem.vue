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
}

.nav-item:hover {
  color: #292724;
  background: #F5F3EF;
}
</style>
