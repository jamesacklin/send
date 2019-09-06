<template>
  <div 
    class="advertising-header"
    :class="{ 'inline-advertising': isMobile }">
    <advertising
      v-if="!isMobile"
      :id="'div-gpt-ad-1550758388120-0'"
      :size="'banner'"
      :unit="'DR_Leaderboard'"
    />
    <advertising
      v-if="isMobile"
      :id="'div-gpt-ad-1550758951288-0'"
      :size="'mobileBanner'"
      :unit="'DR_Mobile_Leaderboard'"
    />
  </div>
</template>

<script>
import Advertising from '@/components/Advertising'

export default {
  name: 'adHeader',
  components: {
    Advertising
  },
  computed: {
    isMobile: function() {
      // Return true if the device user-agent is "mobile" (as deterimined by 'nuxt-device-detect' module)
      if (this.$device.isMobile) {
        return true
      } else {
        // Otherwise return false and assume we have a desktop or tablet
        return false
      }
    }
  }
}
</script>

<style>
.advertising-header {
  margin: 0 0 2em;
  text-align: center;
}

.advertising-header.inline-advertising {
  margin: 2rem 0 0 -5vw;
}
</style>
