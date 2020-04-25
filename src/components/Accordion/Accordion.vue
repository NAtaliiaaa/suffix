<template>
       <ul>
        <Accordion
          :key="accordion.id"
          v-for="accordion in accordion"
          v-bind="accordion"
           v-on:click="accordion"
        />
</ul>
        
  </template>

<script>
import {mapActions, mapState} from 'vuex';
import Accordion from "@/components/AccordionItem/AccordionItem";
export default {
  
  methods: {
    ...mapActions("blog", ["getArticleBySlug"]),
  },
  computed:{
    ...mapState("accordion", ["accordion"])
  },
  created() {
    this.$store.dispatch("accordion/getAccordion");
  },
  components:{
    Accordion
  }

}

</script>

