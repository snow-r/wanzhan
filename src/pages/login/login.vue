<template>
  <view>
    <!-- #ifdef APP-PLUS -->
    <TopBar
      background="transparent"
      barTitle="登录"
      :back="canBack"
      backType="black"
    />
     <!-- #endif -->
    <scroll-view scroll-y :class="isIpx ? 'xPage' : 'normalPage'">
      <view class="pageContainer">
        <!-- #ifdef MP-WEIXIN -->
        <view class="loginWx">
            <!-- <image src="https://www.baibianlg.com/xcx/loging.png" mode="widthFix" /> -->
            <view class="kuang">
                <image src="http://www.mingtongxa.com/wanzhuan/loginbkg.png" mode="widthFix" />
                
            </view>
            <view class="normal">
            <button
          class="btnWrap"
          @touchstart="touchStart"
          @touchend="touchEnd"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
        <view class="btnBox">
          <image src="@/static/images/dengluWe.png" mode="widthFix" />
          <view>微信授权登录</view>
        </view>
        </button>
        <view class="crossLogin" @click="crossLogin">
          <text>跳过登录</text>
          <image src="@/static/images/right.png" mode="widthFix" />
        </view>
        </view>
        </view>
        
        <!-- #endif -->

        <!-- #ifdef H5 -->
        <view class="form">
          <view style="padding:20upx 0;font-weight:600;font-size:40upx"
            >验证码登录</view
          >
          <view class="formItem">
            <view class="formLabelWrap"> </view>
            <view class="formInputWrap phoneWrap">
              <image src="@/static/images/phone.png" mode="widthFix" />
              <input
                type="number"
                placeholder="请输入手机号"
                placeholder-class="plac"
                v-model="phoneNum"
                maxlength="11"
              />
              <view
                :class="['sendCodeBtn', canSendCode ? 'ableBtn' : 'disableBtn']"
                @click="getCheckCode"
                >{{ codeText }}</view
              >
            </view>
          </view>
          <view class="formItem">
            <view class="formLabelWrap"> </view>
            <view class="formInputWrap phoneWrap">
              <image src="@/static/images/phone.png" mode="widthFix" />
              <input
                type="number"
                placeholder="验证码"
                placeholder-class="plac"
                v-model="phoneCode"
                maxlength="6"
              />
            </view>
          </view>
          <view class="pay" @click="phoneLogin">
            同意协议并登录
          </view>
          <view class="xieyi">
            <image
              v-if="!agree"
              @click="changeAgree(1)"
              src="@/static/images/noAgree.png"
              mode="widthFix"
            />
            <image
              v-else
              @click="changeAgree(2)"
              src="@/static/images/agreeXieyi.png"
              mode="widthFix"
            />
            <view>已阅读并同意</view>
            <view class="neirong" @click="toH5Yinsi">用户服务协议、隐私协议</view>
          </view>
        </view>
        <view class="crossLogin" @click="crossLogin">
          <text>跳过登录</text>
          <image src="@/static/images/right.png" mode="widthFix" />
        </view>
        <!-- #endif -->
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopBar from "../../components/topBar";
import { phoneReg } from "@/utils/rule";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      loginType: 1,
      pageTitle: "",
      canBack: false,
      phone: "",
      encryptedData: "",
      iv: "",
      code: "",
      touchStartTime: "",
      touchEndTime: "",
      lastTapTime: "",
      UserCode: "",
      codeText: "获取验证码",
      canSendCode: false,
      phoneNum: "",
      phoneCode: "",
      agree: false,
      newDatas:new Date().getTime()
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
  watch: {
    phoneNum(val) {
      if (phoneReg.test(val)) {
        this.canSendCode = true;
      } else {
        this.canSendCode = false;
      }
    },
  },
  mounted() {
    this.getSession();
  },
  onLoad(opt) {
    this.$comfun.getUserCity(() => {});
    uni.login({
      success: (res) => {
        this.UserCode = res.code;
      },
    });
  },
  methods: {
    userPhone(e) {
      this.phone = e;
    },
    changeAgree(index) {
      if (index == 1) {
        this.agree = true;
      } else if (index == 2) {
        this.agree = false;
      }
    },
    crossLogin() {
      uni.setStorageSync("isLogin", true);
      uni.removeStorageSync("token");
      this.back();
      // uni.navigateBack({
      // 	fail: () => {
      // 		uni.reLaunch({
      // 			url: '/pages/index/index'
      // 		})
      // 	}
      // })
    },
    back() {
      const pages = getCurrentPages();
      console.log(pages);
      if (pages.length >= 2) {
        uni.navigateBack();
      } else {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }
    },
    touchStart(e) {
      this.touchStartTime = e.timeStamp;
    },
    touchEnd(e) {
      this.touchEndTime = e.timeStamp;
    },
    toH5Yinsi(){
        uni.navigateTo({
        url: "/pages/pages/wordPage?url=" +'https://www.baibianlg.com/html/privacy.html',
      });
      },
    getUserCode(code) {
      let sendData = {
        code,
      };
      this.$api.getCode(sendData).then((res) => {
        this.sessionKey = res.data.sessionKey;
        uni.setStorageSync("sessionKey", res.data.sessionKey);
        uni.setStorageSync("openId", res.data.openid);
      });
    },
    getPhoneNumber(e) {
      console.log(e, "666");
      if (this.touchEndTime - this.touchStartTime < 350) {
        // 当前点击的时间
        var currentTime = e.timeStamp;
        var lastTapTime = this.lastTapTime;
        // 更新最后一次点击时间
        this.lastTapTime = currentTime;
        // 如果两次点击时间在300毫秒内，则认为是双击事件
        var _this = this;
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          let sendData = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: _this.UserCode,
            x: uni.getStorageSync("longitude") || "",
            y: uni.getStorageSync("latitude") || "",
            shareUserId: this.$store.state.shareUserId || "",
            areaCode: uni.getStorageSync("quhao") || "",
          };
          uni.showLoading();
          _this.$api.getUserMsg(sendData).then((tag) => {
            console.log(tag.data);
            uni.hideLoading();
            uni.setStorageSync("token", tag.data.token);
            uni.setStorageSync("userId", tag.data.userId);
            uni.setStorageSync("avatar", tag.data.avatar);
            uni.setStorageSync("realName", tag.data.realName);
            uni.setStorageSync("phonenumber", tag.data.phonenumber);
            if (tag.data.avatar != "") {
              uni.setStorageSync("avatar", tag.data.avatar);
              uni.setStorageSync("nickName", tag.data.nickName);
              uni.showToast({
                title: "登录成功",
                duration: 1500,
              });
              // _this.$api.getQuanList().then((res) => {
              //   if (res.code == 200) {
              //     uni.setStorageSync("isMask", true);
              //     uni.setStorageSync("mask", true);
              //   } else {
              //     uni.setStorageSync("isMask", false);
              //   }
              // });
              setTimeout(() => {
                uni.navigateBack({
                  fail: (res) => {
                    uni.reLaunch({
                      url: "/pages/index/index",
                    });
                  },
                });
              }, 1500);
            } else {
              uni.reLaunch({
                url: "/pages/login/shouquan",
              });
            }
          });
        }
      }
    },
    //APP获取验证码登录
    getCheckCode() {
      if (!this.canSendCode) {
        return;
      } else {
        this.canSendCode = false;
        uni.showLoading({ mask: true });
        var sendData = {
          phonenumber: this.phoneNum,
          uuid: this.newDatas
        };
        this.$api.getPhoneCode(sendData).then((res) => {
          console.log(res);
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: '验证码已成功发送至您手机~',
              icon: "none",
            });
            this.codeTimeDown();
          } else {
            this.checkBtnState();
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
          }
        });
      }
    },
    phoneLogin() {
      var msg = "";
      var flag = false;
      if (this.phoneNum.trim() == "") {
        msg = "请输入手机号码";
        flag = true;
      } else if (!phoneReg.test(this.phoneNum)) {
        (msg = "手机号格式错误"), (flag = true);
      } else if (this.phoneCode.trim() == "") {
        (msg = "请输入验证码"), (flag = true);
      } else if (!this.agree) {
        (msg = "请同意用户服务协议及隐私协议"), (flag = true);
      }
      if (flag) {
        uni.showToast({
          title: msg,
          icon: "none",
        });
      } else {
        let sendData = {
          phonenumber: this.phoneNum,
          code: this.phoneCode,
          uuid: this.newDatas,
        };
        this.$api.getPhoneLogin(sendData).then((res) => {
          if (res.code == 200) {
            uni.setStorageSync('nickname', res.data.nickName)
            uni.setStorageSync('token', res.data.token)
            uni.setStorageSync("phonenumber", res.data.phonenumber);
            uni.setStorageSync("isLogin", false);
            if(res.data.avatar!=''){
              uni.setStorageSync("avatar", res.data.avatar);
            }else{
               let sendData = {
              avatar: 'https://www.baibianlg.com/xcx/headimg.png',
              };
              this.$api.setUserMsg(sendData).then((tag) => {
                  uni.setStorageSync("avatar", tag.data.avatar);
              })
            }
           
            uni.setStorageSync("userId", res.data.userId);
             uni.showToast({
                title: "登录成功",
                duration: 1500,
              });
              // this.$api.getQuanList().then((res) => {
              //   if (res.code == 200) {
              //     uni.setStorageSync("isMask", true);
              //     uni.setStorageSync("mask", true);
              //   } else {
              //     uni.setStorageSync("isMask", false);
              //   }
              // });
              setTimeout(() => {
                    uni.reLaunch({
                      url: "/pages/index/index",
                    });
              }, 1500);
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
          }
        });
      }
    },
    codeTimeDown() {
      var a = 60;
      var timer = setInterval(() => {
        a = --a;
        this.codeText = a + "s后重试";
        if (a == 0) {
          clearInterval(timer);
          this.canSendCode = false
          this.codeText = "重新发送";
        }
      }, 1000);
    },
    checkBtnState() {
      console.log(this.phone);
      if (phoneReg.test(this.phone)) {
        this.canSendCode = true;
      } else {
        this.canSendCode = false;
      }
    },
    getSession() {
      uni.login({
        success: (res) => {
          //  console.log(res,'555')//返回code码
          let code = res.code;
          uni.setStorageSync("isLogin", false);
        },
      });
    },
    getPhoneParams(e) {
      console.log(e);
      this.encryptedData = e.encryptedData;
      this.iv = e.iv;
      this.sessionKey = e.sessionKey;
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
      background: linear-gradient(#fbc69b 0%, #d65239 100%);
  flex-direction: column;
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
      top: 260upx;
      width: 90%;
      margin: 0 5%;
      height: 800upx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .normal{
      position: absolute;
      width: 70%;
      margin: 0 15%;
      top: 600upx;
    }
  }
  .form {
    width: 100%;
    padding: 80upx 40upx 0;
    font-size: 28upx;
    .xieyi {
      display: flex;
      align-items: center;
      font-size: 26upx;
      padding-top: 20upx;
      image {
        width: 35upx;
        height: 35upx;
        margin-right: 10upx;
      }
      .neirong {
        color: #0198FE;
      }
    }
    .pay {
      width: 100%;
      height: 90upx;
      margin-top: 80upx;
      margin-bottom: 20upx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30upx;
      color: #fff;
      background: #0198FE;
      font-weight: bold;
      font-size: 32upx;
    }
    .formItem {
      .formLabelWrap {
        font-weight: bold;
        display: flex;
        align-items: center;
        font-size: 28upx;
        position: relative;
        left: -30upx;
        image {
          width: 30upx;
          height: 30upx;
          margin-right: 8upx;
        }
      }
      .formInputWrap {
        padding: 20upx 0;
        border-bottom: 2upx solid #cfcfcf;
        image {
          width: 36upx;
          height: 46upx;
          margin-right: 8upx;
        }
      }
      .phoneWrap {
        display: flex;
        align-items: center;
        input {
          flex: 1;
        }
        .sendCodeBtn {
          width: 140upx;
          height: 54upx;
          border-radius: 10upx;
          color: #0198FE;
          font-size: 22upx;
          text-align: center;
          line-height: 54upx;
        }
        .disableBtn {
          background: #f5f7ff;
          color: #999;
        }
        .ableBtn {
          background: #f5f7ff;
        }
      }
    }
    .formItem:not(:first-child) {
      margin-top: 40upx;
    }
    .genderWrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28upx;
      margin-top: 44upx;
      .genderLabel {
        display: flex;
        align-items: center;
        position: relative;
        left: -30upx;
        font-weight: bold;
        image {
          width: 30upx;
          height: 30upx;
          margin-right: 8upx;
        }
      }
      .genderRadio {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-weight: bold;
        .radioItemWrap {
          display: flex;
          align-items: center;
          image {
            width: 34upx;
            height: 34upx;
            margin-right: 12upx;
          }
        }
        .radioItemWrap:first-child {
          margin-right: 74upx;
        }
      }
    }
    .submitBtnWrap {
      width: 100%;
      height: 88upx;
      border-radius: 8upx;
      line-height: 88upx;
      text-align: center;
      background: linear-gradient(45deg, #ff2e00, #da5f44);
      color: #fff;
      font-size: 30upx;
      margin-top: 90upx;
    }
    .toLoginWrap {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24upx;
      color: #999;
      margin-top: 80upx;
      .pageToWrap {
        color: #2f9fbe;
        font-weight: bold;
      }
      image {
        width: 24upx;
        height: 24upx;
        margin-left: 8upx;
        position: relative;
      }
    }
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
      width: 22upx;
      height: 20upx !important;
      position: relative;
      top: 2upx;
      margin-left: 4upx;
    }
  }
  .btnWrap {
    outline: none;
    border: none;
    padding: 0;
    font-size: 36upx;
    font-weight: bold;
    height: 120upx;
    width: 488upx;
    background: linear-gradient(-45deg, #ff2e00, #da5f44);
    color:#fff;
    border-radius: 68upx;
    .btnBox{
      display: flex;
      align-items: center;
      height: 120upx;
      padding-left: 120upx;
      view{
        padding-left: 50upx;
      }
    }
    image {
      width: 40upx;
      height: 40upx !important;
    }
  }
  .btnWrap:first-child {
    margin-bottom: 64upx;
  }
}
</style>
