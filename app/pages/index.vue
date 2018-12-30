<template>
  <main class="content">
    <section class="feed">
      <template v-for="pageItem in pageItems">
        <div
          v-if="pageItem.type === 'post'"
          class="feed-post"
          :key="pageItem.index"
        >
          <nuxt-link class="story-link" tag="div" :to="`/` + pageItem.slug">
            <PostAtom
              :pictureUrl="featuredImage(pageItem)"
              :titleCallout="titleCallout(pageItem)"
              :title="pageItem.title.rendered"
              :author="pageItem._embedded.author[0].name"
              :date="pageItem.date"
              :excerpt="pageItem.excerpt.rendered"
              :isMedia="pageItem.format == 'video' ? true : false"
              :isContest="pageItem.categories[0] == '589' ? true : false"
              :mode="postMode(pageItem)"
            />
          </nuxt-link>
        </div>
        <div
          v-if="pageItem.size === 'rectangle'"
          class="feed-insert"
          :key="pageItem.index"
        >
          <advertising
            :id="pageItem.id"
            :size="pageItem.size"
            :unit="pageItem.name"
          />
        </div>
      </template>
    </section>
    <Pagination />
  </main>
</template>

<script>
import find from 'lodash/find'
import _ from 'lodash'
import PostAtom from '@/components/PostAtom'
import Advertising from '@/components/Advertising'
import Pagination from '@/components/Navigation/Pagination'

export default {
  components: {
    PostAtom,
    Advertising,
    Pagination
  },
  data() {
    return {
      bottom: false,
      responsiveMode: 'mobile'
    }
  },
  async asyncData({ payload, isStatic, store, params }) {
    await store.dispatch('getPosts', { page: parseInt(params.id || 1) })
  },
  computed: {
    posts() {
      return this.$store.getters.getPostsPage(
        parseInt(this.$route.params.id) || 1
      )
    },
    ads() {
      return this.$store.state.advertising.rectangle
    },
    pageItems() {
      if (this.responsiveMode === 'mobile') {
        return _.compact(_.flattenDeep(_.zip(_.chunk(this.posts, 3), this.ads)))
      } else {
        return _.concat(this.posts, this.ads)
      }
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
  watch: {},
  beforeMount() {},
  beforeDestroy() {}
}
</script>

<style lang="css">

.feed-insert {
  background: rgb(240,240,240);
  margin: 1rem 0;
  text-align: center;
}

.feed-insert > div > div:not(:empty) {
  text-align: center;
  padding: 1rem;
  /* margin: 1rem auto 1rem; */
}

.posts {
  position: relative;
}

@media (min-width: 1200px){
  .posts .post-atom {
    max-width: 1000px;
    margin: 0 auto;
  }
}

.story-link .post-atom {
  transition: background-color 0.2s ease;
}

.story-link:hover .post-atom {
  cursor: pointer;
  background-color: rgba(255,0,0,0.125);
}
</style>
