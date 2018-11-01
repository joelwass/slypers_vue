<template>
  <div class="shop-product" @click="closeDropdown">
    <div v-if="selectedFullProduct()">
      <div v-swiper:mySwiper="swiperOption" class="image-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide image-swiper-slide" v-for="(image, index) in selectedFullProduct().images" :key="index" >
            <img className="productImg" :src="image" alt="Shoe image">
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
      <div class="grid-container-shop-product grid-container-shop-product-media">
        <div v-for="(image, index) in selectedFullProduct().images" :key="index" class="product-image" :id="`shoe${index}`">
          <img className="productImg" :src="image" alt="Shoe image">
        </div>
      </div>
    </div>
    <div class="sliding-window">
      <div class="grid-container-sliding-window">
        <div v-for="(image, index) in selectedFullProduct().images" @click="scrollToImage(`shoe${index}`)" :key="index" :class="slidingWindowClasses(index)" name="Shoe1">
          <img className="productImg" :src="image" alt="Shoe image">
        </div>
      </div>
    </div>
    <div class="product-details">
      <div class="product-details-description">
        <h2>{{ this.selectedProduct.name }}</h2><br>
        <h3>€ {{ this.selectedProduct.price }}</h3><br>
        <p><b>Description</b></p><br>
        <p>Colour: {{ this.selectedProduct.colorString }}</p><br>
        <p>Dutch Bordeelslyper.  Italian suiting wool upper. Cotton liner.  Memory foam cushioned insole.  EVA microfoam outsole.  Suede tassel.</p><br>
        <p>Made In Italy</p><br>

        <p class="product-details__size-label"><b>Size</b></p>
        <p class="product-details__size-guide-button"><a @click="toggleSizeDrawer">SIZE GUIDE ></a></p>
        <div @click="dropdown" class="sizes-select">{{ this.selectedSizeData }}</div>
        <div v-show="dropdownOpen" class="sizes">
          <ul>
            <li v-for="size in sizes" :key="size" @click="selectSize(size)">US - {{ size }}</li>
          </ul>
        </div>

        <div class="validation-container">
          <p>{{ this.validationIssue }}</p>
        </div>
        
        <div class="add-to-cart-button" @click="addToCart">
          <p>ADD TO BAG</p>
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
      sizes: [8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
      dropdownOpen: false,
      selectedSizeData: 'SELECT SIZE',
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
      availableProducts: state => state.cart.availableProducts,
      sizeDrawerOpenState: state => state.sizeDrawerOpen
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
    drawerOpen: {
      get() {
        return this.sizeDrawerOpenState
      },
      set(newVal) {
        this.setSizeDrawerOpen(newVal)
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
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN',
      setSizeDrawerOpen: 'SET_SIZE_DRAWER_OPEN',
    }),
    toggleSizeDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    slidingWindowClasses(shoe) {
      if (shoe !== this.viewingImage) return ['sliding-window-image', 'sliding-window-opacity']
      return ['sliding-window-image']
    },
    closeDropdown() {
      this.dropdownOpen = false
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
    dropdown(e) {
      e.stopPropagation();
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
        this.addProduct({ productId: this.selectedProduct.id, size: this.selectedSizeNumber })
        this.setBagDrawerOpen(true);
      }
    },
    scrollToImage(imageId) {
      if (process.browser) {
        const scrollHeight = document.getElementById(imageId).offsetTop
        window.scrollTo(0, scrollHeight + 240)
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
  width: 100%;
  padding-left: 5px;
  margin-top: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor:pointer;
}

.product-details__size-guide-button {
  float: right;
  font-size: 13px;
  cursor: pointer;
}

.product-details__size-label {
  display: inline-block;
}

.add-to-cart-button {
  text-align: center;
  background-color: black;
  margin-top: 18px;
  padding-top: 8px;
  margin-bottom: 60px;
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
  z-index: 10000;
  width: 100%;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
}

.sizes > ul > li {
  cursor: pointer;
  margin: 0;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
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

.product-image {
  position: relative;
  /* border: 1px black solid; */
  padding-left: 1em;
  padding-right: 1em;
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
    padding-bottom: 100px;
  } 

  .product-details-description > p {
    margin-bottom: 5px;
  }

  .sliding-window {
    display: block;
    position: fixed;
    width: 70px;
    height: 70px;
    bottom: 450px;
    left: 130px;
  }

  .sizes-select {
    border: 1px solid black;
    width: 100%;
    background-color: white;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    cursor:pointer;
  }

  .productImg {
    max-height:100%;
    max-width:100%;
  }

  .sizes {
    height: 120px;
    overflow: scroll;
  }

  .sizes > ul {
    list-style-type: none;
    border: 1px solid black;
    background-color: white;
    z-index: 10000;
    width: 210px;
    padding: 0;
  }

  .grid-container-shop-product {
    padding-left: 120px;
    margin-bottom: 100px;
    display: block;
  }

  .image-swiper {
    display: none;
  }

  .product-details {
    position: fixed;
    width: 240px;
    right: 100px;
    z-index: 1000;
    top: 22vh;
    height: 300px;
  }
}

</style>
