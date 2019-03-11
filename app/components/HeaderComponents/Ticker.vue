<template lang="html">
  <div aria-hidden="true" class="ticker" @mouseover="pauseTicker()" @mouseout="resumeTicker()">
    <div 
      v-if="tickerStories.length"
      :class="{ paused: this.paused }">
      <div class="text marquee">
        <span class="ticker-badge">Dirt Rag Newswire</span>
        <span
          class="ticker-story"
          :key="story.index"
          v-for="story in tickerStories"
        >
          <nuxt-link 
            :to="`/articles/${story.slug}`"
            tag="a">
            {{ story.title.rendered }}
          </nuxt-link>
        </span>
      </div>
      <div class="text marquee">
        <span class="ticker-badge">Dirt Rag Newswire</span>
        <span
          class="ticker-story"
          :key="story.index"
          v-for="story in tickerStories"
        >
          <nuxt-link 
            :to="`/articles/${story.slug}`"
            tag="a">
            {{ story.title.rendered }}
          </nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // The ticker component displays a list of "stories" inline with links to the posts.
  // The template spits these stories out twice to acheive a continuous scrolling effect.
  // We should probably do something smart to avoid fucking with SEO, or somehow
  // skip this component. It's hidden from screen readers via aria-hidden.
  name: 'Ticker',
  data: function() {
    return {
      paused: this.initialPaused
    }
  },
  props: {
    initialPaused: {
      // Initially not paused
      type: Boolean,
      default: false
    }
  },
  computed: {
    tickerStories() {
      return this.$store.state.tickerPosts
    }
  },
  methods: {
    pauseTicker: function() {
      // Pause the ticker
      this.paused = true
    },
    resumeTicker: function() {
      // Unpause the ticker
      this.paused = false
    }
  },
  mounted() {
    // When mounted, dispatch the 'getTickerStories' action in the store.
    this.$store.dispatch('getTickerStories')
  }
}
</script>

<style lang="css" scoped>
.ticker {
  background: #1c1c1c;
  padding: 0.25rem 0;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
}

.text.marquee:nth-of-type(1) {
  display: inline-block;
  animation: marquee 40s linear infinite;
}

.text.marquee:nth-of-type(2) {
  display: inline-block;
  animation: marquee2 40s linear infinite;
  animation-delay: 20s;
}

.paused .text.marquee {
  animation-play-state: paused;
}

.ticker-story {
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  color: #f5f3ef;
  text-transform: uppercase;
}

.ticker-story a {
  color: #f5f3ef;
  text-decoration: none;
}

.ticker-story a:hover {
  text-decoration: underline;
}

.ticker-story::after {
  content: '•';
  margin: 0 1rem;
}

.ticker-badge {
  font-family: 'Roboto Mono', monospace;
  text-transform: uppercase;
  font-weight: 300;
  color: #f5f3ef;
  background: #eb181d;
  padding: 0 0.25rem;
  margin-right: 1rem;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-200%);
  }
}
</style>
