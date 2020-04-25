<template>
  <main>
    <div v-if="isLoader">
      <HeaderBlogItem />
      <div class="container">
        <img width="500" :src="singleArticle.image[0]" alt=""  class="leftimg"/>
      <div class="content" v-html="singleArticle.content"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { mutt } from "@/store/blog";
import { mapState, mapActions } from "vuex";
import HeaderBlogItem from "@/components/HeaderBlogItem/HeaderBlogItem.vue";

export default {
  computed: {
    ...mapState("blog", ["singleArticle"]) // < -- null --- waiting <-- data Article
  },
  components: {
  HeaderBlogItem,
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

  .content{
       padding: 50px 0;
    text-align:justify;
  }
  .leftimg {
    padding: 50px 20px 20px 0;
    float:left; /* Выравнивание по левому краю */
    margin: 7px 7px 7px 0; /* Отступы вокруг картинки */
   }
</style>