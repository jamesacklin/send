<template>
  <div>
    <AdHeader />
    <template v-for="(feedItem, index) in feedData">
      <PostAtom
        v-if="feedItem.type === 'post'"
        :id="feedItem.id"
        :key="feedItem.id"
        :slug="feedItem.slug"
        :title="feedItem.title.rendered"
        :date="feedItem.date"
        :excerpt="feedItem.excerpt.rendered"
        :title-callout="titleCallout(feedItem)"
        :picture-url="featuredImage(feedItem)"
        :author="postAuthor(feedItem)"
        :mode="postMode(feedItem)"
      />
      <div
        v-if="feedItem.type === 'ad'"
        :key="index"
        class="feed-item feed-insert"
        :class="`feed-insert-${index}`"
      >
        <advertising 
          :id="feedItem.id" 
          :size="feedItem.size" 
          :unit="feedItem.name"
        />
      </div>
    </template>
  </div>
</template>

<script>
import PostAtom from '@/components/PostAtom'
import Advertising from '@/components/Advertising'
import AdHeader from '@/components/PageComponents/AdHeader'

export default {
  name: 'Feed',
  components: {
    PostAtom,
    Advertising,
    AdHeader
  },
  props: {
    feedData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    titleCallout: function(post) {
      // Returns a title callout if the author has defined it in an ACF field.
      if (post.acf.post_title_callout) {
        return post.acf.post_title_callout
      } else {
        return ''
      }
    },
    postMode: function(post) {
      // Determine the post "mode" [enhanced, promotion, default] based on a few criteria.
      // 1) If the post is in the "Contests" category (ID 589)
      if (post.categories.includes(589)) {
        return 'promotion'
      } // 2) If the author explicitly defines the post feed layout in an ACF field
      else if (post.acf.post_feed_layout) {
        return post.acf.post_feed_layout
      } // 3) If nothing else, return default.
      else {
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
      // Return the post featured image
      if (post._embedded['wp:featuredmedia']) {
        let featuredImage = post._embedded['wp:featuredmedia'][0]
        if (featuredImage && post.categories[0] == '589') {
          return featuredImage.media_details.sizes.full.source_url
        } else if (featuredImage && featuredImage.media_details.sizes.medium) {
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
  }
}
</script>

<style>
.feed .post-container {
  margin-bottom: 2em;
}

.feed-insert > div > div:not(:empty) {
  margin: 2rem 0;
  text-align: center;
  padding: 2em;
  background: rgba(0, 0, 0, 0.1);
}
</style>
