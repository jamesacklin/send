<template lang="html">
  <header
    class="section-header"
    :class="!this.$route.params.page ? 'section-header-big' : ''"
  >
    <div class="section-header-title-block">
      <h1>{{ sectionTitle }}</h1>
      <div class="section-header-sponsorship">
        <p>Presented by Dirt Rag Magazine</p>
        <div class="logo">
          <Logo orientation="vertical" style="margin: 0 auto;" />
        </div>
      </div>
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
  background: #444;
  text-align: center;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-header-title-block {
  font-family: 'Libre Franklin', sans-serif;
  color: white;
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
  height: 40vh;
}
</style>
