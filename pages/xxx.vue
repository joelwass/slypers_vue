<template>
  <div class="info">
    <div class="fullscreen__brothel">
      <img class="fullscreen__brothel__image" src="/brothel.jpeg" alt="A Dutch Brothel: Bordeel (1562), J. Beuckelaer, oil on panel">  
      <div class="fullscreen__brothel__description">
        <p><i>Bordeel</i> (1562), J. Beuckelaer, oil on panel</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style>
.fullscreen__brothel__image {
  width: 100vh;
  margin: auto;
}

.fullscreen__brothel__description {
  color: black;
  position: relative;
}

.fullscreen__brothel {
  z-index: 100000;
  padding-top: 100px;
  margin-bottom: 100px;
  background-color: white;
  text-align: center;
}

.info {
  min-height: 100vh;
}
@media all and (min-width: 850px) {
  .fullscreen__brothel__image {
    width: 100vh;
    margin: auto;
  }

  .fullscreen__brothel__description {
    color: black;
    position: relative;
  }

  .fullscreen__brothel {
    z-index: 100000;
    padding-left: 250px;
    padding-right: 250px;
    padding-top: 100px;
    margin-bottom: 100px;
    background-color: white;
    text-align: center;
  }

  .info {
    min-height: 100vh;
  }
}
</style>
