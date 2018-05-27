<template>
  <div class="SideBarLeft">
    <logo />
    <div class="Links">
      <ul>
        <li><a href="/shop">SHOP</a></li>
        <li><a href="/about">ABOUT</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.SideBarLeft {
  position: fixed;
  width: 150px;
  height: 400px;
  padding-top: 40px;
  padding-left: 40px;
  background: transparent;
}

ul {
  list-style-type: none;
  padding-left: 4pt;
}

a {
  text-decoration: none;
  color: black
}

li {
  font-size: 14px;
  cursor: pointer;
}

.Links {
  align-items: left;
}
</style>
