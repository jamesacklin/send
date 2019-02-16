<template>
  <div class="advertising">
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
.advertising > div:not(:empty) {
  background: #f5f3ef;
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 0 1rem;
}
</style>
