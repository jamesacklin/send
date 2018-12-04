<template>
  <div id="app">
    <div>
      <google-ad
        v-for="ad in headerAdUnits"
        :key="ad.index"
        :unit="ad"
        size="banner" />
      <google-ad
        v-for="ad in adUnits"
        :key="ad.index"
        :unit="ad"
        size="rectangle" />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      headerAdUnits: ["DR_Leaderboard", "DR_Mobile_Leaderboard"],
      adUnits: [
        "DR_300x250_Square1",
        "DR_300x250_Square2",
        "DR_300x250_Square3",
        "DR_300x250_Square4",
        "DR_300x250_Square5",
        "DR_300x250_Square6",
        "DR_300x250_Square7",
        "DR_300x250_Square8",
        "DR_300x250_SquareNine",
        "DR_300x250_SquareTen"
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
