<template>
  <div :class="appClasses">
    <nav-header />
    <nav-left-side-bar />
    <nav-drawer />
    <bag-drawer />
    <loading-overlay v-show="isLoading"/>
    <overlay v-show="drawerOpen || bagDrawerOpen" />
    <nuxt />
    <footer-element/>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import NavLeftSideBar from '~/components/NavLeftSideBar.vue'
import NavHeader from '~/components/NavHeader.vue'
import Overlay from '~/components/Overlay.vue'
import LoadingOverlay from '~/components/LoadingOverlay'
import NavDrawer from '~/components/NavDrawer.vue'
import BagDrawer from '~/components/BagDrawer.vue'
import Footer from '~/components/Footer.vue'
import Api from '../middleware/api'
import helpers from '../helpers/methods'

export default {
  mounted() {
    this.setupCart()
  },
  methods: {
    ...mapActions({
      setupCart: 'SETUP_CART'
    })
  },
  computed: {
    ...mapState({
      drawerOpen: state => state.drawerOpen,
      bagDrawerOpen: state => state.bagDrawerOpen,
      isLoading: state => state.loading
    }),
    appClasses() {
      if (this.drawerOpen || this.bagDrawerOpen) return 'noScroll'
    }
  },
  components: {
    NavLeftSideBar,
    NavHeader,
    BagDrawer,
    NavDrawer,
    LoadingOverlay,
    Overlay,
    FooterElement: Footer
  }
}
</script>

<style>
.noScroll {
  position: fixed;
}

@font-face {
  font-family: 'OverpassMono-Bold';
  font-weight: normal;
  src: url('/font/OverpassMono-Bold.ttf'); /* IE9 Compat Mode */
  src: url('/font/OverpassMono-Bold.ttf') format('ttf');
}

/* font-family: "OverpassMono-Regular"; */
@font-face {
  font-family: 'OverpassMono-Regular';
  src: url('/font/OverpassMono-Regular.ttf'); /* IE9 Compat Mode */
  src: url('/font/OverpassMono-Regular.ttf') format('ttf');
}

input::placeholder {
  font-family: 'OverpassMono-Regular', monospace;
}

html {
  font-family: 'OverpassMono-Regular', monospace;
  font-size: 13px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

* {
  padding: 0;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
