<template>
  <header class="header" ref="header">
    <div class="header__container">
      <router-link to="/">
        <img src="/svg/logo.svg" alt="" />
      </router-link>
      <div class="nav-wrap">
        <button class="burger" :class="{ active }" @click="toogleActive">
          <svg
            class="ham ham2"
            viewBox="0 0 100 100"
            width="80"
            onclick="this.classList.toggle('active')"
          >
            <path
              class="line top"
              d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381"
            />
            <path class="line middle" d="m 30,50 h 40" />
            <path
              class="line bottom"
              d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381"
            />
          </svg>
        </button>
        <Navigation />
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from "@/chunks/navigation/Navigation.vue";
export default {
  name: "suffix-header",
  mounted() {
    let header = this.$refs.header;
    window.onscroll = scrollHandler;
    function scrollHandler() {
      var h = document.documentElement.clientHeight;
      if (window.pageYOffset > h) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    }
  },
  components: {
    Navigation
  },
  data() {
    return {
      active: false,
      items: [
        {
          name: "Home",
          path: "/",
          id: 1
        },
        {
          name: "Clients",
          path: "/client",
          id: 2
        },
        {
          name: "Blog",
          path: "/blog",
          id: 3
        }
      ]
    };
  },
  methods: {
    go() {
      // this.$router.replace("/blog");
    },
    toogleActive() {
      this.active = !this.active;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "header.scss";
</style>
