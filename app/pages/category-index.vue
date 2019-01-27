<template>
  <main class="content">
    <section class="feed category-feed">
      <SectionHeader :sectionMeta="acfFields" />
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
              :author="postAuthor(feedItem)"
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
    <!-- TODO: Desktop ad sidebar with size-specific slots -->
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

export default {
  components: {
    PostAtom,
    SectionHeader,
    Advertising
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
      // Return the category title for whatever category we're on (as set in route.params)
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).name
    },
    catId() {
      // Return the category ID for whatever category we're on (as set in route.params)
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).id
    },
    posts() {
      // Return the posts for whatever category-page we're on (both set in route.params)
      return this.$store.getters.getCatPostsPage(
        parseInt(this.$route.params.page || 1),
        this.catId
      )
    },
    ads() {
      // Return the ads explicitly set in the store
      return this.$store.state.advertising.rectangle
    },
    feedItems() {
      // Compose a feed, with an ad inserted every 3 posts. We should have
      // 30 posts (set back in the Vuex store as state.postsPerPage)
      // and 10 ad slots (explicitly set back in the Vuex store).
      return compact(flattenDeep(zip(chunk(this.posts, 3), this.ads)))
    },
    acfFields() {
      // Return whatever Advanced Constom Fields we can for this category (as set in route.params)
      return this.$store.getters.getCategoryBySlug(this.$route.params.slug).acf
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
      // Determine title callouts for each post based on category.
      // FIXME: Make titleCallout an ACF field; it can stay a method because we're operating on an iteratee
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
      // Determine the post "mode" [enhanced, promotion, default] based on
      // category or a featuredPost flag in the post meta.
      // FIXME: Make postMode an ACF field; it can stay a method because we're operating on an iteratee
      if (post.categories[0] == '589') {
        return 'promotion'
        // } else if (post.meta.featuredPost.length) {
        //   return 'enhanced'
      } else {
        return 'default'
      }
    },
    postAuthor: function(post) {
      // If the post author is "Dirt Rag Contributor" (ID 74318), see if we can
      // return the contributor's real name (as provided in ACF fields)
      if (post.author === 74318) {
        if (post.acf.contributor_name) {
          return post.acf.contributor_name
        } else {
          return post._embedded.author[0].name
        }
      } else {
        return post._embedded.author[0].name
      }
    },
    featuredImage: function(post) {
      if (post._embedded['wp:featuredmedia']) {
        // Return the post featured image
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
  }
}
</script>

<style lang="scss">
.feed {
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: auto;
  grid-template-columns:
    [full-start] 0
    [main-start] minmax(0, 1000px) [main-end]
    0 [full-end];
  @media (min-width: 1000px) {
    padding: 0;
    display: grid;
    grid-row-gap: 2em;
    grid-column-gap: 2em;
    grid-template-columns:
      [full-start] minmax(1em, 1fr) [main-start] minmax(0, 45em)
      [main-end sidebar-start] 300px [sidebar-end] minmax(1em, 1fr) [full-end];
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(1em, 1fr)
      [main-start] minmax(0, 62.5em)
      [main-end sidebar-start] 300px [sidebar-end]
      minmax(1em, 1fr) [full-end];
  }
}

.feed-post {
  grid-column: main;
}

.feed-insert {
  grid-column: full;
  background: rgb(240, 240, 240);
  text-align: center;
  > div > div:not(:empty) {
    text-align: center;
    padding: 1rem;
  }
  @media (min-width: 1000px) {
    display: none;
  }
}
.story-link:hover {
  cursor: pointer;
}
</style>
