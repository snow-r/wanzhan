<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="支付订单"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view>本次支付金额</view>
          <view class="money">￥ {{ payNum }}</view>
        </view>
        <view class="content">
          <view class="fangshi">
            <view class="no1">
              <image src="@/static/images/pay.png" mode="widthFix"></image>
              <text>微信支付</text>
            </view>
            <image src="@/static/images/iagree.png" mode="widthFix"></image>
          </view>
        </view>
        <view class="btns">
          <view class="btnOn" @click="payMentOrder()">确认支付</view>
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
      payNum: null,
      orderId: null,
      orderNo:'',
      orderTime:'',
      start:'',
      end:''
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
    this.payNum = opt.number;
    this.orderId = opt.orderId;
    this.getOrder()
  },
  methods: {
    getOrder() {
      let sendData = {
        id: this.orderId,
      };
      uni.showLoading({
        mask: true,
      });
      this.$api.getOrderDetail(sendData).then((res) => {
        uni.hideLoading();
        console.log(res, "66666");
        if (res.code == 200) {
          this.orderNo = res.data.orderNo
          this.orderTime = res.data.createTime
          this.start= res.data.startTime
          this.end = res.data.endTime
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    payMentOrder() {
      var that = this;
      let sendData = {
        id: Number(this.orderId),
        payType: "wxPay",
        //#ifdef MP-WEIXIN
        payWay: "JSAPI",
        //#endif
        //#ifdef APP-PLUS
        payWay: "APP",
        //#endif
      };
      uni.showLoading({
        mask: true,
      });
      this.$api.payOrderList(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          //#ifdef MP-WEIXIN
          that.wxPay(res.data.wxPay);
          //#endif
          //#ifdef APP-PLUS
          that.appPay(res.data.wxPay);
          //#endif
        } else {
          that.$comfun.Toast(res.msg, "none");
        }
      });
    },
    wxPay(data) {
      var that =this
      uni.showLoading({
        mask: true,
      });
      uni.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: (res) => {
          uni.hideLoading();
          uni.showToast({
            title: "支付成功",
            icon: "none",
          });
          uni.navigateTo({
            url:
              "/subpages/pages/paySuccess?payNum=" +
              that.payNum +
              "&orderNo=" +
              that.orderNo+
              "&start=" +
              that.start+
              "&end=" +
              that.end+
              "&orderTime=" +
              this.orderTime
          });
        },
        fail: (res) => {
          console.log(res, "支付");
          uni.hideLoading();
          if (res.errMsg == "requestPayment:fail cancel") {
            uni.showToast({
              title: "取消支付",
              icon: "none",
            });
          } else {
            uni.showToast({
              title: "支付失败",
              icon: "none",
            });
          }
        },
      });
    },
    appPay(data) {
      uni.requestPayment({
        provider: "wxpay",
        orderInfo: JSON.stringify({
          appid: data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
          noncestr: data.noncestr, // 随机字符串
          package: data.package, // 固定值
          partnerid: data.partnerid, // 微信支付商户号
          prepayid: data.prepayid, // 统一下单订单号
          timestamp: data.timestamp, // 时间戳（单位：秒）
          sign: data.sign.slice(0, 30), // 签名，这里用的 MD5 签名
        }),
        success(res) {
          uni.hideLoading();
          uni.showToast({
            title: "支付成功",
            icon: "none",
          });
          uni.navigateTo({
            url: `/subpages/pages/paySuccess?payNum=${this.payNum}`,
          });
        },
        fail(res) {
          uni.hideLoading();
          if (res.errMsg == "requestPayment:fail cancel") {
            uni.showToast({
              title: "取消支付",
              icon: "none",
            });
          } else {
            uni.showModal({
              content: "支付失败,原因为: " + res.errMsg,
              showCancel: false,
            });
            // uni.showToast({
            //   title: JSON.stringify(res),
            //   icon: "none",
            // });
            // uni.showToast({
            //   title: "支付失败",
            //   icon: "none",
            // });
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #f5f7ff;
  width: 100%;
  height: 100%;
  .header {
    width: 94%;
    margin: 30upx 3%;
    height: 150upx;
    border-radius: 30upx;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-content: center;
    view {
      margin: 20upx 0 10upx;
      font-size: 30upx;
      padding-left: 20upx;
    }
    .money {
      width: 100%;
      text-align: center;
      font-size: 38upx;
      color: #d83c23;
      font-weight: bold;
    }
  }
  .content {
    width: 94%;
    margin: 30upx 3%;
    height: 80upx;
    background: #fff;
    border-radius: 30upx;
    line-height: 80upx;
    .fangshi {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .no1 {
        margin-left: 20upx;
        display: flex;
        align-items: center;
        image {
          width: 45upx;
          height: 45upx;
        }
        text {
          font-size: 30upx;
          color: #333;
          padding-left: 20upx;
        }
      }
      image {
        width: 45upx;
        height: 45upx;
        margin-right: 20upx;
      }
    }
  }
  .btns {
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btnOn {
      background: linear-gradient(to right, #fc4343, #cf0505);
      border-radius: 50upx;
      border: 4upx solid #000;
      width: 280upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
