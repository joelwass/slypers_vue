const axios = require('axios')
let endpoint = process.env.NODE_ENV === 'production' ? 'https://slypers-production-node.herokuapp.com/api/v1' : 'http://localhost:3001/api/v1'
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

  getDiscount(body) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: { 'Auth': helper.getCookie('auth') },
        data: body,
        url: `${endpoint}/discount`,
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
    return new Promise((resolve, reject) => {
      axios.post(`${endpoint}/auth`)
      .then(data => {
        const auth = data.data.sessionId
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
    const options = {
      method: 'POST',
      headers,
      data: body,
      url: `${endpoint}/customer/ux/login`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => err)
  }

  pay (data) {
    const options = {
      method: 'POST',
      headers,
      data: {
        source: data.token,
        metadata: {
          email: data.email,
          subtotal: data.subtotal,
          products: JSON.stringify(data.products),
          firstName: data.firstName,
          lastName: data.lastName,
          cardType: data.token && data.token.card && data.token.card.brand,
          lastFour: data.token && data.token.card && data.token.card.last4,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country || 'USA',
          couponId: data.couponId
        }
      },
      url: `${endpoint}/pay`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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

  createNewUser (body) {
    const options = {
      method: 'POST',
      headers,
      data: body,
      url: `${endpoint}/customer`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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

  createNewGuest (body) {
    const options = {
      method: 'POST',
      headers,
      data: body,
      url: `${endpoint}/guest`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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

  saveShipping (body) {
    const isGuest = body.isGuest
    let urlEndpoint
    if (isGuest) {
      urlEndpoint = `${endpoint}/guest`
    } else {
      urlEndpoint = `${endpoint}/customer`
    }
    delete body.isGuest
    const options = {
      method: 'PUT',
      headers,
      data: body,
      url: urlEndpoint
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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

  // grab the selected products and selected browsing product
  resume() {
    const options = {
      method: 'GET',
      headers,
      url: `${endpoint}/resume`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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

  saveDynamicState (data) {
    const options = {
      method: 'POST',
      headers,
      data,
      url: `${endpoint}/save`
    }
    return axios(options)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err.response)
        if (!err.response) return { message: 'Uh oh! something went wrong. please try again.' }
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