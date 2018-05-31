const axios = require('axios')
const endpoint = 'http://localhost:3001/api/v1'
import helper from '../helpers/methods'

const api = {
  getAllProducts: () => new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: { 'Auth': helper.getCookie('auth') },
      url: endpoint + '/product'
    };
    axios(options)
    .then(res => resolve(res))
    .catch(err => {
      console.log(err.response)
      // if we're unauthorized, auth and retry
      if (err.response.status == '401') {
        api.authenticate().then(authRes => {
          helper.setCookie('auth', authRes.data.sessionId, 1)
          return axios(options)
        }).catch(err => {
          return reject(err)
        })
      }
      reject(err)
    })
  }),

  authenticate: () => new Promise((resolve, reject) => {
    axios.post(endpoint + '/auth')
    .then(auth => resolve(auth))
    .catch(err => reject(err))
  })
}

export default api