<template>
  <div class="shop-product">
    <div v-if="this.selectedProduct.name === 'Black & White Slypers'" >
      <swiper :options="swiperOption" class="image-swiper">
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blackAndWhite/Slypers_16.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blackAndWhite/Slypers_9.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blackAndWhite/Slypers_7.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blackAndWhite/Slypers_2.jpeg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div class="product-image one" name="Shoe1">
          <img src="~/assets/shoes/blackAndWhite/Slypers_16.jpeg" alt="">
        </div>
        <div class="product-image two" name="Shoe2">
          <img src="~/assets/shoes/blackAndWhite/Slypers_9.jpeg" alt="">
        </div>
        <div class="product-image three" name="Shoe3">
          <img src="~/assets/shoes/blackAndWhite/Slypers_7.jpeg" alt="">
        </div>
        <div class="product-image four" name="Shoe4">
          <img src="~/assets/shoes/blackAndWhite/Slypers_2.jpeg" alt="">
        </div>
      </div>
    </div>
    <div v-if="this.selectedProduct.name === 'Red Slypers'" >
      <swiper :options="swiperOption" class="image-swiper">
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/red/Slypers_15_r.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/red/Slypers_9_r.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/red/Slypers_7_r.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/red/Slypers_2_r.jpeg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div class="product-image one" name="Shoe1">
          <img src="~/assets/shoes/red/Slypers_15_r.jpeg" alt="">
        </div>
        <div class="product-image two" name="Shoe2">
          <img src="~/assets/shoes/red/Slypers_9_r.jpeg" alt="">
        </div>
        <div class="product-image three" name="Shoe3">
          <img src="~/assets/shoes/red/Slypers_7_r.jpeg" alt="">
        </div>
        <div class="product-image four" name="Shoe4">
          <img src="~/assets/shoes/red/Slypers_2_r.jpeg" alt="">
        </div>
      </div>
    </div>
    <div v-if="this.selectedProduct.name === 'Blue Slypers'" >
      <swiper :options="swiperOption" class="image-swiper">
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blue/Slypers_14.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blue/Slypers_12.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blue/Slypers_5.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/blue/Slypers_4.jpeg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div class="product-image one" name="Shoe1">
          <img src="~/assets/shoes/blue/Slypers_14.jpeg" alt="">
        </div>
        <div class="product-image two" name="Shoe2">
          <img src="~/assets/shoes/blue/Slypers_12.jpeg" alt="">
        </div>
        <div class="product-image three" name="Shoe3">
          <img src="~/assets/shoes/blue/Slypers_5.jpeg" alt="">
        </div>
        <div class="product-image four" name="Shoe4">
          <img src="~/assets/shoes/blue/Slypers_4.jpeg" alt="">
        </div>
      </div>
    </div>
    <div v-if="this.selectedProduct.name === 'Grey Slypers'" >
      <swiper :options="swiperOption" class="image-swiper">
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/grey/Slypers_13.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/grey/Slypers_10.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/grey/Slypers_6.jpeg" alt=""></swiper-slide>
        <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/grey/Slypers_1.jpeg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div class="product-image one" name="Shoe1">
          <img src="~/assets/shoes/grey/Slypers_13.jpeg" alt="">
        </div>
        <div class="product-image two" name="Shoe2">
          <img src="~/assets/shoes/grey/Slypers_10.jpeg" alt="">
        </div>
        <div class="product-image three" name="Shoe3">
          <img src="~/assets/shoes/grey/Slypers_6.jpeg" alt="">
        </div>
        <div class="product-image four" name="Shoe4">
          <img src="~/assets/shoes/grey/Slypers_1.jpeg" alt="">
        </div>
      </div>
    </div>
    <div class="product-details">
      <div class="product-details-description">
        <h2>{{ this.selectedProduct.name }}</h2><br>
        <h3>${{ this.selectedProduct.price }}</h3><br>
        <p><b>Description -</b><br>{{ this.selectedProduct.description }} </p><br>

        <p>Select Size:</p><br>
        <div v-on:click="dropdown" class="sizes-select">{{ this.selectedSizeData }}</div>
        <div v-show="dropdownOpen" class="sizes">
          <ul>
            <li v-for="size in sizes" :key="size" v-on:click="selectSize(size)">US - {{ size }}</li>
          </ul>
        </div>

        <div class="validation-container">
          <p>{{ this.validationIssue }}</p>
        </div>
        
        <div class="add-to-cart-button" v-on:click="addToCart">
          <p>Add to Cart</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'Vuex'
import ProductCard from '~/components/ProductCard.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Api from '../middleware/api'

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      validationIssue: undefined,
      sizes: [9.5, 10, 10.5, 11, 11.5, 12],
      dropdownOpen: false,
      selectedSizeData: 'Size',
      selectedSizeNumber: undefined
    }
  },
  computed: {
    ...mapState({
      selectedProduct: state => state.browsingSelectedProduct,
      selectedProducts: state => state.cart.selectedProducts
    }),
    selectedSize: {
      get() {
        return this.selectedSizeData
      },
      set(newVal) {
        this.selectedSizeNumber = newVal
        this.selectedSizeData = `US - ${newVal}`
      }
    },
    isSelected() {
      let contains = false
      this.selectedProducts.forEach((val) => {
        if (val.productId === this.selectedProduct.id) contains = true
      })
      return contains
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'ADD_PRODUCT'
    }),
    dropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    selectSize(newVal) {
      this.validationIssue = undefined
      this.selectedSize = newVal
      this.dropdown()
    },
    addToCart() {
      if (!this.selectedSizeNumber) {
        this.validationIssue = 'Please select a size first'
      } else {
        this.addProduct({ productId: this.selectedProduct.id, size: this.selectedSizeNumber })
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductCard
  }
}
</script>

<style>
.validation-container {
  margin-top: 5px;
  color: red;
}

.sizes-select {
  border: 1px solid black;
  width: 120px;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.add-to-cart-button {
  text-align: center;
  background-color: black;
  margin-top: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.add-to-cart-button:hover {
  cursor: pointer;
}

.sizes > ul {
  list-style-type: none;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  z-index: 10000;
  width: 120px;
  padding: 0;
}

.sizes > ul > li {
  cursor: pointer;
  margin: 0;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  width: 100%;
}

.sizes > ul > li:hover {
  background-color: black;
  color: white;
}

.grid-container-shop-product {
  display: none;
}

.grid-container-shop-product-media {
  padding-top: 60px;
}

.image-swiper-slide {
  text-align: center;
}

.image-swiper {
  width: 100%;
  height: 500px;
  padding-top: 60px;
}

.grid-container-shop-product > .one {
  grid-column: 1 / 1;
  grid-row: 1;
}
.grid-container-shop-product > .two { 
  grid-column: 1 / 1;
  grid-row: 2;
}
.grid-container-shop-product > .three {
  grid-column: 1 / 1;
  grid-row: 3;
}
.grid-container-shop-product > .four {
  grid-column: 1 / 1;
  grid-row: 4;
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
  position: relative;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  z-index: 1000;
  bottom: 0px;
  height: 300;
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

@media all and (min-width: 850px) {
  .grid-container-shop-product-media {
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 60px;
  } 

  .sizes > ul {
    list-style-type: none;
    border: 1px solid black;
    background-color: white;
    position: absolute;
    z-index: 10000;
    width: 80%;
    padding: 0;
  }

  .grid-container-shop-product {
    display: block;
  }

  .image-swiper {
    display: none;
  }

  .product-details {
    position: fixed;
    width: 150px;
    right: 100px;
    z-index: 1000;
    top: 200px;
    height: 300px;
  }
}

</style>
