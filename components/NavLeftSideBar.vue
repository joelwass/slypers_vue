<template>
  <div class="SideBarLeft SideBarLeft-media">
    <div class="Links">
      <ul>
        <li><a v-on:click="go('shop')">SHOP</a></li>
        <li><a v-on:click="go('about')">ABOUT</a></li>
        <li><a v-on:click="toggleDrawer">BAG ({{ selectedProducts.length }})</a></li>
        <li><a v-on:click="go('faq')">FAQ</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'Vuex'

export default {
  computed: {
    ...mapState({
      bagDrawerOpenState: state => state.bagDrawerOpen,
      selectedProducts: state => state.cart.selectedProducts
    }),
    drawerOpen: {
      get() {
        return this.bagDrawerOpenState
      },
      set(newVal) {
        this.toggleBagDrawer(newVal)
      }
    }
  },
  methods: {
    ...mapActions({
      toggleBagDrawer: 'SET_BAG_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
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
  margin-top: 2px;
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
