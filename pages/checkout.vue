<template>
  <div class="checkout">
    <div class="checkout-nav">
      <div class="checkout-nav-el">1. SHIPPING</div>
      <div class="checkout-nav-el">2. PAYMENT</div>
      <div class="checkout-nav-el">3. REVIEW</div>
    </div>
  </div>
</template>

<script>
  
</script>

<style>

@media all and (min-width: 850px) {
  .checkout {
    min-height: 100vh;
    padding-left: 140px;
    padding-right: 140px;
    padding-top: 80px;
  }

  .checkout-nav {
    height: 100px;
    width: 100%;
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .checkout-nav-el {
    text-align: center;
    padding: 30px;
    border: 1px solid grey;
  }

  .checkout-nav-ul-li {
    display: inline;
    font-size: 11px;
    grid-column: 1 / 1;
    grid-row: 1;
    cursor: pointer;
    padding-top: 5px;
  }
}

</style>

