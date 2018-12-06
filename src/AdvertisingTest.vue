<template>
  <div id="app">
    <div>
      <advertising
        v-for="ad in adUnits"
        :key="ad.index"
        :unit="ad.name"
        :size="ad.size" />
    </div>
  </div>
</template>

<script>
import Advertising from "@/components/Advertising";

export default {
  name: "app",
  components: {
    Advertising
  },
  data: function() {
    return {
      adUnits: [
        {
          name: "DR_Leaderboard",
          size: "banner"
        },
        {
          name: "DR_Mobile_Leaderboard",
          size: "banner"
        },
        {
          name: "DR_300x250_Square1",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square2",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square3",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square4",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square5",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square6",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square7",
          size: "rectangle"
        },
        {
          name: "DR_300x250_Square8",
          size: "rectangle"
        },
        {
          name: "DR_300x250_SquareNine",
          size: "rectangle"
        },
        {
          name: "DR_300x250_SquareTen",
          size: "rectangle"
        }
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
