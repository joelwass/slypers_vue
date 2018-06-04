<template>
  <div class="header">
    <div class="IconsNav">
      <bag class="icon bag" width="16" height="22" />
      <hamburger class="icon burger" width="32" height="30"/>
    </div>
    <logo />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'  
import Hamburger from '~/components/icons/Hamburger.vue'
import Bag from '~/components/icons/Bag.vue'

export default {
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
  z-index: 1000;
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

