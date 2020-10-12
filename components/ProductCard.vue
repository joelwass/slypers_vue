<template>
  <div class="card">
    <div class="card-image">
      <img :src="productImage" alt="productImage" 
        @mouseover="productImage = product.image" 
        @mouseleave="productImage = product.altImage">
    </div>
    <div class="card__details">
      <div class="product-label">
        <p>{{ product.name }}</p>
      </div>
      <div class="product-price">
        <p>€ {{ product.price }} / $ {{ product.usdPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product-Card',
  data() {
    return {
      productImage: this.product.altImage
    }
  },
  props: {
    labelFor: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      required: true
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
  background-size: contain;
}
</style>

