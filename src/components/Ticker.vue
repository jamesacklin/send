<template lang="html">
  <div class="ticker" @mouseover="pauseTicker()" @mouseout="resumeTicker()">
    <marquee-text :paused="this.paused">
      <span class="ticker-badge">Dirt Rag Newswire</span>
      <span
        class="ticker-story"
        v-for="story in tickerStories">
        <a :href="story.link">{{ story.title }}</a>
      </span>
    </marquee-text>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";

export default {
  name: "Ticker",
  components: {
    MarqueeText
  },
  data: function() {
    return {
      paused: false
    };
  },
  props: {
    tickerStories: Array
  },
  methods: {
    pauseTicker: function() {
      this.paused = true;
    },
    resumeTicker: function() {
      this.paused = false;
    }
  }
};
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300');

.ticker {
  background: black;
  padding: 0.25rem 0;
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
