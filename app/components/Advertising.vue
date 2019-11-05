<template>
  <div :id="id" />
</template>
<script type="text/babel">
export default {
  // The advertising component, which renders a Google advertisement slot.
  // Usage: <advertising :id="'div-gpt-ad-1550758951288-0'" :size="'mobileBanner'" :unit="'DR_Mobile_Leaderboard'" />
  // The ID and unit strings should come from the Google DoubleClick for Publishers Ad Manager.
  // See plugins/vue-dfp.js for the size mappings.
  name: 'Advertising',
  props: {
    // The ID is random by default, but you should still bind an ID prop.
    id: {
      'type': String,
      default: () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
    },
    // You will also need a unit prop.
    unit: {
      'type': String,
      required: true
    },
    // The size prop determines which size GPT will serve.
    size: {
      'type': String,
      default: null
    },
    slotType: {
      'type': String,
      default: 'normal'
    }
  },
  computed: {
    adUnit() {
      return `/${this.$doubleclick.id}/${this.unit}`
    },
    adSize() {
      if (!this.size) {
        return this.$doubleclick.default_size
      }
      return this.size
    },
    sizes() {
      try {
        return this.$doubleclick.sizes[this.adSize]
      } catch (e) {
        return [1200, 400]
      }
    },
    mapping() {
      try {
        return this.$doubleclick.mappings[this.adSize]
      } catch (e) {
        console.error(`Mappings for ${this.adSize} ad size is not defined`)
        return false
      }
    }
  },
  mounted() {
    // Call the display function on mount.
    this.display()
  },
  beforeDestroy() {
    // Destroy the slots before we destroy the component.
    googletag.cmd.push(() => {
      googletag.destroySlots()
    })
  },
  methods: {
    display() {
      // The display method. The Google tag instance takes a push command where we "define" the slot, then display it (by ID).
      googletag.cmd.push(() => {
        this.define()
        googletag.display(this.id)
      })
    },
    define() {
      // Determine if we need to define the slot as out-of-page or not.
      if (this.slotType === 'out-of-page') {
        // If so, define it out of page.
        return this.defineOutOfPageSlot()
      }
      // Otherwise, define it normally.
      return this.defineSlot()
    },
    defineSlot() {
      // The function to define a slot normally by chaining functions to the googletag instance.
      googletag
        .defineSlot(this.adUnit, this.sizes, this.id)
        .addService(googletag.pubads())
    },
    defineOutOfPageSlot() {
      // The function to define an out-of-page slot by chaining functions to the googletag instance.
      googletag
        .defineOutOfPageSlot(this.adUnit, this.id)
        .addService(googletag.pubads())
    }
  }
}
</script>
