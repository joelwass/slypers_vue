<template>
  <div v-on:click="goHome" class="TopLeftLogo">
  </div>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.TopLeftLogo {
  cursor: pointer;
  z-index: 1000;
  background: url('~/assets/logos/Slypers-Logo@4x_PLAIN.png') no-repeat;
  background-size:contain;
  width: 160px;
  height: 40px;
  margin-top: 20px;
  margin-left: 20px;
}

@media all and (min-width: 850px) {
  .TopLeftLogo {
    cursor: pointer;
    z-index: 1000;
    background: url('~/assets/logos/Slypers-Logo@4x_PLAIN.png') no-repeat;
    background-size:contain;
    width: 160px;
    height: 40px;
    margin-top: 30px;
    margin-left: 44px;
  }
}
</style>
