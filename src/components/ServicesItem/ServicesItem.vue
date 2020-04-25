<template>
  <li class="item">
    <div>
        <div class="services__wrap">
          <div class="icon">
            <img class="img" :src="data.image ? data.image[0] : ''" alt="" style="width: 28px; height:28px;" />
          </div>
          <h2 class="">
            {{ data.title }}
          </h2>
            <p class="">
              {{ data.intro }}
            </p>
        </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "data"],
 
}
</script>
<style lang="scss" scoped>
@import "./ServicesItem.scss";
</style>
