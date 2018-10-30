import vuex from 'vuex'
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
  LOGOUT_USER,
  RESUME,
  SET_SIZE_DRAWER_OPEN
} from './types'

const store = () => {
  return new vuex.Store({
    strict: true, // Only allow state mutation in mutation handlers
    state: {
      browsingSelectedProduct: {},
      drawerOpen: false,
      bagDrawerOpen: false,
      sizeDrawerOpen: false,
      authenticated: false,
      sessionId: '',
      loading: false,
      errorMessage: ''
    },
    actions: {
      [SET_BROWSING_SELECTED_PRODUCT]: ({ commit, state }, browsingProduct) => {
        API.saveDynamicState({ browsingProduct: browsingProduct })
        commit(SET_BROWSING_SELECTED_PRODUCT, browsingProduct)
      },
      [SET_SIZE_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_SIZE_DRAWER_OPEN, open)
      },
      [SET_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_DRAWER_OPEN, open)
      },
      [SET_BAG_DRAWER_OPEN]: ({ commit }, open) => {
        commit(SET_BAG_DRAWER_OPEN, open)
      },
      [SET_LOADING]: ({ commit, state }, data) => {
        if (data.save) {
          API.saveDynamicState({ selectedProducts: state.cart.selectedProducts, checkoutStep: state.cart.currentCheckoutStep, user: state.customer.user, browsingProduct: state.browsingSelectedProduct })
        }
        commit(SET_LOADING, data.value)
      },
      [SET_ERROR]: ({ dispatch, commit }, error) => {
        dispatch(SET_LOADING, { value: false, save: false })
        commit(SET_ERROR, error)
      },
      [LOGOUT_USER]: ({ dispatch, commit }) => {
        dispatch('SET_LOADING', { value: true, save: true })
        API.logout().then((res) => {
          if (res.success) {
            helpers.eraseCookie('slypers_session')
            commit(LOGOUT_USER)
          } else {
            dispatch(SET_ERROR, 'Error logging out')
          }
          dispatch(SET_LOADING, { value: false, save: false })
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
      [RESUME](state, data) {
        Vue.set(state, 'browsingSelectedProduct', data.browsingProduct)
      },
      [SET_DRAWER_OPEN](state, open) {
        Vue.set(state, 'drawerOpen', open)
      },
      [SET_SIZE_DRAWER_OPEN](state, open) {
        Vue.set(state, 'sizeDrawerOpen', open)
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
