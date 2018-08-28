<template>
  <div class="shop-product">
    <div v-if="selectedFullProduct()">
      <div v-swiper:mySwiper="swiperOption" class="image-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide image-swiper-slide" v-for="(image, index) in selectedFullProduct().images" :key="index" >
            <img className="productImg" :src="image" alt="">
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div v-for="(image, index) in selectedFullProduct().images" :key="index" class="product-image one" :id="`shoe${index}`">
          <img className="productImg" :src="image" alt="">
        </div>
      </div>
    </div>
    <div class="sliding-window">
      <div class="grid-container-sliding-window">
        <div v-for="(image, index) in selectedFullProduct().images" @click="scrollToImage(`#shoe${index}`)" :key="index" :class="slidingWindowClasses(index)" name="Shoe1">
          <img className="productImg" :src="image" alt="">
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
} from 'vuex'
import ProductCard from '~/components/ProductCard.vue'
import Api from '../middleware/api'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      validationIssue: undefined,
      sizes: [9.5, 10, 10.5, 11, 11.5, 12],
      dropdownOpen: false,
      selectedSizeData: 'Size',
      selectedSizeNumber: undefined,
      viewingImage: 0
    }
  },
  created () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('hashchange', function () {
        window.scrollTo(window.scrollX, window.scrollY - 50);
      });
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    ...mapState({
      selectedProduct: state => state.browsingSelectedProduct,
      selectedProducts: state => state.cart.selectedProducts,
      availableProducts: state => state.cart.availableProducts
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
      addProduct: 'ADD_PRODUCT',
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN'
    }),
    slidingWindowClasses(shoe) {
      if (shoe !== this.viewingImage) return ['sliding-window-image', 'sliding-window-opacity']
      return ['sliding-window-image']
    },
    handleScroll (event) {
      if (process.browser) {
        const imageHeight = document.getElementById('shoe1').clientHeight
        if (imageHeight) {
          const floor = Math.floor((window.scrollY+300) / imageHeight)
          this.viewingImage = floor
        }
      }
    },
    dropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    selectedFullProduct() {
      const id = this.selectedProduct.id
      if (!id) return {}
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
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
        // add to bag and pop bag drawer
        // TODO: need to add the specific sku for the size they selected
        this.addProduct({ productId: this.selectedProduct.id, size: this.selectedSizeNumber, sku: this.selectedProduct.skus[0].id })
        this.setBagDrawerOpen(true);
      }
    },
    scrollToImage(imageId) {
      if (process.browser) {
        document.location = imageId
      }
    }
  },
  components: {
    ProductCard,
  }
}
</script>

<style>
.sliding-window {
  display: none;
}

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
  cursor:pointer;
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

.sliding-window-opacity {
  opacity: .6;
}

.sizes > ul {
  list-style-type: none;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  z-index: 10000;
  width: 120px;
  padding: 0;
  cursor: pointer;
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

.grid-container-sliding-window {
  grid-column: 1 / 1;
  grid-row: 1;
}

.productImg {
  max-height:100%;
  max-width:100%;
}

.product-image {
  position: relative;
  /* border: 1px black solid; */
  padding: 1em;
  text-align: center;
}

.sliding-window-image {
  position: relative;
  border: 1px black solid;
  margin: 10px;
  cursor: pointer;
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
  align-items:center;
  min-height: 100vh;
}

@media all and (min-width: 850px) {
  .grid-container-shop-product-media {
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 60px;
  } 

  .sliding-window {
    display: block;
    position: fixed;
    width: 70px;
    height: 70px;
    bottom: 350px;
    left: 130px;
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
