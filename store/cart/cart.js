import Vue from 'vue';

import {
  SET_AVAILABLE_PRODUCTS
} from '../types'

const cart = {
  state: {
    availableProducts: [
      {
        id: '1',
        description: 'Dutch Brothel Slypers Red And Black',
        name: 'Red & Black Slypers',
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
        description: 'Dutch Brothel Slypers Black And White',
        name: 'Black & White Slypers',
        price: '400.00',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000'
      }
    ]
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
