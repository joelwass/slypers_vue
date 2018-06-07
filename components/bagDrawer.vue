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
            <img class="selectedProductImage" :src="product(prod.productId).image" />
          </div>
          <hr>
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
  mounted() {
    console.log(this.selectedProducts)
  },
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
      console.log(this.availableProducts)
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
      console.log(this.selectedProducts)
      return this.selectedProducts
    }
  },
  components: {
    XIcon: X,
    Bag
  }
}
</script>

<style>
.bag-drawer > .divider {
  margin-top: 59px;
}

.selectedProduct {
  margin-bottom: 20px;
  margin-top: 20px;
}

.products {
  margin-bottom: 50px;
  overflow: scroll;
}

.selectedProduct > .selectedProductImage {
  width: 150px;
}

.bag-drawer > .bag-title {
  position: absolute;
  left: 20px;
  top: 18px;
  font-size: 20px;
}

.bag-drawer-footer {
  position: absolute;
  width: 100%;
  bottom: 10px;
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
  width: 300px;
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

