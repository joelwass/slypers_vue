import Vue from 'vue';

import API from '../../middleware/api'

import {
  SET_CUSTOMER_EMAIL,
  SET_CUSTOMER,
  CREATE_ACCOUNT,
  SET_ERROR,
  CLEAR_ERRORS,
  SET_PASSWORD,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  CREATE_CUSTOMER,
  SET_LOADING,
  SET_CUSTOMER_ADDRESS,
  SET_CUSTOMER_ADDRESS_2,
  SET_CUSTOMER_CITY,
  SET_CUSTOMER_STATE,
  SET_CUSTOMER_ZIP,
  SAVE_CUSTOMER_SHIPPING
} from '../types'

const customer = {
  state: {
    user: {
      email: 'joel@wass.com',
      password: 'test',
      firstName: 'joel',
      lastName: 'wass',
      shippingAddress: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: ''
    }
  },
  actions: {
    [SET_CUSTOMER_EMAIL]: ({ commit }, email) => {
      commit(SET_CUSTOMER_EMAIL, email)
    },
    [SET_CUSTOMER]: ({ commit }, customer) => {
      commit(SET_CUSTOMER, customer)
    },
    [CREATE_ACCOUNT]: ({ dispatch, commit }, customer) => {
      dispatch(CLEAR_ERRORS)
      dispatch(SET_LOADING, true)
      API.createNewUser(customer).then((res) => {
        if (res.success) {
          commit(CREATE_ACCOUNT, res.customer)
        } else {
          alert(res.message)
          console.log(res)
          dispatch(SET_ERROR, res.message)
        }
        dispatch(SET_LOADING, false)
      })
    },
    [SET_PASSWORD]: ({ commit }, password) => {
      commit(SET_PASSWORD, password)
    },
    [SET_FIRST_NAME]: ({ commit }, firstName) => {
      commit(SET_FIRST_NAME, firstName)
    },
    [SET_LAST_NAME]: ({ commit }, lastName) => {
      commit(SET_LAST_NAME, lastName)
    },
    [SET_CUSTOMER_ADDRESS]: ({ commit }, address) => {
      commit(SET_CUSTOMER_ADDRESS, address)
    },
    [SET_CUSTOMER_ADDRESS_2]: ({ commit }, address2) => {
      commit(SET_CUSTOMER_ADDRESS_2, address2)
    },
    [SET_CUSTOMER_CITY]: ({ commit }, city) => {
      commit(SET_CUSTOMER_CITY, city)
    },
    [SET_CUSTOMER_STATE]: ({ commit }, state) => {
      commit(SET_CUSTOMER_STATE, state)
    },
    [SET_CUSTOMER_ZIP]: ({ commit }, zip) => {
      commit(SET_CUSTOMER_ZIP, zip)
    },
    [SAVE_CUSTOMER_SHIPPING]: ({ dispatch, commit }, data) => {
      dispatch(CLEAR_ERRORS)
      dispatch(SET_LOADING, true)
      API.saveShipping(data).then((res) => {
        console.log(res)
        if (!res.success) {
          alert(res.message)
          console.log(res)
          dispatch(SET_ERROR, res.message)
        }
        dispatch(SET_LOADING, false)
      })
    }
  },
  mutations: {
    [SET_CUSTOMER_EMAIL](state, email) {
      Vue.set(state.user, 'email', email)
    },
    [SET_CUSTOMER](state, user) {
      Vue.set(state, 'user', user)
    },
    [CREATE_ACCOUNT](state, user) {
      Vue.set(state, 'user', user)
    },
    [SET_PASSWORD](state, password) {
      Vue.set(state.user, 'password', password)
    },
    [SET_FIRST_NAME](state, firstName) {
      Vue.set(state.user, 'firstName', firstName)
    },
    [SET_LAST_NAME](state, lastName) {
      Vue.set(state.user, 'lastName', lastName)
    },
    [SET_CUSTOMER_ADDRESS](state, address) {
      Vue.set(state.user, 'shippingAddress', address)
    },
    [SET_CUSTOMER_ADDRESS_2](state, address2) {
      Vue.set(state.user, 'shippingAddress2', address2)
    },
    [SET_CUSTOMER_CITY](state, city) {
      Vue.set(state.user, 'shippingCity', city)
    },
    [SET_CUSTOMER_STATE](state, stateState) {
      Vue.set(state.user, 'shippingState', stateState)
    },
    [SET_CUSTOMER_ZIP](state, zip) {
      Vue.set(state.user, 'shippingZip', zip)
    }
  }
}

export default customer
