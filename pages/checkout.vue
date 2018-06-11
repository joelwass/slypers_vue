<template>
  <div class="checkout">
    <div class="checkout-nav">
      <div class="checkout-nav-el">1. LOGIN / REGISTER</div>
      <div class="checkout-nav-el">2. SHIPPING</div>
      <div class="checkout-nav-el">3. PAYMENT</div>
      <div class="checkout-nav-el">4. REVIEW</div>
    </div>
    <div class="bag">
      <h1 class="bag-title">BAG ({{ this.selectedProducts.length }})</h1>
      <hr class="divider">
      <div class="products">
        <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
          <div class="selectedProduct">
            <div class="productPrice">
              <p>$ {{ product(prod.productId).price }}</p>
            </div>
            <div class="productDescription">
              <p>{{ product(prod.productId).description.toUpperCase() }}</p><br><br>
            </div>
            <div class="productDetails">
              <p><strong>COLOR:</strong> {{ product(prod.productId).colorString }}</p>
              <p><strong>SIZE: </strong>{{ prod.size }}</p>
              <p><strong>QUANTITY:</strong> {{ prod.quantity }} </p>
            </div>
            <img class="selectedProductImage" :src="product(prod.productId).image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState({
      selectedProducts: state => state.cart.selectedProducts,
      availableProducts: state => state.cart.availableProducts
    }),
    selectedProductsMapped() {
      const mappedProducts = {}
      this.selectedProducts.forEach((val) => {
        if (mappedProducts[`${val.productId}${val.size}`] && mappedProducts[`${val.productId}${val.size}`].size === val.size) {
          mappedProducts[`${val.productId}${val.size}`].quantity++
        } else {
          mappedProducts[`${val.productId}${val.size}`] = Object.assign({}, val)
        }
      })
      return Object.values(mappedProducts)
    }
  },
  methods: {
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    }
  }
}
  
</script>

<style>

@media all and (min-width: 850px) {
  .checkout {
    min-height: 100vh;
    padding-left: 140px;
    padding-top: 80px;
  }

  .checkout > .bag {
    width: 300px;
  }

  .checkout-nav {
    height: 100px;
    width: 100%;
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .checkout-nav-el {
    text-align: center;
    padding: 30px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
  }

  .checkout-nav-ul-li {
    display: inline;
    font-size: 11px;
    grid-column: 1 / 1;
    grid-row: 1;
    cursor: pointer;
    padding-top: 5px;
  }
}

</style>

