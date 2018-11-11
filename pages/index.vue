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
      <img class="splash-image-desktop" src="/shoes/red/Back_single_red.png" alt="A Brothel Slyper">
      <img class="splash-image-mobile" src="/shoes/red/Back_single_red.png" alt="A Brothel Slyper">
      <div class="discoverText__quote" v-on:click="go('shop')">
        <p>"Lord, let me be chaste -<br class="mobile"> but not quite yet."</p>
        <p class="discoverText__quote__author">-Augustine</p>
      </div>
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
  padding-top: 5em;
  overflow: hidden;
  width: 100%;
}

.mobile {
  display: block;
}

.discoverText__quote {
  margin-top: 2em;
  text-align: center;
  font-style: italic;
}

.discoverText__quote__author {
  text-align: right;
  margin-top: 1em;
  margin-right: 2em;
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
  padding-left: 2em;
  padding-right: 1em;
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

  .mobile {
    display: none;
  }

  .never-get-caught {
    display: none;
  }

  .splash-image-desktop {
    width: 50%;
    margin: auto;
    display: block;
  }

  .discoverText__quote {
    margin-top: 0em;
  }

  .discoverText__quote__author {
    text-align: center;
    margin-top: 1em;
  }

  .discoverText {
    width: 300px;
    position: fixed;
    left: 20px;
    top: 16em;
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
