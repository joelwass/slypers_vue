import Vue from 'vue';

import {
  SET_AVAILABLE_PRODUCTS,
  SET_SELECTED_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SIGNUP_LOGIN_STEP,
  SHIPPING_STEP,
  PAYMENT_STEP,
  REVIEW_STEP,
  SET_CHECKOUT_STEP
} from '../types'

const cart = {
  state: {
    currentCheckoutStep: SIGNUP_LOGIN_STEP,
    availableProducts: [
      {
        id: '1',
        description: 'Dutch Brothel Slypers Black And White',
        image: '/shoes/blackAndWhite/Slypers_16.jpeg',
        images: ['/shoes/blackAndWhite/Slypers_16.jpeg', '/shoes/blackAndWhite/Slypers_11.jpeg', '/shoes/blackAndWhite/Slypers_8.jpeg', '/shoes/blackAndWhite/Slypers_3.jpeg'],
        name: 'Black & White Slypers',
        price: '400',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Black & White'
      },
      {
        id: '2',
        description: 'Dutch Brothel Slypers Grey',
        image: '/shoes/grey/Slypers_13.jpeg',
        images: ['/shoes/grey/Slypers_13.jpeg', '/shoes/grey/Slypers_10.jpeg', '/shoes/grey/Slypers_6.jpeg', '/shoes/grey/Slypers_1.jpeg'],
        name: 'Grey Slypers',
        price: '400',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Grey'
      },
      {
        id: '3',
        description: 'Dutch Brothel Slypers Blue',
        image: '/shoes/blue/Slypers_14.jpeg',
        images: ['/shoes/blue/Slypers_14.jpeg', '/shoes/blue/Slypers_12.jpeg', '/shoes/blue/Slypers_5.jpeg', '/shoes/blue/Slypers_4.jpeg'],
        name: 'Blue Slypers',
        price: '400',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Blue'
      },
      {
        id: '4',
        description: 'Dutch Brothel Slypers Red',
        image: '/shoes/red/Slypers_15_r.jpeg',
        images: ['/shoes/red/Slypers_15_r.jpeg', '/shoes/red/Slypers_9_r.jpeg', '/shoes/red/Slypers_7_r.jpeg', '/shoes/red/Slypers_2_r.jpeg'],
        name: 'Red Slypers',
        price: '400',
        price_dollars: 400,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Red'
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
    },
    [REMOVE_PRODUCT]: ({ commit}, data) => {
      commit(REMOVE_PRODUCT, data)
    },
    [SET_CHECKOUT_STEP]: ({ commit }, data) => {
      commit(SET_CHECKOUT_STEP, data)
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
      newArray.push({ productId: data.productId, size: data.size, quantity: 1 })
      Vue.set(state, 'selectedProducts', newArray)
    },
    [REMOVE_PRODUCT](state, data) {
      const newProducts = []
      const len = state.selectedProducts.length
      let removed = false
      for (var i = 0; i < len; i++) {
        let product = state.selectedProducts[i]
        // if this is the product and size to be removed
        if (!(product.productId === data.productId && product.size === data.size)) {
          newProducts.push(product)
          
        } else {
          if (removed) newProducts.push(product)
          if (!data.removeAll) {
            removed = true
          }
        }
      }
      Vue.set(state, 'selectedProducts', newProducts)
    },
    [SET_CHECKOUT_STEP](state, data) {
      if (data.step === SIGNUP_LOGIN_STEP) {
        Vue.set(state, 'currentCheckoutStep', SIGNUP_LOGIN_STEP)
      } else if (data.step === SHIPPING_STEP) {
        Vue.set(state, 'currentCheckoutStep', SHIPPING_STEP)
      } else if (data.step === PAYMENT_STEP) {
        Vue.set(state, 'currentCheckoutStep', PAYMENT_STEP)
      } else if (data.step === REVIEW_STEP) {
        Vue.set(state, 'currentCheckoutStep', REVIEW_STEP)
      }
    }
  }
}

export default cart
