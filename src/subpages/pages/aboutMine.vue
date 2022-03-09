<template>
  <view>
    <TopBar background="#fff" :back="true" barTitle="关于我们" />
    <scroll-view scroll-y :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <view class="pageContainer">
        <view class="companyDetailWrap">
          <image class="logoImg" src="http://www.mingtongxa.com/newxcx/about.png" mode="widthFix" />
          <view class="companyNameWrap">零工</view>
          <view class="versionWrap">V1.0.0</view>
        </view>
        <view class="func1" @click="banben">
            <view class="func1Header">
              <view>版本更新</view>
              <image src="@/static/images/new.png" mode="widthFix"></image>
            </view>
            <image src="@/static/images/toright.png" mode="widthFix"></image>
          </view>
          <view class="func1" @click="message">
            <view class="func1Header">
              <view>问题反馈</view>
            </view>
            <image src="@/static/images/toright.png" mode="widthFix"></image>
          </view>
          <view class="func1" @click="toH5">
            <view class="func1Header">
              <view>使用帮助</view>
              
            </view>
            <image src="@/static/images/toright.png" mode="widthFix"></image>
          </view>
          <view class="func1" @click="toH5Yinsi">
            <view class="func1Header">
              <view>隐私政策</view>
              
            </view>
            <image src="@/static/images/toright.png" mode="widthFix"></image>
          </view>
          <view class="func1" @click="callKefu">
            <view class="func1Header">
              <view>联系客服</view>
              
            </view>
            <view style="padding-right:30upx;font-size:28upx;color:#e61669">029-81317973</view>
          </view>
          <view class="copy">
              <view>copyright@2021-2031</view>
              <view>铭通科技</view>
          </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
export default {
  components: {
    TopBar,
  },
  data () {
    return {
      currentVersion: '',
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
      message(){
         this.$comfun.userLogin(() => {
       uni.navigateTo({
          url:"/subpages/pages/message"
        })
      })
          
      },
      banben(){
        uni.showModal({
          title: '提示',
          content: '已是最新版本了！',
          showCancel: false
        })
      },
      callKefu() {
        uni.makePhoneCall({
        phoneNumber: "029-81317973",
        success: (res) => {},
      });
    },
      toH5(){
        uni.navigateTo({
        url: "/pages/pages/wordPage?url=" +'https://www.baibianlg.com/html/question/question.html',
      });
      },
      toH5Yinsi(){
        uni.navigateTo({
        url: "/pages/pages/wordPage?url=" +'https://www.baibianlg.com/html/privacy.html',
      });
      }
  }
}
</script>

<style lang="less" scoped>
.dialogs {
  position: relative;
  z-index: 100;
  width: 520upx;
  height: 560upx;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  .dialogHeader {
    width: 100%;
    font-size: 34upx;
    color: #000;
    font-weight: bold;
    height: 100%;
    border-radius: 20upx;
    image {
      margin-top: 40upx;
      width: 220upx;
      height: 220upx;
    }
  }
  .dialogContent {
    font-size: 30upx;
    width: 80%;
    margin: 0 10%;
    color: #363636;
    height: 240upx;
    font-size: 30upx;
    padding: 10upx 15upx 0upx;
    display: block;
    text-align: left;
    font-weight: bold;
    color: #000;
    .dialogMsg {
      padding: 10upx 0 0 50upx;
      font-size: 26upx;
      font-weight: normal;
      line-height: 38upx;
    }
  }
  .dialogBottom {
    width: 100%;
    height: 100upx;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 54upx;
      height: 54upx;
    }
  }
  .dialogBottoms {
    width: 100%;
    height: 110upx;
    padding: 30upx 0 0;
    display: flex;
    justify-content: space-around;
    font-size: 32upx;
    font-weight: bold;
    line-height: 130upx;
    border-top: 1upx solid #efeff4;
    view:nth-child(1) {
      color: #f8b135;
      width: 50%;
    }
    view:nth-child(2) {
      color: #2f8ec8;
      width: 50%;
    }
  }
}
.pageContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  .func1{
      width: 100%;
      height: 100upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 34upx;
      color: #333;
      padding-left: 20upx;
        image{
          width: 40upx;
          height: 40upx;
          margin-right: 30upx;
        }
        .func1Header{
          display: flex;
          align-items: center;
          height: 60upx;
          image{
            width: 80upx;
            margin:8upx 25upx;
          }
          view{
            padding-left: 10upx;
          }
        }
    }
    .copy{
        width: 100%;
        height: 260upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        view{
            &:nth-child(1){
                font-size: 26upx;
                color: #999;
            }
            
            &:nth-child(2){
                font-size: 32upx;
                color: #333;
                padding-top: 10upx;
            }
        }
    }
  .companyDetailWrap{
    margin: 64upx 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logoImg{
      width: 250upx;
      height: 270upx;
    }
    .companyNameWrap{
      font-size: 32upx;
    }
    .versionWrap{
      font-size: 24upx;
      margin-top: 10upx;
      color: #b2b2b2;
    }
  }
  .companyContentWrap{
    padding: 0 84upx;
    font-size: 24upx;
    line-height: 42upx;
    text-justify: inter-ideograph;
    text-indent: 44upx;
    >view:last-child{
      margin-top: 36upx;
    }
  }
  .copyRight{
    line-height: 40upx;
    position: absolute;
    bottom: 60upx;
    left: 0;
    right: 0;
    font-size: 20upx;
    >view{
      text-align: center;
      >text:first-child{
        color: #999;
      }
      >text:last-child{
        color: #147599;
      }
    }
  }
}
</style>