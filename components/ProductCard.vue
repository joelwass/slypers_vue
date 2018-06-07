<template>
  <div class="card">
    <div>
      <img v-if="product.name === 'Black & White Slypers'" src="~/assets/shoes/blackAndWhite/Slypers_16.jpeg" alt="">
      <img v-else-if="product.name === 'Grey Slypers'" src="~/assets/shoes/grey/Slypers_13.jpeg" alt="">
      <img v-else-if="product.name === 'Blue Slypers'" src="~/assets/shoes/blue/Slypers_14.jpeg" alt="">
      <img v-else src="~/assets/shoes/red/Slypers_15_r.jpeg" alt="">
    </div>
    <div class="product-label">
      <label :for="labelFor">{{ product.description.toUpperCase() }}</label>
    </div>
    <div class="product-price">
      <p>$ {{ product.price }} - ORDER NOW</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product-Card',
  props: {
    labelFor: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    price() {
      return '$16000'
    }
  }
}  
</script>

<style>
.card {
  position: relative;
  padding: 1em;
  text-align: center;
}

.card > .product-price {
  text-align: left;
  bottom: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}
 
.card > .product-label {
  margin-top: 15px;
  text-align: left;
  height: 30px;
}

img{
  max-height:100%;
  max-width:100%;
}

.card-image {
  background-size: contain;
}
</style>

