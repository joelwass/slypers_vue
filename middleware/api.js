const axios = require('axios')
let endpoint = process.env.NODE_ENV === 'production' ? 'https://slypers-production-node.herokuapp.com/api/v1' : 'http://localhost:3001/api/v1'
if (process.env.NODE_ENV === 'staging') endpoint = 'https://slypers-staging-node.herokuapp.com/api/v1'
import helper from '../helpers/methods'

const headers = { 'Content-Type': 'application/json' }

class API {
  constructor() {
    try {
      if (helper.getCookie('auth')) {
        this.setAuthToken(helper.getCookie('auth'))
      } else {
        this.authenticate()
      }
    } catch (e) {
      console.log(e)
    }
  }

  getAllProducts() {
    new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: { 'Auth': helper.getCookie('auth') },
        url: `${endpoint}/product`
      };
      axios(options)
      .then(res => resolve(res))
      .catch(err => {
        console.log(err.response)
        // if we're unauthorized, auth and retry
        if (err.response.status == '401') {
          this.authenticate().then(authRes => axios(options))
          .catch(err => {
            return reject(err)
          })
        }
        reject(err)
      })
    })
  }

  setAuthToken (authToken) {
    this.authToken = authToken
    headers['Auth'] = authToken
  }

  authenticate() { 
    console.log('authing')
    return new Promise((resolve, reject) => {
      axios.post(`${endpoint}/auth`)
      .then(data => {
        const auth = data.data.sessionId
        console.log(auth)
        helper.setCookie('auth', auth, 1)
        this.setAuthToken(auth)
        return resolve(auth)
      })
      .catch(err => reject(err))
    })
  }

  signUpForEmails () { 
    return new Promise((resolve, reject) => {
      axios.post(`${endpoint}/signUpForEmails`)
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  }

  login (body) {
    console.log(body)
    const options = {
      method: 'POST',
      headers,
      data: body,
      url: `${endpoint}/customer/ux/login`
    }
    return axios(options)
      .then(res => {
        if (res.data.success) this.setAuthToken(res.data.sessionId)
        return res.data
      })
      .catch(err => err)
  }

  pay (data) {
    console.log(data.token)
    const options = {
      method: 'POST',
      headers,
      data: {
        source: data.token
      },
      url: `${endpoint}/stripe/orders/${data.orderId}/pay`
    }
    return axios(options)
      .then(res => {
        if (res.data.success) this.setAuthToken(res.data.sessionId)
        return res.data
      })
      .catch(err => err)
  }

  createNewUser (body) {
    const options = {
      method: 'POST',
      headers,
      data: body,
      url: `${endpoint}/customer`
    }
    return axios(options)
      .then(res => {
        console.log('res from create customer', res)
        if (res.data.success) this.setAuthToken(res.data.sessionId)
        return res.data
      })
      .catch(err => err)
  }

  saveShipping (body) {
    console.log(headers)
    const options = {
      method: 'PUT',
      headers,
      data: body,
      url: `${endpoint}/customer`
    }
    return axios(options)
      .then(res => {
        if (res.data.success) this.setAuthToken(res.data.sessionId)
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        // if we're unauthorized, auth and retry
        if (err.response.status == '401') {
          this.authenticate().then(authRes => axios(options))
          .catch(err => {
            return err
          })
        }
        return err
      })
  }

  getConfig () {
    return axios(`${endpoint}/config`)
      .then(res => res.data)
      .catch(err => err)
  }

  stripeTokenHandler (token) {
    return axios(`${endpoint}/stripe/token`)
  }

  createStripeOrder (data) {
    const options = {
      method: 'POST',
      headers,
      data,
      url: `${endpoint}/stripe/orders`
    }
    return axios(options)
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        // if we're unauthorized, auth and retry
        if (err.response.status == '401') {
          this.authenticate().then(authRes => axios(options))
          .catch(err => {
            return err
          })
        }
        return err
      })
  }

  getStripeProducts () {
    const options = {
      method: 'GET',
      headers,
      url: `${endpoint}/stripe/products`
    }
    return axios(options)
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        // if we're unauthorized, auth and retry
        if (err.response.status == '401') {
          this.authenticate().then(authRes => axios(options))
          .catch(err => {
            return err
          })
        }
        return err
      })
  }

  makeRequest (suffix) {
    return axios(`${endpoint}suffix`)
  }
}

export default new API()