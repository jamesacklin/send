<template lang="html">
  <div class="post-container">
    <div
      v-lazy:background-image="backgroundImage"
      :class="[mode, isContest ? 'contest' : true, 'post-atom']"
    >
      <div v-if="mode != 'promotion'" class="post-image">
        <div class="post-image-crop"><img alt="" v-lazy="pictureUrl" /></div>
      </div>
      <div class="post-text">
        <div class="post-title-block">
          <h4 class="post-title">
            <span v-html="titleCallout" class="post-title-callout"> </span>
            <a :href="`/` + slug">
              <span v-html="title" class="post-title-wrap"> </span>
            </a>
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
    slug: String,
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
    },
    backgroundImage() {
      if (this.mode == 'promotion') {
        return this.pictureUrl
      } else {
        return '/og-card.png'
      }
    }
  }
}
</script>

<style lang="css">
.post-atom {
  hyphens: auto;
}

.post-atom:not(.promotion){
  background-image: none !important;
}

.post-atom.promotion {
  padding: 4em 2%;
  position: relative;
  background-color: black;
  background-size: cover;
  background-position: center center;
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
  border: 1px solid #CCC;
  border-top: 0.25rem solid red;
  box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.125);
}

.post-image-crop img {
  width: 100%;
  height: auto;
}

.post-title {
  font-family: 'Libre Franklin', sans-serif;
  margin: 0 0 1rem;
  font-size: 1.6rem;
  line-height: 1.1;
  color: black;
}

.post-title a {
  text-decoration: none;
  color: black;
}

.promotion .post-title a {
  color: white;
}

.post-title a:hover {
  color: red;
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
  margin: -1rem 0 0;
  color: red;
  font-weight: 900;
  cursor: pointer;
}

.spliced .post-title,
.spliced .post-launch-media {
  font-size: 1.2rem;
}

.post-text {
  padding: 0 2%;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2%;
  }
  .post-image {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .post-text {
    padding: 0;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .promotion .post-text {
    grid-column-start: 1;
    grid-column-end: 2;
    background: rgba(0,0,0,0.66);
    padding: 1em;
  }
}

@media (min-width: 1200px){
  .post-atom {
    grid-template-columns: 1fr 2fr;
  }
  .post-text {
    display: grid;
    grid-column-gap: 2%;
    grid-template-columns: 1fr 1fr;
  }

  .enhanced {
    grid-template-columns: 1fr 1fr;
  }

  .enhanced .post-text {
    display: block;
    align-self: end;
  }

  .promotion {
    grid-template-columns: 2fr 1fr;
  }

  .promotion .post-text {
    display: block;
    grid-column-start: 1;
    grid-column-end: 2;
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
