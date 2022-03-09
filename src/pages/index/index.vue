<template>
  <view>
    <Popup
      v-if="isMask && mask && money > 0"
      type="2"
      :money="money"
      @eventClick="getListCoupon()"
      @close="closeMask()"
    ></Popup>
    <Youhui
      v-if="isYouhui"
      type="2"
      @eventClicks="youhuiLingqu()"
      @closes="closeMasks()"
    ></Youhui>
    <YouhuiH5
      v-if="isLing"
      type="2"
      @eventClicks="h5Lingqu()"
      @closes="closeMaskss()"
    ></YouhuiH5>
    <IndexPage
      v-if="currentTabIndex == 0"
      @tabChanges="func"
      :userCity="userCity"
      :videoMsg="videoMsg"
      :atticMsg="atticMsg"
      :scrollTop='scrollTop'
      :topsOll='topsOll'
      :opacity='opacity'
      :flags='flags'
      :foodLists='foodList'
      :newLists='newList'
      :nearLists='nearList'
    />
    <Service
      v-if="currentTabIndex == 1"
      :windows_height="windows_height"
      :dataArr="recommendArr"
      :playLists='playList'
      :nearLists='nearList'
    ></Service>
    <Message
      v-if="currentTabIndex == 2"
      :dataList="dataList"
      :dataListS="dataListS"
      :shopLists='shopList'
      :nearLists='nearList'
      ref="msgPage"
    ></Message>
    <Mine v-if="currentTabIndex == 3" ref="minePage"></Mine>
    <TabBar
      @tabChange="tabChange"
      :msgNum="msgNum"
      :current="currentTabIndex"
    />
  </view>
</template>

