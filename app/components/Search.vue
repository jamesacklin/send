<template>
  <div>
    <multiselect 
      v-model="query"
      :options="options"
      :loading="status"
      :searchable="true"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="false"
      label="slug"
      track-by="slug"
      @close="clearSearch"
      @search-change="asyncFind" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      query: null
    }
  },
  methods: {
    clearSearch() {
      this.$store.dispatch('clearSearchPosts')
    },
    asyncFind (query){
      if (query !== ''){
        this.$store.dispatch('getSearchPosts', {term: query})
      }
    }
  },
  computed: {
    status(){
      return this.$store.state.searchLoading
    },
    options() {
      return this.$store.state.searchPosts
    }
  },
  mounted() {
    
  }
}

// posts?search=term&per_page=100&orderby=relevance
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

</style>
