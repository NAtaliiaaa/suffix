<template>
  <div class="acticles">
    <div class="container">
      <ul class="items">
        <ArticleItem
          :key="article.id"
          v-for="article in articlesByTag"
          v-bind="article"
        />
      </ul>
      <div class="article__btn">
       <router-link class="article__link" :to="'/blog'">
            See all
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem/ArticleItem.vue";

export default {
  
  props: ["tag", "ignoreFirst"],
  computed: {
    articlesByTag() {
      const articles = this.$store.state.blog.articleHome[
        this.tag.data.category
      ];
      if (this.ignoreFirst) return articles.splice(1);
      return articles;
    }
  },
  components: {
    ArticleItem
  }
};
</script>

<style lang="scss" scoped>
@import "./ArticleList.scss";
</style>
