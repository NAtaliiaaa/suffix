<template>
  <div class="blog-item">
    <div class="container">
      <div class="blog-item__wrap">
        <div class="blog-item__head">
          <time class="base-date" :datetime="singleArticle.date">{{
            singleArticle.date | formatDate
          }}</time>
          <router-link
            class="header__tag" 
            :to="'/'">
            {{ $t(`${_getTag(singleArticle.categs)}`) }}
          </router-link>
        </div>
        <p class="blog-item__title">{{ singleArticle.title }}</p>
        <div class="blog-item__intro" v-html="singleArticle.intro"></div>
      </div>
    </div>
  </div>
</template>
<script>

import { mutt } from "@/store/blog";
  import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("blog", ["singleArticle"]) // < -- null --- waiting <-- data Article
  },
 
  data() {
    return {
      isLoader: false
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(`blog/${mutt.DEL_SINGLE_ARCTICLE}`);
    next();
  },
  methods: {
    ...mapActions("blog", ["getArticleBySlug"])
  },
  created() {
    // now request in creaated
    // make in hook beforeRouteEnter
    setTimeout(() => {
      this.getArticleBySlug(this.$route.params.slug).then(() => {
        this.isLoader = true;
      });
    }, 100);
  }
};
</script>
<style lang="scss" scoped>
@import "./HeaderBlogItem.scss";
</style>
