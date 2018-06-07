<template>
  <div v-on:click="goHome" class="TopLeftLogo TopLeftLogo-media">
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
  background: url('~/assets/logos/Slypers-Logo@4x.png') no-repeat;
  background-size:contain;
  width: 200px;
  margin-top: 10px;
  margin-left: 10px;
}

.TopLeftLogo-media {
  height: 40px;
}

@media all and (min-width: 850px) {
  .TopLeftLogo-media {
    height: 50px;
  }
}
</style>
