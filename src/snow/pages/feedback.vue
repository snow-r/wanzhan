<template>
  <view>
      <TopBar
      background="#fff"
      :back="true"
      barTitle="意见反馈"
      :backType="'fanhui'"
      :isfan="false"
    />
    <scroll-view scroll-y :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <view class="pageContainer">
        <textarea class="userInput" v-model="suggestion" placeholder="请输入您对我们的意见或建议" placeholder-class="plac"></textarea>
        <view class="confirmBtn" @click="confirmSubmit">提交</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
export default {
  components: {
    TopBar
  },
  data () {
    return {
      suggestion: ''
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  mounted () {
  },
  methods: {
    confirmSubmit () {
      if (this.suggestion.trim() == '') {
        uni.showToast({
          title: '请输入您的意见建议',
          icon: 'none'
        })
        return
      }
      var sendData = {
        content: this.suggestion
      }
      uni.showLoading({
        mask: true
      })
      this.$api.messageBack(sendData).then(res => {
        uni.hideLoading()
        if (res.code === 200) {
          uni.showToast({
            title: '反馈成功',
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
</script>

<style lang="less" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
  background: #f5f5f5;
  padding: 20upx 30upx;
  box-sizing: border-box;
  .userInput{
    width: 100%;
    height: 340upx;
    background: #fff;
    padding: 16upx;
    box-sizing: border-box;
    font-size: 28upx;
  }
  .confirmBtn{
    width: 90%;
    margin: 0 5%;
    height: 100upx;
    text-align: center;
    color: #fff;
    font-size: 30upx;
    line-height: 100upx;
    background: #0198FE;
    margin-top: 50upx;
    border-radius: 8upx;
  }
}
</style>