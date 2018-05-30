import Vue from 'vue';

import {
  SET_AVAILABLE_PRODUCTS
} from '../types'

const cart = {
  state: {
    availableProducts: []
  },
  actions: {
    [SET_AVAILABLE_PRODUCTS]: ({ commit }, availableProducts) => {
      commit(SET_AVAILABLE_PRODUCTS, availableProducts)
    }
  },
  mutations: {
    [SET_AVAILABLE_PRODUCTS](state, availableProducts) {
      Vue.set(state.availableProducts, availableProducts)
    }
  }
}

export default cart
