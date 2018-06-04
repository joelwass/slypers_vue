<template>
  <div class="shop-product">
    <div class="product-details">
      <div class="product-details-description">
        <p><b>Description -</b><br>{{ this.selectedProduct.description }} </p><br>
        <p><b>Size:</b></p><br>
        <div class="size-guide">
          <p>US 11</p>
        </div>
      </div>
    </div>
    <div class="grid-container-shop-product grid-container-shop-product-media">
      <div class="product-image one" name="Shoe1">
        <div>
          <img src="~/assets/shoes/Slypers_16_r_b.jpeg" alt="">
        </div>
      </div>
      <div class="product-image two" name="Shoe2">
        <div>
          <img src="~/assets/shoes/Slypers_13_g.jpeg" alt="">
        </div>
      </div>
      <div class="product-image three" name="Shoe3">
        <div>
          <img src="~/assets/shoes/Slypers_14_b.jpeg" alt="">
        </div>
      </div>
      <div class="product-image four" name="Shoe4">
        <div>
          <img src="~/assets/shoes/Slypers_15_r.jpeg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'Vuex'
import ProductCard from '~/components/ProductCard.vue'
import Api from '../middleware/api'

export default {
  computed: {
    ...mapState({
      selectedProduct: state => state.browsingSelectedProduct
    })
  },
  mounted() {
    console.log(this.selectedProduct)
  },
  components: {
    ProductCard
  }
}
</script>

<style>
.grid-container-shop-product {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100%, auto);
  margin: 0 auto;
}

.grid-container-shop-product-media {
  padding-top: 60px;
}

.one {
  grid-column: 1 / 1;
  grid-row: 1;
}
.two { 
  grid-column: 1 / 1;
  grid-row: 2;
}
.three {
  grid-column: 1 / 1;
  grid-row: 3;
}
.four {
  grid-column: 1 / 1;
  grid-row: 4;
}

@media all and (min-width: 850px) {
  .grid-container-shop-product-media {
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 0px;
  } 
}

img{
  max-height:100%;
  max-width:100%;
}

.product-image {
  position: relative;
  /* border: 1px black solid; */
  padding: 1em;
  text-align: center;
}

.product-details {
  position: fixed;
  width: 150px;
  right: 100px;
  z-index: 1000;
  top: 200px;
  height: 300px;
  /* background: transparent; */
}

.size-guide {
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: 1px black solid;
}

.shop-product {
  align-items:center
}

</style>
