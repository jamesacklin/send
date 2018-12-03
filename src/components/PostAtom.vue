<template lang="html">
  <div class="post-container">
    <div
      :style="[mode == 'promotion' ? {'background': 'url(' + pictureUrl + ') center no-repeat #000', 'background-size': 'cover'} : {}]"
      :class="mode"
      class="post">
      <div
        v-if="mode != 'promotion'"
        class="post-image">
        <div class="post-image-crop">
          <img
            v-if="pictureUrl.length"
            :alt="title"
            :src="pictureUrl" />
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
            class="post-launch-media">
            ▶ Watch Video
          </div>
          <div
            v-if="isGallery"
            class="post-launch-media">
            ↗ Launch Gallery
          </div>
          <div
            v-if="isContest"
            class="post-launch-media">
            Enter to Win Now
          </div>
          <div
            v-if="!(isMedia || isGallery || mode == 'promotion')"
            class="post-author">
            <span v-html="author"></span>
            <span class="post-date">
              &nbsp;—&nbsp;
              <span v-html="postDate"></span>
            </span>
          </div>
        </div>

        <div
          v-if="mode != 'promotion'"
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
    mode: String,
    pictureUrl: String,
    titleCallout: String,
    title: String,
    isMedia: Boolean,
    isGallery: Boolean,
    isContest: Boolean,
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
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin:900|Roboto+Mono:300|Roboto+Slab:300');

* { box-sizing: border-box; }

.post.promotion {
  padding: 4rem 2rem;
}

.post-image {
  margin-bottom: 1rem;
}

.default .post-image-crop {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 56.67%;
}

.enhanced .post-image-crop {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 75%;
}

.post-image-crop img {
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
  font-family: 'Libre Franklin', sans-serif;
  margin: 0 0 1rem;
  font-size: 1.6rem;
  line-height: 1.1;
  color: black;
}

.promotion .post-title {
  color: white;
}

.post-title-callout {
  display: block;
  color: red;
}

.post-launch-media {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1.6rem;
  margin-top: -1rem;
  color: red;
  cursor: pointer;
}

.post-author {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.post-excerpt {
  font-family: 'Roboto Slab', serif;
  font-size: 1rem;
  line-height: 1.6rem;
}

@media (min-width: 500px){
  .post {
    display: flex;
  }
  .post-image,
  .post-text {
    width: 50%;
    padding: 0 1rem;
    margin: 0;
  }
  .enhanced .post-title {
    font-size: 1.8rem;
  }
}

@media (min-width: 1200px){
  .post.enhanced {
    align-items: flex-end;
  }
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
  .enhanced .post-image,
  .enhanced .post-text {
    width: 50%;
  }
  .promotion .post-text {
    width: 66.666666%;
  }
  .enhanced .post-text {
    flex-direction: column;
  }
  .promotion .post-title-block,
  .enhanced .post-title-block,
  .enhanced .post-excerpt {
    width: 100%;
  }
  .enhanced .post-title,
  .promotion .post-title {
    font-size: 2.5rem;
  }
  .enhanced .post-title-callout,
  .promotion .post-title-callout {
    font-size: 1.8rem;
  }
  .enhanced .post-launch-media {
    margin-bottom: 1rem;
  }
  .enhanced .post-author {
    font-size: 1rem;
  }
  .enhanced .post-excerpt {
    font-size: 1.2rem;
  }
}
</style>
