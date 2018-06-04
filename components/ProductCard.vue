<template>
  <div class="card">
    <div>
      <img v-if="product.name === 'Red & Black Slypers'" src="~/assets/shoes/Slypers_16_r_b.jpeg" alt="">
      <img v-else-if="product.name === 'Grey Slypers'" src="~/assets/shoes/Slypers_13_g.jpeg" alt="">
      <img v-else-if="product.name === 'Blue Slypers'" src="~/assets/shoes/Slypers_14_b.jpeg" alt="">
      <img v-else src="~/assets/shoes/Slypers_15_r.jpeg" alt="">
    </div>
    <div>
      <label :for="labelFor">{{ product.name }}</label>
      <p>${{ product.price }}</p>
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
  /* border: 1px black solid; */
  padding: 1em;
  text-align: center;
}

img{
  max-height:100%;
  max-width:100%;
}

.card-image {
  background-size: contain;
}
</style>

