<template>
  <div class="special-content">
    <div id="special-content-target" />
  </div>
</template>

<script>
// Import jQuery for DOM manipulation stuff (oof)
import jQuery from 'jquery'
let $ = jQuery

export default {
  props: {
    'embedCode': String
  },
  mounted() {
    // Test for "<script src='blah'" contents in the embedCode prop
    var re = /<script[^>]*src="([^"]*)"/
    // If we find a match in the embed code...
    if (re.test(this.embedCode) === true) {
      // Get the src attribute value, call it match
      var match = re.exec(this.embedCode)
      // Create a script element
      let script = document.createElement('script')
      // Set an ID so we can destroy it later
      script.setAttribute('id', 'special-content-script')
      // Set the src attribute to the one we regex'd out
      script.setAttribute('src', match[1])
      // Appends the script to the head
      document.head.appendChild(script)
      // Embed our widget, and leave the <script> crap in, because it won't mount anyway
      // FIXME: Maybe pull divs and spans out and append those? Who knows
      var widget = this.embedCode
      $(widget).appendTo('#special-content-target')
    }
  },
  beforeDestroy() {
    // Find the special-content-script in the head and destroy it
    $('#special-content-script').remove()
    // Destroy the widget target
    $('#special-content-target').remove()
  }
}
</script>

