<template>
  <div class="info">
    <div class="subsection">
      <h3>Return & Exchange Process</h3><br>
      <p>Submit your order number below to begin your return or exchange.</p><br>
    </div>
    <div class="returnCollector">
      <b>ORDER NUMBER *</b><br><input type="text" class="returnCollector-input" placeholder="Order number" v-model="orderNumber" />
      <div class="validationError" v-if="invalid">
        <p>Order number is required</p>
      </div>
      <div class="returnCollector-button" v-on:click="submitReturn">
        <p class="returnCollector-button-text"><b>SUBMIT RETURN</b></p>
      </div>
    </div>
    <div class="subsection">
      <p>You'll be refunded upon receipt and acceptance of the returned merchandise. Please direct additional questions to service@slypers.com</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumberLocal: '',
      invalid: false
    }
  },
  computed: {
    orderNumber: {
      get() {
        return this.orderNumberLocal
      },
      set(newVal) {
        this.invalid = false;
        this.orderNumberLocal = newVal
      }
    }
  },
  methods: {
    submitReturn() {
      console.log(this.orderNumber)
      if (!this.orderNumber) {
        this.invalid = true;
      }
      // submit return
      
    }
  }
}
</script>

<style>
.info {
  padding: 80px 30px 20px 30px;
  min-height: 100vh;
} 
.info > div {
  margin: 40px;
}
.returnCollector-input {
  width: 100%;
  height: 25px;
  padding: 5px;
  margin: 5px 0 5px 0;
  border: 1px solid black;
}
.returnCollector-button {
  width: 100%;
  cursor: pointer;
  background-color: black;
  color: white;
  text-align: center;
  height: 30px;
  margin: 10px 0 26px 0;
}
.returnCollector-button-text {
  padding-top: 7px;
}

@media all and (min-width: 850px) {
  .info {
    padding: 97px 140px 100px 200px
  }
}
</style>
