<template>
  <view class="form">
    <view class="formItem">
      <view class="formLabelWrap">
        <image src="@/static/images/phone.png" mode="widthFix" />
        <text>账号</text>
      </view>
      <view class="userInput">
        <input type="text" v-model="userName">
        <view class="clearBtnWrap" @click="clear(1)">
          <image src="@/static/images/clearBtn.png" mode="widthFix" v-if="userName" />
        </view>
      </view>
    </view>
    <view class="formItem">
      <view class="formLabelWrap">
        <image src="@/static/images/password.png" mode="widthFix" />
        <text>密码</text>
      </view>
      <view class="userInput">
        <input type="password" v-model="password">
        <view class="clearBtnWrap" @click="clear(2)">
          <image src="@/static/images/clearBtn.png" mode="widthFix" v-if="password" />
        </view>
      </view>
    </view>
    <view class="registerWrap">
      <view class="forgetPassword" @click="forgetPassword">忘记密码？</view>
      <view class="forgetPassword" @click="toRegister">立即注册</view>
    </view>
    <view class="submitBtnWrap" @click="confirmSubmit">
      登录
    </view>
    <view class="backToChoose" @click="reChoose">
      <text>返回重新选择</text>
      <image src="@/static/images/right.png" mode="widthFix" />
    </view>
  </view>
</template>

<script>
import {phoneReg} from '@/utils/rule'
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    reChoose () {
      this.$emit('changLoginType', 1)
    },
    toRegister () {
      uni.navigateTo({
        url: '/pages/login/register'
      })
    },
    forgetPassword () {
      uni.navigateTo({
        url: '/pages/login/forgetPassword'
      })
    },
    confirmSubmit () {
      var msg = ''
      var flag = true
      if (this.userName.trim() == '') {
        msg = '请输入账号'
        flag = false
      } else if (!this.password.trim()) {
        msg = '密码不能为空'
        flag = false
      }
      if (!flag) {
        uni.showToast({
          title: msg,
          icon: 'none'
        })
      } else {
        uni.showLoading({mask: true})
        var sendData = {
          userName: this.userName,
          password: this.password
        }
        this.$api.accountLogin(sendData).then(res => {
          uni.hideLoading()
          if (res.code == 1) {
            var tag = res.obj
            var userInfo = {
              userId: tag.id,
              accessToken: tag.token,
              headImg: tag.headImg,
              idImg:tag.idCardImg,
              roleId: tag.roleId,
              realName: tag.realName,
              userPhone: tag.userPhone,
              userSex: tag.userSex,
              userState: tag.status,
              username: this.username,
              password: this.password,
              nickName:tag.nickName,
              teamId:tag.teamId,
              label:tag.label
            }
            uni.setStorageSync('userInfo', userInfo);
            uni.showToast({
              title: '登录成功',
              duration: 1500
            })
            setTimeout(() => {
              uni.navigateBack({
                success: res => {
                  console.log(res)
                },
                fail: (res) => {
                  console.log(res)
                  uni.reLaunch({
                    url: '/pages/index/index'
                  })
                }
              })
            }, 1500)
          }
        })
      }
    },
    clear (type) {
      if (type == 1) {
        this.userName = ''
      } else if (type == 2) {
        this.password = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form{
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60upx 100upx 0;
  box-sizing: border-box;
  font-size: 28upx;
  .formItem{
    width: 100%;
    .formLabelWrap{
      position: relative;
      left: -30upx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      image{
        width: 30upx;
        height: 30upx;
        margin-right: 8upx;
      }
    }
    .userInput{
      border-bottom: 2upx solid #CFCFCF;
      display: flex;
      align-items: center;
      input{
        flex: 1;
        padding: 20upx 0;
        font-size: 30upx;
      }
      .clearBtnWrap{
        width: 50upx;
        height: 50upx;
        display: flex;
        align-items: center;
        justify-content: center;
        image{
          width: 30upx;
          height: 30upx;
        }
      }
    }
  }
  .formItem:first-child{
    margin-bottom: 60upx;
  }
  .registerWrap{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .forgetPassword{
      padding-top: 28upx;
      color: #238FAE;
      font-size: 24upx;
    }
  }
  .submitBtnWrap{
    width: 100%;
    height: 88upx;
    text-align: center;
    color: #fff;
    font-size: 30upx;
    background: linear-gradient(to right, #3FAFCF, #238FAE);
    border-radius: 5upx;
    line-height: 88upx;
    margin-top: 108upx;
    box-shadow: 10upx 10upx 20upx rgba(0,0,0,0.3);
  }
}
image{
  vertical-align: middle;
}
.backToChoose{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 24upx;
  margin-top: 100upx;
  image{
    width: 24upx;
    height: 24upx;
    position: relative;
    top: 2upx;
  }
}
</style>