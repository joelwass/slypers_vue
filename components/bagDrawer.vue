<template>
<div>
  <transition name="bag-drawer-transition">
    <div v-if="drawerOpen" class="bag-drawer">
      <h1 class="bag-title">BAG ({{ this.selectedProducts.length }})</h1>
      <div class="bag-drawer-IconsNav">
        <xIcon v-on:click.native="toggleDrawer" class="icon x" width="32" height="30"/>
      </div>
      <hr class="divider">
      <div class="products">
        <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
          <div class="selectedProduct">
            <div class="productPrice">
              <p>$ {{ product(prod.productId).price }}</p>
            </div>
            <div class="productDetails">
              <p>{{ product(prod.productId).description.toUpperCase() }}</p><br><br>
              <p><strong>COLOR:</strong> {{ product(prod.productId).colorString }}</p>
              <p><strong>SIZE: </strong>{{ prod.size }}</p>
              <div class="size-row"><strong>QUANTITY:</strong><p> - </p><p> {{ prod.quantity }} </p><p> + </p></div>
            </div>
            <img class="selectedProductImage" :src="product(prod.productId).image" />
          </div>
        </div>
        
      </div>
      <div class="bag-drawer-footer">
        <hr>
        <div class="checkout-button" v-on:click="checkout">
          <p>CHECKOUT ({{ selectedProducts.length }} ITEMS)</p>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'Vuex'
import X from '~/components/icons/X.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
  methods: {
    ...mapActions({
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    go(route) {
      this.toggleDrawer()
      this.$router.push(`/${route}`)
    },
    checkout() {

    },
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    }
  },
  computed: {
    ...mapState({
      drawerOpenState: state => state.bagDrawerOpen,
      selectedProducts: state => state.cart.selectedProducts,
      availableProducts: state => state.cart.availableProducts
    }),
    drawerOpen: {
      get() {
        return this.drawerOpenState
      },
      set(newVal) {
        this.setBagDrawerOpen(newVal)
      }
    },
    selectedProductsMapped() {
      const mappedProducts = {}
      this.selectedProducts.forEach((val) => {
        if (mappedProducts[`${val.productId}${val.size}`] && mappedProducts[`${val.productId}${val.size}`].size === val.size) {
          mappedProducts[`${val.productId}${val.size}`].quantity++
        } else {
          mappedProducts[`${val.productId}${val.size}`] = Object.assign({}, val)
        }
      })
      return Object.values(mappedProducts)
    }
  },
  components: {
    XIcon: X,
    Bag
  }
}
</script>

<style>

.productDetails > .size-row {
  display: inline-block;
}

.size-row > p {
  width: auto;
  display:inline;
}

.selectedProductsMapped {
  display:inline-block;
  width: 100%;
}

.bag-drawer > .divider {
  margin-top: 59px;
}

.selectedProduct {
  margin-bottom: 20px;
  margin-top: 20px;
}

.selectedProduct > .productDetails {
  float: right;
  width: 140px;
}

.selectedProduct > .productPrice {
  float: right;
  width: 60px
}

.products {
  padding-bottom: 130px;
  height: 100%;
  overflow: scroll;
}

.selectedProduct > .selectedProductImage {
  width: 120px;
}

.bag-drawer > .bag-title {
  position: absolute;
  left: 20px;
  top: 18px;
  font-size: 20px;
}

.bag-drawer-footer {
  position: absolute;
  z-index: 1001;
  background-color:white;
  width: 100%;
  bottom: 0px;
  padding-bottom: 10px;
}

.bag-drawer-footer > .checkout-button {
  text-align: center;
  background-color: black;
  margin-top: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.bag-drawer-transition-enter-active {
  transition: all .3s ease;
}

.bag-drawer-transition-leave-to {
  transition: all .3s ease;
}

.bag-drawer-transition-enter, .bag-drawer-transition-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(220px);
  opacity: 0;
}

.bag-drawer-IconsNav {
  display: inline-block;
  position: fixed;
  right: 10px;
  top: 10px;
}

.bag-drawer {
  position: fixed;
  z-index: 1010;
  background-color:white;
  height: 100%;
  width: 320px;
  right: 0px;
  top: 0px;
}

.bag-drawer-IconsNav > .icon {
  margin-left: 5px;
}

@media all and (min-width: 850px) {
  .bag-drawer > .divider {
    margin-top: 79px;
  }
}
</style>

