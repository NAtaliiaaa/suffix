<template>
  <div> 
    <section class="clients">
      <div class="clients__wrap">
        <div class="clients__bgimage-overlay"></div>
        <img class="clients__bgimage" src="@/assets/images/Clients/Clients-bg.jpg" />
        <div class="clients__content">
          <h4 class="clients__title">Our clients</h4>
          <div class="clients__logotypes">
          <ul class="items">
            <Clients
              :key="clients.id"
              v-for="clients in clients"
              v-bind="clients"
            />   
          </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
 import {mapActions, mapState} from 'vuex';
import Clients from "@/components/ClientsItem/ClientsItem.vue";
export default {
  name: 'clients',
  methods: {
    ...mapActions("blog", ["getArticleBySlug"]),
  },
  computed:{
    ...mapState("clients", ["clients"])
  },
  created() {
    this.$store.dispatch("clients/getClients");
  },
  components:{
Clients,
 }

}
</script>
<style lang="scss" scoped>
@import "./Clients.scss";
</style>
