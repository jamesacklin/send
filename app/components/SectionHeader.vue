<template lang="html">
  <header class="section-header" v-lazy:background-image="backgroundImage">
    <div class="section-header-content">
      <img v-if="headerFigure" v-lazy="headerFigure" class="header-figure">
      <div class="text-wrapper" v-html="headerContents"></div>
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
  name: 'SectionHeader',
  props: [
    'sectionMeta'
  ],
  methods: {
    sectionType() {
      if (this.$route.name === "category-index" || this.$route.name  === "category-index-page"){
        return 'category'
      } else if (this.$route.name === "index" || this.$route.name === "index-page") {
        return 'home'
      } else {
        return ''
      }
    }
  },
  computed: {
    headerFigure() {
      if (this.sectionType() === 'home'){
        const homeFields = this.$store.getters.getPageBySlug('home').acf
        return homeFields.home_figure
      } else {
        return false
      }
    },
    headerContents(){
      if (this.sectionType() === 'home'){
        const homeFields = this.$store.getters.getPageBySlug('home').acf
        if (homeFields.home_banner_headline &! homeFields.home_banner_content){
          return `<h2>${homeFields.home_banner_headline}</h2>`
        } else if (homeFields.home_banner_headline && homeFields.home_banner_content){
          return `<h2>${homeFields.home_banner_headline}</h2><div>${homeFields.home_banner_content}</div>`
        } else {
          return ''
        }
      } else if (this.sectionType() === 'category'){
        const catName = titleCase(this.$store.getters.getCategoryBySlug(this.$route.params.slug)
          .name)
        const sponsor = this.sectionMeta.category_sponsor
        const logo = this.sectionMeta.category_sponsor_logo
        if (sponsor && logo){
          return `<h2>${catName}</h2><p>Presented by ${sponsor}</p><p><img src='${logo}'></p>`
        } else if (sponsor &! logo){
          return `<h2>${catName}</h2><p>Presented by ${sponsor}</p>`
        } else if (!sponsor){
          return `<h2>${catName}</h2>`
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    backgroundImage(){
      if (this.sectionType() === 'home'){
        const homeBg = this.$store.getters.getPageBySlug('home').acf.home_background_image
        if (homeBg){
          return homeBg
        } else {
          return ''
        }
      } else if (this.sectionType() === 'category'){
        const catBg = this.sectionMeta.category_background_image;
        if (catBg){
          return catBg
        } else {
          return ''
        }
      } else {
        return ''
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

<style lang="scss">

.section-header {
  grid-column: full;
  position: relative;
  padding: 1rem;
  background-color: black;
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
  @media (orientation: landscape) and (min-width: 700px){
    padding-top: 16vh;
  }
  @media (orientation: landscape) and (min-width: 1000px){
    padding-top: 25vh;
  }
}

.section-header[lazy=loading] {
    background: black;
    background-image: none !important;
}

.section-header[lazy=error] {
  background: black;
  padding-top: 1rem;
  background-image: none !important;
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
  .header-figure {
    position: absolute;
    height: 10em;
    width: auto;
    top: -10em;
    left: 48%;
    transform: rotate(-15deg) translateX(-48%);
  }
  .text-wrapper {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 1.2em;
    max-width: 45rem;
    padding: 0 1rem;
    background: black;
    text-align: center;
    color: white;
    h2 {
      font-size: 2.25em;
      margin: 1rem 0;
    }
    img { max-width: 10em; }
    a {
      color: red;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}

</style>
