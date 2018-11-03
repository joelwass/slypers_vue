<template>
<div class="fullscreen">
  <div class="discoverText">
    <div class="discoverText__about" v-on:click="go('shop')">
      <p>Bordeelslypers</p>
      <p>Dutch Brothel Creepers</p><br>
    </div>
  </div>
  <div class="container" v-on:click="go('shop')">
    <div class="splash-image-div">
      <img class="splash-image-desktop" src="/shoes/red/Profile_red.png" alt="A Brothel Slyper">
      <img class="splash-image-mobile" src="/shoes/red/Back_single_red.png" alt="A Brothel Slyper">
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
.splash-image-mobile {
  margin: auto;
  padding-top: 70px;
  overflow: hidden;
  width: 100%;
}

.never-get-caught {
  cursor: pointer;
  width: 200px;
  margin: auto;
  background-color: black;
  color: white;
  text-align: center;
  height: 30px;
}

.never-get-caught__text {
  padding-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
}

.splash-image-desktop {
  display: none;
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
  max-height: 100vh;
  margin: auto;
  cursor: pointer;
  margin-bottom: 100px;
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
  cursor: pointer;
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
  .splash-image-mobile {
    display: none;
  }

  .never-get-caught {
    display: none;
  }

  .splash-image-desktop {
    width: 100%;
    margin: auto;
    display: block;
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
