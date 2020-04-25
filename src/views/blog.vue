<template>
  <section>
    <HeaderBlog />
    <div class="container">
      <div class="blog__tag">
        <router-link  class="blog__link" to="/blog">See all</router-link>
          <router-link
          class="blog__link"
          :to="{
            path: `blog?tag=${tag.data.category}`, 
            query: { tag: tag.data.category }}"
          :key="tag.id"
          v-for="tag in tags"
        >
          {{ tag.data.category }}
        </router-link>
      </div>
   
      <div class="blog__articles">
        <ArticleItem
          :key="article.id"
          v-for="article in filteredArticles"
          v-bind="article"
        />
      </div>
      </div>
    
  </section>
</template>

<script>
import HeaderBlog from "@/components/HeaderBlog/HeaderBlog.vue";
import ArticleItem from "@/components/ArticleItem/ArticleItem";
// import VueRouter from "vue-router";

// import store from "@/store";
import { mutt } from "@/store/blog";
import { mapState, mapActions } from "vuex";

export default {
   
  computed: {
    ...mapState("blog", ["filteredArticles", "tags"])
  },
  components: {
    HeaderBlog,
    ArticleItem
  },
  methods: {
    ...mapActions("blog", ["getArticlesByTag"]),
    // setTag: function(tagId) {
    //   this.getArticlesByTag(tagId);
    // }
  },
    beforeRouteUpdate(to, from, next) {
      this.loading = true;
    this.getArticlesByTag().then(() => {
      /// ----> 1 day
      const el = this.tags.find(i => {
        return i.data.category === to.query.tag;
      });
      const tagId = el && el.id ? el.id : null;
      this.getArticlesByTag(tagId);
      this.loading = false;


      next();
    });
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(mutt);

    this.getArticlesByTag().then(() => {
      /// ----> 1 day
      const el = this.tags.find(i => {
        return i.data.categs === this.$route.query.tag;
      });
      const tagId = el && el.id ? el.id : null;
      this.getArticlesByTag(tagId);
    });
  },
};
</script>
<style>
  .blog__tag{
    display: flex;
    padding-top: 90px;
    padding-bottom: 90px;
  }
  .blog__link{
  margin: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
  box-shadow: 0 0 2px 1px #BDBDBD;
  background: #303030;
  width: 240px;
  min-height: 40px;
  color: var(--light-color);
  text-decoration: none;
  text-transform: uppercase;
 
  }
  .blog__link:focus,
  .blog__link:active,
    .blog__link:hover
  {
    border: 1px solid #303030;
   background: var(--light-color);
   color: #000000;
   transition: all 1s;
  
  }
  .blog__articles{
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      /* position: relative; */
  }
  /* .w1-3{
    width: calc(100% / 3 - 40px);
    padding:10px 5px;
  } */
</style>