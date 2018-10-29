<template>
  <footer class="footer_basic">
    <div class="email_collection">
      <form v-if="!currentEmail || currentEmail == ''" class="email-collection-form">
        <p class="email_collection__header">Hear about new releases.</p>
        <input type="text" placeholder="Your E-Mail" class="sign-up-email-input" v-model="email">
        <div class="sign-up-button" v-on:click="subscribeForEmail">
          <p>ENTER</p>
        </div>
      </form>
      <div v-else class="email-collection-form">
        <p class="signed-up-email">{{ currentEmail && currentEmail.toUpperCase() }}, You're in the know.</p>
      </div>
      <div class="email_collection__footer">
        <p>XXX</p>
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
  width: 250px;
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

.sign-up-email-input::placeholder {
  font-family: 'OverpassMono-Regular', monospace;
}

.email_collection__footer {
  margin-top: 15px;
  font-size: 16px;
  color: white;
}

.email_collection {
  text-align:center;
  display: block;
  margin: auto;
}

.sign-up-button {
    background: grey;
    color: white;
    float: left;
    border: none;
    width: 150px;
    padding-top: 2px;
    padding-bottom: 3px;
    margin: 10px 10px 0 10px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.footer_basic {
  display:inherit;
  background-color: black;
  width: 100%;
  padding-top: 20px;
  height: 125px;
} 

@media all and (min-width: 640px) {
  .footer_basic {
    display:inherit;
    background-color: black;
    width: 100%;
    padding-top: 20px;
    height: 125px;
  } 

  .sign-up-email-input {
    width: 320px;
    margin: 10px 10px 0 10px;
    border: none;
    float: left;
    padding-top: 3px;
    padding-bottom: 4px;
    padding-left:6px;
  }
}
</style>

