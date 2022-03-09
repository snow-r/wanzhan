<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="#FBC69B"
      :back="true"
      barTitle="订单详情"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view class="head" v-if="status==0">未使用</view>
          <view class="head" v-else-if="status==1">已使用</view>
          <view class="title">有效期：{{start}}~{{end}}</view>
        </view>
        <view class="cont">
          <image
            class="hadimg"
            src="http://www.mingtongxa.com/wanzhuan/codeBg.png"
            mode="widthFix"
          ></image>
          <view class="box">
            <view class="boxHead">
              <view class="boxLeft">
                <image
                  :src='img'
                  mode="widthFix"
                ></image>
              </view>
              <view class="boxRight">
                <view class="right1" style="white-space:nowrap">{{name}}</view>
                <view class="right2">{{price}}元代{{amount}}元代金券</view>
              </view>
            </view>
            <view class="boxCont">
              <view class="component-code">
                <tki-barcode
                  ref="barcode"
                  onval
                  :val="code"
                  :load-make="true"
                  :opations="barOpations"
                />
              </view>
              <view class="component-qr">
                <tki-qrcode
                  ref="qrcode"
                  onval
                  :val="code"
                  :size="250"
                  :load-make="true"
                  :show-loading="false"
                />
              </view>
              <view class="coupon-no-view">
                <text>券码值：</text>
                <text class="coupon-no">{{ code }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import tkiBarcode from "../components/code/tki-barcode/tki-barcode";
import tkiQrcode from "../components/code/tki-qrcode/tki-qrcode";
import { clearTimeout } from "timers";
export default {
  components: {
    TopBar,
    tkiBarcode,
    tkiQrcode,
  },
  data() {
    return {
      code: "",
      barOpations: {
        height: 150,
        displayValue: false,
      },
      num: "",
      status:'',
      start:'',
      end:'',
      price:'',
      amount:'',
      name:'',
      img:''
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
    this.code = opt.num;
    this.status = opt.status
    this.start = opt.start
    this.end = opt.end
    this.price = opt.price
    this.amount = opt.amount
    this.name = opt.name
    this.img = opt.img
    this.init(this.code); // 5 秒后刷新一维码和二维码
  },
  mounted() {},
  methods: {
    init(num) {
        console.log(num,'进方法了！！！')
      this.code = num; // 生成一维码和二维码
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  background: linear-gradient(#fbc69b 0%, #d65239 100%);
  .header {
    width: 100%;
    height: 180upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .head {
      font-size: 34upx;
      font-weight: bold;
      color: #fff;
    }
    .title {
      font-size: 24upx;
      font-weight: bold;
      color: #fff;
      padding-top: 15upx;
    }
  }
  .cont {
    width: 96%;
    margin: 0 2%;
    height: 830upx;
    position: relative;
    .hadimg {
      position: absolute;
      width: 100%;
    }
    .box {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 100;
      .boxHead {
        width: 100%;
        height: 200upx;
        display: flex;
        align-items: center;

        .boxLeft {
          width: 140upx;
          height: 140upx;
          margin-left: 60upx;
          border-radius: 50%;
          image {
            border-radius: 50%;
            width: 100%;
            height: 140upx !important;
          }
        }
        .boxRight {
          width: 480upx;
          height: 140upx;
          display: flex;
          flex-direction: column;
          .right1 {
            font-size: 32upx;
            font-weight: bold;
            color: #000;
            padding-top: 30upx;
            padding-left: 40upx;
          }
          .right2 {
            font-size: 28upx;
            font-weight: bold;
            color: #7c7c7c;
            padding-top: 30upx;
            padding-left: 40upx;
          }
        }
      }
      .boxCont {
        width: 100%;
        height: 600upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .component-code {
          height: 150upx;
          margin-top: 30upx;
        }
        .component-qr {
          width: 250upx;
          height: 250upx;
          margin-top: 50upx;
        }
        .coupon-no-view {
          font-size: 28upx;
          font-weight: bold;
          color: #7c7c7c;
          padding-top: 30upx;
        }
      }
    }
  }
}
</style>
