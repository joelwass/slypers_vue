<template>
  <div class="checkout">
    <div class="checkout-grid">
      <div :class="navClasses('SIGNUP_LOGIN_STEP')" @click="setCurrentCheckoutStep({ step: 'SIGNUP_LOGIN_STEP' })">1. LOGIN / REGISTER</div>
      <div :class="navClasses('SHIPPING_STEP')" @click="setCurrentCheckoutStep({ step: 'SHIPPING_STEP' })">2. SHIPPING</div>
      <div :class="navClasses('PAYMENT_STEP')" @click="setCurrentCheckoutStep({ step: 'PAYMENT_STEP' })">3. PAYMENT</div>
      <div :class="navClasses('REVIEW_STEP')" @click="setCurrentCheckoutStep({ step: 'REVIEW_STEP' })">4. REVIEW</div>
      <div class="bag">
        <h3 class="bag-title">BAG ({{ this.selectedProducts.length }})</h3>
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
          <h3 class="checkout-content-subheader">LOG IN</h3>
          <p>ENTER YOUR EMAIL AND PASSWORD TO ACCESS</p><br>
          <div class="login">
            <b>EMAIL *</b><br><input class="checkout-content-input" type="text" placeholder="Email" v-model="email"><br>
            <b>PASSWORD *</b><br><input class="checkout-content-input" type="text" placeholder="Password" v-model="password"><br>
          </div>
          <div class="checkout-button" v-on:click="signIn">
            <p class="checkout-button-text"><b>LOG IN</b></p>
          </div>
          <p>OR</p><br>
          <h3 class="checkout-content-subheader">REGISTER</h3>
          <div class="signup">
            <b>EMAIL *</b><br><input type="text" class="checkout-content-input" placeholder="Email" v-model="signUpEmail">
            <b>PASSWORD *</b><br><input type="text" class="checkout-content-input" placeholder="Password" v-model="signUpPassword">
            <b>FIRST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="First Name" v-model="firstName">
            <b>LAST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="Last Name" v-model="lastName">
            <!-- <p>DATE OF BIRTH *</p><br>
            <div class="dateOfBirth">
              <div v-on:click="yearDropdown" class="sizes-select">{{ this.selectedYear }}</div>
              <div v-show="yearDropdownOpen" class="sizes">
                <ul>
                  <li v-for="year in range(1950, 2018)" :key="year" v-on:click="this.localBirthYear = year">{{ year }}</li>
                </ul>
              </div>
              <div v-on:click="monthDropdown" class="sizes-select">{{ this.selectedMonth }}</div>
              <div v-show="monthDropdownOpen" class="sizes">
                <ul>
                  <li v-for="month in range(1, 12)" :key="month" v-on:click="this.localBirthMonth = month">{{ month }}</li>
                </ul>
              </div>
              <div v-on:click="dayDropdown" class="sizes-select">{{ this.selectedDay }}</div>
              <div v-show="dayDropdownOpen" class="sizes">
                <ul>
                  <li v-for="day in daysInMonth(this.localBirthMonth, this.localBirthYear)" :key="day" v-on:click="this.localBirthDay = day">{{ day }}</li>
                </ul>
              </div>
            </div> -->
          </div>
          <div class="checkout-button" v-on:click="signUp">
            <p class="checkout-button-text"><b>SIGN UP</b></p>
          </div>
        </div>
        <div v-else-if="currentCheckoutStep === 'SHIPPING_STEP'">
          <h3 class="checkout-content-subheader">SHIPPING ADDRESS</h3>
          <p>ORDERS PLACED ON THIS SITE CAN ONLY BE DELIVERED IN THE UNITED STATES.</p><br>
          <p>UPS CANNOT DELIVER TO P.O. BOXES OR TO GENERAL DELIVERY</p><br><br>
          <div class="shipping-info">
            <b>ADDRESS - LINE 1 *</b><br><input type="text" class="checkout-content-input" placeholder="Street Address" v-model="address">
            <b>ADDRESS - LINE 2</b><br><input type="text" class="checkout-content-input" placeholder="Unit # (optional)" v-model="address2">
            <b>CITY *</b><br><input type="text" class="checkout-content-input" placeholder="City" v-model="city">
            <b>STATE *</b><br><input type="text" class="checkout-content-input" placeholder="State" v-model="stateAddress">
            <b>ZIP *</b><br><input type="text" class="checkout-content-input" placeholder="Zip" v-model="zip">
          </div>
          <div class="checkout-button" v-on:click="saveShippingInfo">
            <p class="checkout-button-text"><b>SAVE SHIPPING INFO</b></p>
          </div>
        </div>
        <div v-show="currentCheckoutStep === 'PAYMENT_STEP'">
          <h3 class="checkout-content-subheader">PAYMENT</h3>
          <p>PLEASE NOTE THAT PRE-ORDER PURCHASES CAN ONLY BE PAID FOR BY CREDIT CARD.</p><br>
          <p><b>PAYMENT DETAILS</b></p><br>
          <p>YOU ARE MAKING YOUR PURCHASE ON A SECURE SERVER</p><br><br>
          <div class="stripe">
            <div class="cc-field">
              <b>FIRST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="First name" v-model="stripeInfo.firstName" />
              <b>LAST NAME *</b><br><input type="text" class="checkout-content-input" placeholder="Last name" v-model="stripeInfo.lastName" />
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
                <p class="checkout-button-text"><b>SAVE PAYMENT INFO</b></p>
              </div>
            </form>
            <hr><br>
            <p><b>RETURN POLICY</b></p><br>
            <p>RETURNS SERVICE: YOU HAVE 30 DAYS FROM DELIVERY TO FOLLOW OUR QUICK AND EASY RETURN PROCEDURE.
            PLEASE NOTE THAT PRODUCTS PURCHASED ON SALE ARE NOT RETURNABLE.</p>
          </div>
        </div>   
        <div v-show="currentCheckoutStep === 'REVIEW_STEP'">
          <h3 class="checkout-content-subheader">REVIEW</h3>
          <div>
            <h4 class="checkout-content-subheader">SHIPPING</h4>
            <div class="shipping-subheader">ADDRESS</div>
            <div class="modify-button">
              <p><u>MODIFY</u></p>
            </div><br>
            <label for="shippingAddress">{{ this.address }}</label><br>
            <label v-if="address2" for="shippingAddress2">{{ this.address2 }}</label><br>
            <label for="shippingCity">{{ this.city }}</label><br>
            <label for="shippingState">{{ this.stateAddress }}</label><br>
            <label for="shippingZip">{{ this.zip }}</label><br>
          </div>
          <div>
            <h4 class="checkout-content-subheader">PAYMENT</h4>
          </div>
          <div class="checkout-button" v-on:click="submitOrder">
            <p class="checkout-button-text"><b>SUBMIT ORDER</b></p>
          </div>
          <hr><br>
          <p><b>RETURN POLICY</b></p><br>
          <p>RETURNS SERVICE: YOU HAVE 30 DAYS FROM DELIVERY TO FOLLOW OUR QUICK AND EASY RETURN PROCEDURE.
          PLEASE NOTE THAT PRODUCTS PURCHASED ON SALE ARE NOT RETURNABLE.</p>
        </div>
        <div v-show="currentCheckoutStep === 'COMPLETED_STEP'">
          <h3>CONGRATULATIONS!</h3>
          <p>ORDER COMPLETE</p>
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
    console.log(helperMethods)
  },
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
      localCard: undefined,
      localStripe: undefined,
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      selectedMonth: 'MONTH',
      selectedYear: 'YEAR',
      selectedDay: 'DAY',
      dayDropdownOpen: false,
      monthDropdownOpen: false,
      yearDropdownOpen: false,
    }
  },
  watch: {
    currentCheckoutStep(view) {
      if (view === 'PAYMENT_STEP' && !this.cardStuffInitialized) {
        this.cardStuffInitialized = true
          // Create a Stripe client.
        this.localStripe = Stripe('pk_test_vosa23qHDTzgpr2tENv03qLC');

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
        this.localCard = elements.create('card', {style: style});

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
      currentCheckoutStep: state => state.cart.currentCheckoutStep,
      birthDay: state => state.customer.user.birthDay,
      birthMonth: state => state.customer.user.birthMonth,
      birthYear: state => state.customer.user.birthYear,
      order: state => state.customer.order,
      signUpEmailState: state => state.customer.user.signUpEmail,
      signUpPasswordState: state => state.customer.user.signUpPassword
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
      setAddress: 'SET_CUSTOMER_ADDRESS',
      setAddress2: 'SET_CUSTOMER_ADDRESS_2',
      setCity: 'SET_CUSTOMER_CITY',
      setState: 'SET_CUSTOMER_STATE',
      setZip: 'SET_CUSTOMER_ZIP',
      saveShipping: 'SAVE_CUSTOMER_SHIPPING',
      setCurrentCheckoutStep: 'SET_CHECKOUT_STEP',
      setToken: 'SET_CUSTOMER_TOKEN',
      submit: 'SUBMIT_ORDER',
      setSignUpEmail: 'SET_SIGNUP_EMAIL',
      setSignUpPassword: 'SET_SIGNUP_PASSWORD'
    }),
    submitOrder() {
      this.submit()
    },
    savePayment(event) {
      event.preventDefault();
      const self = this
      this.setLoading(true)

      // set name on card
      try {
        this.localCard.token.card.name = `${this.firstName} ${this.lastName}`
      } catch (e) {
        console.log(e)
        // dont do anything, dont care
      }
      console.log('current card', this.localCard)

      this.localStripe.createToken(this.localCard).then(function(result) {
        console.log(result)
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          self.setToken(result.token)
        }
      });
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
    saveShippingInfo() {
      if (this.email && this.address && this.city && this.stateAddress && this.zip) {
        this.saveShipping({ email: this.email, address: this.address, address2: this.address2, city: this.city, state: this.stateAddress, zip: this.zip, selectedProducts: this.selectedProducts, name: `${this.firstName} ${this.lastName}` })
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

@media all and (min-width: 850px) {
  .shipping-subheader {
    float: left;
    width: 100px;
  }

  .modify-button {
    width: 100px;
    float: right;
  }

  .checkout {
    min-height: 100vh;
    padding-left: 220px;
    padding-top: 80px;
  }

  .checkout-button {
    width: 100%;
    cursor: pointer;
    background-color: black;
    color: white;
    text-align: center;
    height: 25px;
    margin: 26px 0 26px 0;
  }

  .checkout-button-text {
    padding-top: 4px;
  }

  .checkout > .checkout-grid > .bag {
    grid-column: 3 / 5;
    grid-row: 2 / 5;
    border: solid rgb(230, 226, 226) 1px;
    padding: 30px;
  }

  .checkout > .checkout-grid > .checkout-content {
    grid-column: 1 / 3;
    grid-row: 2 / 10;
    border: solid rgb(230, 226, 226) 1px;
    padding: 30px;
  }

  .checkout-content-input {
    width: 100%;
    height: 25px;
    padding: 5px;
    margin: 5px 0 5px 0;
    border: 1px solid black;
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

  .sizes > ul > li:hover {
    background-color: black;
    color: white;
  }

  .dateOfBirth {
    display: inline-block;
  }
}

</style>

