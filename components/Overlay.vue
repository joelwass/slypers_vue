<template>
  <div :class="classes"></div>
</template>

<script>
import {
  mapState
} from 'Vuex'

export default {
  computed: {
    ...mapState({
      drawerOpen: state => state.drawerOpen
    }),
    classes() {
      return this.drawerOpen ? ['overlay', 'overlay-open']: ['overlay', 'overlay-hidden']
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

.overlay-hidden {
  opacity: 1;
  animation: opacity 1s ease-in-out;
  /* -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out; */
}

.overlay-open {
  opacity: 0.6;
  animation: opactiy 1s ease-in-out;
  /* -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out; */
}
</style>

