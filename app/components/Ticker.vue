<template lang="html">
  <div class="ticker" @mouseover="pauseTicker()" @mouseout="resumeTicker()">
    <div :class="{ paused: this.paused }">
      <div class="text marquee">
        <span class="ticker-badge">Dirt Rag Newswire</span>
        <span
          class="ticker-story"
          :key="story.index"
          v-for="story in tickerStories"
        >
          <a :href="story.link">{{ story.title }}</a>
        </span>
      </div>
      <div class="text marquee">
        <span class="ticker-badge">Dirt Rag Newswire</span>
        <span
          class="ticker-story"
          :key="story.index"
          v-for="story in tickerStories"
        >
          <a :href="story.link">{{ story.title }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  data: function() {
    return {
      paused: this.initialPaused
    }
  },
  props: {
    initialPaused: {
      type: Boolean,
      default: false
    },
    tickerStories: Array
  },
  methods: {
    pauseTicker: function() {
      this.paused = true
    },
    resumeTicker: function() {
      this.paused = false
    }
  }
}
</script>

<style lang="css" scoped>
.ticker {
  background: #1C1C1C;
  padding: 0.25rem 0;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
}

.text.marquee:nth-of-type(1) {
  display: inline-block;
  animation: marquee 20s linear infinite;
}

.text.marquee:nth-of-type(2) {
  display: inline-block;
  animation: marquee2 20s linear infinite;
  animation-delay: 10s;
}

.paused .text.marquee {
  animation-play-state: paused
}

.ticker-story {
  font-family: "Roboto Mono", monospace;
  font-weight: 300;
  color: white;
  text-transform: uppercase;
}

.ticker-story a {
  color: white;
  text-decoration: none;
}

.ticker-story a:hover {
  text-decoration: underline;
}

.ticker-story::after  {
  content: "•";
  margin: 0 1rem;
}

.ticker-badge {
  font-family: "Roboto Mono", monospace;
  text-transform: uppercase;
  font-weight: 300;
  color: white;
  background: red;
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
