<template>
  <div class="shop-product">
    <swiper :options="swiperOption" class="image-swiper">
      <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/Slypers_16_r_b.jpeg" alt=""></swiper-slide>
      <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/Slypers_13_g.jpeg" alt=""></swiper-slide>
      <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/Slypers_14_b.jpeg" alt=""></swiper-slide>
      <swiper-slide class="image-swiper-slide"><img src="~/assets/shoes/Slypers_15_r.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
    <div class="product-details">
      <div class="product-details-description">
        <p><b>Description -</b><br>{{ this.selectedProduct.description }} </p><br>

        <div v-on:click="dropdown" class="sizes-select">sizes</div>
        <div v-show="dropdownOpen" class="sizes">
          <ul>
            <li v-for="size in sizes" :key="size">US - {{ size }}</li>
          </ul>
        </div>
        
        <!-- <div class="size-guide">
          <p>US 11</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'Vuex'
import ProductCard from '~/components/ProductCard.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Api from '../middleware/api'

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      sizes: [9.5, 10, 10.5, 11, 11.5, 12],
      dropdownOpen: false
    }
  },
  computed: {
    ...mapState({
      selectedProduct: state => state.browsingSelectedProduct
    })
  },
  methods: {
    dropdown() {
      this.dropdownOpen = !this.dropdownOpen
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
.sizes-select {
  border: 1px solid black;
}

.sizes > ul {
  list-style-type: none;
  border: 1px solid black;
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
  width: 100%;
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
