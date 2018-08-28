<template>
  <div class="container">
    <div class="splash-image-div">
      <img class="splash-image" src="/brothel.jpeg" alt="A Dutch Brothel">
    </div>
    <div class="discoverText">
      <a v-on:click="go('shop')">DISCOVER THE COLLECTION</a>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    go(route) {
      this.$router.push(`/${route}`)
    }
  }
}
</script>

<style>
.splash-image {
  margin: auto;
  overflow: hidden;
}

.splash-image-div {
  vertical-align: middle;
}

.container {
  overflow: hidden;
  align-items: center;
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  margin: auto;
}

.discoverText {
  display: block;
  position: absolute;
  text-decoration: underline;
  cursor: pointer;
  height: 40px;
  width: 170px;
  right: 0px;
  left: 0px;
  margin: auto;
  color: white;
}

@media all and (min-width: 850px) {
  .splash-image {
    margin: auto;
    width: 100%;
  }

  .discoverText {
    display: none;
  }

  .container {
    width: 60%;
    align-items: center;
    display: flex;
    min-height: 100vh;
    margin: auto;
  }
}
</style>
