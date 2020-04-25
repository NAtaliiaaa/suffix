<template>
  <div>
    <section class="baner" v-if="article">
      <div class="baner__overlay overlay">
        <div class="item baner__image_box">
          <img
            class="baner__image"
            :src="article.data.image ? article.data.image[0] : ''"
            alt=""
          />
        </div>
        <div class="item baner__content_box">
          <div class="baner__content_header">
            <time class="base-date baner__date" :datetime="article.data.date">{{
              article.data.date | formatDate
            }}</time>
            <router-link
              class="baner__tag"
              :to="{
                path: `blog?tag=${_getTag(article.data.categs)}`,
                query: { tag: _getTag(article.data.categs) }
              }"
            >
              {{ $t(`${_getTag(article.data.categs)}`) }}
            </router-link>
          </div>
          <div class="baner__content">
            <p class="baner__title">{{ maxLengthTitle(article.data.title) }}</p>
            <div
              class="baner__intro cms"
              v-html="maxLengthIntro(article.data.intro)"
            ></div>
          </div>
          <router-link class="baner__link" :to="'/blog/' + article.data.slug">
            Read moore
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("translations", ["trans"]),
    ...mapGetters("blog", {
      getTagById: "getTagById",
      article: "firstArtice"
    })
  },
  created() {
    // this.getArticlesByTag().then(()=>{
    //   const el = this.tags.find((i)=>i.data.name = this.tag);
    //   const tagId = el && el.id ? el.id : null;
    //   this.getArticlesByTag({
    //     tagId,
    //     toSkip: this.skip,
    //     toTop: this.top,
    //   }).then((r)=>{
    //     this.currArticle=r;
    //   })
    // })
    this.$store.dispatch("blog/getArticles");
  },
  methods: {
    maxLengthIntro(str) {
      var maxLength = 100;
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      } else return str;
    },
    maxLengthTitle(str) {
      var maxLength = 50;
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      } else return str;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "HomeBaner.scss";
</style>
