import Vue from 'vue'
import App from './App'
import Api from '@/http/api'
import Comfun from '@/utils/comfun'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'
uni.getSystemInfo({
  success: res => {
    console.log(res)
    var navHeight = res.statusBarHeight + 46
    var topHeight = res.statusBarHeight + 4; // if (res.platform.toLowerCase() == 'android') {
    //   topHeight += 4;
    // }

    uni.setStorageSync('navHeight', navHeight);
    uni.setStorageSync('topHeight', topHeight);
    if (res.model.indexOf('iPhone X') >= 0 || res.model.indexOf('iPhone XR') >= 0 || res.model.indexOf('iPhone XS Max') >= 0 || res.model.indexOf('iPhone 11') >= 0 || res.model.indexOf('iPhone 11 Pro') >= 0 || res.model.indexOf('iPhone 11 Pro Max') >= 0|| res.model.indexOf('iPhone 12') >= 0|| res.model.indexOf('iPhone 12 Pro') >= 0|| res.model.indexOf('iPhone 12 Pro Max') >= 0|| res.model.indexOf('iPhone 12') >= 0|| res.model.indexOf('iPhone 13 Pro') >= 0|| res.model.indexOf('iPhone 13 Pro Max') >= 0)  {
      Vue.prototype.$isIpx = true
    } else {
      Vue.prototype.$isIpx = false
    }
  }
})
uni.getProvider({
  service: 'oauth',
  success: res =>{
    console.log(res)
    if (res.errMsg == 'getProvider:ok') {
      uni.setStorageSync('provider', res.provider[0])
    }
  },
  fail: res => {
    console.log(res)
  }
})
Vue.prototype.$api = Api
Vue.prototype.$comfun = Comfun
Vue.prototype.$noMultipleClicks = Comfun.noMultipleClicks;
Vue.prototype.$store = store //把vuex定义成全局组件

const app = new Vue({
  ...App,
  store
})
app.$mount()
