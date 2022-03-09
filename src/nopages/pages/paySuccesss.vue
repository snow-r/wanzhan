<template>
  <view>
    <TopBar
      background="transparent"
      :back="true"
      barTitle="支付成功"
      backType="guanbi"
      :fontColor="'rgb(250, 250, 250)'"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="content">
          <view class="header">
            <image
              src="http://www.mingtongxa.com/wanzhuan/payNumberBg.png"
              mode="widthFix"
            />
            <view class="tishi">
            <text>支付金额：{{fukuan}}元</text>
          </view>
          </view>
          <view class="title">
            <image
              src="http://www.mingtongxa.com/wanzhuan/payOrderBg.png"
              mode="widthFix"
            />
            <!-- <view class="boxs">
              <view>
                订单编号： <text>{{orderNo}}</text>
              </view>
              <view>
                下单时间：<text>{{orderTime}}</text>
              </view>
              <view>
                使用时间：<text>{{start}}~{{end}}</text>
              </view>
            </view> -->
          </view>
          <!-- <view class="tijiao" @click='gotoIndex'>查看订单</view> -->
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
        fukuan:null,
        orderTime:'',
        start:'',
        end:'',
        orderNo:''
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
  onLoad(opt) {
      this.fukuan=opt.payNum
    //   this.orderTime = opt.orderTime
    //   this.start = opt.start
    //   this.end = opt.end
    //   this.orderNo = opt.orderNo
  },
  methods: {
    gotoIndex(){
      uni.navigateTo({
        url:'/subpages/pages/orderList'
      })
    }
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    width: 100%;
    height: 800upx;
    .header {
      position: relative;
      width: 100%;
      height: 880upx;
      display: flex;
      align-items: center;
      flex-direction: column;
      image {
        position: absolute;
        width: 100%;
        height: 484px !important;
      }
      text {
        font-size: 36upx;
        color: #000;
        font-weight: bold;
        padding-top: 50upx;
      }
    }
    .title{
      margin-top: 100upx;
      width: 100%;
      height: 250upx;
      position: relative;
      display: flex;
      align-items: center;
      image{
        position: absolute;
        width: 90%;
        left: 5%;
      }
      .boxs{
        width: 100%;
        height: 100%;
        font-size: 28upx;
        color: #8B8B8B;
        font-weight: bold;
        display: flex;
        justify-content: center;
        padding-left: 180upx;
        flex-direction: column;
        view{
          padding-top: 10upx;
        }
      }
    }
    .tishi {
      position: absolute;
      bottom: -60upx;
      width: 80%;
      margin: 0 10%;
      height: 100upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 55upx;
      font-size: 28upx;
      color: #717171;
    }
    .tijiao {
      width: 22%;
      height: 60upx;
      margin: 0upx 39%;
      margin-top: 35upx;
      background: #fff;
      border: 1upx solid #DB0000;
      border-radius: 10upx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      color: #DB0000;
      font-weight: 500;
    }
  }
}
</style>
