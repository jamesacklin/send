<template>
  <div id="app">
    <Logo orientation="horizontal" style="width: 300px; margin: 0 auto" />
  </div>
</template>

<script>
import Logo from "@/components/Logo";

export default {
  name: "app",
  components: {
    Logo
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
