<template lang="html">
  <div>
    <div class="nav-item">
      <!-- TODO: Bind router links from Vuex store to item.link -->
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: {
    item: Object
  }
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
}

.nav-item:hover {
  color: black;
  background: white;
}
</style>
