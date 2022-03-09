<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="我的推广记录"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <scroll-view scroll-y class="pageContainer">
          <view class="header">
          <view class="headLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/tuiguang1.png"
              mode="widthFix"
            ></image>
            <text>0</text>
            <text>邀请人数</text>
          </view>
          <view class="headLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/tuiguang2.png"
              mode="widthFix"
            ></image>
            <text>0</text>
            <text>订单总数</text>
          </view>
          <view class="headLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/tuiguang3.png"
              mode="widthFix"
            ></image>
            <text>0</text>
            <text>推广金</text>
          </view>
        </view>
        <view class="title">
            <view>管理商铺</view>
            <text>查看和代理关联的商铺</text>
        </view>
        <view class="content">
            <view class="contLeft">
                <image
              src="http://www.mingtongxa.com/wanzhuan/spglbg.png"
              mode="widthFix"
            ></image>
            </view>
            <view class="contRight">
                <view class="right1">四川火锅店高新路</view>
                <view class="right3">陕西省西安市未央区圣朗国际铭通科技有限公司</view>
                <view class="right2">联系电话： <text>12896781234</text> </view>
                <view class="right4">
                    <image
               
              src="http://www.mingtongxa.com/wanzhuan/chakanye.png"
              mode="widthFix"
            ></image>
                </view>
                
            </view>
        </view>
        <view class="content">
            <view class="contLeft">
                <image
              src="http://www.mingtongxa.com/wanzhuan/spglbg.png"
              mode="widthFix"
            ></image>
            </view>
            <view class="contRight">
                <view class="right1">四川火锅店高新路</view>
                <view class="right3">陕西省西安市未央区圣朗国际铭通科技有限公司</view>
                <view class="right2">联系电话： <text>12896781234</text> </view>
                <view class="right4">
                    <image
               
              src="http://www.mingtongxa.com/wanzhuan/chakanye.png"
              mode="widthFix"
            ></image>
                </view>
                
            </view>
        </view>
      </scroll-view>
    </view>
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
  onLoad () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .header {
      box-shadow: -1upx 1upx 30upx 1upx #fce1e1;
    display: flex;
    align-items: center;
    width: 98%;
    margin: 20upx 1%;
    height: 260upx;
    border-radius: 30upx;
    background: #fff;
    .headLeft {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        width: 110upx;
      }
      text {
        font-size: 28upx;
        font-weight: bold;
        padding-top: 15upx;
        color: #000;
      }
    }
  }
  .title{
      width: 100%;
      height: 100upx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view{
          font-size: 28upx;
        font-weight: bold;
        color: #000;
      }
      text{
           font-size: 24upx;
        font-weight: bold;
        padding-top: 10upx;
        color: #707070;
      }
  }
  .content{
      box-shadow: 0 2upx 8upx 2upx #F5A9AD;
      width: 96%;
      height: 400upx;
      margin: 20upx 2%;
      border-radius: 30upx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .contLeft{
          width: 40%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          image{
              width: 230upx;
          }
      }
      .contRight{
          width: 60%;
          height: 100%;
          padding: 50upx 30upx 0 0;
          color: #000;
          .right1{
              font-size: 28upx;
              font-weight: bold;
              padding-bottom: 50upx;
          }
          .right2{
              font-weight: bold;
              font-size: 26upx;
              padding-bottom: 15upx;
          }
          .right3{
              font-size: 26upx;
              font-weight: bold;
              padding-bottom: 40upx;
              padding-top: 30upx;
          }
          .right4{
              width: 100%;
              height: 60upx;
              text-align: right;
              image{
                  width: 206upx;
              }
          }
      }
  }
}
</style>