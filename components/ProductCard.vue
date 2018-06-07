<template>
  <div class="card">
    <div>
      <img :src="product.image" alt="productImage">
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

