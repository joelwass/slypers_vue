import Vuex from 'vuex'
import Vue from 'vue'

// modules
import cart from './cart/cart'
import loading from './loading/loading'
import customer from './customer/customer'

import {
  SET_BROWSING_SELECTED_PRODUCT
} from './types'

const store = () => {
  return new Vuex.Store({
    strict: true, // Only allow state mutation in mutation handlers
    state: {
      browsingSelectedProduct: {}
    },
    actions: {
      [SET_BROWSING_SELECTED_PRODUCT]: ({ commit }, browsingProduct) => {
        commit(SET_BROWSING_SELECTED_PRODUCT, browsingProduct)
      }
    },
    mutations: {
      [SET_BROWSING_SELECTED_PRODUCT](state, browsingProduct) {
        Vue.set(state, 'browsingSelectedProduct', browsingProduct)
      }
    },
    modules: {
      cart,
      loading,
      customer
    }
  })
}

export default store
