<template>
  <footer class="footer_basic">
    <div class="email_collection">
      <input type="text" placeholder="email">
      <button>Sign Up</button>
    </div>
  </footer>
</template>

<script>
export default {

}
  
</script>

<style>
.footer_basic {
  display: none;
}

@media all and (min-width: 640px) {
  .footer_basic {
    display:inherit;
    background-color: black;
    width: 100%;
    height: 100px;
  } 

  .email_collection {
    display: inline-block;
  }
}
</style>

