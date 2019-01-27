<template lang="html">
  <div class="article-artwork">
    <!-- TODO: Make article-artwork slots accept more than just image media -->
    <img
      class=""
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
      // compose a scset-friendly string with image paths and widths
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  overflow: hidden;
  padding-bottom: 66%;
  img {
    width: 100%;
    transition: all 0.25s ease;
  }
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
  @media (min-width: 1000px) {
    top: 0;
    padding-bottom: 50%;
  }
}
</style>
