<template>
  <div class="overlay" @click="toggleCorrectDrawer"></div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  computed: {
    ...mapState({
      drawerOpenState: state => state.drawerOpen,
      bagDrawerOpenState: state => state.bagDrawerOpen,
      sizeDrawerOpenState: state => state.sizeDrawerOpen
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
    },
    sizeDrawerOpen: {
      get() {
        return this.sizeDrawerOpenState
      },
      set(newVal) {
        this.setSizeDrawerOpen(newVal)
      }
    }
  },
  methods: {
    ...mapActions({
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN',
      setDrawerOpen: 'SET_DRAWER_OPEN',
      setSizeDrawerOpen: 'SET_SIZE_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    toggleBagDrawer() {
      const prevDrawerOpen = this.bagDrawerOpen
      this.bagDrawerOpen = !prevDrawerOpen
    },
    toggleSizeDrawer() {
      const prevDrawerOpen = this.sizeDrawerOpen
      this.sizeDrawerOpen = !prevDrawerOpen
    },
    toggleCorrectDrawer() {
      if (this.drawerOpenState) this.toggleDrawer()
      else if (this.bagDrawerOpenState) this.toggleBagDrawer()
      else this.toggleSizeDrawer()
    }
  }
}
</script>

<style>
.overlay {
  width: 100vw;
  position: absolute;
  height:100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1005;
}
</style>

