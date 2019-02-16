<template>
  <div>
    <template v-for="ad in sidebarData">
      <advertising
        :id="ad.id"
        :size="ad.size"
        :unit="ad.name"
        :key="ad.index"
      />
    </template>
  </div>
</template>

<script>
import Advertising from '@/components/Advertising'

export default {
  name: 'adSidebar',
  props: ['sidebarData'],
  components: {
    Advertising
  }
}
</script>

<style>

</style>
