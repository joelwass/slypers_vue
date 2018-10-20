<template>
<div class="fullscreen">
  <div class="container">
    <div class="splash-image-div">
      <img class="splash-image" src="/brothel.jpeg" alt="A Dutch Brothel">
    </div>
  </div>
    <div class="discoverText">
      <div class="discoverText__about">
        <p>BORDEELSLYPERS ("BROTHEL CREEPERS").</p>
        <p>A WAY OF LIFE SINCE THE DUTCH GOLDEN AGE.</p>
        <p>NEVER GET CAUGHT.</p>
      </div>
      <div class="discoverText__preorder">
        <a v-on:click="go('shop')">PRE-ORDER THE COLLECTION</a>
      </div>
      <div class="discoverText__footer">
        <p>XXX</p>
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
    padding-left: 360px;
    align-items: center;
    display: flex;
    min-height: 100vh;
    margin: auto;
  }
}
</style>
