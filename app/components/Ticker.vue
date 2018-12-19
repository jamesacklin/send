<template lang="html">
  <div class="ticker" @mouseover="pauseTicker()" @mouseout="resumeTicker()">
    <no-ssr>
      <marquee-text :paused="this.paused">
        <span class="ticker-badge">Dirt Rag Newswire</span>
        <span
          class="ticker-story"
          :key="story.index"
          v-for="story in tickerStories"
        >
          <a :href="story.link">{{ story.title }}</a>
        </span>
      </marquee-text>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  data: function() {
    return {
      paused: false
    }
  },
  props: {
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

<style lang="css">
.ticker {
  background: black;
  padding: 0.25rem 0;
  height: 30px;
  overflow: hidden;
  position: relative;
}

.marquee {
  display: block;
  min-width: 200%;
  height: 30px;
  position: absolute;
  overflow: hidden;
  animation: marquee 10s linear infinite;
}

.marquee span {
  /* float: left;
  width: 50%; */
}

@keyframes marquee {
  0% { left: 0; }
  100% { left: -100%; }
}

.ticker-story {
  font-family: "Roboto Mono", monospace;
  font-weight: 300;
  color: white;
  display: inline-block;
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
  display: inline-block;
  padding: 0 0.25rem;
  margin-right: 1rem;
}
</style>
