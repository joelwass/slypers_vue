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
  SET_LOADING,
  SET_CUSTOMER_ADDRESS,
  SET_CUSTOMER_ADDRESS_2,
  SET_CUSTOMER_CITY,
  SET_CUSTOMER_STATE,
  SET_CUSTOMER_ZIP,
  SAVE_CUSTOMER_SHIPPING,
  SIGNUP_LOGIN_STEP,
  LOGIN_USER,
  SHIPPING_STEP,
  PAYMENT_STEP,
  REVIEW_STEP,
  SET_CUSTOMER_BIRHTDAY,
  SET_CUSTOMER_BIRHTMONTH,
  SET_CUSTOMER_BIRHTYEAR,
  SET_CHECKOUT_STEP,
  SET_CUSTOMER_ORDER,
  SET_CUSTOMER_TOKEN,
  SUBMIT_ORDER,
  SET_SIGNUP_EMAIL,
  SET_SIGNUP_PASSWORD,
  COMPLETED_STEP,
  RESUME
} from '../types'

const customer = {
  state: {
    user: {
      email: 'joel2@wass.com',
      password: 'asdf',
      firstName: 'joel',
      lastName: 'wass',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      shippingAddress: '',
      shippingAddress2: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      signUpEmail: '',
      signUpPassword: ''
    },
    order: undefined,
    token: undefined
  },
  actions: {
    [SET_SIGNUP_EMAIL]: ({ commit }, email) => {
      commit(SET_SIGNUP_EMAIL, email)
    },
    [SET_SIGNUP_PASSWORD]: ({ commit }, password) => {
      commit(SET_SIGNUP_PASSWORD, password)
    },
    [SUBMIT_ORDER]: ({ dispatch, commit, state }) => {
      dispatch(SET_LOADING, { value: true, save: true })
      API.pay({ token: state.token, orderId: state.order.id, email: state.user.email }).then((res) => {
        console.log(res)
        if (res.success && res.order.metadata.status === 'paid') {
          dispatch(SET_CHECKOUT_STEP, { step: COMPLETED_STEP })
        } else {
          alert(res.error)
          dispatch(SET_ERROR, res.error)
        }
        return dispatch(SET_LOADING, { value: false, save: true })
      }).catch(err => {
        console.log(err)
        return dispatch(SET_LOADING, { value: false, save: false })
      })
    },
    [SET_CUSTOMER_TOKEN]: ({ dispatch, commit }, token) => {
      commit(SET_CUSTOMER_TOKEN, token)
      dispatch(SET_CHECKOUT_STEP, { step: REVIEW_STEP })
    },
    [SET_CUSTOMER_EMAIL]: ({ commit }, email) => {
      commit(SET_CUSTOMER_EMAIL, email)
    },
    [SET_CUSTOMER]: ({ commit }, customer) => {
      commit(SET_CUSTOMER, customer)
    },
    [CREATE_ACCOUNT]: ({ dispatch, commit }, customer) => {
      dispatch(CLEAR_ERRORS)
      dispatch(SET_LOADING, { value: true, save: true })
      API.createNewUser(customer).then((res) => {
        if (res.success) {
          commit(CREATE_ACCOUNT, res.customer)
          dispatch(SET_CHECKOUT_STEP, { step: SHIPPING_STEP })
        } else {
          alert(res.message)
          console.log(res)
          dispatch(SET_ERROR, res.message)
        }
        dispatch(SET_LOADING, { value: false, save: true })
      })
    },
    [LOGIN_USER]: ({ dispatch, commit }, credentials) => {
      dispatch(SET_LOADING, { value: true, save: true })
      API.login(credentials).then((res) => {
        if (res.success) {
          dispatch(SET_CUSTOMER, res.customer)
          dispatch(SET_CHECKOUT_STEP, { step: SHIPPING_STEP })
        } else {
          console.log(res)
          alert(res.message)
          return dispatch(SET_ERROR, res.message)
        }
        return dispatch(SET_LOADING, { value: false, save: true })
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
    [SET_CUSTOMER_BIRHTDAY]: ({ commit }, birthday) => {
      commit(SET_CUSTOMER_BIRHTDAY, birthday)
    },
    [SET_CUSTOMER_BIRHTMONTH]: ({ commit }, month) => {
      commit(SET_CUSTOMER_BIRHTMONTH, month)
    },
    [SET_CUSTOMER_BIRHTYEAR]: ({ commit }, year) => {
      commit(SET_CUSTOMER_BIRHTYEAR, year)
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
      dispatch(SET_LOADING, { value: true, save: true })
      console.log('data here', data)
      const stripeOrderData = {
        shipping: {
          name: data.name,
          address: {
            city: data.city,
            country: 'USA',
            line1: data.address,
            state: data.state,
            postal_code: data.zip
          }
        },
        items: data.selectedProducts.slice().map((val) => {
          return {
            currency: 'usd',
            quantity: val.quantity,
            parent: val.sku,
            type: 'sku'
          }
        }),
        email: data.email
      }
      API.createStripeOrder(stripeOrderData).then(res => {
        console.log('here', res)
        if (res.success) {
          commit(SET_CUSTOMER_ORDER, res.order)
          return API.saveShipping({
            address: data.address,
            address2: data.address2,
            email: data.email,
            city: data.city,
            state: data.state,
            zip: data.zip
          })
        } else {
          alert(res.message)
          console.log(res)
          dispatch(SET_ERROR, res.message)
          // TODO: maybe throw here?
        }
      }).then((res) => {
        console.log('blah', res)
        if (res.success) {
          alert(res.message)
          dispatch(SET_CHECKOUT_STEP, { step: PAYMENT_STEP })
        } else {
          alert(res.message)
          console.log(res)
          dispatch(SET_ERROR, res.message)
        }
        dispatch(SET_LOADING, { value: false, save: true })
      }).catch(err => {
        console.log('err', err)
        dispatch(SET_LOADING, { value: false, save: false })
      })
    }
  },
  mutations: {
    [SET_CUSTOMER_TOKEN](state, token) {
      Vue.set(state, 'token', token)
    },
    [RESUME](state, data) {
      Vue.set(state, 'user', data.user)
    },
    [SET_CUSTOMER_ORDER](state, order) {
      Vue.set(state, 'order', order)
    },
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
    [SET_CUSTOMER_BIRHTDAY](state, day) {
      Vue.set(state.user, 'birthDay', day)
    },
    [SET_CUSTOMER_BIRHTMONTH](state, month) {
      Vue.set(state.user, 'birthMonth', month)
    },
    [SET_CUSTOMER_BIRHTYEAR](state, year) {
      Vue.set(state.user, 'birthYear', year)
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
    },
    [SET_SIGNUP_EMAIL](state, email) {
      Vue.set(state.user, 'signUpEmail', email)
    },
    [SET_SIGNUP_PASSWORD](state, password) {
      Vue.set(state.user, 'signUpPassword', password)
    }
  }
}

export default customer
