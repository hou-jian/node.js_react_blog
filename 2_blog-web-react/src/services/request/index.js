import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

// 如果项目中需要请求多个服务器，多创建几个实例即可。
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})


class HjRequest {
  constructor(instance) {
    this.instance = instance
    this.interceptors()
  }
  interceptors() {
    const instance = this.instance
    // 实例请求拦截器
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
    // 实例响应拦截器
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      // 超出200的状态码会在这里执行
      // TODO:根据状态码设置 message
      return Promise.reject({
        data: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
    })
  }
  request(config) {
    return this.instance.request(config)
  }
  get(url, config) {
    return this.request({ ...config, url, method: 'get' })
  }
  post(url, config) {
    return this.request({ ...config, url, method: 'post' })
  }
  delete(url, config) {
    return this.request({ ...config, url, method: 'delete' })
  }
  put(url, config) {
    return this.request({ ...config, url, method: 'put' })
  }
}

const hjRequest = new HjRequest(instance)

export default hjRequest