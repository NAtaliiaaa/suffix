<template>
 <div class="services">
    <div class="container">
       <ul class="items">
        <Services
          :key="services.id"
          v-for="services in services"
          v-bind="services"
        />   
</ul>
 </div>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex';
import Services from "@/components/ServicesItem/ServicesItem.vue";
export default {
  methods: {
    ...mapActions("blog", ["getArticleBySlug"]),
  },
  computed:{
    ...mapState("services", ["services"])
  },
  created() {
    this.$store.dispatch("services/getServices");
  },
  components:{
Services,
 }

}

</script>
<style lang="scss" scoped>
@import "./Services.scss";
</style>
