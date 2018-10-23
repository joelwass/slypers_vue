<template>
  <div class="SideBarLeft SideBarLeft-media">
    <div class="Links">
      <ul>
        <li><a v-on:click="go('shop')">SHOP</a></li>
        <li><a v-on:click="go('about')">ABOUT</a></li>
        <li><a v-on:click="toggleDrawer">BAG ({{ selectedProducts.length }})</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

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
  z-index:10000;
  background: transparent;
  display: none;
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
  font-size: 13px;
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

  .SideBarLeft {
    position: fixed;
    width: 150px;
    margin-top: 100px;
    background: transparent;
    display: block;
  }

  .SideBarLeft-media {
    padding-left: 40px;
  }
}
</style>
