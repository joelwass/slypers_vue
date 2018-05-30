<template>
  <div class="grid-container-shop grid-container-shop-media">
    <product-card class="one" name="Shoe1" image="~/assets/shoes/Slypers_16_r_b.png"/>
    <product-card class="two" name="Shoe2" image=""/>
    <product-card class="three" name="Shoe3" image=""/>
    <product-card class="four" name="Shoe4" image=""/>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  }
}
</script>

<style>
.grid-container-shop {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(200px, auto);
  margin: 0 auto;
}

.grid-container-shop-media {
  padding-top: 60px;
}

.one {
  grid-column: 1 / 2;
  grid-row: 1;
}
.two { 
  grid-column: 2 / 2;
  grid-row: 1;
}
.three {
  grid-column: 1 / 2;
  grid-row: 2;
}
.four {
  grid-column: 2 / 2;
  grid-row: 2;
}

@media all and (min-width: 640px) {
  .grid-container-shop-media {
    padding-top: 100px;
    padding-left: 120px;
    padding-right: 120px;
  } 
}

</style>
