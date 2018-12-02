<template lang="html">
  <div class="post-container">
    <div class="post">
      <div class="post-title-block">
        <h4 class="post-title">
          <span
            v-html="titleCallout"
            class="post-title-callout">
          </span>
          <span
            v-html="title"
            class="post-title-wrap">
          </span>
        </h4>
        <div
          v-if="isMedia"
          class="post-video-watch">
          ▶ Watch Video
        </div>
        <div
          v-if="isGallery"
          class="post-gallery-view">
          ↗ Launch Gallery
        </div>
      </div>

      <div class="post-author">
        <span v-html="author"></span>
        <span class="post-date">
          &nbsp;—&nbsp;
          <span v-html="postDate"></span>
        </span>
      </div>

      <div
        class="post-excerpt"
        v-html="excerpt">
      </div>

    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PostAtom",
  props: {
    titleCallout: String,
    title: String,
    isMedia: Boolean,
    isGallery: Boolean,
    author: String,
    date: Date,
    excerpt: String
  },
  data: function() {
    return {};
  },
  computed: {
    postDate: function() {
      return dayjs(this.date).format("MMMM D, YYYY");
    }
  }
};
</script>

<style lang="css">
.post-title-block {

}

.post-title {

}

.post-title-callout {
  display: block;
}
</style>
