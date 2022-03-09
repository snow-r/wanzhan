<template>
  <view>
    <!-- <view> -->
      <scroll-view scroll-y class="pageContainer">
        <view class="loginWx">
            <view class="kuang">
                <image src="http://www.mingtongxa.com/wanzhuan/loginbkg.png" mode="widthFix" />
                
            </view>
            <view class="shouquan">
              <view style="color:#000;font-size: 40upx;font-weight:bold">代金券</view>
          <view style="color:#010101;font-size: 26upx;">为了更好的体验</view>
          <view style="color:#999999;font-size: 26upx;padding-top:40upx">需要获取您的信息</view>
          <button class="btnWrap" @click="getUserInfo">
            <text>同意授权</text>
          </button>
          <button
            class="btnWraps"
            open-type="getUserInfo"
            @getuserinfo="onAuth"
            style="padding-top:40upx;font-size:26upx;color:#666"
          >
            暂不授权
          </button>
        </view>
        </view>
        
      </scroll-view>
    <!-- </view> -->
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import { constants } from 'zlib';
export default {
  components: {
    TopBar,
  },
  data() {
    return {};
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  onLoad() {},
  methods: {
    getUserInfo(e) {
      let that = this;
      //       if( this.canIUseProfile == false ){

      //     //获取授权信息

      // }else{
      wx.getUserProfile({
        desc: "用于完善用户资料",
        lang: "zh_CN",
        success: function(ress) {
          console.log(ress,'555')
          let userInfo = ress.userInfo
          let sendData = {
          avatar:userInfo.avatarUrl,
          nickName:userInfo.nickName
        }
        uni.showLoading();
        that.$api.setUserMsg(sendData).then((tag) => {
          uni.hideLoading()
          if(tag.code == 200){
            
          }
        })
          uni.setStorageSync("avatar", userInfo.avatarUrl);
          uni.setStorageSync("nickName", userInfo.nickName);
          uni.setStorageSync("gender", userInfo.gender);
          uni.reLaunch({ 
            url: '/pages/index/index'
          })
          
          // uni.login({
          //   success: (res) => {
          //     console.log("code", res.code);
          //     let data = {
          //       encryptedData: ress.encryptedData,
          //       iv: ress.iv,
          //       code: res.code,
          //     };
          //     that.$api.getUserOrl(data).then((res) => {
          //       if (res.code == 200) {
          //         console.log(res.data, "55556666");
          //         uni.setStorageSync("userId", res.data.id);
          //         uni.setStorageSync("avatar", res.data.avatar);
          //         uni.setStorageSync("accessToken", res.data.token);
          //         uni.setStorageSync("nickName", res.data.nickName);
          //         uni.navigateTo({
          //           url: "/pages/index/index",
          //         });
          //       }
          //     });
          //   },
          //   fail: () => {},
          // });
        },
      });

      console.log(11111111);
      console.log(e);
    },
    onAuth(e) {
      var that = this;
      console.log(e, "22222222");
      if (e.detail.userInfo) {
        console.log("用户允许了授权");
        console.log(e.detail.userInfo); //1.拿到基本的微信信息!!
        let data = {
          avatar:e.detail.userInfo.avatarUrl,
          nickName:e.detail.userInfo.nickName
        }
        that.$api.setUserMsg(sendData).then((tag) => {
          console.log(res,'999')
        })
        uni.setStorageSync("avatar", e.detail.userInfo.avatarUrl);
          uni.setStorageSync("nickName", e.detail.userInfo.nickName);
          uni.setStorageSync("gender", e.detail.userInfo.gender);

          uni.reLaunch({ url: '/pages/index/index' })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: linear-gradient(#fbc69b 0%, #d65239 100%) !important;
  width: 100%;
  height: 100vh;
  button::after {
    border: none;
  }
  .loginWx{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    image{
      position: absolute;
      width: 100%;
      height: 100% !important;
    }
    .kuang{
      position: absolute;
      top: 20%;
      width: 90%;
      margin: 0 5%;
      height: 850upx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .normal{
      position: absolute;
      width: 70%;
      margin: 0 15%;
      top: 460upx;
    }
  }
  .btnWrap {
    background: linear-gradient(-45deg, #ff2e00, #da5f44);
    margin-top: 40upx;
    outline: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 36upx;
    height: 105upx;
    width: 488upx;
    color: #333;
    border-radius: 68upx;
    font-weight: normal;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    image {
      width: 40upx;
      height: 40upx;
      margin-right: 26upx;
    }
  }
  .btnWraps {
    outline: none;
    border: none;
    padding: 0;
    background: transparent;
  }
  background: #fff;
  .shouquan {
    position: absolute;
    padding-top: 80upx;
    view {
      padding: 10upx;
    }
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    image {
      width: 169upx;
      height: 169upx !important;
    }
  }
}
</style>
