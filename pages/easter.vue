<template>
<div class="fullscreen__brothel">
  <img class="fullscreen__brothel__image" src="/brothel.jpeg" alt="A Dutch Brothel: Bordeel (1562), J. Beuckelaer, oil on panel">  
  <div class="fullscreen__brothel__description">
    <p><i>Bordeel</i> (1562), J. Beuckelaer, oil on panel</p>
  </div>
</div>
</template>

<script>

export default {

}
</script>

<style>
.fullscreen__brothel__image {
  max-width: 70%;
}

.fullscreen__brothel__description {
  color: black;
  z-index: 100000;
  position: relative;
}

.fullscreen__brothel {
  z-index: 100000;
  background-color: white;
  position: fixed;
  text-align: center;
}
@media all and (min-width: 850px) {
  
}
</style>
