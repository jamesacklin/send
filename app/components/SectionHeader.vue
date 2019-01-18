<template lang="html">
  <header
    class="section-header"
    :class="!this.$route.params.page ? 'section-header-big' : ''"
  >
    <div class="section-header-title-block">
      <!-- For categories -->
      <div v-if="this.$route.params.slug">
        <h1>{{ sectionTitle }}</h1>
        <div class="section-header-sponsorship">
          <p>Presented by Dirt Rag Magazine</p>
          <div class="logo">
            <Logo orientation="vertical" style="margin: 0 auto;" />
          </div>
        </div>
      </div>
      <!-- for the home page -->
      <div v-if="!this.$route.params.slug">
        <Logo orientation="vertical" style="margin: 2rem 0; max-width: 20em; background: black" />
        <div class="current-issue-plug">
          <p>Issue 420 on newstands now!</p>
          <p><a href="#">Take a peek inside</a></p>
          <p><a href="#">Find a copy near me</a></p>
        </div>
      </div>
    </div>
    <div
      class="section-header-image"
      v-if="!this.$route.params.slug"
      v-lazy:background-image="'/images/cover.jpg'"
    >
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'SectionHeader',
  components: {
    Logo
  },
  computed: {
    sectionTitle() {
      if (this.$route.params.slug) {
        return this.$store.getters.getCategoryBySlug(this.$route.params.slug)
          .name
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
  width: 100%;
  background-color: #000;
  height: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-header-title-block {
  position: relative;
  z-index: 1;
  font-family: 'Libre Franklin', sans-serif;
  color: white;
  height: 100%;
}

.section-header h1 {
  text-transform: capitalize;
  margin: 0;
  line-height: 1;
  font-size: 1.6rem;
  @media (min-width: 500px) {
    font-size: 1.8rem;
  }
  @media (min-width: 1200px) {
    font-size: 2.5rem;
  }
}

.section-header-sponsorship {
  margin: 1rem auto 0;
  font-size: 80%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  .logo {
    width: 4em;
    margin-right: 1em;
  }
  .section-header-big & {
    margin: 2rem auto 0;
    font-size: 100%;
    flex-direction: column;
    .logo {
      width: 9em;
      margin: 0 auto;
    }
  }
}

.section-header-big {
  padding-bottom: 66.66%;
  @media (min-width: 500px){
    padding-bottom: 50%;
  }
  @media (min-width: 1000px){
    padding-bottom: 33.3333%;
  }
}

.section-header-image {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  top: 0; left: 0;
  background-position: 50% 20%;
  z-index: 0;
}
</style>
