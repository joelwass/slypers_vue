<template>
  <footer class="footer_basic">
    <div class="email_collection">
      <form v-if="!currentEmail || currentEmail == ''" class="email-collection-form">
        <p class="email_collection__header">Stay updated.</p>
        <input type="text" placeholder="Your email" class="sign-up-email-input" v-model="email">
        <div class="sign-up-button" v-on:click="subscribeForEmail">
          <p>SIGN ME UP</p>
        </div>
      </form>
      <div v-else class="email-collection-form">
        <p class="signed-up-email">{{ currentEmail && currentEmail.toUpperCase() }}, YOU'RE IN THE KNOW</p>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
import Api from '../middleware/api'

export default {
  data() {
    return {
      email: undefined
    }
  },
  methods: {
    ...mapActions({
      'setEmail': 'SET_CUSTOMER_EMAIL'
    }),
    subscribeForEmail() {
      this.setEmail(this.email)
      if (this.email) Api.signUpForEmails(this.email)
    }
  },
  computed: {
    ...mapState({
      stateEmail: state => state.customer.user.email
    }),
    currentEmail: {
      get() {
        return this.email || this.stateEmail
      },
      set(newVal) {
        this.email = newVal
      }
    }
  }
}
</script>

<style>
.email-collection-form {
  display: inline-block;
  margin-top: 4px;
}

.signed-up-email {
  color: white;
}

.email_collection__header {
  color: white;
  text-align: left;
  padding-left: 10px;
}

.sign-up-email-input {
  width: 140px;
  margin: 10px 10px 0 10px;
  border: none;
  float: left;
  padding-top: 3px;
  padding-bottom: 4px;
  padding-left:6px;
}

.sign-up-email-input:focus {
  outline: none;
}

.email_collection {
  text-align:center;
  display: block;
  margin: auto;
}

.sign-up-button {
    background: white;
    color: black;
    float: left;
    border: none;
    width: 100px;
    padding-top: 1px;
    padding-bottom: 4px;
    margin: 10px 10px 0 10px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.footer_basic {
  display:inherit;
  background-color: black;
  width: 100%;
  height: 60px;
} 

@media all and (min-width: 640px) {
  .footer_basic {
    display:inherit;
    background-color: black;
    width: 100%;
    height: 100px;
  } 
}
</style>

