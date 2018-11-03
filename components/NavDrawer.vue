<template>
<div>
  <transition name="drawer-transition">
    <div v-if="drawerOpen" class="drawer">
      <div class="drawer-IconsNav">
        <bag class="icon bag" width="22" height="27" />
        <div class="quantity-in-bag">{{ selectedProducts.length ? selectedProducts.length : '' }}</div>
        <xIcon v-on:click.native="toggleDrawer" class="icon x" width="34" height="32"/>
      </div>
      <div class="navigation">
        <ul>
          <li><a v-on:click="go('shop')">SHOP</a></li>
          <li><a v-on:click="go('about')">ABOUT</a></li>
        </ul>
      </div><br>
      <div class="drawer-footer">
        <hr>
        <div class="checkout-button-drawer" v-on:click="checkout">
          <p class="checkout-button-drawer__text"><b>CHECKOUT ({{ selectedProducts.length }} ITEMS)</b></p>
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
      setDrawerOpen: 'SET_DRAWER_OPEN',
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
      this.setLoading({ value: true, save: true })
      this.go('checkout')
    }
  },
  computed: {
    ...mapState({
      drawerOpenState: state => state.drawerOpen,
      selectedProducts: state => state.cart.selectedProducts
    }),
    drawerOpen: {
      get() {
        return this.drawerOpenState
      },
      set(newVal) {
        this.setDrawerOpen(newVal)
      }
    }
  },
  components: {
    XIcon: X,
    Bag
  }
}
</script>

<style>
.drawer-footer {
  position: absolute;
  width: 100%;
  bottom: 10px;
}

.drawer-footer > .checkout-button-drawer {
  text-align: center;
  background-color: black;
  margin-top: 10px;
  padding-bottom: 5px;
  color: white;
}

.navigation > ul {
  list-style-type: none;
  padding-left: 4pt;
}

.navigation > ul > li > a {
  text-decoration: none;
  color: black
}

.navigation > ul > li {
  font-size: 13px;
  cursor: pointer;
  padding-top: 5px;
}

.drawer-transition-enter-active {
  transition: all .3s ease;
}

.drawer-transition-leave-to {
  transition: all .3s ease;
}

.drawer-transition-enter, .drawer-transition-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(220px);
  opacity: 0;
}

.drawer > .navigation {
  width: 100%;
  position: relative;
  padding-left: 10px;
  margin-top: 80px;
}

.drawer {
  position: fixed;
  z-index: 1010;
  background-color:white;
  height: 100%;
  width: 220px;
  right: 0px;
  top: 0px;
}

.bag {
  padding-bottom: 5px;
}

.x {
  padding-top: 5px;
}

.drawer-IconsNav {
  display: inline-block;
  position: fixed;
  right: 25px;
  top: 15px;
}

.drawer-IconsNav > .icon {
  margin-left: 24px;
}

@media all and (min-width: 850px) {
  .drawer-IconsNav { 
    display: none;
  }
}
</style>