<script>
import QQMapWX from "@/utils/bmap-wx.js";
import TabBar from "@/components/tabBar.vue";
import IndexPage from "../components/Index.vue";
import Service from "../components/servie.vue";
import Message from "../components/message.vue";
import Mine from "../components/mine.vue";
import Popup from "../components/popup.vue";
import Youhui from "../components/youhuiquan.vue";
import YouhuiH5 from "../components/youhuiquan.vue";
import Dialog from "../components/dialog.vue";
import cityList from "@/static/js/citylistData.json";
import { setTimeout } from "timers";
var qqmapsdk;
export default {
  components: {
    TabBar,
    IndexPage,
    Service,
    Message,
    Mine,
    Popup,
    Youhui,
  },
  data() {
    return {
      isMask: false,
      isYouhui: false,
      isLing:false,
      mask: uni.getStorageSync("mask"),
      index: 2, //显示第几个弹窗
      money: 0, //红包金额
      userInfo: uni.getStorageSync("userId"),
      userCity: null,
      visible: true,
      userId: 0,
      latitude: 0,
      longitude: 0,
      currentTabIndex: null,
      windows_height: 0,
      recommendArr: [],
      couponId: null,
      dataList: {},
      dataListS: [],
      msgNum: 0,
      shareUserId: this.$store.state.shareUserId,
      videoMsg: {},
      atticMsg: {},
      scrollTop:0,
      topsOll:0,
      opacity:0,
      flags:false,
      flagss:false,
      flagsss:false,
      foodList:null,
      playList:[],
      shopList:[],
      newList:null,
      nearList:null
      // bannerList:[]
    };
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  onReady() {},

  onLoad(opt) {
    this.getCityHot()
    this.getNearLists()
    // if (uni.getStorageSync("userId")) {
    //   this.$api.getQuanList().then((res) => {
    //     if (res.code == 200) {
    //       this.isMask = true;
    //       this.mask = true;
    //       uni.setStorageSync("isMask", true);
    //       uni.setStorageSync("mask", true);
    //     }
    //   });
    // }
    if (opt.shareUserId) {
      this.$store.state.shareUserId = opt.shareUserId;
    }
    if (opt.myId) {
      this.$store.state.myId = opt.myId;
    }
    if (opt.composId) {
      this.$store.state.composId = opt.composId;
    }
    if (opt.ids) {
      this.$store.state.ids = opt.ids;
    }
    if (
      this.$store.state.composId != null &&
      this.$store.state.myId != null &&
      this.$store.state.ids !=null &&
      uni.getStorageSync("userId")
    ) {
      this.isCouponl()
    }
    if (opt.scene) {
      const scene = decodeURIComponent(opt.scene);
      let index = scene.lastIndexOf("\=");
      var userId;
      userId = scene.substring(index + 1, scene.length);
      this.$store.state.shareUserId = userId;
    }
    if (opt.query) {
      const copsid = decodeURIComponent(opt.query);
      let index = copsid.lastIndexOf("\=");
      var copsId;
      copsId = copsid.substring(index + 1, copsid.length);
      this.$store.state.couponId = copsId;
      this.isGetLing()
    }
    // this.getUserLocation()
    this.userCity = uni.getStorageSync("location");
    this.windows_height = uni.getSystemInfoSync().windowHeight;
    this.isLogin();
    this.getList();
    // this.getIndexLists()//////////////////////
    // this.getIndexLists()
    if (opt.idx) {
      this.currentTabIndex = Number(opt.idx);
    } else {
      this.currentTabIndex = 0;
    }
    // this.getDataList()
    // this.getShengList()
    // this.getnoList()
  },
  onShow() {
    this.getCityHot()
    this.getNearLists()
    if (
      this.$store.state.composId != null &&
      this.$store.state.myId != null &&
      this.$store.state.ids !=null &&
      uni.getStorageSync("userId")
    ) {
      this.isCouponl();
      // this.isYouhui = true;
    }
    if(this.$store.state.couponId !=null && uni.getStorageSync("userId")){
      this.isGetLing()
    }
    this.isMask = uni.getStorageSync("isMask");
    this.mask = uni.getStorageSync("mask");
    // setTimeout(()=>{
    //   this.mask = uni.getStorageSync('isMask')
    //   this.mask = uni.getStorageSync('mask')
    // },3000)
    this.getList();
    this.userCity = uni.getStorageSync("location");
    if (this.currentTabIndex == 2 && uni.getStorageSync("userId")) {
      // this.$refs.msgPage.getnoLists();
      // this.$refs.msgPage.getMsgNum();
    }
    if (this.currentTabIndex == 3) {
      this.$refs.minePage.getUser();
    }
  },
  onShareAppMessage(res) {
    var userId = uni.getStorageSync("userId");
    return {
      title: "购买代金券",
      imageUrl: "http://www.mingtongxa.com/xcx/shareOmg.png",
      path: `/pages/index/index?shareUserId=${this.userInfo}`,
    };
  },
  onShareTimeline() {
    return {
      title: "购买代金券",
    };
  },
  methods: {
    isLogin() {
      if (uni.getStorageSync("isLogin") || uni.getStorageSync("userId")) {
        return;
      } else {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      }
    },
    getNearLists() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
        classId: 1,
        x: uni.getStorageSync("longitude"),
        y: uni.getStorageSync("latitude"),
      };
      if (code) {
        this.$api.getNearList(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.nearList = res.data
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    getCityHot() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
      };
      if (code) {
        this.$api.getLanmuList(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.foodList = res.data.food;
            this.playList = res.data.play;
            this.shopList = res.data.shop;
            this.newList = res.data.new;
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    onPageScroll(e) {
       var top = e.scrollTop;
       if(top>uni.getStorageSync('scroTop')-90){
         this.flags = true
       }else{
         this.flags = false
       }
       
       if(top>uni.getStorageSync('scroTopss')){
         this.flagsss = true
       }else{
         this.flagsss = false
       }
      if (top > 400) top = 400;
      this.scrollTop = top
      
      this.opacity = top/150;
    },
    getCouponList() {
      this.$api.getQuanList().then((res) => {
        if (res.code == 200) {
          this.money = res.data.discount;
          this.couponId = res.data.id;
        }
      });
    },
    closeMask() {
      this.isMask = false;
      uni.setStorageSync("mask", false);
    },
    closeMasks() {
      this.isYouhui = false;
      this.$store.state.composId = null;
      this.$store.state.myId = null;
      this.$store.state.ids =null
    },
    closeMaskss() {
      this.isLing = false;
      this.$store.state.couponId = null;
    },
    isCouponl() {
      let sendData = {
        id: this.$store.state.ids,
        userId:this.$store.state.myId
      };
      this.$api.isGetCouPon(sendData).then((res) => {
        if (res.data == 0) {
          this.isYouhui = true;
        } else {
          this.isYouhui = false;
        }
      });
    },
    isGetLing(){
      let sendData = {
        id: this.$store.state.couponId,
      };
      
      this.$api.isH5Youhui(sendData).then((res) => {
        if (res.code == 200) {
          this.isLing = true;
        } else {
          this.isLing = false;
        }
      });
    },
    youhuiLingqu() {
      let sendData = {
        shareUserId: this.$store.state.myId,
        receiveUserId: uni.getStorageSync("userId"),
        couponId: this.$store.state.composId,
        id: this.$store.state.ids,
        receiveNickName : uni.getStorageSync("nickName")
      };
      this.$api.shareGetCoupon(sendData).then((res) => {
        uni.showLoading({
          title: "领取中",
        });
        if (res.code == 200) {
          this.$store.state.composId = null;
          this.$store.state.myId = null;
          this.$store.state.ids =null
          this.isYouhui = false;
          uni.showToast({
            title: "领取成功，请至优惠券列表查看~",
            icon: "none",
            duration: 1500,
          });
        } else {
          this.$store.state.composId = null;
          this.$store.state.myId = null;
          this.$store.state.ids =null
          this.isYouhui = false;
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    h5Lingqu(){
      let sendData = {
        id: this.$store.state.couponId
      }
      this.$api.lingCoupon(sendData).then((res) => {
        uni.showLoading({
          title: "领取中",
        });
        if (res.code == 200) {
          this.$store.state.couponId = null
          setTimeout(() => {
            uni.showToast({
              title: "领取成功-请到个人优惠券列表查看！",
              icon: "none",
              duration: 1500,
            });
          }, 1000);
        } else {
          this.$store.state.couponId = null
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    getListCoupon() {
      let sendData = {
        id: this.couponId,
      };
      uni.showLoading({
        title: "领取中",
      });
      this.$api.getNewList(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.isMask = false;
          uni.setStorageSync("isMask", false);
          uni.showToast({
            title: "领取成功-请到个人优惠券列表查看！",
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    getnoList() {
      this.$api.userMsgList().then((res) => {
        if (res.code == 200) {
          if (res.data.list.length > 0) {
            this.dataList = res.data.list[0];
            this.dataListS = res.data.list;
            let num = 0;
            res.data.list.forEach((item) => {
              if (item.hasRead == 0) {
                num += 1;
              }
            });
            this.msgNum = num;
          } else {
            this.dataList = {};
          }
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    getShengList() {
      uni.showLoading({
        mask: true,
      });
      let sendData = {
        pageNum: 1,
        pageSize: 10,
      };

      this.$api.atticList(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.atticMsg = res.data.list[0];
          uni.requestSubscribeMessage({
            tmplIds: ["60aPNS3vXXr7i371iKPpD9VBhmpyqghEx_T9Nw9SSdU"],
            success(res) {
            },
          });
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    getDataList() {
      uni.showLoading();
      this.$api.getProductList().then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.videoMsg = res.data.list[0];
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    pageTo(index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/subpages/pages/allServeIndex",
        });
      }
    },
    //获取信息
    //    getnoList() {
    //   this.$api.userMsgList().then((res) => {
    //     uni.hideLoading();
    //     if (res.code == 200) {
    //       if (res.data.list.length > 0) {
    //         this.dataList = res.data.list[0];
    //       } else {
    //         this.dataList = {};
    //       }
    //     } else {
    //       uni.showToast({
    //         title: res.msg,
    //         icon: "none",
    //         duration: 1500,
    //       });
    //     }
    //   });
    // },
    getUserLocation() {
      var _this = this;
      uni.getLocation({
        success: (res) => {
          if ((res.errMsg = "getLocation:ok")) {
            qqmapsdk = new QQMapWX.BMapWX({
              ak: "o9FZ3zhus8bwG08ros15iWXqehXp7zAE", //这里自己的key秘钥进行填充
            });
            qqmapsdk.regeocoding({
              location: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              success: function(res) {
                let province = res.result.addressComponent.province;
                let city = res.result.addressComponent.city;
                let district = res.result.addressComponent.district;
                _this.userCity = city;
                // _this.location = city;
                // uni.setStorageSync("location", city);
                // uni.setStorageSync("province", province);
                // uni.setStorageSync("district", district);
              },
              fail: function(res) {},
              complete: function(res) {},
            });
          }
        },
      });
    },

    gotoMine() {
      uni.navigateTo({
        url: "/pages/index/mine",
      });
    },
    gotoServe() {
      uni.navigateTo({
        url: "/subpages/pages/allServe",
      });
    },
    tabChange(e) {
      this.currentTabIndex = e;
    },
    func(e) {
      this.currentTabIndex = e;
    },
    isLogin() {
      if (uni.getStorageSync("userId")) {
        return;
      } else {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      }
    },

    getList() {
      // uni.showLoading();
      this.$api.getServieList().then((res) => {
        // uni.hideLoading()
        if (res.code == 200) {
          this.recommendArr = res.data;
        }
        if (res.code == 401 && this.userInfo != "") {
          uni.showModal({
            title: "提示",
            content: "您的登录信息已失效，请重新授权登录",
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                uni.reLaunch({ url: "/pages/login/login" });
              } else {
                uni.reLaunch({ url: "/pages/login/login" });
              }
            },
          });
        }
      });
    },
    sds() {
      uni.requestSubscribeMessage({
        tmplIds: ["60aPNS3vXXr7i371iKPpD9VBhmpyqghEx_T9Nw9SSdU"], //数组
        success: (res) => {
          console.log(res); //值包括'accept':同意、'reject':拒绝、'ban':后台禁用
        },
        fail: (err) => {},
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 45%;
  position: relative;
  left: 0;
  top: 0;
  image {
    width: 100%;
    height: 100%;
  }
  .outer {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .header {
    top: 0;
    width: 100%;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerLeft {
      box-sizing: border-box;
      width: 350upx;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .adderss {
        width: 180upx;
        height: 60upx;
        border-radius: 20upx;
        background: #f5f7ff;
        display: flex;
        justify-content: center;
        align-content: center;
        margin-left: 10upx;
        text {
          width: 66%;
          height: 100%;
          font-size: 24upx;
          color: #333;
          line-height: 60upx;
          padding-left: 12upx;
        }
        image {
          width: 20upx;
          height: 24upx;
          margin: 20upx 0 0 0;
          border: 0;
          border-radius: 0;
          line-height: 60upx;
        }
      }
      image {
        width: 100upx;
        height: 100upx;
        margin: 0 30upx;
        border-radius: 50%;
        border: 10upx solid #f5f7ff;
      }
    }
    .headerRight {
      width: 200rpx;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      image:nth-child(1) {
        width: 80rpx;
        height: 80rpx;
      }
      image:nth-child(2) {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
}
.content {
  width: 100%;
  height: 55%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .icon1 {
    position: absolute;
    left: 2%;
    width: 46%;
    height: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .icon1Box {
    width: 40%;
    height: 39%;
    border-radius: 50upx;
    margin: 2% 3%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 150upx;
      height: 150upx;
    }
    text {
      font-size: 26upx;
      color: #fff;
      padding-top: 25upx;
    }
  }
  .icon2 {
    position: absolute;
    left: 50%;
    width: 46%;
    height: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .icon2Box {
    width: 40%;
    height: 39%;
    border-radius: 50upx;
    margin: 2% 6%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 150upx;
      height: 150upx;
    }
    text {
      font-size: 26upx;
      color: #333;
      padding-top: 25upx;
    }
  }

  .icon3 {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 46%;
    height: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .icon3Box {
    height: 39%;
    border-radius: 50upx;
    margin: 2% 10%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 150upx;
      height: 150upx;
    }
    text {
      font-size: 26upx;
      color: #333;
      padding-top: 25upx;
    }
  }

  .icon4 {
    position: absolute;
    left: 2%;
    top: 50%;
    width: 46%;
    height: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .icon4Box {
    width: 40%;
    height: 39%;
    border-radius: 50upx;
    margin: 2% 6%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 150upx;
      height: 150upx;
    }
    text {
      font-size: 26upx;
      color: #333;
      padding-top: 25upx;
    }
  }
}
</style>
