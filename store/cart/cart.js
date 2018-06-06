import Vue from 'vue';

import {
  SET_AVAILABLE_PRODUCTS,
  SET_SELECTED_PRODUCTS,
  ADD_PRODUCT
} from '../types'

const cart = {
  state: {
    availableProducts: [
      {
        id: '1',
        description: 'Dutch Brothel Slypers Black And White',
        name: 'Black & White Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '2',
        description: 'Dutch Brothel Slypers Grey',
        name: 'Grey Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '3',
        description: 'Dutch Brothel Slypers Blue',
        name: 'Blue Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '4',
        description: 'Dutch Brothel Slypers Red',
        name: 'Red Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      }
    ],
    selectedProducts: []
  },
  actions: {
    [SET_AVAILABLE_PRODUCTS]: ({ commit }, availableProducts) => {
      commit(SET_AVAILABLE_PRODUCTS, availableProducts)
    },
    [SET_SELECTED_PRODUCTS]: ({ commit }, selectedProducts) => {
      commit(SET_SELECTED_PRODUCTS, selectedProducts)
    },
    [ADD_PRODUCT]: ({ commit }, data) => {
      commit(ADD_PRODUCT, data)
    }
  },
  mutations: {
    [SET_AVAILABLE_PRODUCTS](state, availableProducts) {
      Vue.set(state, 'availableProducts', availableProducts)
    },
    [SET_SELECTED_PRODUCTS](state, selectedProducts) {
      Vue.set(state, 'selectedProducts', selectedProducts)
    },
    [ADD_PRODUCT](state, data) {
      const newArray = state.selectedProducts
      newArray.push({ productId: data.productId, size: data.size })
      Vue.set(state, 'selectedProducts', newArray)
    }
  }
}

export default cart
