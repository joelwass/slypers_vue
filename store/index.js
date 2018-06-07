import Vuex from 'vuex'
import Vue from 'vue'

// modules
import cart from './cart/cart'
import loading from './loading/loading'
import customer from './customer/customer'

import {
  SET_BROWSING_SELECTED_PRODUCT,
  SET_DRAWER_OPEN
} from './types'

const store = () => {
  return new Vuex.Store({
    strict: true, // Only allow state mutation in mutation handlers
    state: {
      browsingSelectedProduct: {},
      drawerOpen: false
    },
    actions: {
      [SET_BROWSING_SELECTED_PRODUCT]: ({ commit }, browsingProduct) => {
        commit(SET_BROWSING_SELECTED_PRODUCT, browsingProduct)
      },
      [SET_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_DRAWER_OPEN, open)
      }
    },
    mutations: {
      [SET_BROWSING_SELECTED_PRODUCT](state, browsingProduct) {
        Vue.set(state, 'browsingSelectedProduct', browsingProduct)
      },
      [SET_DRAWER_OPEN](state, open) {
        Vue.set(state, 'drawerOpen', open)
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
