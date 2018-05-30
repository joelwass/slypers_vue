<template>
  <div class="card">
    <div v-bind:style="{ backgroundImage: 'url(' + this.imageBlah + ')' }"></div>
    <label :for="labelFor">{{ name }}</label>
  </div>
</template>

<script>
export default {
  name: 'Product-Card',
  props: {
    labelFor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    imageBlah() {
      return ''
    }
  }
}  
</script>

<style>
.card {
  border: 2px solid rgb(233,171,88);
  border-radius: 5px;
  padding: 1em;
}

</style>

