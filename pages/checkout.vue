<template>
  <div class="checkout">
    <div class="checkout-grid">
      <div class="checkout-nav-el" @click="setCurrentCheckoutStep({ step: 'SIGNUP_LOGIN_STEP' })">1. LOGIN / REGISTER</div>
      <div class="checkout-nav-el" @click="setCurrentCheckoutStep({ step: 'SHIPPING_STEP' })">2. SHIPPING</div>
      <div class="checkout-nav-el" @click="setCurrentCheckoutStep({ step: 'PAYMENT_STEP' })">3. PAYMENT</div>
      <div class="checkout-nav-el" @click="setCurrentCheckoutStep({ step: 'REVIEW_STEP' })">4. REVIEW</div>
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
        <div v-if="currentCheckoutStep === 'SIGNUP_LOGIN_STEP'">
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
        <div v-else-if="currentCheckoutStep === 'SHIPPING_STEP'">
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
        <div v-show="currentCheckoutStep === 'PAYMENT_STEP'">
          <div class="stripe">
            <form>
              <div class="cc-field" :class="cardTypeClass">
                <input type="text" placeholder="First name" v-model="stripe.firstName" />
                <input type="text" placeholder="Last name" v-model="stripe.lastName" />
              </div>
            </form>
            <form action="/charge" method="post" id="payment-form">
              <div class="form-row">
                <label for="card-element">
                  Credit or debit card
                </label>
                <div id="card-element">
                  <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display form errors. -->
                <div id="card-errors" role="alert"></div>
              </div>

              <button>Submit Payment</button>
            </form>
          </div>
        </div>   
      </div>
    </div>
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
      cardStuffInitialized: false,
      clickedSignUp: true,
      stripeOptions: {
        hidePostalCode: false
      },
      stripeInfo: {
        firstName: undefined,
        lastName: undefined
      },
      localStripe: undefined
    }
  },
  watch: {
    currentCheckoutStep(view) {
      if (view === 'PAYMENT_STEP' && !this.cardStuffInitialized) {
        this.cardStuffInitialized = true
          // Create a Stripe client.
        var stripe = Stripe('pk_test_vosa23qHDTzgpr2tENv03qLC');

        // Create an instance of Elements.
        var elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
          base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', {style: style});

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function(event) {
          var displayError = document.getElementById('card-errors');
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        });

        // Handle form submission.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault();

          stripe.createToken(card).then(function(result) {
            console.log(result)
            if (result.error) {
              // Inform the user if there was an error.
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the token to your server.
              api.stripeTokenHandler(result.token);
            }
          });
        });
      }
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
      loggedIn: state => state.authenticated,
      currentCheckoutStep: state => state.cart.currentCheckoutStep
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
    stripe: async () => {
      if (this.localStripe) return this.localStripe
      try {
        const config = await api.getConfig()
        console.log(config)
        this.localStripe = new window.Stripe(config.stripePublishableKey)
        console.log('here')
        console.log(this.localStripe)
        return this.localStripe
      } catch (e) {
        console.log(e)
      }
    },
    cardType: () => {
      return this.stripe.card.cardType(this.cardNumber);
    },
    cardTypeClass: () => {
     switch (this.cardType) {
        case 'Visa': return 'is-visa';
        case 'MasterCard': return 'is-mastercard';
        case 'American Express': return 'is-amex';
        case 'Discover': return 'is-discover';
      }
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
    stripeData: () => {
      return {
        name: this.name,
        number: this.cardNumber,
        cvc: this.securityCode,
        exp: this.expiration,
        address_zip: this.postalCode,
      };
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
      saveShipping: 'SAVE_CUSTOMER_SHIPPING',
      setCurrentCheckoutStep: 'SET_CHECKOUT_STEP'
    }),
    pay () {
      console.log('here2')
      console.log(this.stripe)
      this.stripe.then(res => {
        res.createToken(this.stripeData, function(status, response) {
          console.log(status)
          console.log(response)
        })
      })
    },
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
        this.saveShipping({ email: this.email, address: this.address, address2: this.address2, city: this.city, state: this.stateAddress, zip: this.zip, selectedProducts: this.selectedProducts })
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
  /**
  * The CSS shown here will not be introduced in the Quickstart guide, but shows
  * how you can use CSS to style your Element's container.
  */
  .StripeElement {
    background-color: white;
    height: 40px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
}

</style>

