<template>
  <div class="card">
    <div>
      <slot></slot>
    </div>
    <div>
      <label :for="labelFor">{{ name }}</label>
      <p>{{ price }}</p>
    </div>
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
    },
    source: {
      type: String,
      default: ''
    }
  },
  computed: {
    price() {
      return '$16000'
    }
  }
}  
</script>

<style>
.card {
  position: relative;
  border: 1px black solid;
  padding: 1em;
  text-align: center;
}

img{
    max-height:100%;
    max-width:100%;
}

.card-image {
  background-size: contain;
}
</style>

