<template>
  <div class="checkout">
    <div class="checkout-grid">
      <div class="checkout-nav-el" @click="currentView = 'loginSignup'">1. LOGIN / REGISTER</div>
      <div class="checkout-nav-el" @click="currentView = 'shipping'">2. SHIPPING</div>
      <div class="checkout-nav-el" @click="currentView = 'payment'">3. PAYMENT</div>
      <div class="checkout-nav-el" @click="currentView = 'review'">4. REVIEW</div>
      <div class="bag">
        <h1 class="bag-title">BAG ({{ this.selectedProducts.length }})</h1>
        <hr class="divider">
        <div class="products">
          <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
            <div class="selectedProduct">
              <div class="productPrice">
                <p>$ {{ product(prod.productId).price }}</p>
              </div>
              <div class="productDescription">
                <p>{{ product(prod.productId).description.toUpperCase() }}</p><br><br>
              </div>
              <div class="productDetails">
                <p><strong>COLOR:</strong> {{ product(prod.productId).colorString }}</p>
                <p><strong>SIZE: </strong>{{ prod.size }}</p>
                <p><strong>QUANTITY:</strong> {{ prod.quantity }} </p>
              </div>
              <img class="selectedProductImage" :src="product(prod.productId).image" />
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-content">
        <div v-if="currentView === 'loginSignup'">
          <div v-if="!loggedIn && !clickedSignUp" class="login">
            <input type="text" placeholder="Email" v-model="email">
            <input type="text" placeholder="Password" v-model="password">
          </div>
          <div v-else class="signup">
            <input type="text" placeholder="Email" v-model="email">
            <input type="text" placeholder="Password" v-model="password">
            <input type="text" placeholder="First Name" v-model="firstName">
            <input type="text" placeholder="Last Name" v-model="lastName">
          </div>
          <div class="checkout-button" v-on:click="signInOrSignUp">
            <p v-if="clickedSignUp">SIGN UP</p>
            <p v-else>SIGN IN</p>
          </div>
          <div class="checkout-button" v-show="!clickedSignUp" v-on:click="clickedSignUp = true">
            <p>OR SIGN UP</p>
          </div>
          <div class="checkout-button" v-show="clickedSignUp" v-on:click="clickedSignUp = false">
            <p>OR SIGN IN</p>
          </div>
        </div>
        <div v-else-if="currentView === 'shipping'">
          <div class="shipping-info">
            <input type="text" placeholder="Street Address" v-model="address">
            <input type="text" placeholder="Unit # (optional)" v-model="address2">
            <input type="text" placeholder="City" v-model="city">
            <input type="text" placeholder="State" v-model="stateAddress">
            <input type="text" placeholder="Zip" v-model="zip">
          </div>
          <div class="checkout-button" v-on:click="saveShippingInfo">
            <p>SAVE SHIPPING INFO</p>
          </div>
        </div>
        <div v-else-if="currentView === 'payment'">
          
        </div>   
      </div>
    </div>
    <script src="https://js.stripe.com/v3/"></script>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

import api from '../middleware/api'

export default {
  head () {
    return {
      script: [
        { src: 'https://js.stripe.com/v3/' }
      ]
    } 
  },
  data() {
    return {
      currentView: 'loginSignup',
      clickedSignUp: true,
    }
  },
  computed: {
    ...mapState({
      selectedProducts: state => state.cart.selectedProducts,
      availableProducts: state => state.cart.availableProducts,
      passwordState: state => state.customer.user.password,
      emailState: state => state.customer.user.email,
      firstNameState: state => state.customer.user.firstName,
      lastNameState: state => state.customer.user.lastName,
      addressState: state => state.customer.user.shippingAddress,
      address2State: state => state.customer.user.shippingAddress2,
      cityState: state => state.customer.user.shippingCity,
      stateState: state => state.customer.user.shippingState,
      zipState: state => state.customer.user.shippingZip,
      loggedIn: state => state.authenticated
    }),
    selectedProductsMapped() {
      const mappedProducts = {}
      this.selectedProducts.forEach((val) => {
        if (mappedProducts[`${val.productId}${val.size}`] && mappedProducts[`${val.productId}${val.size}`].size === val.size) {
          mappedProducts[`${val.productId}${val.size}`].quantity++
        } else {
          mappedProducts[`${val.productId}${val.size}`] = Object.assign({}, val)
        }
      })
      return Object.values(mappedProducts)
    },
    email: {
      get() {
        return this.emailState
      },
      set(newVal) {
        console.log('here')
        this.setEmail(newVal)
      }
    },
    password: {
      get() {
        return this.passwordState
      },
      set(newVal) {
        this.setPassword(newVal)
      }
    },
    firstName: {
      get() {
        return this.firstNameState
      },
      set(newVal) {
        this.setFirstName(newVal)
      }
    },
    lastName: {
      get() {
        return this.lastNameState
      },
      set(newVal) {
        this.setLastName(newVal)
      }
    },
    address: {
      get() {
        return this.addressState
      },
      set(newVal) {
        this.setAddress(newVal)
      }
    },
    address2: {
      get() {
        return this.address2State
      },
      set(newVal) {
        this.setAddress2(newVal)
      }
    },
    city: {
      get() {
        return this.cityState
      },
      set(newVal) {
        this.setCity(newVal)
      }
    },
    stateAddress: {
      get() {
        return this.stateState
      },
      set(newVal) {
        this.setState(newVal)
      }
    },
    zip: {
      get() {
        return this.zipState
      },
      set(newVal) {
        this.setZip(newVal)
      }
    },
  },
  methods: {
    ...mapActions({
      setPassword: 'SET_PASSWORD',
      setEmail: 'SET_CUSTOMER_EMAIL',
      setFirstName: 'SET_FIRST_NAME',
      setLastName: 'SET_LAST_NAME',
      login: 'LOGIN_USER',
      signup: 'CREATE_ACCOUNT',
      setAddress: 'SET_CUSTOMER_ADDRESS',
      setAddress2: 'SET_CUSTOMER_ADDRESS_2',
      setCity: 'SET_CUSTOMER_CITY',
      setState: 'SET_CUSTOMER_STATE',
      setZip: 'SET_CUSTOMER_ZIP',
      saveShipping: 'SAVE_CUSTOMER_SHIPPING'
    }),
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    },
    signInOrSignUp() {
      if (this.email && this.password && !this.clickedSignUp) {
        this.login({ email: this.email, password: this.password })
      } else if (this.email && this.password && this.firstName && this.lastName && this.clickedSignUp) {
        this.signup({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
      }
    },
    saveShippingInfo() {
      if (this.email && this.address && this.city && this.stateAddress && this.zip) {
        this.saveShipping({ email: this.email, address: this.address, address2: this.address2, city: this.city, state: this.stateAddress, zip: this.zip })
      }
    }
  }
}
  
</script>

<style>

@media all and (min-width: 850px) {
  .checkout {
    min-height: 100vh;
    padding-left: 140px;
    padding-top: 80px;
  }

  .checkout > .checkout-grid > .bag {
    grid-column: 3 / 5;
    grid-row: 2 / 6;
  }

  .checkout > .checkout-grid > .checkout-content {
    grid-column: 1 / 3;
    grid-row: 2 / 6
  }

  .checkout-grid {
    height: 500px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }

  .checkout-nav-el {
    text-align: center;
    padding: 30px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
  }

  .checkout-nav-ul-li {
    display: inline;
    font-size: 11px;
    grid-column: 1;
    grid-row: 1;
    cursor: pointer;
    padding-top: 5px;
  }
}

</style>

