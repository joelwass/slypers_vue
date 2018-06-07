import Vue from 'vue';

import {
  SET_CUSTOMER_EMAIL
} from '../types'

const customer = {
  state: {
    contact: {
      email: ''
    }
  },
  actions: {
    [SET_CUSTOMER_EMAIL]: ({ commit }, email) => {
      commit(SET_CUSTOMER_EMAIL, email)
    }
  },
  mutations: {
    [SET_CUSTOMER_EMAIL](state, email) {
      Vue.set(state.contact, 'email', email)
    }
  }
}

export default customer
