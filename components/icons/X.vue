<template>
  <svg :width="this.width" :height="this.height" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100"><path :fill="hexColor" d="M47.0537217 50L27.6935275 30.6398058c-.8135922-.8135923-.8135922-2.132686 0-2.9462783.8135923-.8135922 2.132686-.8135922 2.9462783 0L50 47.0537217l19.3601942-19.3601942c.8135923-.8135922 2.132686-.8135922 2.9462783 0 .8135922.8135923.8135922 2.132686 0 2.9462783L52.9462783 50l19.3601942 19.3601942c.8135922.8135923.8135922 2.132686 0 2.9462783-.8135923.8135922-2.132686.8135922-2.9462783 0L50 52.9462783 30.6398058 72.3064725c-.8135923.8135922-2.132686.8135922-2.9462783 0-.8135922-.8135923-.8135922-2.132686 0-2.9462783L47.0537217 50z"></path></svg>
</template>

<script>
import uuidv4 from 'uuid/v4';

export default {
  name: 'icon-hamburger',
  props: {
    height: {
      default: '',
      type: String
    },
    title: {
      type: String
    },
    width: {
      default: '',
      type: String
    },
    classes: {
      default: () => [],
      type: Array
    },
    hexColor: {
      default: '#000000',
      type: String
    }
  },
  computed: {
    uuid() {
      return uuidv4();
    }
  }
};
</script>
