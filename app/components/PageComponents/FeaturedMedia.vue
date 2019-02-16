<template lang="html">
  <div class="article-artwork">
    <!-- TODO: Make article-artwork slots accept more than just image media -->
    <img
      class="article-artwork-image"
      :srcset="featuredSrcset"
      sizes="(min-width: 1200px) 1140px, (min-width: 992px) 940px, (min-width: 768px) 720px, (min-width: 576px) 510px, calc(100vw - 30px)"
    />
  </div>
</template>

<script>
import each from 'lodash/each'

export default {
  props: ['media'],
  computed: {
    featuredSrcset() {
      // If the featured media is an image, iterate over the sizes and
      // compose a srcset-friendly string with image paths and widths
      if (this.media.media_type === 'image') {
        var srcset = ''
        const postImageSizes = this.media.media_details.sizes
        each(postImageSizes, function(size, index) {
          srcset = srcset + `${size.source_url} ${size.width}w, `
        })
        return srcset
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.article-artwork {
  img[lazy='error'] {
    height: 0px;
    width: 0px;
  }
  img[lazy='loading'] {
    transform: translateX(5em);
    opacity: 0;
  }
  img[lazy='loaded'] {
    transform: translateX(0);
    opacity: 1;
  }
  @media (min-width: 1000px){
    max-height: 60vh;
    overflow: hidden;
  }
}

.article-artwork-image {
  width: 100%;
  display: block;
}
</style>
