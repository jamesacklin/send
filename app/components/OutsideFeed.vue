<template lang="html">
  <div class="outside-player">
    <no-ssr>
      <keep-alive> <div id="botr_tluteeuw_8cg9oAyB_div"></div> </keep-alive>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'OutsideFeed',
  mounted() {
    let outsideScript = document.createElement('script')
    outsideScript.setAttribute(
      'src',
      '//content.jwplatform.com/players/tluteeuw-8cg9oAyB.js'
    )
    document.head.appendChild(outsideScript)
  }
}
</script>

<style lang="css"></style>
