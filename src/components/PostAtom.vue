<template lang="html">
  <div class="post-container">
    <div class="post">
      <div class="post-image">
        <div class="post-image-crop">
          <img :src="pictureUrl" />
        </div>
      </div>
      <div class="post-text">
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
          <div
            v-if="!(isMedia || isGallery)"
            class="post-author">
            <span v-html="author"></span>
            <span class="post-date">
              &nbsp;—&nbsp;
              <span v-html="postDate"></span>
            </span>
          </div>
        </div>

        <div
          class="post-excerpt"
          v-html="excerpt">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PostAtom",
  props: {
    pictureUrl: String,
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
* { box-sizing: border-box; }

.post-image-crop {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 56.67%;
}

.post-image img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: auto;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
}

.post-title-block {

}

.post-title {
  font-family: sans-serif;
}

.post-title-callout {
  display: block;
  color: red;
}

.post-author {
  font-family: monospace;
}

.post-excerpt {
  font-family: serif;
}

@media (min-width: 500px){
  .post {
    display: flex;
  }
  .post-image,
  .post-text {
    width: 50%;
    padding: 0 1rem;
  }
}

@media (min-width: 1200px){
  .post-image {
    width: 33.33333%;
    padding: 0 1rem;
  }
  .post-text {
    width: 66.66666%;
    display: flex;
    padding: 0;
  }
  .post-title-block,
  .post-excerpt {
    width: 50%;
    padding: 0 1rem;
  }
}
</style>
