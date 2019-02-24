<template lang="html">
  <header class="section-header" v-lazy:background-image="backgroundImage">
    <div class="section-header-content">
      <img v-if="headerFigure" v-lazy="headerFigure" class="header-figure" />
      <div class="text-wrapper" v-html="headerContents"></div>
    </div>
  </header>
</template>

<script>
function titleCase(str) {
  // General function to turn strings into title case
  return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

export default {
  name: 'SectionHeader',
  props: ['sectionMeta'],
  methods: {
  },
  computed: {
    sectionType() {
      // Determine the type of "section" we're on, either a category,
      // category-page, home, or a home-page. Generalizes these out to
      // one of two values: category, or home.
      if (
        this.$route.name === 'category-index' ||
        this.$route.name === 'category-index-page'
      ) {
        return 'category'
      } else if (
        this.$route.name === 'index' ||
        this.$route.name === 'index-page'
      ) {
        return 'home'
      } else {
        return ''
      }
    },
    headerFigure() {
      // If we are on a home section, see if we can return a figure from ACF
      if (this.sectionType === 'home') {
        const homeFields = this.$store.getters.getPageBySlug('home').acf
        return homeFields.home_figure
      } else {
        return false
      }
    },
    headerContents() {
      // Create a template string based on the type of section we're on (home or
      // category), and then—based on the amount of detail provided in ACF—pull
      // as much extra information as provided.

      // The home page will generally be used to promote a new issue of the
      // print edition of the magazine; categories will generally need a
      // background image (at minimum). In most cases, a brand will sponsor a
      // category and therefore we will need more content, like the company name,
      // their logo, and a background image.
      if (this.sectionType === 'home') {
        const homeFields = this.$store.getters.getPageBySlug('home').acf
        if (homeFields.home_banner_headline & !homeFields.home_banner_content) {
          return `<h2>${homeFields.home_banner_headline}</h2>`
        } else if (
          homeFields.home_banner_headline &&
          homeFields.home_banner_content
        ) {
          return `<h2>${homeFields.home_banner_headline}</h2><div>${
            homeFields.home_banner_content
          }</div>`
        } else {
          return ''
        }
      } else if (this.sectionType === 'category') {
        // Because someone liked to use UPPERCASE for category names
        const catName = titleCase(
          this.$store.getters.getCategoryBySlug(this.$route.params.slug).name
        )
        var sponsor = this.sectionMeta.category_sponsor
        var logo = this.sectionMeta.category_sponsor_logo
        // These template strings should be self-explanetory
        if (sponsor && logo) {
          return `<h2>${catName}</h2><p>Presented by ${sponsor}</p><p><img src='${logo}'></p>`
        } else if (sponsor && !logo) {
          return `<h2>${catName}</h2><p>Presented by ${sponsor}</p>`
        } else if (!sponsor && !logo) {
          return `<h2>${catName}</h2>`
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    backgroundImage() {
      // Return the right background image.
      // FIXME: Make this a srcset (see article.vue)
      if (this.sectionType === 'home') {
        const homeBg = this.$store.getters.getPageBySlug('home').acf
          .home_background_image
        if (homeBg) {
          return homeBg
        } else {
          return ''
        }
      } else if (this.sectionType === 'category') {
        const catBg = this.sectionMeta.category_background_image
        if (catBg) {
          return catBg
        } else {
          return ''
        }
      } else {
        return ''
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
  background-color: #292724;
  background-size: cover;
  background-position: center center;
  &[lazy='loaded']{
    @media (orientation: portrait) and (max-width: 700px) {
      padding-top: 33vh;
    }
    @media (orientation: portrait) and (min-width: 700px) {
      padding-top: 16vh;
    }
    @media (orientation: portrait) and (min-width: 1000px) {
      padding-top: 25vh;
    }
    @media (orientation: landscape) and (min-width: 700px) {
      padding-top: 16vh;
    }
    @media (orientation: landscape) and (min-width: 1000px) {
      padding-top: 25vh;
    }
  }
}

.section-header[lazy='loading'] {
  background: #292724;
  background-image: none !important;
}

.section-header[lazy='error'] {
  background: #292724;
  padding-top: 1rem;
  background-image: none !important;
}

.section-header-content {
  @media (orientation: portrait) and (min-width: 700px) {
    max-height: 33vh;
  }
  @media (orientation: landscape) {
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
    top: -11em;
    left: 48%;
    transform: rotate(-15deg) translateX(-48%);
    box-shadow: 0.5em 1em 1em rgba(0,0,0,0.4);
    opacity: 1;
    transition: opactiy 0.5s ease;
    &[lazy='loading'],
    &[lazy='error'] {
      opacity: 0;
    }
  }
  .text-wrapper {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 1.2em;
    max-width: 45rem;
    padding: 0 1rem;
    background: #292724;
    text-align: center;
    color: #F5F3EF;
    h2 {
      font-size: 2.25em;
      margin: 1rem 0;
    }
    img {
      max-width: 10em;
    }
    a {
      color: #EB181D;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
