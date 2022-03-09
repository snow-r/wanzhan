<template>
  <view class="boxContainer">
    <button
      class="btnWrap"
      @touchstart="touchStart"
      @touchend="touchEnd"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      <image src="@/static/images/wechat.png" mode="widthFix" />
      <text>微信授权登录</text>
    </button>

    <view class="noshouquan" @click="noLogin">暂不授权</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      touchStartTime: 0,
      touchEndTime: 0,
      lastTapTime: 0,
      submit: true,
      code: "",
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      uni.login({
        success: (res) => {
          //  console.log(res.code)//返回code码
          // this.code = res.code;
          console.log("code", this.code);
          // return res.code;
        },
      });
    },
    numberLogin() {
      this.$emit("changLoginType", 2);
    },
    touchStart(e) {
      console.log(e);
      this.touchStartTime = e.timeStamp;
    },
    touchEnd(e) {
      console.log(e);
      this.touchEndTime = e.timeStamp;
    },
    crossLogin() {
      // uni.setStorageSync('isLogin', true)
      uni.navigateBack();
    },
    
    getPhoneNumber(e) {
      if (this.touchEndTime - this.touchStartTime < 350) {
        // 当前点击的时间
        var currentTime = e.timeStamp;
        var lastTapTime = this.lastTapTime;
        // 更新最后一次点击时间
        this.lastTapTime = currentTime;
        // 如果两次点击时间在300毫秒内，则认为是双击事件
        if (currentTime - lastTapTime > 300) {
          console.log("submit");
          if (this.submit) {
            this.submit = false;

            // console.log(e)
            if (e.detail.errMsg == "getPhoneNumber:ok") {
              let that = this;
              uni.login({
                success: (res) => {
                  console.log("code", this.code);
                  let sendData = {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    code: res.code,
                  };
                  that.$api.getUserMsg(sendData).then((res) => {
                    if (res.code == 200) {
                      console.log(res, "56565656");

                      uni.setStorageSync("isPop", true);
                      uni.setStorageSync("userId", res.data.id);
                      uni.setStorageSync("phone", res.data.phoneNumber);
                      uni.setStorageSync("token", res.data.token);
                      that.submit = true;
                      uni.showToast({
                        title: "登录成功",
                        duration: 1500,
                      });
                      uni.reLaunch({
                               url: "/pages/login/shouquan",
                             });
                      that.submit = true;
                    } else {
                      uni.setStorageSync("isPop", false);
                    }
                  });
                },
              });
            }
          }
        }
      }
    },
    noLogin() {
      uni.setStorageSync("isLogin", true);
      uni.navigateTo({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.boxContainer {
  width: 100%;
  padding-top: 80upx;
  .noshouquan {
    text-align: center;
    font-size: 30upx;
    color: #686868;
  }
  .btnWrap {
    outline: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 34upx;
    height: 100upx;
    width: 430upx;
    color: #fff;
    border-radius: 68upx;
    font-weight: normal;
    justify-content: center;
    background: linear-gradient(115deg, #f48a3b 0%, #ff984c 100%);
    box-shadow: 0px 8px 18px 0px rgba(154, 74, 14, 0.25);
    image {
      width: 40upx;
      height: 40upx;
      margin-right: 26upx;
    }
  }
  .btnWrap:first-child {
    margin-bottom: 64upx;
  }
  .crossLogin {
    font-size: 24upx;
    color: #999999;
    margin-top: 80upx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 24upx;
      height: 24upx;
      position: relative;
      top: 2upx;
    }
  }
}
button::after {
  border: none;
}
</style>
