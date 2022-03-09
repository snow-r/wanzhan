<template>
  <View>
    <TopBar background="#fff" barTitle="忘记密码" :back="true" />
    <scroll-view scroll-y :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <view class="pageContainer">
        <view class="form">
          <view class="formItem">
            <view class="formLabelWrap">
              <image src="@/static/images/phone.png" mode="widthFix" />
              <text>手机号码</text>
            </view>
            <view class="formInputWrap phoneWrap">
              <input type="number" placeholder="请输入手机号" placeholder-class="plac" v-model="phone" maxlength="11" />
              <view :class="['sendCodeBtn',canSendCode ?'ableBtn':'disableBtn']" @click="getCheckCode">{{codeText}}</view>
            </view>
          </view>
          <view class="formItem">
            <view class="formLabelWrap">
              <image src="@/static/images/code.png" mode="widthFix" />
              <text>验证码</text>
            </view>
            <view class="formInputWrap">
              <input type="number" placeholder="请输入验证码" placeholder-class="plac" v-model="code" maxlength="11" />
            </view>
          </view>
          <view class="formItem">
            <view class="formLabelWrap">
              <image src="@/static/images/password.png" mode="widthFix" />
              <text>新密码</text>
            </view>
            <view class="formInputWrap">
              <input type="password" placeholder="请输入登录密码" placeholder-class="plac" v-model="password" maxlength="11" />
            </view>
          </view>
          <view class="formItem">
            <view class="formLabelWrap">
              <image src="@/static/images/password.png" mode="widthFix" />
              <text>确认密码</text>
            </view>
            <view class="formInputWrap">
              <input type="password" placeholder="请再次输入登录密码" placeholder-class="plac" v-model="rePassword" maxlength="11" />
            </view>
          </view>
          <view class="submitBtnWrap" @click="confirmRegister">立即注册</view>
        </view>
      </view>
    </scroll-view>
  </View>
</template>

<script>
import TopBar from '@/components/topBar'
import {phoneReg} from '@/utils/rule'
export default {
  components: {
    TopBar
  },
  data () {
    return {
      codeText: '获取验证码',
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      gender: null,
      canSendCode: false,
      roleId: 1
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    }
  },
  mounted () {},
  watch: {
    phone (val) {
      if (phoneReg.test(val)) {
        this.canSendCode = true
      } else {
        this.canSendCode = false
      }
    }
  },
  methods: {
    chooseGender (e) {
      this.gender = e
    },
    pageBack () {
      uni.navigateBack()
    },
    getCheckCode () {
      if (!this.canSendCode) {
        return
      } else {
        this.canSendCode = false
        uni.showLoading({mask: true})
        var sendData = {
          userPhone: this.phone
        }
        this.$api.forgetPasswordCode(sendData).then(res =>{
          console.log(res)
          uni.hideLoading()
          if (res.code == 1) {
            this.codeTimeDown()
          } else {
            this.checkBtnState()
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    },
    checkBtnState () {
      console.log(this.phone)
      if (phoneReg.test(this.phone)) {
        this.canSendCode = true
      } else {
        this.canSendCode = false
      }
    },
    codeTimeDown () {
      var a = 60
      var timer = setInterval(() => {
        a = --a
        this.codeText = a + 's后重新发送'
        if (a == 0) {
          clearInterval(timer)
          this.codeText = '重新发送'
        }
      }, 1000)
    },
    confirmRegister () {
      var msg = ''
      var flag = false
      if (this.phone.trim() == '') {
        msg = '请输入手机号码'
        flag = true
      } else if (!phoneReg.test(this.phone)) {
        msg = '手机号格式错误',
        flag = true
      } else if (this.code.trim() == '') {
        msg = '请输入验证码',
        flag = true
      } else if (this.password.trim() == '') {
        msg = '请输入新密码'
        flag = true
      } else if (this.rePassword.trim() == '') {
        msg = '请再次输入密码'
        flag = true
      } else if (this.password !== this.rePassword) {
        msg = '两次输入密码不一致'
        flag = true
      }
      if (flag) {
        uni.showToast({
          title: msg,
          icon: 'none'
        })
      } else {
        let sendData = {
          code: this.code,
          userPhone: this.phone,
          newPassword: this.password,
        }
        uni.showLoading({mask: true})
        this.$api.resetPassword(sendData).then(res => {
          uni.hideLoading()
          if (res.code == 1) {
            uni.showToast({
              title: res.obj,
              duration: 1500
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  height: 100%;
  width: 100%;
  border-top: 2upx solid #EFEFF4;
  .form{
    padding: 80upx 100upx 0;
    .formItem{
      .formLabelWrap{
        font-weight: bold;
        display: flex;
        align-items: center;
        font-size: 28upx;
        position: relative;
        left: -30upx;
        image{
          width: 30upx;
          height: 30upx;
          margin-right: 8upx;
        }
      }
      .formInputWrap{
        padding: 20upx 0;
        border-bottom: 2upx solid #CFCFCF;
      }
      .phoneWrap{
        display: flex;
        align-items: center;
        input{
          flex: 1;
        }
        .sendCodeBtn{
          width: 140upx;
          height: 54upx;
          border-radius: 10upx;
          color: #fff;
          font-size: 22upx;
          text-align: center;
          line-height: 54upx;
        }
        .disableBtn{
          background: #B7E1ED;
        }
        .ableBtn{
          background: #238FAE;
        }
      }
    }
    .formItem:not(:first-child){
      margin-top: 40upx;
    }
    .genderWrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28upx;
      margin-top: 44upx;
      .genderLabel{
        display: flex;
        align-items: center;
        position: relative;
        left: -30upx;
        font-weight: bold;
        image{
          width: 30upx;
          height: 30upx;
          margin-right: 8upx;
        }
      }
      .genderRadio{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-weight: bold;
        .radioItemWrap{
          display: flex;
          align-items: center;
          image{
            width: 34upx;
            height: 34upx;
            margin-right: 12upx;
          }
        }
        .radioItemWrap:first-child{
          margin-right: 74upx;
        }
      }
    }
    .submitBtnWrap{
      width: 100%;
      height: 88upx;
      border-radius: 8upx;
      line-height: 88upx;
      text-align: center;
      background: linear-gradient(to right, #3FAFCF, #238FAE);
      color: #fff;
      font-size: 30upx;
      margin-top: 90upx;
    }
    .toLoginWrap{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24upx;
      color: #999;
      margin-top: 80upx;
      .pageToWrap{
        color: #2F9FBE;
        font-weight: bold;
      }
      image{
        width: 24upx;
        height: 24upx;
        margin-left: 8upx;
        position: relative;
      }
    }
  }
}

</style>