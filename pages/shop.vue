<template>
  <div class="shop-container shop-container-media">
    <div>
      <p class="emphasize">Dutch Brothel Creepers</p>
      <p>For royal weddings and casual beddings,</p>
      <p>For being born on third and still stumbling home,</p>
      <p>For doing what you naught but never getting caught,</p>
      <p class="emphasize">There are Slypers - the expedient sole for the deviant soul.</p>
    </div>
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
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

import ProductCard from '~/components/ProductCard.vue'
import Api from '../middleware/api'

export default {
  data() {
    return {
      classes: {
        'Black Slypers': 'one',
        'Green Slypers': 'two',
        'Tan Slypers': 'three',
        'Blue Slypers': 'four',
        'Red Slypers': 'five'
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
      this.$router.push(`/product/${product.numId}`)
    }
  },
  components: {
    ProductCard
  }
}
</script>

<style>
.emphasize {
  font-weight: bold;
  margin: 1.8rem 0 1.8rem 0;
}

.grid-container-shop {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
  grid-auto-rows: minmax(200px, auto);
  margin: 0 auto;
}

.shop-container {
  min-height: 100vh;
  margin-bottom: 30px;
  padding-left: 4px;
  padding-right: 4px;
}

.shop-container-media {
  padding-top: 60px;
}

.grid-container-shop > .one {
  grid-column: 1 / 2;
  grid-row: 1;
}
.grid-container-shop > .two { 
  grid-column: 2 / 2;
  grid-row: 1;
}
.grid-container-shop > .three {
  grid-column: 1 / 2;
  grid-row: 2;
}
.grid-container-shop > .four {
  grid-column: 2 / 2;
  grid-row: 2;
}
.grid-container-shop > .five {
  grid-column: 1 / 2;
  grid-row: 3;
}


@media all and (min-width: 850px) {
  .shop-container-media {
    padding-left: 240px;
    padding-right: 240px;
    padding-top: 0px;
  }

  .shop-container {
    padding-top: 70px;
  }
}

</style>
