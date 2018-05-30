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
  background: url('~/assets/logos/Slypers-Logo@4x.png') no-repeat;
  background-size:contain;
  width: auto;
}

.TopLeftLogo-media {
  height: 30px;
}

@media all and (min-width: 640px) {
  .TopLeftLogo-media {
    height: 75px;
  }
}
</style>
