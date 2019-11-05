<template lang="html">
  <div class="outside-player">
    <div id="botr_tluteeuw_8cg9oAyB_div" />
  </div>
</template>

<script>
export default {
  name: 'OutsideFeed',
  data() {
    return {
      windowWidth: 0
    }
  },
  watch: {
    windowWidth(width) {
      // Watch the windowWidth data
      if (width >= 814) {
        // If the window is >814px wide, mount the script
        this.mountScript()
      } else if (width <= 814) {
        // If the window is <814px wide, unmount the script
        this.unmountScript()
      }
    }
  },
  mounted() {
    // Determine window width on mount
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      // Add an event listener looking for window resizes
      window.addEventListener('resize', () => {
        // Set windowWidth to the window inner width
        this.windowWidth = window.innerWidth
      })
    })
    // First time through—if the window width is >814px wide, mount the script
    if (this.windowWidth >= 814) {
      this.mountScript()
    }
  },
  beforeDestroy() {
    // Remove the event listener before destroying the component
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    mountScript() {
      // Method for mounting the JW Player platform scripts.
      // Checks to see if a script with ID "outside-script" is null before mounting.
      if (document.getElementById('outside-script') === null) {
        let outsideScript = document.createElement('script')
        // Sets some attributes
        outsideScript.setAttribute(
          'src',
          '//content.jwplatform.com/players/tluteeuw-8cg9oAyB.js'
        )
        outsideScript.setAttribute('id', 'outside-script')
        // Appends the script to the head
        document.head.appendChild(outsideScript)
      }
    },
    unmountScript() {
      // Method for removing the JW Player script from the head.
      // TODO: look for domain rather than ID to catch all stray scripts.
      // Checks to see if a script with ID "outside-script" is not null before trying to remove it.
      if (document.getElementById('outside-script') !== null) {
        let outsideScript = document.getElementById('outside-script')
        // Remove the script
        document.head.removeChild(outsideScript)
      }
    }
  }
}
</script>

<style>
.jw-error {
  /* Kill the player div if it doesn't load */
  display: none !important;
}
</style>
