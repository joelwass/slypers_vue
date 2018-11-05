<template>
  <div class="complete">
    <h2>Order Complete</h2><br>
    <div>
      <h3>Order Details</h3>
    </div><br>
    <p>Order Id: {{ orderId }}</p><br><br>
    <p>A receipt should be emailed shortly to {{ email }}</p><br><br>
    <p>Please contact us at hans@slypers.com with any questions or concerns</p>

  </div>  
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState({
      selectedProducts: state => state.cart.selectedProducts,
      availableProducts: state => state.cart.availableProducts,
      email: state => state.customer.user.email,
      orderId: state => state.customer.stripeOrderId
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
    },
  },
  methods: {
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    },
  }
}
</script>

<style>
.complete {
  min-height: 100vh;
  padding: 80px 30px 20px 30px;
  text-align: center;
} 

@media all and (min-width: 850px) {
  .complete {
    min-height: 100vh;
    padding: 100px 140px 100px 300px
  }
}
</style>

