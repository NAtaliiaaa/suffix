<template>
  <li class="item">
    <section>
        <div class="clients__wrap">
          <a href="/" class="icon">
            <img class="img" :src="data.image ? data.image[0] : ''" alt="" />
          </a>
        </div>
    </section>
  </li>
</template>

<script>
export default {
  props: ["id", "data"],
 
}
</script>
<style lang="scss" scoped>
.clients__wrap{
      //  width:50%;
    margin: 0 10px;
    padding: 10px;

}
</style>