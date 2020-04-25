<template>
  <li class="">
    <section class="accordion" id="accordion">
      <div class="container">
        <div class="accordion__wrap">
          <h2
            class="accordion__item-title"
            :class="{ active: data.isActive }"
            v-on:click="AccordionIsActive"
          >
            {{ data.title }}
          </h2>
          <p class="accordion__item-content">
            {{ data.content }}
          </p>
        </div>
      </div>
    </section>
  </li>
</template>

<script>
export default {
  props: ["id", "data"],
    methods: {
    AccordionIsActive(event) {
      const matches = document.querySelectorAll('.accordion__item-title');
      for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove('active');
      }
      event.target.classList.toggle('active');
    },
   }
}
</script>
<style>
@import './AccordionItem.scss';
</style>