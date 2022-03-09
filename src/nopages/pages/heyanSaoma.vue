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
      barTitle="核验扫码"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view
            >提示：输入需要核销的卡卷编号，点击查询后，确认
            卡卷信息无误则点击核销按钮，完成卡卷核销。</view
          >
        </view>
        <view class="content">
          <view class="row">
            <view class="nominal">核销编码</view>
            <view class="input">
              <input
                placeholder="核销码"
                placeholder-style="color:#000"
                disabled
                v-model="quanCode"
                type="text"
              />
            </view>
          </view>
        </view>
        <view class="content">
          <view class="row">
            <view class="nominal">代金券名称</view>
            <view class="input">
              <input
                placeholder="代金券名称"
                placeholder-style="color:#000"
                disabled
                v-model="name"
                type="text"
              />
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="address">
          <view class="addressLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai1.png"
              mode="widthFix"
            ></image>
            <text>开始使用时间</text>
          </view>
          <view class="addressRight">
            <picker
              class="changeTime"
              mode="date"
              :value="date"
              fields="day"
              :start="startDate"
              :end="endDate"
              @change="changeTime"
            >
              <!-- <text style="color:#000000;font-weight:600" v-if="time==''">请选择开始使用时间</text> -->
              <!-- <text style="color:#000000;font-weight:600" v-else>{{ time }}</text> -->
              <text style="color:#000000;font-weight:600">{{ start }}</text>
            </picker>
          </view>
        </view>
        <view class="address">
          <view class="addressLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai2.png"
              mode="widthFix"
            ></image>
            <text>结束使用时间</text>
          </view>
          <view class="addressRight">
            <picker
              class="changeTime"
              mode="date"
              :value="date"
              fields="day"
              :start="startDate"
              :end="endDate"
              @change="changeTimes"
            >
              <!-- <text style="color:#000000;font-weight:600" v-if="times==''">请选择结束使用时间</text>
                <text style="color:#000000;font-weight:600" v-else>{{ times }}</text> -->
              <text style="color:#000000;font-weight:600">{{ end }}</text>
            </picker>
          </view>
        </view>
        <view class="btns">
          <view class="btnOn" @click="gotoSure()">确认核销</view>
          <view class="btnOns" @click="gotoElect()">取消</view>
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
      quanCode: "",
      shopId: "",
      start: "",
      end: "",
      name: "",
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
    this.shopId = opt.shopId;
    this.quanCode = opt.number;
    this.start = opt.start;
    this.end = opt.end;
    this.name = opt.name;
  },
  methods: {
    gotoSure() {
      var that = this;
      uni.showModal({
        title: "提示",
        content: "确定核验该代金券吗？",
        success: function(res) {
          if (res.confirm) {
            let sendData = {
              shopId: that.shopId,
              voucherCode: that.quanCode,
            };
            uni.showLoading();
            that.$api.successShopList(sendData).then((ress) => {
              uni.hideLoading();
              if (ress.code == 200) {
                uni.showToast({
                  title: "核验成功",
                  icon: "none",
                  duration: 1000,
                });
                setTimeout(() => {
                  uni.navigateBack();
                }, 1500);
              }
            });
          } else if (res.cancel) {
            uni.showToast({
              title: "操作取消",
              icon: "none",
              duration: 1500,
            });
            console.log("用户点击取消");
          }
        },
      });
    },
    gotoElect() {
      uni.showModal({
        title: "提示",
        content: "确定取消当前核验吗？",
        success: function(res) {
          if (res.confirm) {
            uni.navigateBack();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .line {
    width: 100%;
    height: 40upx;
    background: #f5f6f7;
  }
  .btns {
    width: 100%;
    height: 200upx;
    margin-top: 30upx;
    display: flex;
    flex-direction: column;
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
    .btnOns {
      background: #fff;
      margin-top: 40upx;
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
  .address {
    margin-top: 20upx;
    padding: 10upx 20upx;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .addressLeft {
      width: 250upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .addressRight {
      font-size: 28upx;
      width: 96%;
      margin: 10upx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      picker {
        width: 100%;
        height: 60upx;
        border: 3upx solid #000;
      }
      .changeTime {
        display: flex;
        align-items: center;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
      }
      .changeTimes {
        display: flex;
        align-items: center;
        padding: 10upx 0;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
        font-weight: bold;
        font-size: 28upx;
      }
      text {
        font-size: 28upx;
        color: #db0000;
        font-weight: bold;
      }
      image {
        width: 45upx;
        height: 45upx;
      }
    }
  }
  .header {
    width: 96%;
    margin: 20upx 2%;
    height: 120upx;
    border-radius: 15upx;
    background: rgba(248, 205, 205);
    color: #db0000;
    font-size: 24upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20upx 30upx;
    line-height: 24px;
  }
  .content {
    background: #fff;
    border-radius: 20upx;
    padding: 20upx;

    .row {
      display: flex;
      min-height: 90upx;
    }
    .genderRadio {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: 20upx;
      .radioItemWrap {
        display: flex;
        align-items: center;
        image {
          width: 34upx;
          height: 34upx;
          margin-right: 12upx;
        }
      }
      .radioItemWrap:first-child {
        margin-right: 30upx;
      }
    }
    .row .nominal {
      width: 20%;
      line-height: 90upx;
      font-size: 28upx;
      font-weight: 600;
      color: #000;
    }

    .row .input {
      width: 71%;
      margin-left: 20upx;
      padding-left: 10upx;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        border: 3upx solid #000;
        border-radius: 10upx;
        height: 60upx;
        line-height: 60upx;
        font-size: 26upx;
        font-weight: 600;
        color: #000;
        padding-left: 20upx;
      }
    }

    & > view:last-child {
      border: none !important;
    }
  }
}
</style>
