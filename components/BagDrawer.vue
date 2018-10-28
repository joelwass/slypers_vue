<template>
<div>
  <transition name="bag-drawer-transition">
    <div v-if="drawerOpen" class="bag-drawer">
      <div class="bag-drawer__header">
        <h1 class="bag-title">BAG ({{ this.selectedProducts.length }})</h1>
        <div class="bag-drawer-IconsNav">
          <xIcon @click.native="toggleDrawer" class="icon x" width="32" height="30"/>
        </div>
      </div>
      <hr class="divider">
      <div class="products">
        <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
          <div class="selectedProduct">
            <div class="productPrice">
              <p>$ {{ product(prod.productId).price }}</p>
            </div>
            <div class="removeProductButton">
              <p @click="removeAllOfProduct(prod.productId, prod.size)">REMOVE</p>
            </div>
            <div class="productDescription">
              <p>{{ product(prod.productId).description.toUpperCase() }}</p><br><br>
            </div>
            <div class="productDetails">
              <p><strong>COLOR:</strong> {{ product(prod.productId).colorString }}</p>
              <p><strong>SIZE: </strong>{{ prod.size }}</p>
              <div class="size-row"><strong>QUANTITY:</strong>
                <p class="minus" @click="minusQuantity(prod.productId, prod.size)"> - </p><p> {{ prod.quantity }} </p>
                <p class="plus" @click="plusQuantity(prod.productId, prod.size)"> + </p>
              </div>
            </div>
            <div class="selectedProduct__imagecontainer">
              <img class="selectedProductImage" :src="product(prod.productId).image" />
            </div>
          </div>
        </div>
      </div>
      <div class="bag-drawer-footer">
        <hr>
        <div class="subtotal">
          <p class="subtotal-label">SUBTOTAL</p>
          <p class="subtotal-amount">$ {{ subtotal }}</p>
        </div>
        <div class="checkout-button" v-on:click="checkout">
          <p class="checkout-button-text"><b>CHECKOUT ({{ selectedProducts.length }} ITEMS)</b></p>
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
} from 'vuex'
import X from '~/components/icons/X.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
  methods: {
    ...mapActions({
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN',
      removeProduct: 'REMOVE_PRODUCT',
      addProduct: 'ADD_PRODUCT',
      setLoading: 'SET_LOADING'
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
      this.toggleDrawer()
      this.setLoading({ value: true, save: true })
      this.$router.push('checkout')
    },
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    },
    minusQuantity(id, size) {
      this.removeProduct({ productId: id, size })
    },
    plusQuantity(id, size) {
      this.addProduct({ productId: id, size })
    },
    removeAllOfProduct(id, size) {
      this.removeProduct({ productId: id, size, removeAll: true })
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
    },
    subtotal() {
      return this.selectedProducts.reduce((acc, val) => {
        const product = this.availableProducts.filter((avail) => avail.id === val.productId)[0]
        return acc + parseInt(product.price_dollars)
      }, 0)
    }
  },
  components: {
    XIcon: X,
    Bag
  }
}
</script>

<style>
.subtotal {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 4px;
}

.subtotal > .subtotal-amount {
  display: inline;
  padding-right: 10%;
  float: right;
}

.subtotal > .subtotal-label {
  padding-left: 10%;
  display: inline;
}

.selectedProduct > .removeProductButton {
  position: absolute;
  right: 0px;
  bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.size-row > .minus {
  width: 10px;
  cursor: pointer;
}

.size-row > .plus {
  width: 10px;
  cursor: pointer;
}

.productDetails > .size-row {
  display: inline-block;
}

.size-row > p {
  display:inline;
}

.selectedProductsMapped {
  display:inline-block;
  width: 100%;
}

.bag-drawer__header {
  padding-left: 30px;
  padding-top: 26px;
  padding-bottom: 30px;
}

.selectedProduct {
  position: relative;
}

.selectedProduct > .productDescription {
  position: absolute;
  top: 10px;
  left: 110px;
  width: 110px;
}

.selectedProduct > .productDetails {
  position: absolute;
  bottom: 10px;
  left: 110px;
  width: 110px;
}

.selectedProduct > .productPrice {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.products {
  padding-bottom: 130px;
  height: 100%;
  overflow: scroll;
  font-size: 11px;
}

.selectedProduct > .selectedProductImage {
  width: 100px;
}

.selectedProduct__imagecontainer {
  height: 150px;
  width: 100px;
  margin-bottom: 2px;
  background-color: #eeeeee;
}

.bag-drawer > .bag-title {
  position: absolute;
  left: 30px;
  top: 28px;
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
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 4px;
  color: white;
  width: 80%;
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
  top: 24px;
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
</style>

