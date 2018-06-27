import Vuex from 'vuex'
import Vue from 'vue'

// modules
import cart from './cart/cart'
import customer from './customer/customer'

// api helper
import API from '../middleware/api'
import helpers from '../helpers/methods'

import {
  SET_BROWSING_SELECTED_PRODUCT,
  SET_DRAWER_OPEN,
  SET_BAG_DRAWER_OPEN,
  CLEAR_ERRORS,
  SET_LOADING,
  SET_CUSTOMER,
  SET_ERROR,
  LOGOUT_USER
} from './types'

const store = () => {
  return new Vuex.Store({
    strict: true, // Only allow state mutation in mutation handlers
    state: {
      browsingSelectedProduct: {},
      drawerOpen: false,
      bagDrawerOpen: false,
      authenticated: false,
      sessionId: '',
      loading: false,
      errorMessage: ''
    },
    actions: {
      [SET_BROWSING_SELECTED_PRODUCT]: ({ commit }, browsingProduct) => {
        commit(SET_BROWSING_SELECTED_PRODUCT, browsingProduct)
      },
      [SET_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_DRAWER_OPEN, open)
      },
      [SET_BAG_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_BAG_DRAWER_OPEN, open)
      },
      [SET_LOADING]: ({ commit }, loading) => {
        commit(SET_LOADING, loading)
      },
      [SET_ERROR]: ({ commit }, error) => {
        commit(SET_ERROR, error)
      },
      [LOGOUT_USER]: ({ commit }) => {
        dispatch('SET_LOADING', true)
        API.logout().then((res) => {
          if (res.success) {
            helpers.eraseCookie('slypers_session')
            commit(LOGOUT_USER)
          } else {
            dispatch(SET_ERROR, 'Error logging out')
          }
          dispatch(SET_LOADING, false)
        })
      },
      [CLEAR_ERRORS]: ({ commit}) => {
        commit(CLEAR_ERRORS)
      }
    },
    mutations: {
      [SET_BROWSING_SELECTED_PRODUCT](state, browsingProduct) {
        Vue.set(state, 'browsingSelectedProduct', browsingProduct)
      },
      [SET_DRAWER_OPEN](state, open) {
        Vue.set(state, 'drawerOpen', open)
      },
      [SET_BAG_DRAWER_OPEN](state, open) {
        Vue.set(state, 'bagDrawerOpen', open)
      },
      [SET_LOADING](state, loading) {
        Vue.set(state, 'loading', loading)
      },
      [SET_ERROR](state, error) {
        Vue.set(state, 'errorMessage', error)
      },
      [CLEAR_ERRORS](state) {
        Vue.set(state, 'errorMessage', '')
      }
    },
    modules: {
      cart,
      customer
    }
  })
}

export default store
