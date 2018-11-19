<template>
  <div class="checkout">
    <div class="checkout-grid">
      <div :class="navClasses('SIGNUP_LOGIN_STEP')" @click="setCheckoutStep({ step: 'SIGNUP_LOGIN_STEP' })">1. EMAIL</div>
      <div :class="navClasses('SHIPPING_STEP')" @click="setCheckoutStep({ step: 'SHIPPING_STEP' })">2. SHIPPING</div>
      <div :class="navClasses('PAYMENT_STEP')" @click="setCheckoutStep({ step: 'PAYMENT_STEP' })">3. PAYMENT</div>
      <div :class="navClasses('REVIEW_STEP')" @click="setCheckoutStep({ step: 'REVIEW_STEP' })">4. REVIEW</div>
      <div class="bag">
        <div class="bag-drawer__header">
          <h3 class="bag-title">BAG ({{ this.selectedProducts.length }})</h3>
        </div>
        <div class="products">
          <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
            <div class="selectedProduct">
              <div class="productPrice">
                <p>€{{ product(prod.productId).price }}</p>
              </div>
              <div class="productDescription">
                <p>{{ product(prod.productId).name.toUpperCase() }}</p><br><br>
              </div>
              <div class="productAsterisk">
                <p>*For delivery 12/8*</p>
              </div>
              <div class="productDetails__checkout">
                <p><strong>Color:</strong> {{ product(prod.productId).colorString }}</p>
                <p><strong>Size: </strong>{{ prod.size }}</p>
                <div class="size-row"><strong>Quantity:</strong> {{ prod.quantity }}
                </div>
              </div>
              <div class="selectedProduct__imagecontainer">
                <img class="selectedProductImage" :src="product(prod.productId).image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-content">
        <div v-if="currentCheckoutStep === 'SIGNUP_LOGIN_STEP'">
          <!-- <h3 class="checkout-content-subheader">Login</h3>
          <p>Enter your email and password to enter</p><br>
          <div class="login">
            <b>EMAIL *</b><br><input class="checkout-content-input" type="text" placeholder="Email" v-model="email"><br>
            <b>PASSWORD *</b><br><input class="checkout-content-input" type="text" placeholder="Password" v-model="password"><br>
          </div>
          <div class="checkout-button" v-on:click="signIn">
            <p class="checkout-button-text"><b>LOGIN</b></p>
          </div>
          <p>or</p><br>
          <h3 class="checkout-content-subheader">Register</h3>
          <div class="signup">
            <b>EMAIL *</b><br><input type="text" class="checkout-content-input" placeholder="Email" v-model="signUpEmail">
            <b>PASSWORD *</b><br><input type="text" class="checkout-content-input" placeholder="Password" v-model="signUpPassword">
            <b>FIRST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="First Name" v-model="firstName">
            <b>LAST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="Last Name" v-model="lastName">
          </div>
          <div class="checkout-button" v-on:click="signUp">
            <p class="checkout-button-text"><b>REGISTER</b></p>
          </div>
          <p>or</p><br> -->
          <h3 class="checkout-content-subheader">Checkout as guest</h3>
          <div class="signup">
            <form v-on:submit.prevent="checkoutAsGuest">
              <b>EMAIL *</b><br><input type="text" class="checkout-content-input" placeholder="Email" v-model="email">
            </form>
            <div class="validationError" v-if="validation.emailValidation">
              <p>Email is required</p>
            </div>
          </div>
          <div class="checkout-button" v-on:click="checkoutAsGuest">
            <p class="checkout-button-text"><b>NEXT</b></p>
          </div>
        </div>
        <div v-else-if="currentCheckoutStep === 'SHIPPING_STEP'">
          <h3 class="checkout-content-subheader">Shipping Address</h3><br>
          <form v-on:submit.prevent="saveShippingInfo">
            <div class="shipping-info">
              <b>ADDRESS - LINE 1 *</b><br><input type="text" class="checkout-content-input" placeholder="Street Address" v-model="address">
              <div class="validationError" v-if="validation.addressValidation">
                <p>Street address is required</p>
              </div>
              <b>ADDRESS - LINE 2</b><br><input type="text" class="checkout-content-input" placeholder="Unit # (optional)" v-model="address2">
              <b>CITY *</b><br><input type="text" class="checkout-content-input" placeholder="City" v-model="city">
              <div class="validationError" v-if="validation.cityValidation">
                <p>City is required</p>
              </div>
              <b>STATE / PROVINCE</b><br><input type="text" class="checkout-content-input" placeholder="State" v-model="stateAddress">
              <b>ZIP / POSTAL CODE *</b><br><input type="text" class="checkout-content-input" placeholder="Zip" v-model="zip">
              <div class="validationError" v-if="validation.zipValidation">
                <p>Zip is required</p>
              </div>
              <b>COUNTRY</b><br><input type="text" class="checkout-content-input" placeholder="Country" v-model="country">
            </div>
          </form>
          <div class="checkout-button" v-on:click="saveShippingInfo">
            <p class="checkout-button-text"><b>SAVE SHIPPING INFO</b></p>
          </div>
        </div>
        <div v-else-if="currentCheckoutStep === 'REVIEW_STEP'">
          <h3 class="checkout-content-subheader">Review</h3>
          <div>
            <h4 class="checkout-content-subheader">SHIPPING</h4>
            <div class="shipping-subheader">ADDRESS</div>
            <div class="modify-button" v-on:click="setCheckoutStep({ step: 'SHIPPING_STEP' })">
              <p><u>MODIFY</u></p>
            </div><br>
            <label for="shippingAddress">{{ this.address }}</label><br>
            <label v-if="address2" for="shippingAddress2">{{ this.address2 ? `Unit ${this.address2}` : '' }}</label><br>
            <label for="shippingCity">{{ this.city }}</label><br>
            <label for="shippingState">{{ this.stateAddress }}</label><br>
            <label for="shippingZip">{{ this.zip }}</label><br><br>
          </div>
          <div>
            <h4 class="checkout-content-subheader">PAYMENT</h4>
            <label for="paymentInfo">{{ this.cardBrand }} ending in {{ this.cardLast4 }}</label><br><br>
          </div>
          <div class="mobileBagSummary">
            <div class="mobileBagSummary__products">
              <div v-for="prod in selectedProductsMapped" class="selectedProductsMapped" :key="prod.id">
                  <div class="selectedProduct">
                    <div class="productPrice">
                      <p>€{{ product(prod.productId).price }}</p>
                    </div>
                    <div class="productDescription">
                      <p>{{ product(prod.productId).name.toUpperCase() }}</p><br><br>
                    </div>
                    <div class="productAsterisk">
                      <p>*For delivery 12/8*</p>
                    </div>
                    <div class="productDetails__checkout">
                      <p><strong>Color:</strong> {{ product(prod.productId).colorString }}</p>
                      <p><strong>Size: </strong>{{ prod.size }}</p>
                      <div class="size-row"><strong>Quantity:</strong> {{ prod.quantity }}
                      </div>
                    </div>
                    <div class="selectedProduct__imagecontainer">
                      <img class="selectedProductImage" :src="product(prod.productId).image" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div>
            <p>Subtotal: € {{ this.subtotal() }}</p>
            <p v-if="discount !== ''">Discount: € {{ this.discount }}</p>
            <p>Shipping: € 8</p><br>
            <h4 class="checkout-content-subheader">TOTAL</h4>
            <p>€ {{ this.discountedSubtotal + 8 }}</p>
          </div>
          <div class="checkout-button" v-on:click="submitOrder">
            <p class="checkout-button-text"><b>SUBMIT ORDER</b></p>
          </div>
          <hr><br>
          <p><b>Client Service</b></p><br>
          <p> service@slypers.com</p><br>
          <p><b>Return & Exchange Policy</b></p><br>
          <p>Returns and exchanges for unused merchandise in original condition accepted within 14 days of delivery. 
              Email service@slypers.com with your order number for more information.
          </p>
        </div>
        <div v-show="currentCheckoutStep === 'PAYMENT_STEP'">
          <h3 class="checkout-content-subheader">Payment</h3>
          <p>Accepted Credit & Debit Cards</p><br>
          <p><img class="card_logos" src="/visa_img.png" /></p><br>
          <p>Powered by Stripe on a secure web server.</p><br><br>
          <div class="stripe">
            <div class="cc-field">
              <b>FIRST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="First name" v-model="stripeInfo.firstName" />
              <b>LAST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="Last name" v-model="stripeInfo.lastName" />
              <b>Personal Code </b><br><input type="text" class="checkout-content-input" placeholder="Personal code" v-model="couponCode" />
            </div>
            <form action="/charge" method="post" id="payment-form">
              <div class="form-row">
                <label for="card-element"><b>
                  CARD NUMBER *
                </b></label>
                <div id="card-element" class="checkout-content-input" >
                  <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display form errors. -->
                <div id="card-errors" role="alert"></div>
              </div>
              <div class="checkout-button" v-on:click="savePayment">
                <p class="checkout-button-text"><b>PROCEED TO CHECKOUT</b></p>
              </div>
            </form>
            <hr><br>
            <p><b>Client Service</b></p><br>
            <p> service@slypers.com</p><br>
            <p><b>Return & Exchange Policy</b></p><br>
            <p>Returns and exchanges for unused merchandise in original condition accepted within 14 days of delivery. 
              Email service@slypers.com with your order number for more information.
            </p>
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
import helperMethods from '../helpers/methods'

