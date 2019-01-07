<template>
  <main class="content">
    <section class="feed category-feed">
      <SectionHeader />
      <template v-for="(feedItem, index) in feedItems">
        <div
          v-if="feedItem.type === 'post'"
          class="feed-item feed-post"
          :key="index"
        >
          <nuxt-link
            class="story-link"
            tag="div"
            :to="`/articles/` + feedItem.slug"
          >
            <PostAtom
              :slug="feedItem.slug"
              :pictureUrl="featuredImage(feedItem)"
              :titleCallout="titleCallout(feedItem)"
              :title="feedItem.title.rendered"
              :author="feedItem._embedded.author[0].name"
              :date="feedItem.date"
              :excerpt="feedItem.excerpt.rendered"
              :isMedia="feedItem.format == 'video' ? true : false"
              :isContest="feedItem.categories[0] == '589' ? true : false"
              :mode="postMode(feedItem)"
            />
          </nuxt-link>
        </div>
        <div
          v-if="feedItem.size === 'rectangle'"
          class="feed-item feed-insert"
          :class="`feed-insert-${index}`"
          :key="index"
        >
          <advertising
            :id="feedItem.id"
            :size="feedItem.size"
            :unit="feedItem.name"
          />
        </div>
      </template>
    </section>
    <Pagination />
  </main>
</template>

<script>
import find from 'lodash/find'
import compact from 'lodash/compact'
import flattenDeep from 'lodash/flattenDeep'
import zip from 'lodash/zip'
import chunk from 'lodash/chunk'
import PostAtom from '@/components/PostAtom'
import SectionHeader from '@/components/SectionHeader'
import Advertising from '@/components/Advertising'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    PostAtom,
    SectionHeader,
    Advertising,
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
    await store.dispatch('getPostsByCategory', {
      page: parseInt(params.page || 1),
      cat: params.slug
    })
  },
  computed: {
    catTitle() {
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).name
    },
    catId() {
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).id
    },
    posts() {
      return this.$store.getters.getCatPostsPage(
        parseInt(this.$route.params.page || 1),
        this.catId
      )
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      return compact(flattenDeep(zip(chunk(this.posts, 3), this.ads)))
    }
  },
  head() {
    return {
      title: 'Dirt Rag Magazine',
      bodyAttrs: {
        class: 'home archive category-archive'
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
