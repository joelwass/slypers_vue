<template>
  <div class="complete">
    <h2>CONGRATULATIONS!</h2>
    <div>
      <h3>Order Details:</h3>
      <p>Order Id: </p>
    </div>
    <p></p>
    <p>Order details: {{ orderId }}</p>

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
      orderId: state => state.customer.stripeOrderId
    })
  },
}
</script>

<style>
.complete {
  min-height: 100vh;
  padding: 80px 30px 20px 30px;
} 

@media all and (min-width: 850px) {
  .complete {
    min-height: 100vh;
    padding: 100px 140px 100px 300px
  }
}
</style>

