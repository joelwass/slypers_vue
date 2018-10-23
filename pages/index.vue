<template>
<div class="fullscreen" v-on:click="go('shop')">
  <div class="discoverText">
    <div class="discoverText__about">
      <p>Bordeelslypers</p>
      <p>Dutch Brothel Slypers</p>
    </div>
    <div class="discoverText__footer">
      <p>XXX</p>
    </div>
  </div>
  <div class="container">
    <div class="splash-image-div">
      <img class="splash-image" src="/shoes/red/Top_red.png" alt="A Brothel Slyper">
    </div>
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
  width: 100%;
}

.fullscreen {
  min-height: 100vh;
}

.splash-image-div {
  vertical-align: middle;
  width: 100%;
}

.container {
  overflow: hidden;
  align-items: center;
  padding-top: 100px;
  max-height: 100vh;
  margin: auto;
}

.discoverText {
  height: 40px;
  width: 100%;
  z-index: 10000;
  padding-top: 100px;
  color: black;
  margin-left: 20px;
}

.discoverText__about {
  margin-top: 20px;
}

.discoverText__preorder {
  margin-top: 20px;
  text-decoration: underline;
  cursor: pointer;
}

.discoverText__footer {
  margin-top: 20px;
  display: none;
}

@media all and (min-width: 850px) {
  .splash-image {
    margin: auto;
    width: 100%;
  }

  .discoverText {
    width: 300px;
    position: fixed;
    left: 20px;
    top: 300px;
  }

  .container {
    width: 100%;
    padding-top: 0px;
    padding-left: 200px;
    align-items: center;
    display: flex;
    min-height: 100vh;
    margin: auto;
  }

  .discoverText__footer {
    margin-top: 20px;
    display:block;
  }
}
</style>
