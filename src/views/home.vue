<template>
  <div class="home">
    <HomeBaner v-if="true" :tag="tagFirst" />
    <Services />
     <ArticleList v-if="isLoaded" :ignore-first="true" :tag="tagFirst" />
    <Clients />
    <div v-if="isLoaded">
      <ArticleList :key="i.id" :tag="i" v-for="i in tagExceptFirst" />
      <!-- <router-link :to="" ></router-link> -->
    </div>
    <Accordion />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import HomeBaner from "@/components/HomeBaner/HomeBaner";
import ArticleList from "@/components/ArticleList/ArticleList";
import Services from '@/components/Services/Services.vue';
// import FeaturedArticles from '@/components/featured-articles-section/FeaturedArticles.vue';
import Clients from '@/components/Clients/Clients.vue';
// import Issue from '@/components/issue-section/Issue.vue';
import Accordion from '@/components/Accordion/Accordion.vue';


export default {
  name: 'Home',
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
     HomeBaner,
      ArticleList,
    Services,
    Clients,
    Accordion,
  },
 computed: mapGetters("blog", ["tagFirst", "tagExceptFirst"]),
  created() {
    this.$store.dispatch("blog/getArticlesForHome").then(() => {
      this.isLoaded = true;
    });
  }
};

</script>