export default {
  mounted() {
    this.setCheckoutStep({ step: 'SIGNUP_LOGIN_STEP' })
    this.setLoading({ value: false, save: false })

    // Create a Stripe client.
    try {
    this.localStripe = Stripe('pk_live_oFibVEirPkAASjPpBX5zK9B5');

    // Create an instance of Elements.
    var elements = this.localStripe.elements();

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
    this.localCard = elements.create('card', {style: style, hidePostalCode: true});

    // Add an instance of the card Element into the `card-element` <div>.
    this.localCard.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    this.localCard.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    } catch (e) {
      console.log('ERRORRRRRR', e)
      
    }
  },
  data() {
    return {
      clickedSignUp: true,
      stripeOptions: {
        hidePostalCode: false
      },
      stripeInfo: {
        firstName: undefined,
        lastName: undefined
      },
      localCard: undefined,
      localStripe: undefined,
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      selectedMonth: 'MONTH',
      selectedYear: 'YEAR',
      selectedDay: 'DAY',
      dayDropdownOpen: false,
      monthDropdownOpen: false,
      yearDropdownOpen: false,
      couponCode: '',
      guestEmail: '',
      isGuest: true,
      validation: {
        emailValidation: false,
        addressValidation: false,
        cityValidation: false,
        zipValidation: false,
      },
      discount: '',
      discountedSubtotal: 0
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
      addressState: state => state.customer.user.address,
      address2State: state => state.customer.user.address2,
      cityState: state => state.customer.user.city,
      stateState: state => state.customer.user.state,
      zipState: state => state.customer.user.zip,
      countryState: state => state.customer.user.country,
      loggedIn: state => state.authenticated,
      currentCheckoutStep: state => state.cart.currentCheckoutStep,
      birthDay: state => state.customer.user.birthDay,
      birthMonth: state => state.customer.user.birthMonth,
      birthYear: state => state.customer.user.birthYear,
      order: state => state.customer.order,
      signUpEmailState: state => state.customer.user.signUpEmail,
      signUpPasswordState: state => state.customer.user.signUpPassword,
      customer: state => state.customer,
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
    cardBrand() {
      try {
        return this.customer.token.card.brand
      } catch (e) {
        return 'Card'
      }
    },
    cardLast4() {
      try {
        return this.customer.token.card.last4
      } catch (e) {
        return '****'
      }
    },
    email: {
      get() {
        return this.emailState
      },
      set(newVal) {
        location.reload()
        this.validation.emailValidation = false
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
    localBirthDay: {
      get() {
        return this.birthDay
      },
      set(newVal) {
        this.setBirthDay(newVal)
      }
    },
    localBirthMonth: {
      get() {
        return this.birthMonth
      },
      set(newVal) {
        this.setBirthMonth(newVal)
      }
    },
    localBirthYear: {
      get() {
        return this.birthYear
      },
      set(newVal) {
        this.setBirthYear(newVal)
      }
    },
    address: {
      get() {
        return this.addressState
      },
      set(newVal) {
        this.validation.addressValidation = false
        this.setAddress(newVal)
      }
    },
    address2: {
      get() {
        return this.address2State || ''
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
        this.validation.cityValidation = false
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
        this.validation.zipValidation = false
        this.setZip(newVal)
      }
    },
    country: {
      get() {
        return this.countryState
      },
      set(newVal) {
        this.setCountry(newVal)
      }
    },
    signUpEmail: {
      get() {
        return this.signUpEmailState
      },
      set(newVal) {
        this.setSignUpEmail(newVal)
      }
    },
    signUpPassword: {
      get() {
        return this.signUpPasswordState
      },
      set(newVal) {
        this.setSignUpPassword(newVal)
      }
    }
  },
  methods: {
    ...mapActions({
      setPassword: 'SET_PASSWORD',
      setLoading: 'SET_LOADING',
      setEmail: 'SET_CUSTOMER_EMAIL',
      setBirthDay: 'SET_CUSTOMER_BIRHTDAY',
      setBirthMonth: 'SET_CUSTOMER_BIRHTMONTH',
      setBirthYear: 'SET_CUSTOMER_BIRHTYEAR',
      setFirstName: 'SET_FIRST_NAME',
      setLastName: 'SET_LAST_NAME',
      login: 'LOGIN_USER',
      signupAction: 'CREATE_ACCOUNT',
      checkoutAsGuestAction: 'CREATE_GUEST',
      setAddress: 'SET_CUSTOMER_ADDRESS',
      setAddress2: 'SET_CUSTOMER_ADDRESS_2',
      setCity: 'SET_CUSTOMER_CITY',
      setState: 'SET_CUSTOMER_STATE',
      setZip: 'SET_CUSTOMER_ZIP',
      setCountry: 'SET_CUSTOMER_COUNTRY',
      saveShipping: 'SAVE_CUSTOMER_SHIPPING',
      setCurrentCheckoutStep: 'SET_CHECKOUT_STEP',
      setToken: 'SET_CUSTOMER_TOKEN',
      submit: 'SUBMIT_ORDER',
      setSignUpEmail: 'SET_SIGNUP_EMAIL',
      setSignUpPassword: 'SET_SIGNUP_PASSWORD'
    }),
    submitOrder() {
      if (window.ga) {
        window.ga('send', 'event', 'SubmitOrder', this.discountedSubtotal*100)
      }
      this.submit({router: this.$router, subtotal: this.discountedSubtotal*100, products: this.selectedProducts })
    },
    setCheckoutStep(data) {
      if (window.ga) {
        window.ga('send', 'event', 'CheckoutNav', data.step)
      }
      const order = ['SIGNUP_LOGIN_STEP', 'SHIPPING_STEP', 'PAYMENT_STEP', 'REVIEW_STEP']
      if (order.indexOf(data.step) < order.indexOf(this.currentCheckoutStep)) {
        this.setLoading({ value: true, save: true })
        this.setCurrentCheckoutStep(data)
      }
    },
    subtotal() {
      return this.selectedProducts.reduce((acc, val) => {
        const product = this.availableProducts.filter((avail) => avail.id === val.productId)[0]
        return acc + parseInt(product.price_dollars)
      }, 0)
    },
    savePayment(event) {
      if (window.ga) {
        window.ga('send', 'event', 'SavePayment', 'Press')
      }
      if (event) {
        event.preventDefault();
      }
      const self = this
      this.setLoading({ value: true, save: false })


      try {
        let discounted = false
        this.discountedSubtotal = this.subtotal()
        api.getDiscount({ subtotal: this.subtotal(), couponCode: this.couponCode })
        .then((res) => {
          if (res.data && res.data.success) {
            this.discount = this.subtotal() - res.data.subtotal
            discounted = true
            this.discountedSubtotal = res.data.subtotal
          }

          console.log('paying here', this.discountedSubtotal)

          // set shipping and meta values on card
          const options = {
            name: `${this.stripeInfo.firstName} ${this.stripeInfo.lastName}`,
            address_country: 'United States',
            address_zip: this.zip,
            address_state: this.stateAddress,
            address_city: this.city,
            address_line1: this.address,
            address_line2: this.address2,
            address_country: this.country,
            metadata: {
              selectedProducts: this.selectedProducts,
              subtotal: discounted ? this.discountedSubtotal * 100 : this.subtotal()*100
            }
          }

          this.localStripe.createToken(this.localCard, options).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error.
              var errorElement = document.getElementById('card-errors')
              errorElement.textContent = result.error.message
              self.setLoading({ value: false, save: false })
            } else {
              result.token.email = self.email
              // Send the token to your server.
              result.token.card
              self.setToken(result.token)
            }
          });
        }).catch((e) => {

          console.log('blahblahblah')
          // set shipping and meta values on card
          const options = {
            name: `${this.stripeInfo.firstName} ${this.stripeInfo.lastName}`,
            address_country: 'United States',
            address_zip: this.zip,
            address_state: this.stateAddress,
            address_country: this.country,
            address_city: this.city,
            address_line1: this.address,
            address_line2: this.address2,
            metadata: {
              selectedProducts: this.selectedProducts,
              subtotal: this.subtotal()*100
            }
          }
  
          this.localStripe.createToken(this.localCard, options).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error.
              var errorElement = document.getElementById('card-errors')
              errorElement.textContent = result.error.message
              self.setLoading({ value: false, save: false })
            } else {
              result.token.email = self.email
              // Send the token to your server.
              result.token.card
              self.setToken(result.token)
            }
          });
        })
      } catch (e) {
        this.setLoading({ value: false, save: false })
        console.log('ERROR', e)
      }
    },
    range(start, end) {
      return helperMethods.range(start, end)
    },
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },
    product(id) {
      return this.availableProducts.filter(val => {
        return val.id === id;
      })[0]
    },
    signIn() {
      if (this.email && this.password) {
        this.login({ email: this.email, password: this.password })
      }
    },
    signUp() {
      if (this.signUpEmail && this.signUpPassword && this.firstName && this.lastName) {
        this.signupAction({ firstName: this.firstName, lastName: this.lastName, email: this.signUpEmail, password: this.signUpPassword })
      }
    },
    checkoutAsGuest() {
      if (this.email) {
        if (window.ga) {
          window.ga('send', 'event', 'CheckoutAsGuest', this.email)
        }
        this.checkoutAsGuestAction({ email: this.email }) 
      } else {
        this.validation.emailValidation = true
      }
    },
    saveShippingInfo() {
      if (!this.address) this.validation.addressValidation = true
      if (!this.city) this.validation.cityValidation = true
      if (!this.zip) this.validation.zipValidation = true
      if (this.email && this.address && this.city && this.stateAddress && this.zip) {
        if (window.ga) {
          window.ga('send', 'event', 'SaveShipping', 'Press')
        }
        this.saveShipping({ isGuest: this.isGuest, email: this.email, address: this.address, address2: this.address2, city: this.city, state: this.stateAddress, zip: this.zip, selectedProducts: this.selectedProducts, name: `${this.firstName} ${this.lastName}` })
      }
    },
    navClasses(step) {
      if (step === this.currentCheckoutStep) return 'checkout-nav-el grey-outline-nav-el'
      return 'checkout-nav-el'
    },
    dayDropdown() {
      this.dayDropdownOpen = !this.dayDropdownOpen
    },
    monthDropdown() {
      this.monthDropdownOpen = !this.monthDropdownOpen
    },
    yearDropdown() {
      this.yearDropdownOpen = !this.yearDropdownOpen
    },
  }
}
  
