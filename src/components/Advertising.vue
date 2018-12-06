<template lang="html">
  <div>
    <google-ad
      :unit="unit"
      :size="size" />
  </div>
</template>

<script>
export default {
  name: "Advertising",
  props: {
    unit: String,
    size: String
  }
};
</script>

<style lang="css">
</style>
