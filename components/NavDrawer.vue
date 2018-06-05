<template>
<div>
  <transition name="drawer-transition">
    <div v-if="drawerOpen" class="drawer">
      <div class="drawer-IconsNav">
        <bag class="icon bag" width="16" height="22" />
        <xIcon v-on:click.native="toggleDrawer" class="icon x" width="32" height="30"/>
      </div>
      <div class="navigation">
        <ul>
          <li><a v-on:click="go('shop')">SHOP</a></li>
          <li><a v-on:click="go('about')">ABOUT</a></li>
          <li><a v-on:click="go('login')">LOGIN / SIGNUP</a></li>
          <li><a v-on:click="go('faq')">FAQ</a></li>
        </ul>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'Vuex'
import X from '~/components/icons/X.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
  methods: {
    ...mapActions({
      setDrawerOpen: 'SET_DRAWER_OPEN'
    }),
    toggleDrawer() {
      const prevDrawerOpen = this.drawerOpen
      this.drawerOpen = !prevDrawerOpen
    },
    go(route) {
      this.toggleDrawer()
      this.$router.push(`/${route}`)
    }
  },
  computed: {
    ...mapState({
      drawerOpenState: state => state.drawerOpen
    }),
    drawerOpen: {
      get() {
        return this.drawerOpenState
      },
      set(newVal) {
        this.setDrawerOpen(newVal)
      }
    }
  },
  components: {
    XIcon: X,
    Bag
  }
}
</script>

<style>
.navigation > ul {
  list-style-type: none;
  padding-left: 4pt;
}

.navigation > ul > li > a {
  text-decoration: none;
  color: black
}

.navigation > ul > li {
  font-size: 11px;
  cursor: pointer;
}

.drawer-transition-enter-active {
  transition: all .3s ease;
}

.drawer-transition-leave-to {
  transition: all .3s ease;
}

.drawer-transition-enter, .drawer-transition-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(220px);
  opacity: 0;
}

.drawer-IconsNav {
  display: inline-block;
  position: fixed;
  right: 10px;
  top: 10px;
}

.drawer > .navigation {
  width: 100%;
  position: relative;
  padding-left: 10px;
  margin-top: 80px;
}

.drawer {
  position: absolute;
  z-index: 1010;
  background-color:white;
  height: 100%;
  width: 220px;
  right: 0px;
  top: 0px;
}

.bag {
  padding-bottom: 5px;
}

.x {
  padding-top: 5px;
}

.drawer-IconsNav > .icon {
  margin-left: 5px;
}

@media all and (min-width: 850px) {
  .drawer-IconsNav { 
    display: none;
  }
}
</style>

