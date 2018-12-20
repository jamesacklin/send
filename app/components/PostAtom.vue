<template lang="html">
  <div class="post-container">
    <div
      :style="[
        mode == 'promotion'
          ? {
              background: 'url(' + pictureUrl + ') center no-repeat #000',
              'background-size': 'cover'
            }
          : {}
      ]"
      :class="[mode, isContest ? 'contest' : true]"
      class="post-atom"
    >
      <div v-if="mode != 'promotion'" class="post-image">
        <div class="post-image-crop">
          <img
            v-lazyload
            v-if="pictureUrl.length"
            :alt="title"
            :data-src="pictureUrl"
            :src="pictureUrl"
          />
        </div>
      </div>
      <div class="post-text">
        <div class="post-title-block">
          <h4 class="post-title">
            <span v-html="titleCallout" class="post-title-callout"> </span>
            <span v-html="title" class="post-title-wrap"> </span>
          </h4>
          <div v-if="isMedia" class="post-launch-media">▶ Watch Video</div>
          <div v-if="isGallery" class="post-launch-media">↗ Launch Gallery</div>
          <div v-if="isContest" class="post-launch-media">Enter to Win Now</div>
          <div
            v-if="!(isMedia || mode == 'promotion' || mode == 'spliced')"
            class="post-author"
          >
            <span v-html="author"></span>
            <span class="post-date">
              &nbsp;—&nbsp; <span v-html="postDate"></span>
            </span>
          </div>
        </div>

        <div
          v-if="!(mode == 'promotion' || mode == 'spliced')"
          class="post-excerpt"
          v-html="excerpt"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'PostAtom',
  props: {
    mode: String,
    pictureUrl: String,
    titleCallout: String,
    title: String,
    isMedia: Boolean,
    isGallery: Boolean,
    isContest: Boolean,
    author: String,
    date: String,
    excerpt: String
  },
  data: function() {
    return {}
  },
  computed: {
    postDate: function() {
      return dayjs(this.date).format('MMMM D, YYYY')
    }
  }
}
</script>

<style lang="css">
.post-atom {
  hyphens: auto;
  padding: 1rem 1rem;
}

.post-atom.promotion {
  padding: 4rem 2rem;
  position: relative;
}

.post-atom.promotion::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
}

.post-atom.contest {
  margin: 1rem;
  border: 1px solid #CCC;
  border-top: 0.25rem solid red;
  box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.125);
}

.post-image {
  margin-bottom: 1rem;
}

.post-image-crop {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 56.67%;
}

.enhanced .post-image-crop {
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
  margin: -1rem 0 1rem;
  color: red;
  font-weight: 900;
  cursor: pointer;
}

.spliced .post-title,
.spliced .post-launch-media {
  font-size: 1.2rem;
}

.post-author {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.post-excerpt {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  line-height: 1.6rem;
}

.post-excerpt p {
  margin-top: 0;
}


/* FIXME: do this for real on the API side */
.post-excerpt a {
  display: none;
}

.promotion .post-text {
  position: relative;
  z-index: 1;
}

@media (min-width: 500px){
  .post-atom {
    display: flex;
    padding: 1rem 0;
  }
  .post-atom.spliced  {
    flex-direction: column;
  }
  .post-image,
  .post-text {
    width: 50%;
    padding: 0 1rem;
    margin: 0;
  }
  .spliced .post-image,
  .spliced .post-text  {
    width: 100%;
  }
  .spliced .post-image {
    margin-bottom: 1rem;
  }
  .enhanced .post-title {
    font-size: 1.8rem;
  }
}

@media (min-width: 1200px){
  .post-atom.enhanced {
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
  .spliced .post-text,
  .enhanced .post-text {
    flex-direction: column;
  }
  .promotion .post-title-block,
  .enhanced .post-title-block,
  .spliced .post-title-block,
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
