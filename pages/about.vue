<template>
  <div class="info">
    <div class="subsection">
      <h3>About</h3><br>
      <p>Bordeelslypers (“Brothel Creepers”) have been a way of life since the Dutch Golden Age.</p><br>
      <p>Never Get Caught.</p>
    </div>
    <div class="subsection">
      <h3>Contact</h3><br>
      <p>
        contact@slypers.com
      </p>
    </div>
    <div class="subsection">
      <h3>FAQ</h3>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style>
.info {
  padding: 80px 30px 20px 30px;
  min-height: 100vh;
} 

.info > .subsection {
  margin: 30px;
}

@media all and (min-width: 850px) {
  .info {
    padding: 97px 140px 100px 140px
  }
}
</style>
