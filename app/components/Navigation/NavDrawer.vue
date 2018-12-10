<template lang="html">
  <div>
    <div class="nav-drawer">
      <div class="nav-logo">
        <Logo bgColor="white" orientation="horizontal" />
      </div>
      <nav>
        <NavItem :item="{'name': 'Industry News', 'link': '/news'}" />
        <NavItem :item="{'name': 'Gear', 'link': '/gear'}" />
        <NavItem :item="{'name': 'Features', 'link': '/features'}" />
        <NavItem :item="{'name': 'Videos', 'link': '/videos'}" />
      </nav>
    </div>
  </div>
</template>

<script>
import NavItem from "./NavItem";
import Logo from "../Logo";

export default {
  name: "NavDrawer",
  components: {
    NavItem,
    Logo
  }
};
</script>

<style lang="css">
.nav-drawer {
  background: red;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.nav-logo {
  margin: 0 auto;
  padding: 1rem 25vw 5rem;
}

.nav-drawer nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 25em;
  width: 50%;
}
</style>
