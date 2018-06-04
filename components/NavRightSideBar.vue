<template>
  <div class="SideBarRight">
    <div class="Links">
      <!-- <div class="TextNav">
        <ul>
          <li><a v-on:click="goCart">BAG (0)</a></li>
          <li><a v-on:click="goLogin">LOGIN / REGISTER</a></li>
          <li><a v-on:click="goClientService">CLIENT SERVICE</a></li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import Bag from '~/components/icons/Bag.vue'
import Hamburger from '~/components/icons/Hamburger.vue'

export default {
  components: {
    Bag,
    Hamburger
  },
  methods: {
    goCart() {
      this.$router.push('/cart')
    },
    goLogin() {
      this.$router.push('/login')
    },
    goClientService() {
      this.$router.push('/client')
    }
  }
}
</script>

<style>
.SideBarRight {
  position: fixed;
  width: auto;
  height: 400px;
  right: 0px;
  background: transparent;
}

.SideBarRight > .Links > .TextNav > ul {
  list-style-type: none;
  padding-left: 4pt;
}

.SideBarRight > .Links > .TextNav > ul > li > a {
  text-decoration: none;
  color: black
}

.SideBarRight > .Links > .TextNav > ul > li {
  font-size: 11px;
  cursor: pointer;
}

.SideBarRight > .Links > .TextNav {
  align-items: left;
  display: none;
  padding-right: 40px;
  padding-top: 40px;
}

@media all and (min-width: 850px) {
  .SideBarRight > .Links > .TextNav {
    display: block;
  } 
}
</style>
