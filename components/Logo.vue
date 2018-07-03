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
  background: url('~/assets/logos/Slypers-Logo@4x_PLAIN.png') no-repeat;
  background-size:contain;
  width: 200px;
  margin-top: 16px;
  margin-left: 16px;
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