</script>

<style>
.shipping-subheader {
  float: left;
  width: 100px;
}

.modify-button {
  width: 100px;
  float: right;
}

.checkout-button {
  width: 100%;
  cursor: pointer;
  background-color: black;
  color: white;
  text-align: center;
  height: 30px;
  margin: 26px 0 26px 0;
}

.checkout-button-text {
  padding-top: 7px;
}

#card-errors {
  color: red;
}

.checkout-content-input {
  width: 100%;
  height: 25px;
  padding: 5px;
  margin: 5px 0 5px 0;
  border: 1px solid black;
}

.selectedProduct > .productDetails__checkout {
  position: absolute;
  bottom: 50px;
  left: 110px;
  width: 110px;
}

.card_logos {
  width: 240px;
}

.selectedProduct > .productAsterisk {
  left: 110px;
  bottom: 10px;
  position: absolute;
}

.grey-outline-nav-el {
  border-left: solid rgb(230, 226, 226) 1px;
  border-right: solid rgb(230, 226, 226) 1px;
  border-top: solid rgb(230, 226, 226) 1px;
  font-weight: bold;
}

.checkout-content-subheader {
  margin-bottom: 10px;
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

.sizes-select {
  border: 1px solid black;
  width: 80px;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor:pointer;
}
.sizes > ul {
  list-style-type: none;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  z-index: 10000;
  width: 120px;
  padding: 0;
  cursor: pointer;
}

.sizes > ul > li {
  cursor: pointer;
  margin: 0;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  width: 100%;
}

.mobileBagSummary__products {
  height: 100%;
  overflow: scroll;
  font-size: 11px;
  padding-bottom: 20px;
}

.sizes > ul > li:hover {
  background-color: black;
  color: white;
}

.dateOfBirth {
  display: inline-block;
}

.checkout {
  min-height: 100vh;
  padding-top: 80px;
}

.checkout > .checkout-grid > .bag {
  display: none;
}

.checkout > .checkout-grid > .checkout-content {
  grid-column: 1 / 5;
  grid-row: 2 / 14;
  border: solid rgb(230, 226, 226) 1px;
  padding: 30px;
}

.checkout-grid {
  height: 1000px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(12, 1fr);
}

.checkout-nav-el {
  text-align: center;
  padding-top: 25px;
}

@media all and (min-width: 850px) {
  .checkout {
    min-height: 100vh;
    padding-left: 220px;
    padding-right: 180px;
    padding-top: 80px;
  }

  .mobileBagSummary {
    display: none;
  }

  .checkout > .checkout-grid > .bag {
    grid-column: 3 / 5;
    grid-row: 2 / 12;
    overflow: hidden;
    border: solid rgb(230, 226, 226) 1px;
    display: block;
  }

  .checkout > .checkout-grid > .checkout-content {
    grid-column: 1 / 3;
    grid-row: 2 / 12;
    border: solid rgb(230, 226, 226) 1px;
    padding: 30px;
  }

  .checkout-grid {
    height: 1000px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }

  .checkout-nav-el {
    text-align: center;
    padding: 30px;
  }
}

</style>

