import Vuex from 'vuex'

// modules
import cart from './cart/cart'
import loading from './loading/loading'

import {
} from './types'

const store = () => {
  return new Vuex.Store({
    strict: true, // Only allow state mutation in mutation handlers
    state: {
    },
    actions: {
      
    },
    mutations: {
      
    },
    modules: {
      cart,
      loading
    }
  })
}

export default store
