<template>
  <div class="header">
    <div class="IconsNav">
      <bag v-on:click.native="toggleBagDrawer" class="icon bag" width="22" height="27" />
      <div class="quantity-in-bag">{{ selectedItems.length ? selectedItems.length : '' }}</div>
      <hamburger v-on:click.native="toggleDrawer" class="icon burger" width="34" height="32"/>
    </div>
    <logo />
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
import Logo from '~/components/Logo.vue'  
import Hamburger from '~/components/icons/Hamburger.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
  methods: {
    ...mapActions({
      setDrawerOpen: 'SET_DRAWER_OPEN',
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    toggleBagDrawer() {
      const prevDrawerOpen = this.bagDrawerOpen
      this.bagDrawerOpen = !prevDrawerOpen
    }
  },
  computed: {
    ...mapState({
      drawerOpenState: state => state.drawerOpen,
      bagDrawerOpenState: state => state.bagDrawerOpen,
      selectedItems: state => state.cart.selectedProducts
    }),
    drawerOpen: {
      get() {
        return this.drawerOpenState
      },
      set(newVal) {
        this.setDrawerOpen(newVal)
      }
    },
    bagDrawerOpen: {
      get() {
        return this.bagDrawerOpenState
      },
      set(newVal) {
        this.setBagDrawerOpen(newVal)
      }
    }
  },
  components: {
    Logo,
    Hamburger,
    Bag
  }
}
</script>

<style>
.IconsNav {
  display: inline-block;
  position: fixed;
  right: 24px;
  top: 12px;
}

.quantity-in-bag {
  position: absolute;
  top: 10px;
  right: 65px;
}

.bag {
  padding-bottom: 5px;
}

.burger {
  padding-top: 5px;
}

.IconsNav > .icon {
  margin-left: 24px;
}

.header {
  position: fixed;
  z-index: 900;
  background-color: white;
  height: 60px;
  width: 100%;
}

@media all and (min-width: 850px) {
  .IconsNav { 
    display: none;
  }

  .header {
    height: 70px;
    background-color: transparent;
  }
}
</style>

