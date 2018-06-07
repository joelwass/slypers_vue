<template>
  <div class="SideBarLeft SideBarLeft-media">
    <div class="Links">
      <ul>
        <li><a v-on:click="go('shop')">SHOP</a></li>
        <li><a v-on:click="go('about')">ABOUT</a></li>
        <li><a v-on:click="go('checkout')">BAG ({{ selectedProducts.length }})</a></li>
        <li><a v-on:click="go('faq')">FAQ</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  mapState 
} from 'Vuex'

export default {
  computed: {
    ...mapState({
      selectedProducts: state => state.cart.selectedProducts
    })
  },
  methods: {
    go(route) {
      this.$router.push(`/${route}`)
    }
  }
}
</script>

<style>
.SideBarLeft {
  position: fixed;
  width: 150px;
  height: 400px;
  background: transparent;
}

.SideBarLeft-media {
  padding-top: 65px;
  padding-left: 5px;
}

.SideBarLeft > .Links > ul {
  list-style-type: none;
  padding-left: 4pt;
}

.SideBarLeft > .Links > ul > li > a {
  text-decoration: none;
  color: black
}

.SideBarLeft > .Links > ul > li {
  font-size: 11px;
  cursor: pointer;
  padding-top: 3px;
}

.SideBarLeft > .Links {
  align-items: left;
  display: none;
}

@media all and (min-width: 850px) {
  .SideBarLeft > .Links {
    display: block;
  } 

  .SideBarLeft-media {
    padding-top: 100px;
    padding-left: 40px;
  }
}
</style>
