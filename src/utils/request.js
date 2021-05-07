import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
  if (response.headers['content-type'] !== 'application/json') {
    return response
  }

  if (response.data) {
    switch (response.data['code']) {
      case '0000': // 成功
        return response.data['data']
      default:
        const message = response.data['message']

        return Promise.reject({ error: true, message: message || 'Error' })
    }
  }
  return response
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

export {
  service
}
