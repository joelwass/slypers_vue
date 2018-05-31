<template>
  <div class="grid-container-shop grid-container-shop-media">
    <product-card class="one" name="Shoe1">
      <img src="~/assets/shoes/Slypers_16_r_b.jpeg" alt="">
    </product-card>
    <product-card class="two" name="Shoe2">
      <img src="~/assets/shoes/Slypers_13_g.jpeg" alt="">
    </product-card>
    <product-card class="three" name="Shoe3">
      <img src="~/assets/shoes/Slypers_14_b.jpeg" alt="">
    </product-card>
    <product-card class="four" name="Shoe4">
      <img src="~/assets/shoes/Slypers_15_r.jpeg" alt="">
    </product-card>
    <div v-for="product in availableProducts" :key="product"><label for="product">{{product}}</label></div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'
import Api from '../middleware/api'

export default {
  computed: {
    availableProducts() {
      console.log('here')
      const products = this.getAvailableProducts()
      console.log(products)
      return []
    }
  },
  methods: {
    getAvailableProducts: async () => {
      try {
        const products = await Api.getAllProducts()
        console.log(products)
      } catch (e) {
        console.log(e)
        return []
      }
    }
  },
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

@media all and (min-width: 850px) {
  .grid-container-shop-media {
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 0px;
  } 
}

</style>
