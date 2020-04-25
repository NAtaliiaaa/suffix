<template>
  <li class="item w1-3">
    <article>
      <div class="img-box">
        <img class="img" :src="data.image ? data.image[0] : ''" alt="" />
      </div>
      <div class="content-box">
        <div class="article__head">
          <time class="base-date article__date" :datetime="data.date">{{ data.date | formatDate }}</time>
          <router-link 
          class="article__tag"
          :to="{
            path: `blog?tag=${_getTag(data.categs)}`,
            query: { tag: _getTag(data.categs) }
          }"
          >
            {{ $t(`${_getTag(data.categs)}`) }}
          </router-link>
        </div>
        <router-link class="article__title" :to="'/blog/' + data.slug">{{ maxLengthTitle(data.title) }}</router-link>
        <!-- <div class="cms" v-html="maxLengthIntro(data.intro)"></div> -->
        <!-- <router-link :to="'/blog/' + data.slug">
            Read more
        </router-link> -->
      </div>
    </article>
  </li>
</template>

<script>
export default {
  props: ["id", "data"],

  methods: {
    maxLengthIntro(str){
      var maxLength = 100;
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      }
      else return str;
    },
     maxLengthTitle(str){
      var maxLength = 50;
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      } 
      else return str;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/settings.scss";
@import "./ArticleItem.scss";
</style>
