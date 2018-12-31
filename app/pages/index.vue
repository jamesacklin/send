<template>
  <main class="content">
    <section class="feed">
      <template v-for="(feedItem, index) in feedItems">
        <div v-if="feedItem.type === 'post'" class="feed-post" :key="index">
          <nuxt-link class="story-link" tag="div" :to="`/` + feedItem.slug">
            <PostAtom
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
          class="feed-insert"
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
      bottom: false
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

.feed {
  position: relative;
}

@media (min-width: 1200px){
  .feed {
    padding-right: 400px;
  }
  .feed-post {
    max-width: 1000px;
    margin: 0 auto;
  }
  .feed-insert {
    position: absolute;
    right: 0px;
    margin: 0;
    text-align: center;
  }
  .feed-insert > div > div:not(:empty){
    padding: 0;
  }
  .feed-insert-3 {
    top: 0px;
  }
  .feed-insert-7 {
    top: 600px;
  }
  .feed-insert-11 {
    top: 900px
  }
  .feed-insert-15 {
    top: 1150px;
  }
  .feed-insert-19 {
    top: 1400px;
  }
  .feed-insert-24 {
    top: 1650px;
  }
  .feed-insert-27 {
    top: 1900px;
  }
  .feed-insert-31 {
    top: 2150px;
  }
  .feed-insert-35 {
    top: 2400px;
  }
  .feed-insert-39 {
    top: 2650px
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
