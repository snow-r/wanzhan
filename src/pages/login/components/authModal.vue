<template>
  <view class="authWrap">
    <view class="authTips topline">需要您的授权</view>
    <view class="authTips bottomline">以享受完整的功能体验！</view>
    <button class="authBtn" open-type="getUserInfo" @getuserinfo="getUserInfo">确认授权</button>
    <view class="cancel" @click="cancel">取消</view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {
    cancel () {
      this.$emit('changLoginType', 1)
    },
    getUserInfo (e) {
      uni.showLoading({mask: true})
      console.log(e)
      uni.getSetting({
        success: res => {
          console.log(res)
          if (res.authSetting['scope.userInfo'] === '') {
            uni.authorize({
              scope: 'scope.userInfo'
            })
          } else if (res.authSetting['scope.userInfo'] === false) {
            uni.showModal({
              title: '提示',
              content: '需要允许获取用户信息权限，请点击“确定”去授权。',
              success: res => {
                if (res.confirm) {
                  uni.openSetting()
                }
              }
            })
          } else {
            uni.checkSession({
              success: res => {
              },
              fail: res => {
              }
            })
            uni.getUserProfile({
              success: res => {
                var sendData = {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  userPhone: uni.getStorageSync('userPhone')
                }
                uni.hideLoading()
                this.$emit('userInfo', sendData)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.authWrap{
  width: 100vw;
  box-sizing: border-box;
  padding: 80upx 100upx 0;
  .authTips{
    width: 100%;
    text-align: center;
}
  .authBtn{
    height: 88upx;
    width: 100%;
    line-height: 88upx;
    text-align: center;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: linear-gradient(to right, #3FAFCF, #238FAE);
    color: #fff;
    font-size: 32upx;
    margin-top: 120upx;
  }
}
.topline{
  font-weight: bold;
  font-weight: 36upx;
}
.bottomline{
  font-size: 28upx;
  color: #666;
  margin-top: 20upx;
}
.cancel{
  width: 100%;
  text-align: center;
  margin-top: 40upx;
  font-size: 24upx;
  color: #999;
}
</style>