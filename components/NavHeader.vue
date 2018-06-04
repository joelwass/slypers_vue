<template>
  <div class="header">
    <div class="IconsNav">
      <bag class="icon bag" width="16" height="22" />
      <hamburger v-on:click="toggleDrawer" class="icon burger" width="32" height="30"/>
    </div>
    <div v-show="drawerOpen" class="drawer">
      <div class="drawer-IconsNav">
        <bag class="icon bag" width="16" height="22" />
        <xIcon v-on:click="toggleDrawer" class="icon burger" width="32" height="30"/>
      </div>
    </div>
    <logo />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'  
import Hamburger from '~/components/icons/Hamburger.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
  data() {
    return {
      drawerOpen: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
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
  right: 10px;
  top: 10px;
}

.drawer {
  position: absolute;
  z-index: 100;
  background-color:white;
  height: 100%;
  width: 220px;
  right: 0px;
  top: 0px;
}

.bag {
  padding-bottom: 5px;
}

.burger {
  padding-top: 5px;
}

.IconsNav > .icon {
  margin-left: 5px;
}

.header {
  position: fixed;
  z-index: 900;
  border-bottom: 1px solid black;
  background-color:white;
  height: 60px;
  width: 100%;
}

@media all and (min-width: 850px) {
  .IconsNav { 
    display: none;
  }

  .header {
    height: 80px;
  }
}
</style>

