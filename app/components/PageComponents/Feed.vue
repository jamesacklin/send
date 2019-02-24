<template>
  <div>
    <AdHeader />
    <template v-for="(feedItem, index) in feedData">
       <PostAtom
          v-if="feedItem.type === 'post'"
          :key="feedItem.index"
          :slug="feedItem.slug"
          :title="feedItem.title.rendered"
          :date="feedItem.date"
          :excerpt="feedItem.excerpt.rendered"
          :pictureUrl="featuredImage(feedItem)"
          :author="postAuthor(feedItem)"
          :mode="postMode(feedItem)"
        />
        <div
          v-if="feedItem.type === 'ad'"
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
  </div>
</template>

<script>
import find from 'lodash/find'
import PostAtom from '@/components/PostAtom'
import Advertising from '@/components/Advertising'
import AdHeader from '@/components/PageComponents/AdHeader'

export default {
  name: 'feed',
  props: [
    'feedData'
  ],
  components: {
    PostAtom,
    Advertising,
    AdHeader
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
      // Return the post featured image
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
  }
}
</script>

<style>
.feed .post-container {
  margin-bottom: 2em;
}

.feed-insert  > div > div:not(:empty) {
  margin: 2rem 0;
  text-align: center;
  padding: 2em;
  background: rgba(0,0,0,0.1);
}
</style>
