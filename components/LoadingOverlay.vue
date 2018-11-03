<template>
  <div class="loading-overlay">
    <p class="loading-overlay__text"><b>Loading...</b></p>
  </div>
</template>

<script>
</script>

<style>
.loading-overlay {
  width: 100vw;
  position: fixed;
  color: white;
  height:100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1005;
  text-align: center;
}

.loading-overlay__text {
  margin-top: 40vh;
  font-size: 14px;
  vertical-align: center;
}
</style>

