<template>
  <footer class="footer_basic">
    <div class="email_collection">
      <form v-if="stateEmail === ''" class="email-collection-form">
        <input type="text" placeholder="Keep in touch" class="sign-up-email-input" v-model="email">
        <div class="sign-up-button" v-on:click="subscribeForEmail">
          <p>Sign Up</p>
        </div>
      </form>
      <div v-else class="email-collection-form">
        <p class="signed-up-email">{{ currentEmail }}, you're subscribed</p>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  mapActions,
  mapState
} from 'Vuex'
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
      stateEmail: state => state.customer.contact.email
    }),
    currentEmail: {
      get() {
        return this.email || this.stateEmail
      },
      set(newVal) {
        console.log(newVal)
        this.email = newVal
      }
    }
  }
}
</script>

<style>
.email-collection-form {
  display: inline-block;
  margin-top: 10px;
}

.signed-up-email {
  color: white;
}

.sign-up-email-input {
  width: 140px;
  margin: 10px 10px 0 10px;
  border: none;
  float: left;
  padding-top: 3px;
  padding-bottom: 2px;
  padding-left:3px;
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
    width: 60px;
    padding-top: 2px;
    padding-bottom: 1px;
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

  .email_collection {
    display: inline-block;
  }
}
</style>

