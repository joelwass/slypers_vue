<template>
<div class="fullscreen__brothel">
  <img class="fullscreen__brothel__image" src="/brothel.jpeg" alt="A Dutch Brothel: Bordeel (1562), J. Beuckelaer, oil on panel">  
  <p class="fullscreen__brothel__description">Bordeel (1562), J. Beuckelaer, oil on panel</p>
</div>
</template>

<script>

export default {

}
</script>

<style>
.fullscreen__brothel__image {
  max-width: 100%;
}

.fullscreen__brothel__description {
  color: white;
  position: absolute;
  bottom: 10px;
}

.fullscreen__brothel {
  z-index: 100000;
  position: fixed;
  text-align: center;
}
@media all and (min-width: 850px) {
  
}
</style>
