<template>
  <main class="content">
    <section class="feed">
      <div class="feed-item feed-post" v-for="post in posts" :key="post.index">
        <p>{{ post.title.rendered }}</p>
      </div>
    </section>
    <Pagination />
  </main>
</template>

<script>
import find from 'lodash/find'
import _ from 'lodash'
// import PostAtom from '@/components/PostAtom'
// import Advertising from '@/components/Advertising'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    // PostAtom,
    // Advertising,
    Pagination
  },
  data() {
    return {
      bottom: false
    }
  },
  async asyncData({ payload, isStatic, store, params, query }) {
    await store.dispatch('getCategoryFromSlug', {
      slug: params.slug
    })
    await store.dispatch('getPosts', {
      // I have a feeling query is the wrong thing here, since it doesn't
      // actually force a route change. Maybe look into _.vue ?
      page: parseInt(query.page || 1),
      cat: params.slug
    })
  },
  computed: {
    catId() {
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).id
    },
    posts() {
      return this.$store.getters.getPostsPage(
        // I have a feeling query is the wrong thing here, since it doesn't
        // actually force a route change. Maybe look into _.vue ?
        parseInt(this.$route.query.page || 1),
        this.catId
      )
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      return _.compact(_.flattenDeep(_.zip(_.chunk(this.posts, 3), this.ads)))
    }
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'home archive'
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dirt Rag Magazine'
        }
      ]
    }
  },
  methods: {
    titleCallout: function(post) {
      if (
        find(post.categories, function(cat) {
          return cat == '589'
        })
      ) {
        return 'Contest'
      } else if (
        find(post._embedded['wp:term'][1], function(tag) {
          return tag.id == '2339'
        })
      ) {
        return 'Holiday Gift Guide'
      }
    },
    postMode: function(post) {
      if (post.categories[0] == '589') {
        return 'promotion'
      } else if (post.meta.featuredPost.length) {
        return 'enhanced'
      } else {
        return 'default'
      }
    },
    featuredImage: function(post) {
      if (post._embedded['wp:featuredmedia']) {
        let featuredImage = post._embedded['wp:featuredmedia'][0]
        if (featuredImage && featuredImage.media_details.sizes.medium) {
          return (
            featuredImage.media_details.sizes.medium.source_url ||
            featuredImage.media_details.sizes.full.source_url
          )
        } else {
          return '/og-card.png'
        }
      } else {
        return '/og-card.png'
      }
    }
  },
  scrollToTop: false,
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  watch: {},
  beforeMount() {},
  beforeDestroy() {}
}
</script>

<style lang="css">
.feed-insert {
  background: rgb(240,240,240);
  text-align: center;
}

.feed-insert > div > div:not(:empty) {
  text-align: center;
  padding: 1rem;
}

.feed {
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: auto;
  grid-template-columns:
    [full-start] 0
    [main-start] minmax(0, 45em) [main-end]
    0 [full-end];
}

@media (min-width: 500px){
  .feed {
    display: grid;
    grid-row-gap: 1em;
    grid-auto-rows: auto;
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 45em) [main-end]
      minmax(1em, 1fr) [full-end];
  }
}

@media (min-width: 1200px){
  .feed {
    display: grid;
    grid-column-gap: 2%;
    grid-row-gap: 2em;
    grid-auto-rows: auto;
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em) [main-end]
      minmax(1em, 1fr) [full-end];
  }
}

.feed-post {
  grid-column: main;
}

.feed-insert {
  grid-column: full;
}

.story-link:hover {
  cursor: pointer;
}
</style>
