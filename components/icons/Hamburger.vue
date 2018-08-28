<template>
  <svg :width="this.width" class="hamburgerSVG" :height="this.height" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" x="0px" y="0px"><title>Icon/Stroke/Hamburger</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M4.5,17.5 L19.5,17.5" stroke-linecap="square"></path><path d="M4.5,6.5 L19.5,6.5" stroke-linecap="square"></path><path d="M4.5,12 L19.5,12" stroke-linecap="square"></path></g></svg>
</template>

<script>
import uuidv4 from 'uuid/v4';

export default {
  name: 'icon-hamburger',
  props: {
    height: {
      default: '',
      type: String
    },
    title: {
      type: String
    },
    width: {
      default: '',
      type: String
    },
    classes: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    uuid() {
      return uuidv4();
    }
  }
};
</script>

<style>
  .hamburgerSVG path {
    stroke: #ffffff
  }

  @media all and (min-width: 850px) {
    .hamburgerSVG path {
      stroke: #000000
    }
  }
</style>
