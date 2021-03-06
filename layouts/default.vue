<template>
  <div :class="appClasses">
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=654930548443449&ev=PageView&noscript=1" />
    <nav-header />
    <nav-left-side-bar />
    <nav-drawer />
    <bag-drawer />
    <size-drawer />
    <loading-overlay v-show="isLoading"/>
    <overlay v-show="drawerOpen || bagDrawerOpen || sizeDrawerOpen" />
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
import SizeDrawer from '~/components/SizeDrawer.vue'
import BagDrawer from '~/components/BagDrawer.vue'
import Footer from '~/components/Footer.vue'
import Api from '../middleware/api'
import helpers from '../helpers/methods'

export default {
  mounted() {
    if (window.location && window.location.protocol === 'http:' && !window.location.host.includes('localhost')) {
      window.location = `https://www.slypers.com${window.location.pathname}`
    }
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
      sizeDrawerOpen: state => state.sizeDrawerOpen,
      isLoading: state => state.loading
    }),
    appClasses() {
      if (this.drawerOpen || this.bagDrawerOpen || this.sizeDrawerOpen) return 'noScroll'
    }
  },
  components: {
    NavLeftSideBar,
    NavHeader,
    BagDrawer,
    SizeDrawer,
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

input, select, textarea, button {
  font-family:inherit;
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

.validationError {
  color: red;
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

html, body {
  max-width: 100%;
  overflow-x: hidden;
}

input {
  border-radius: 0;
  -webkit-border-radius:0;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
