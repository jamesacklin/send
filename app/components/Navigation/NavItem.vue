<template lang="html">
  <div>
    <div class="nav-item">
      <!-- TODO: bind router link to item.link -->
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "navItem",
  props: {
    item: Object
  }
};
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin:900|Roboto+Mono:300|Roboto+Slab:300');

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
