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
        image: '/shoes/blackAndWhite/Slypers_16.jpeg',
        images: ['/shoes/blackAndWhite/Slypers_16.jpeg', '/shoes/blackAndWhite/Slypers_9.jpeg', '/shoes/blackAndWhite/Slypers_7.jpeg', '/shoes/blackAndWhite/Slypers_2.jpeg'],
        name: 'Black & White Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '2',
        description: 'Dutch Brothel Slypers Grey',
        image: '/shoes/grey/Slypers_13.jpeg',
        images: ['/shoes/grey/Slypers_13.jpeg', '/shoes/grey/Slypers_10.jpeg', '/shoes/grey/Slypers_6.jpeg', '/shoes/grey/Slypers_1.jpeg'],
        name: 'Grey Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '3',
        description: 'Dutch Brothel Slypers Blue',
        image: '/shoes/blue/Slypers_14.jpeg',
        images: ['/shoes/blue/Slypers_14.jpeg', '/shoes/blue/Slypers_12.jpeg', '/shoes/blue/Slypers_5.jpeg', '/shoes/blue/Slypers_4.jpeg'],
        name: 'Blue Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      },
      {
        id: '4',
        description: 'Dutch Brothel Slypers Red',
        image: '/shoes/red/Slypers_15_r.jpeg',
        images: ['/shoes/red/Slypers_15_r.jpeg', '/shoes/red/Slypers_9_r.jpeg', '/shoes/red/Slypers_7_r.jpeg', '/shoes/red/Slypers_2_r.jpeg'],
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
