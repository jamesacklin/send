<template>
  <form v-on:submit.prevent="submitSearch">
    <input
      class="search-input"
      type="text"
      tabindex="0"
      placeholder="Type your search term, press Enter to search."
      v-model="this.searchTerm"
    >
  </form>
</template>

<script>
export default {
  data(){
    return {
      searchTerm : ''
    }
  },
  methods: {
    submitSearch(){
      this.$router.push({
        name: 'search-index',
        params: {
          slug: this.searchTerm
        }
      })
    }
  }
}
</script>

<style lang="scss">
.search-input {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: black;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1em;
  height: 3em;
  outline: none;
  padding: 0.5em;
  width: 100%;
  &:focus {
    background: #fff;
    outline: 2px solid #eb181d;
  }
}
</style>
