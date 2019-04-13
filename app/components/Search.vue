<template>
  <div class="search-component">
    <input
      class="search-input"
      type="text"
      tabindex="0"
      placeholder="Type your search term, press Enter to search."
      v-model.lazy="query"
    >
    <button v-if="query !== ''" class="search-clear" @click="clearInput">Clear</button>
    <div v-if="results && query !== ''" class="search-results">
      <div class="search-header">
        Search results for
        <strong>{{ query }}</strong>
      </div>
      <div class="search-loading" v-if="loadingStatus === true">Loading...</div>
      <div v-for="result in results" :key="result.index" class="search-result">
        <nuxt-link tag="a" @click.native="clearInput()" :to="`/articles/${result.slug}`">
          <span v-html="result.title.rendered"></span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clearSearch() {
      this.$store.dispatch('clearSearchPosts')
    },
    clearInput() {
      this.query = ''
    },
    asyncFind() {
      if (this.query !== '') {
        this.$store.dispatch('getSearchPosts', { term: this.query })
      } else {
        this.clearSearch()
      }
    }
  },
  watch: {
    query() {
      this.asyncFind()
    }
  },
  computed: {
    loadingStatus() {
      return this.$store.state.searchLoading
    },
    results() {
      return this.$store.state.searchPosts
    }
  },
  mounted() {
    this.clearSearch()
  }
}
</script>

<style lang="scss">
.search-component {
  font-family: 'Libre Franklin', sans-serif;
  position: relative;
  margin: 1em auto;
}
.search-input {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  color: black;
  width: 100%;
  height: 3em;
  font-size: 1em;
  padding: 0.5em;
  &:focus {
    background: #fff;
    outline: 2px solid #eb181d;
  }
}
.search-clear {
  -webkit-appearance: none;
  appearance: none;
  background: #eb181d;
  color: #f5f3ef;
  height: 2em;
  font-size: 1em;
  line-height: 1;
  padding: 0.5em;
  border: none;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
}
.search-results {
  position: absolute;
  width: 100%;
  max-height: 50vh;
  background: #f5f3ef;
  overflow-y: scroll;
  z-index: 5;
  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.3);
}
.search-header {
  background: #fff;
  padding: 0.5em;
  font-size: 80%;
}
.search-loading {
  padding: 0.5em;
  font-size: 80%;
  color: rgba(0, 0, 0, 0.5);
}
.search-result {
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  a {
    display: block;
    padding: 0.5em 0.5em;
    text-decoration: none;
    color: #eb181d;
    &:hover {
      background: #eb181d;
      color: #f5f3ef;
    }
  }
}
</style>
