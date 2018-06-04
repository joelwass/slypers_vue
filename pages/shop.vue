<template>
  <div class="grid-container-shop grid-container-shop-media">
    <product-card 
        v-for="product in cart.availableProducts" 
        :key="product.id"
        :class="classes[product.name]"
        :product="product"
        v-on:click.native="shopProduct(product)">
      <label for="product">{{product.name}}</label>
    </product-card>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'Vuex'

import ProductCard from '~/components/ProductCard.vue'
import Api from '../middleware/api'

export default {
  data() {
    return {
      classes: {
        'Red & Black Slypers': 'one',
        'Grey Slypers': 'two',
        'Black & White Slypers': 'three',
        'Blue Slypers': 'four'
      }
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    })
  },
  methods: {
    ...mapActions({
      setSelectedProduct: 'SET_BROWSING_SELECTED_PRODUCT'
    }),
    shopProduct(product) {
      this.setSelectedProduct(product)
      this.$router.push('/shop_product')
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
