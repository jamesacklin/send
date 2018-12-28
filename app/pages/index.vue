<template>
  <div>
    <main class="content">
      <section class="posts">
        <div v-for="post in posts" :key="post.id">
          <nuxt-link class="story-link" tag="div" :to="`/` + post.slug">
            <PostAtom
              :pictureUrl="featuredImage(post)"
              :titleCallout="titleCallout(post)"
              :title="post.title.rendered"
              :author="post._embedded.author[0].name"
              :date="post.date"
              :excerpt="post.excerpt.rendered"
              :isMedia="post.format == 'video' ? true : false"
              :isContest="post.categories[0] == '589' ? true : false"
              :mode="postMode(post)"
            />
          </nuxt-link>
        </div>
      </section>
      <section class="advertising">
        <no-ssr>
          <div v-for="ad in ads" :key="ad.index">
            <keep-alive>
              <advertising :id="ad.id" :size="ad.size" :unit="ad.name" />
            </keep-alive>
          </div>
        </no-ssr>
      </section>
    </main>
    <div
      v-if="bottom === true"
      style="width: 100%; background: #CCC; padding: 1rem 1rem 5rem; font-family: 'Roboto Mono', monospace; position: fixed; bottom: 50%;"
    >
      Loading...
    </div>
  </div>
</template>

<script>
import find from 'lodash/find'
import PostAtom from '@/components/PostAtom'
import Advertising from '@/components/Advertising'

export default {
  components: {
    PostAtom,
    Advertising
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
      return this.$store.getters.getPosts
    },
    ads() {
      return this.$store.state.advertising.rectangle
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
    },
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        const nextPage = parseInt(this.$route.params.id) + 1 || 2
        this.$route.params.id = nextPage
        this.$store.commit('currentPage', nextPage)
        this.$store.dispatch('getPosts', { page: nextPage, prefetch: true })
      }
    }
  },
  beforeMount() {
    document.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  beforeDestroy() {
    document.removeEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  }
}
</script>

<style lang="css">
.advertising > div > div:not(:empty) {
  text-align: center;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px){
  .content {
    display: flex;
    justify-content: center;
  }
  .posts {
    width: calc(100% - 300px);
  }
  .advertising {
    padding: 0 1rem;
    width: auto;
  }
}

@media (min-width: 1600px){
  .posts {
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
