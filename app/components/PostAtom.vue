<template lang="html">
  <div class="post-container" :id="`post-${id}`">
    <div
      :class="[mode, isContest ? 'contest' : true, 'post-atom']"
    >
      <div class="post-image">
        <div class="post-image-crop">
          <nuxt-link tag="a" :to="{ name: 'article', params: { slug: slug, id: id }}">
            <img alt="" v-lazy="pictureUrl" />
          </nuxt-link>
        </div>
      </div>
      <div class="post-text">
        <div class="post-title-block">
          <h4 class="post-title">
            <nuxt-link tag="a" :to="{ name: 'article', params: { slug: slug, id: id }}">
              <span v-html="titleCallout" class="post-title-callout"> </span>
              <span v-html="title" class="post-title-wrap"> </span>
            </nuxt-link>
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
    id: Number,
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
      // Pretty-format the post date (January 1, 2019)
      return dayjs(this.date).format('MMMM D, YYYY')
    }
  }
}
</script>

<style lang="scss">
.post-atom {
  hyphens: auto;
  &.promotion {
    padding: 4em 2%;
    position: relative;
    background-color: #292724;
    overflow: hidden;
    border: 1px solid #ccc;
    border-top: 0.25rem solid #eb181d;
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.125);
  }
}

.post-image-crop {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
  overflow: hidden;
  background: white;
  .post-atom.promotion & {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.post-image-crop img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: auto;
  transition: opacity 0.5s ease;
  &[lazy='loading'] {
    opacity: 0;
  }
  &[lazy='loaded'] {
    opacity: 1;
  }
}

.post-title {
  font-family: 'Libre Franklin', sans-serif;
  margin: 0 0 1rem;
  font-size: 1.6rem;
  line-height: 1.1;
  color: #292724;
}

.post-title a {
  text-decoration: none;
  color: #292724;
}

.promotion .post-title {
  margin-bottom: 0;
}

.promotion .post-title a {
  color: #f5f3ef;
}

.promotion .post-title {
  color: #f5f3ef;
}

.post-title-callout {
  display: block;
  color: #eb181d;
}

.post-launch-media {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1.6rem;
  margin: -1rem 0 0;
  color: #eb181d;
  font-weight: 900;
  cursor: pointer;
}

.spliced .post-title,
.spliced .post-launch-media {
  font-size: 1.2rem;
}

.post-text {
  padding: 1em 2% 0;
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

/* FIXME: Write a filter Stoke-side to remove the "Read More" links from the excerpt */
.post-excerpt a {
  display: none;
}

.promotion .post-text {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.66);
  padding: 1em;
}

@media (hover) {
  .post-atom:hover {
    .post-image-crop {
      /* Inline SVG to use is back in @/layouts/default.vue */
      filter: grayscale(100%) url(#red);
    }
    .post-title a,
    .post-text {
      color: #eb181d;
    }
  }
}

@media (min-width: 600px) {
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
  }
}

@media (min-width: 1200px) {
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

.advertising .post-container {
  margin-bottom: inherit !important;
}

.advertising .promotion {
  grid-template-columns: 1fr;
  padding: 2%;
  .post-text {
    text-align: left;
  }
  h4,
  .post-title-callout,
  .post-title-wrap { font-size: 1.5rem; }
}
</style>
