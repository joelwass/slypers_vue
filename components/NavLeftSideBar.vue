<template>
  <div class="SideBarLeft SideBarLeft-media">
    <logo />
    <div class="Links">
      <ul>
        <li><a v-on:click="goShop">SHOP</a></li>
        <li><a v-on:click="goAbout">ABOUT</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    goShop() {
      this.$router.push('/shop')
    },
    goAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style>
.SideBarLeft {
  position: fixed;
  width: 150px;
  height: 400px;
  background: transparent;
}

.SideBarLeft-media {
  padding-top: 5px;
  padding-left: 5px;
}

.SideBarLeft > .Links > ul {
  list-style-type: none;
  padding-left: 4pt;
}

.SideBarLeft > .Links > ul > li > a {
  text-decoration: none;
  color: black
}

.SideBarLeft > .Links > ul > li {
  font-size: 14px;
  cursor: pointer;
}

.SideBarLeft > .Links {
  align-items: left;
  display: none;
}

@media all and (min-width: 640px) {
  .SideBarLeft > .Links {
    display: block;
  } 

  .SideBarLeft-media {
    padding-top: 40px;
    padding-left: 40px;
  }
}
</style>
