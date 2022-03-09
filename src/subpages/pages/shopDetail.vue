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
      barTitle="代金券详情"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <image
            class="hadimg"
            src="http://www.mingtongxa.com/wanzhuan/detailTitle.png"
            mode="widthFix"
          ></image>
          <view class="headBox">
            <view class="headno1">{{moneyOrder.shopDetail.name}}</view>
            <view class="headno2">￥<text>{{moneyOrder.price}}</text>代<text>{{moneyOrder.amount}}</text>元劵</view>
            <view class="headno3">{{moneyOrder.useTimeShow}}可用</view>
          </view>
          <view class="headPay">
            <view class="payLeft">
              <view class="payLeftTp">
                <view class="tops">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/detialYes.png"
                    mode="widthFix"
                  ></image>
                  <text>可叠加</text>
                </view>
                <view class="tops">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/detialYes.png"
                    mode="widthFix"
                  ></image>
                  <text>免预约</text>
                </view>
              </view>
              <view class="payRight">
                半年销量{{moneyOrder.saleNum}}+
              </view>
            </view>
            <view class="payBottom">
              <image
                src="http://www.mingtongxa.com/wanzhuan/detailMsg.png"
                mode="widthFix"
              ></image>
              <text>【12月4日更新】暂停接待</text>
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="center">
          <view class="title">购买须知</view>
          <view class="title1">有效期</view>
          <view class="title2">
            <image src="@/static/images/shopDian.png" mode="widthFix"></image>
            <text>{{moneyOrder.startTime}}至{{moneyOrder.endTime}}</text>
          </view>
          <view class="title1">不可用日期</view>
          <view class="title2">
            <image src="@/static/images/shopDian.png" mode="widthFix"></image>
            <text
              >{{moneyOrder.notUsable}}</text
            >
          </view>
          <view class="title1">使用时间</view>
          <view class="title2">
            <image src="@/static/images/shopDian.png" mode="widthFix"></image>
            <text>{{moneyOrder.useTimeShow}}，营业时间内</text>
          </view>
          <view class="title1">使用范围</view>
          <view v-html="moneyOrder.useRule"></view>
          <!-- <view class="title2">
            <image src="@/static/images/shopDian.png" mode="widthFix"></image>
            <text>{{moneyOrder.descr}}</text>
          </view>
          <view class="title1">使用规则</view>
          <view class="title2">
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>可用包间，条件为：提前咨询商家</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>发票问题请寻味商家</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>商家提供免费WIFI</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>停车位收费标准：咨询商家</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>堂食外带均可</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>团购用户不可同时享受商家其他优惠</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>酒水饮料等问题，请致电商家咨询，以商家反馈为准</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>使用代金劵用户，有限期一代金劵规则为准</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>不可叠加使用</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>不兑现，不找零</text>
            </view>
            <view>
              <image src="@/static/images/shopDian.png" mode="widthFix"></image>
              <text>无须预约，消费高峰期可能需要等位</text>
            </view>
          </view> -->
        </view>
        <!-- <view class="line"></view> -->
        <view class="bottom">
          <view class="message">
            <view class="left">
              <view>{{moneyOrder.shopDetail.name}}</view>
              <view class="pingfen">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                  mode="widthFix"
                ></image>
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                  mode="widthFix"
                ></image>
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                  mode="widthFix"
                ></image>
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                  mode="widthFix"
                ></image>
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                  mode="widthFix"
                ></image>
              </view>
            </view>
            <view class="right">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shopPhone.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="address">
            <view class="addLeft">
              <view class="lefts">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/detailAddress.png"
                  mode="widthFix"
                ></image>
                <view class="addLeft1">5.5km</view>
                <view class="addLeft2">{{moneyOrder.street}}</view>
              </view>
            </view>
            <view class="addRight">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shopToright.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="btms">
            <view class="btmLeft">
              <view class="btm1">
                <text>￥</text>
                {{moneyOrder.price}}
              </view>
              <view class="btm2">
                <view class="btmtop">{{((moneyOrder.price/moneyOrder.amount)*10).toFixed(1)}}折</view>
                <view class="btmbnn">￥{{moneyOrder.amount}}</view>
              </view>
            </view>
            <view class="btmRight">
              <view class="btns" @click="createList()">立即抢购</view>
            </view>
          </view>
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
      moneyOrder:{}
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
    this.moneyId = opt.id;
    this.getMoney()
  },
  methods: {
    getMoney() {
      uni.showLoading();
      let sendData = {
        id: this.moneyId,
      };
      this.$api.getMoneyDetail(sendData).then((res) => {
        uni.hideLoading();
        this.moneyOrder = res.data
      });
    },
    createList(){
      let sendData={
        shopId:this.moneyOrder.shopDetail.shopId,
        voucherId:this.moneyOrder.id,
        pay:this.moneyOrder.price,
        payable:this.moneyOrder.amount,
      }
      this.$api.setShopList(sendData).then(res=>{
        if (res.code == 200) {
          uni.navigateTo({
            url:
              "/subpages/pages/payNumber?number=" +
              res.data.pay +
              "&orderId=" +
              res.data.id
          });
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .header {
    width: 96%;
    height: 400upx;
    margin: 20upx 2%;
    position: relative;
    .hadimg {
      position: absolute;
      width: 100%;
    }
    .headBox {
      width: 100%;
      height: 70%;
      position: absolute;
      .headno1 {
        padding: 50upx 20upx 20upx 40upx;
        font-size: 32upx;
        font-weight: bold;
        color: #343434;
      }
      .headno2 {
        padding: 0upx 20upx 20upx 40upx;
        font-size: 46upx;
        font-weight: bold;
        color: #000;
      }
      .headno3 {
        padding: 0upx 20upx 20upx 40upx;
        font-size: 32upx;
        font-weight: bold;
        color: #343434;
      }
    }
    .headPay {
      width: 100%;
      height: 30%;
      position: absolute;
      bottom: 0;
      .payLeft {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .payLeftTp {
          width: 65%;
          height: 100%;
          display: flex;
          .tops {
            padding: 10upx;
            font-size: 32upx;
            font-weight: 600;
            color: #343434;
            display: flex;
            align-items: center;
            justify-content: center;
            text {
              padding-left: 6upx;
            }
            image {
              width: 30upx;
            }
          }
        }
      }
      .payBottom {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        padding: 10upx;
        image {
          width: 30upx;
        }
        text {
          font-size: 32upx;
          color: #343434;
          padding-left: 10upx;
        }
      }
      .payRight {
        width: 35%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30upx;
        color: #7a7b7c;
        font-weight: 500;
      }
    }
  }
  .center {
    width: 100%;
    padding: 30upx 30upx 350upx 30upx;
    .title {
      font-size: 34upx;
      font-weight: 600;
      color: #000;
      padding: 0 0 20upx 0;
    }
    .title1 {
      font-size: 28upx;
      font-weight: 600;
      color: #7c7c7e;
      padding: 0 0 15upx 0;
    }
    .title2 {
      padding-bottom: 20upx;
      view {
        padding-bottom: 10upx;
      }
      image {
        width: 8upx;
        margin-right: 10upx;
      }
      text {
        font-size: 28upx;
        font-weight: 600;
        color: #000;
      }
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 50upx;
    z-index: 10000;
    background: #fff;
    width: 100%;
    height: 300upx;
    padding: 30upx 30upx 0upx 30upx;
    .title {
      font-size: 34upx;
      font-weight: 600;
      color: #000;
      padding: 0 0 40upx 0;
    }
    .message {
      width: 100%;
      display: flex;
      align-items: center;
      height: 120upx;
      font-size: 34upx;
      font-weight: 600;
      color: #000;
      border-bottom: 2upx dashed #979797;
      .left {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .pingfen {
          display: flex;
          padding-top: 20upx;
          image {
            width: 38upx;
          }
        }
      }
      .right {
        width: 20%;
        height: 70%;
        border-left: 4upx dashed #979797;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 46upx;
        }
      }
    }
    .address {
      width: 100%;
      height: 90upx;
      display: flex;
      align-items: center;
      .addLeft {
        width: 90%;
        height: 100%;

        .lefts {
          height: 100%;
          display: flex;
          align-items: center;
        }
        image {
          width: 26upx;
          padding-right: 6upx;
        }
        .addLeft1 {
          font-size: 34upx;
          font-weight: 600;
          color: #000;
          padding-right: 20upx;
          border-right: 4upx dashed #979797;
        }
        .addLeft2 {
          padding-left: 20upx;
          font-size: 34upx;
          font-weight: 600;
          color: #000;
        }
      }
      .addRight {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 12upx;
        }
      }
    }
    .btms {
      width: 100%;
      height: 100upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btmLeft {
        width: 60%;
        display: flex;
        align-items: center;
        .btm1 {
          font-size: 58upx;
          font-weight: bold;
          color: #db0000;
          text {
            font-size: 34upx;
            font-weight: bold;
            color: #db0000;
          }
        }
        .btm2 {
          display: flex;
          flex-direction: column;
          .btmtop {
            font-size: 24upx;
            font-weight: bold;
            color: #db0000;
            border: 2upx solid #db0000;
          }
          .btmbnn {
            font-size: 24upx;
            font-weight: bold;
            color: #bfc0c1;
            text-decoration: line-through;
          }
        }
      }
      .btmRight {
        width: 40%;
        height: 100%;

        .btns {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 80%;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          background: #db0000;
          border-radius: 40upx;
          font-size: 40upx;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 26upx;
    background: #ebeced;
  }
}
</style>
