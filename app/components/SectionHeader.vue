<template lang="html">
  <header class="section-header" style="background-image: url('/images/cover.jpg')">
    <div class="section-header-content">
      <div v-html="headerContents"></div>
    </div>
  </header>
</template>

<script>
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export default {
  homeText: `<h2>Issue #420 Out Now</h2>
             <p>Subscribe Today | Find a Copy Near Me</p>`,
  name: 'SectionHeader',
  methods: {
    sectionType() {
      if (this.$route.params.slug){
        return 'category'
      } else {
        return 'home'
      }
    }
  },
  computed: {
    headerContents(){
      if (this.sectionType() === 'home'){
        return this.$options.homeText
      } else if (this.sectionType() === 'category'){
        return `<h2>${titleCase(this.$store.getters.getCategoryBySlug(this.$route.params.slug)
          .name)}</h2>`
      } else {
        return false
      }
    },
    sectionTitle() {
      if (this.sectionType === 'category') {
        return
      } else {
        return 'Home'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-header {
  grid-column: full;
  position: relative;
  padding: 1rem;
  background-size: cover;
  background-position: center center;
  @media (orientation: portrait) and (max-width: 700px){
    padding-top: 33vh;
  }
  @media (orientation: portrait) and (min-width: 700px){
    padding-top: 16vh;
  }
  @media (orientation: portrait) and (min-width: 1000px){
    padding-top: 25vh;
  }
  @media (orientation: landscape) and (min-width: 1000px){
    padding-top: 25vh;
  }
}

.section-header-content {
  @media (orientation: portrait) and (min-width: 700px){
    max-height: 33vh;
  }
  @media (orientation: landscape){
    max-height: 66vh;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  > div {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 1.2em;
    max-width: 45rem;
    padding: 0 1rem;
    background: black;
    text-align: center;
    color: white;
  }
}

</style>
