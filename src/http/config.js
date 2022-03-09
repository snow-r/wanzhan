// 封装axios
import axios from 'axios'
// import qs from 'qs'
import { API_BASE_PATH } from '@/utils/app-config'
var showLoginMessageBox = false
const axiosChromeMessagingAdapter = require('axios')
// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_PATH, // api 的 base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
api.interceptors.request.use(config => {
  let flag = config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/json') !== -1
  if (!flag) {
    let mult = config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('multipart/form-data') !== -1
    if (mult) {
      config.data = config.data
    } else {
      config.data = config.data
    }
    if (uni.getStorageSync('token')) {
      config.headers['Authorization']= `Bearer ${uni.getStorageSync('token')}`
    }
  }
  
  return config
},
error => {
  // Do something with request error
  return Promise.reject(error)
})
axios.defaults.adapter = function (config) {  
    return new Promise((resolve, reject) => {  
        var settle = require('axios/lib/core/settle');  
        var buildURL = require('axios/lib/helpers/buildURL');  
        uni.request({  
            method: config.method.toUpperCase(),  
            url: buildURL(API_BASE_PATH + config.url, config.params, config.paramsSerializer),  
            header: config.headers,  
            data: config.data,  
            dataType: config.dataType,  
            responseType: config.responseType,  
            sslVerify: config.sslVerify,
            complete:function complete(response){  
                response = {  
                  data: response.data,  
                  status: response.statusCode,  
                  errMsg: response.errMsg,  
                  header: response.header,  
                  config: config  
                };  

            settle(resolve, reject, response);  
            }  
        })  
    })  
} 
// response 拦截器
api.interceptors.response.use(
  response => {
    console.log(response)
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (!res) {
      uni.hideLoading()
      uni.showToast({
        title: '服务异常',
        icon: 'none'
      })
      return
    }
    if (response.status === 200 && response.config.responseType === 'blob') { // 文件类型特殊处理
      return response
    } else if (Number(res.code) !== 0 && Number(res.code) !== 1 && Number(res.code) !== 10001) {
      /**
       *401登录已失效
       */
      if (res.code === 401) {
        if (!showLoginMessageBox) {
          showLoginMessageBox = true
          uni.showModal({
            title: '提示',
            content: '请授权登录之后再进行查看',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                uni.reLaunch({ url: '/pages/login/login' })
                showLoginMessageBox = false
              }
            }
          })
        }
      } else if (res.code == 2) {

      } else {
        // if (res.msg) {
        //   uni.showToast({
        //     title: res.msg,
        //     icon:'none'
        //   })
        // }
      }
      return Promise.resolve(res)
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    uni.showToast({
      title: '网络请求失败，请稍候再试',
      icon: 'none'
    })
    return Promise.reject(error)
  }
)

export default api
