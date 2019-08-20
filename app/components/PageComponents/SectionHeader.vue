<template lang="html">
  <header
    class="section-header"
    :class="{'has-artwork': hasArtwork, 'has-content': hasContent}"
    :style="headerBackground">
    <div class="section-header-content">
      <div 
        class="text-wrapper"
        v-html="headerContents">
      </div>
      <span v-html="headerFigure" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    sectionMeta: Object
  },
  computed: {
    hasArtwork(){
      if (this.sectionMeta.bg || this.sectionMeta.img){
        return true
      } else {
        return false
      }
    },
    hasContent(){
      if (this.sectionMeta.title || this.sectionMeta.content){
        return true
      } else {
        return false
      }
    },
    headerFigure() {
      const sectionMeta = this.sectionMeta
      const img = meta => {
        if (meta.img){
          return `<img class="header-figure" src=${meta.img} alt="" />`
        } else {
          return ''
        }
      }
      return `${img(sectionMeta)}`
    },
    headerBackground() {
      const sectionMeta = this.sectionMeta
      if (sectionMeta.bg){
        return {
          backgroundImage: `url(${sectionMeta.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }
      } else {
        return ''
      }
    },
    headerContents() {
      const sectionMeta = this.sectionMeta
      const title = meta => {
        if (meta.title){
          return `<h2>${meta.title}</h2>`
        } else {
          return ''
        }
      }
      const content = meta => {
        if (meta.content){
          return `<div>${meta.content}</div>`
        } else {
          return ''
        }
      }
      return `${title(sectionMeta)} ${content(sectionMeta)}`;
    }
  }
}
</script>

<style lang="scss">
.section-header {
  grid-column: full;
  position: relative;
  background-color: #292724;
  background-size: cover;
  background-position: center center;
  &.has-content {
    padding: 1rem;
  }
  &.has-artwork {
    padding: 1rem;
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
  /* Padding for sticky nav */
  margin-top: 76.828px;
  @media (min-width: 800px){
    margin-top: 108.781px;
  }
  @media (min-width: 1150px){
    margin-top: 67.156px;
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
  .header-figure {
    position: absolute;
    height: 10em;
    width: auto;
    top: -11em;
    left: 48%;
    transform: rotate(-15deg) translateX(-48%);
    box-shadow: 0.5em 1em 1em rgba(0, 0, 0, 0.4);
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
    background: rgba(41,39,36, 0.8);
    text-align: center;
    color: #f5f3ef;
    h2 {
      font-size: 2.25em;
      margin: 1rem 0;
    }
    img {
      max-width: 10em;
    }
    a {
      color: #eb181d;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
