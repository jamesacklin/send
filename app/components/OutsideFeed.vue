<template lang="html">
  <div class="outside-player" :style="{ visibility: playerDisplay }">
    <no-ssr>
      <keep-alive> <div id="botr_tluteeuw_8cg9oAyB_div"></div> </keep-alive>
    </no-ssr>
    <div class="controls">
      <div class="close" v-on:click="closePlayer()">Close Player</div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: Comment OutsideFeed component
  name: 'OutsideFeed',
  data() {
    return {
      playerDisplay: 'visible'
    }
  },
  methods: {
    closePlayer() {
      this.playerDisplay = 'none'
      let outsideScript = document.getElementById('outside-script')
      document.head.removeChild(outsideScript)
    }
  },
  mounted() {
    // TODO: Do not mount if we don't pass certain checks (viewport size, user-agent, etc)
    let outsideScript = document.createElement('script')
    outsideScript.setAttribute(
      'src',
      '//content.jwplatform.com/players/tluteeuw-8cg9oAyB.js'
    )
    outsideScript.setAttribute('id', 'outside-script')
    document.head.appendChild(outsideScript)
  }
}
</script>

<style lang="css" scoped>
.controls {
  display: none;
}

.outside-player:hover .controls {
  display: block;
  font-family: "Libre Franklin", sans-serif;
  padding: 0.5em;
  background: black;
  color: white;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  cursor: pointer;
}
</style>
