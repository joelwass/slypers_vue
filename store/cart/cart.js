import Vue from 'vue';

import API from '../../middleware/api'

import {
  SET_AVAILABLE_PRODUCTS,
  SET_SELECTED_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SIGNUP_LOGIN_STEP,
  SHIPPING_STEP,
  PAYMENT_STEP,
  REVIEW_STEP,
  SET_CHECKOUT_STEP,
  SETUP_CART,
  SET_LOADING,
  RESUME,
  SET_ERROR,
} from '../types'

const cart = {
  state: {
    currentCheckoutStep: SIGNUP_LOGIN_STEP,
    availableProducts: [
      {
        id: '1',
        description: 'Dutch Brothel Slypers Red',
        image: '/shoes/red/Top_red.png',
        altImage: '/shoes/red/Profile_red.png',
        images: ['/shoes/red/Profile_red.png', '/shoes/red/Top_red.png', '/shoes/red/Back_red.png', '/shoes/red/Bottom_red.png', '/shoes/red/Print_red.png'],
        name: 'Kameel ritje',
        price: '225',
        price_dollars: 225,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Bordeauxrood'
      },
      {
        id: '2',
        description: 'Dutch Brothel Slypers Blue',
        image: '/shoes/blue/Top_blue.png',
        altImage: '/shoes/blue/Profile_blue.png',
        images: ['/shoes/blue/Profile_blue.png', '/shoes/blue/Top_blue.png', '/shoes/blue/Back_blue.png', '/shoes/blue/Bottom_blue.png', '/shoes/blue/Print_blue.png'],
        name: 'Meid op meid',
        price: '225',
        price_dollars: 225,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Blauw'
      },
      {
        id: '3',
        description: 'Dutch Brothel Slypers Green',
        image: '/shoes/green/Top_green.png',
        altImage: '/shoes/green/Profile_green.png',
        images: ['/shoes/green/Profile_green.png', '/shoes/green/Top_green.png', '/shoes/green/Back_green.png', '/shoes/green/Bottom_green.png', '/shoes/green/Print_green.png'],
        name: 'Onderwaterjager',
        price: '225',
        price_dollars: 225,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Groen'
      },
      {
        id: '4',
        description: 'Dutch Brothel Slypers Tan',
        image: '/shoes/brown/Top_brown.png',
        altImage: '/shoes/brown/Profile_brown.png',
        images: ['/shoes/brown/Profile_brown.png', '/shoes/brown/Top_brown.png', '/shoes/brown/Back_brown.png', '/shoes/brown/Bottom_brown.png', '/shoes/brown/Print_brown.png'],
        name: 'Tijgerjager',
        price: '225',
        price_dollars: 225,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Bruin'
      },
      {
        id: '5',
        description: 'Dutch Brothel Slypers Grey',
        image: '/shoes/black/Top_black.png',
        altImage: '/shoes/black/Profile_black.png',
        images: ['/shoes/black/Profile_black.png', '/shoes/black/Top_black.png', '/shoes/black/Back_black.png', '/shoes/black/Bottom_black.png', '/shoes/black/Print_black.png'],
        name: 'Bubbelbad Apres MMXIX',
        price: '225',
        price_dollars: 225,
        price_cents: 0,
        color: '#ff0000',
        colorString: 'Grijs'
      }
    ],
    selectedProducts: []
  },
  actions: {
    [SETUP_CART]: ({ dispatch, commit }) => {
      API.resume().then((res) => {
        if (res.success) {
          commit(RESUME, res)
        } else {
          dispatch(SET_ERROR, res.message)
        }
      })
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
    [SET_CHECKOUT_STEP]: ({ commit, dispatch }, data) => {
      commit(SET_CHECKOUT_STEP, data)
      dispatch(SET_LOADING, { value: false, save: true })
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
    [RESUME](state, data) {
      if (data.checkoutStep) Vue.set(state, 'currentCheckoutStep', data.checkoutStep)
      if (data.selectedProducts) Vue.set(state, 'selectedProducts', data.selectedProducts)
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
