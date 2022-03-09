import { UPLOAD_IMG_URL,UPLOAD_VIDEO_URL } from './app-config'
const QQMapWX = require("@/utils/bmap-wx.js");
import Citylist from '@/static/js/citylistData.json'
var qqmapsdk


function Toast (title, icon) {
  if (!icon) icon = ''
  uni.showToast({
    duration: 1500,
    title,
    icon
  })
}
function checkLoginAndState () {
  if (uni.getStorageSync('userInfo')) {
    let userState = uni.getStorageSync('userInfo').userState;
    return {
      isLogin: true,
      isPass: userState === 1,
      message: '你的账号审核未通过，请完善资料等待审核!'
    };
  } else {
    return {
      isLogin: false,
      isPass: false,
      message: '请先注册并登录!'
    };
  }
}

function userLogin (callBack) {
  if (uni.getStorageSync('userId')) {
    if (callBack) callBack()
  } else {
    uni.showModal({
      title: '提示',
      content: '您没有登录，点击确认前往登录',
      success: res => {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
}

/**
 * 根据城市返回区列表
 */
function areaList () {
  var cities = Citylist
  var currentCity = uni.getStorageSync('location')
  for (var item of cities) {
    for (var city of item.cities) {
      if (currentCity == city.name) {
        return city.dis
      }
    }
  }
}
/**
 * 检查用户是否登录
 */
function checkUserIsLogin (callBack) {
  if (uni.getStorageSync('userInfo')) {
    if (callBack) callBack()
  } else {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }
}
/**
 * 用户分享操作
 * id：用户id
 * type：1-文章，2-房源
 */
function userDoShare (context, type) {
  var sendData = {
    userId: uni.getStorageSync('userInfo').userId,
    type
  }
  context.$api.userShare(sendData)
}
/**
 * 绑定分享人
 * id：当前用户id
 */
function bindUserForShareUser (context, id) {
  if (!id) id = uni.getStorageSync('userInfo').userId
  var sendData = {
    userId: id,
    refereeUserId: uni.getStorageSync('inviteUserId')
  }
  context.$api.bindUser(sendData)
}

/**
 * 获取用户定位
 */
function getUserCity (callBack) {
  if (uni.getStorageSync('longitude')) {
    if (callBack) callBack()
  } else {
    uni.getLocation({
      success: (res) => {
        console.log(res);
        uni.setStorageSync("latitude", res.latitude);
        uni.setStorageSync("longitude", res.longitude);
        if ((res.errMsg = "getLocation:ok")) {
          qqmapsdk = new QQMapWX.BMapWX({
            ak: "o9FZ3zhus8bwG08ros15iWXqehXp7zAE", //这里自己的key秘钥进行填充
          });
          qqmapsdk.regeocoding({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: function (res) {
              let province = res.originalData.result.addressComponent.province;
                let city = res.originalData.result.addressComponent.city;
                let district = res.originalData.result.addressComponent.district;
                let street = res.originalData.result.addressComponent.street;
                uni.setStorageSync("location", city);
                uni.setStorageSync("province", province);
                uni.setStorageSync("district", district);
                uni.setStorageSync("street", street);
              Citylist.map(item=>{
                item.cities.map(items=>{
                  if(items.name == city){
                    uni.setStorageSync('quhao', items.id)
                  }
                })
                
              })
               
              if (callBack) callBack()
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
            },
          });
        }
      },
    });
  }
}
/**
 * 根据坐标获取城市
 */
function getCityByLat (data) {
  return new Promise((resolve, reject) => {
    qqmapsdk = new QQMapWX({
      ak: "VYvBPWquYEnWEnGnBogareh9ECBoOaYQ", //这里自己的key秘钥进行填充
    });
    qqmapsdk.regeocoding({
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      success: function (res) {
        let city = res.result.ad_info.city;
        resolve(city)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
      },
    });
  })
}
// 获取最近的年、月、日、时、分的集合
function getPickerViewList () {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const yearList = [];
  const monthLsit = [];
  const dayList = getDayList(year, month);
  const hourList = [];
  const minuteList = [];
  var h = now.getHours();
  var m = now.getMinutes();

  //当前时间往后
  for (let i = year; i <= 2070; i++) {
    yearList.push(i + "年");
}
for (let i = month; i <= 12; i++) {
    monthLsit.push(i + "月");
}

for (let i = h; i <= 23; i++) {
    hourList.push(i + "点");
}
for (let i = m; i <= 59; i++) {
    minuteList.push(i + "分");
}
  return { yearList, monthLsit, dayList, hourList, minuteList };
};

//根据时间2019-01-02 09：12  得到 ['2019','1','2','9','12']
function getArrWithTime (str)  {
  let arr1 = str.split(' ');
  let arr2 = (arr1[0]).split('-');
  let arr3 = arr1[1].split(':');
  let arr = arr2.concat(arr3);
  arr[1] = arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1];
  arr[2] = arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2];
  arr[3] = arr[3].startsWith('0') ? arr[3].substr(1, arr[3].length) : arr[3];
  arr[4] = arr[4].startsWith('0') ? arr[4].substr(1, arr[4].length) : arr[4];
  return arr;
};
function formatDate (year, month, day, hour, minute) {
  const newmonth = addZero(month);
  const newday = addZero(day);
  const newhour = addZero(hour);
  const newminute = addZero(minute);

  return year + '-' + newmonth + '-' + newday + ' ' + newhour + ":" + newminute;
};
// 获取当前时间
function getDate (value) {
  let date = '';
  if (value) {
      date = new Date(value);
  } else {
      date = new Date();
  }
  const y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(), //获取当前小时数(0-23)
      f = date.getMinutes();
  return formatDate(y, m, d, h, f);
};
function addZero(num) {
  return Number(num) < 10 ? `0${num}` : num;
}
// 获取月份天数
function getDayList (year, month) {
  const dayList = [];
  var day = new Date().getDate()
  var d = new Date(year, month, 0);
  var now = new Date()
  var nowYear = now.getFullYear()
  var nowMonth = now.getMonth()+1
  if ((year > nowYear && month >= nowMonth) || (year = nowYear && month > nowMonth)) {
    for (let i = 1; i <= d.getDate(); i++) {
      dayList.push(i + "日");
    }
  } else {
    for (let i = day; i <= d.getDate(); i++) {
      dayList.push(i + "日");
    }
  }
  // for (let i = 1; i <= d.getDate(); i++) {
  //     dayList.push(i + "日");
  // }
  console.log(year, month)
  return dayList;
}
/**
 * 图片上传
 */
 function uploadImg (img) {
  console.log(img)
  return new Promise(function(resolve, reject) {
    uni.uploadFile({
      url: UPLOAD_IMG_URL,
      filePath: img,
      name:'file',
      header:{
        Authorization:`Bearer ${uni.getStorageSync('token')}`
      },
      success: function(res){
        // success
        resolve(res)
      },
      fail: function(res) {
        // fail
        reject(res)
      }
    })
  })
}
function uploadVideo (video) {
  console.log(video)
  return new Promise(function(resolve, reject) {
    uni.uploadFile({
      url: UPLOAD_VIDEO_URL,
      filePath: video,
      name:'file',
      header:{
        Authorization:`Bearer ${uni.getStorageSync('token')}`
      },
      success: function(res){
        // success
        resolve(res)
      },
      fail: function(res) {
        // fail
        reject(res)
      }
    })
  })
}
/**
 * 处理手机号 136****8663
 */
function handlePhone (phone) {
  var reg = /^(\d{3})\d{4}(\d{4})$/
  phone = phone.replace(reg, "$1****$2")
  return phone
}

function noMultipleClicks(methods, info) {
  // methods是点击后需要执行的函数， info是函数需要传的参数
  let that = this;
  if (that.noClick) {
      // 第一次点击
      that.noClick= false;
      if((info && info !== '') || info ==0) {
          // info是执行函数需要传的参数
          methods(info);
      } else {
          methods();
      }
      setTimeout(()=> {
          that.noClick= true;
      }, 2000)
  } else {
      //  这里是重复点击的判断
  }
}

export default {
  Toast,
  checkLoginAndState,
  userLogin,
  checkUserIsLogin,
  userDoShare,
  bindUserForShareUser,
  getUserCity,
  getArrWithTime,
  getPickerViewList,
  formatDate,
  getDate,
  getDayList,
  handlePhone,
  getCityByLat,
  areaList,
  uploadImg,
  uploadVideo,
  noMultipleClicks
}