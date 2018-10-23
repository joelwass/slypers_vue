<template>
  <div class="card">
    <div class="card-image">
      <img :src="product.image" alt="productImage">
    </div>
    <div class="card__details">
      <div class="product-label">
        <p>{{ product.name }}</p>
      </div>
      <div class="product-price">
        <p>$ {{ product.price }}</p>
      </div>
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
  text-align: left;
  cursor: pointer;
}

.card > .card__details > .product-price {
  text-align: left;
  bottom: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}
 
.card > .card__details > .product-label {
  margin-top: 15px;
  text-align: left;
  height: 30px;
}

.card__details {
  padding-left: 10px;
}

img{
  max-height:100%;
  max-width:100%;
}

.card-image {
  background-color: #F0F0F0;
  background-size: contain;
}
</style>

