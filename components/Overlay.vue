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
  methods: {
    ...mapActions({
      setBagDrawerOpen: 'SET_BAG_DRAWER_OPEN',
      setDrawerOpen: 'SET_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    toggleBagDrawer() {
      const prevDrawerOpen = this.bagDrawerOpen
      this.bagDrawerOpen = !prevDrawerOpen
    },
    toggleCorrectDrawer() {
      if (this.drawerOpenState) this.toggleDrawer()
      else this.toggleBagDrawer()
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

