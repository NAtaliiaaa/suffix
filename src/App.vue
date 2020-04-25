<template>
  <div id="app">
    <v-header />
    <router-view />
    <Footer />
    <div class="preloader">
      <img src="/svg/Double.svg" alt="" />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Footer
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
</style>
