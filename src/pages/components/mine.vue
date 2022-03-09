<template>
  <view>
    <image
      class="indexbg"
      src="http://www.mingtongxa.com/wanzhuan/mingBg.png"
      mode="widthFix"
    ></image>
    <!-- <TopBar
      background="#fff"
      :back="false"
      :showSetting="true"
      barTitle="个人中心"
    /> -->
    <!-- <TopBar
      :background=" 'linear-gradient(to right, #0195fc, #0181eb)'"
      :back="false"
      :fontColor="'rgb(250, 250, 250)'"
      barTitle="个人中心"
    /> -->
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="headTop">
          <image
            src="http://www.mingtongxa.com/wanzhuan/headerBg.png"
            mode="widthFix"
          ></image>
          <navigator url="/snow/pages/message" hover-class="navigator-hover">
            <image
              class="xiaoxi"
              src="http://www.mingtongxa.com/wanzhuan/minexiaoxi.png"
              mode="widthFix"
            ></image>
          </navigator>
          <view class="header">
            <view class="headerLeft" v-if="!isLogin">
              <image :src="avatar" mode="widthFix"></image>
            </view>
            <view class="headerLeft" v-else>
              <image
                src="https://www.baibianlg.com/xcx/noheaderImg.png"
                mode="widthFix"
              ></image>
            </view>
            <view class="headerRight" v-if="!isLogin">
              <view class="no1">
                <view class="no1View">{{ nickName }}</view>
                <view class="dengji">一等级</view>
              </view>
              <!-- <view class="no1">
              
              <image v-if="authStatus==2" src="@/static/images/geren.png" mode="widthFix"></image>
              <image v-if="authStatus==2 && companyId!=null" src="@/static/images/qiye.png" mode="widthFix"></image>
            </view> -->
              <view
                class="no2"
                v-if="shopList.length > 0"
                @click="gotoBang()"
                >{{ shopList[0].name }}</view
              >
              <view
                v-else
                style="color: #ccc; padding-top: 20rpx"
                @click="gotoBang()"
                >点此绑定商铺信息</view
              >
            </view>
            <view class="headerRight" v-else @click="gotoLogin">
              <view class="no1">
                <view
                  class="no1View"
                  style="font-weight: bold; font-size: 34upx"
                  >点此进行登录</view
                >
              </view>
              <view class="no2" style="font-size: 28upx"
                >完成登录，享受更多服务</view
              >
            </view>
          </view>
          <!-- <view class="headBtn">
            <view class="contBtn">
              <image
                src="http://www.mingtongxa.com/wanzhuan/jineya.png"
                mode="widthFix"
              ></image>
              <text>金额：1000</text>
            </view>
            <view class="contBtn">
              <image
                src="http://www.mingtongxa.com/wanzhuan/dianzan.png"
                mode="widthFix"
              ></image>
              <text>点赞：1000</text>
            </view>
            <view class="contBtn">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shoucang.png"
                mode="widthFix"
              ></image>
              <text>收藏：1000</text>
            </view>
          </view> -->
        </view>
        <view class="contentOrder">
          <view class="orderItem" @click="gotoOrder()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/mineno1.png"
              mode="widthFix"
            ></image>
            <text>订单</text>
          </view>
          <view class="orderItem">
            <image
              src="http://www.mingtongxa.com/wanzhuan/mineno2.png"
              mode="widthFix"
            ></image>
            <text>积分</text>
          </view>
          <view class="orderItem" @click="qianbao()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/mineno3.png"
              mode="widthFix"
            ></image>
            <text>钱包</text>
          </view>
          <view class="orderItem" @click="shoucang()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/mineno4.png"
              mode="widthFix"
            ></image>
            <text>收藏</text>
          </view>
        </view>
        <view class="function">
          <view class="func1" @click="pageTo(1)" style="margin-top: 20upx">
            <view class="func1Header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/tuiguang.png"
                mode="widthFix"
              ></image>
              <view>推广专属</view>
            </view>
            <image
              class="toright"
              src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="func1" @click="pageTo(2)">
            <view class="func1Header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shangwu.png"
                mode="widthFix"
              ></image>
              <view>商务合作</view>
            </view>
            <image
              class="toright"
              src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
              mode="widthFix"
            ></image>
          </view>
          <!-- <view class="func1" @click="pageTo(3)" v-if="shopList.length>0"> -->
          <view class="func1" @click="pageTo(3)">
            <view class="func1Header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shangpu.png"
                mode="widthFix"
              ></image>
              <view>商铺管理</view>
            </view>
            <image
              class="toright"
              src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="func1" @click="pageTo(4)">
            <view class="func1Header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/lianxi.png"
                mode="widthFix"
              ></image>
              <view>联系客服</view>
            </view>
            <image
              class="toright"
              src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="func1" @click="pageTo(5)">
            <view class="func1Header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/yaoqing.png"
                mode="widthFix"
              ></image>
              <view>邀请分享</view>
            </view>
            <image
              class="toright"
              src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
              mode="widthFix"
            ></image>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      visible: false,
      IMG_BEFORE_URL,
      avatar: "",
      nickName: uni.getStorageSync("nickName"),
      isLogin: uni.getStorageSync("isLogin"),
      changeIndex: 1,
      authStatus: 0,
      objExpEn: false,
      companyId: null,
      shopList: [],
    };
  },
  watch: {},
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  onLoad() {},

  mounted() {
    if (!uni.getStorageSync("isLogin")) {
      (this.isLogin = uni.getStorageSync("isLogin")), this.getUser();
    }
  },
  methods: {
    gotoLogin() {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    },
    gotoOrder() {
      uni.navigateTo({
        url: "/subpages/pages/orderList",
      });
    },
    gotoMyNull() {
      uni.navigateTo({
        url: "/pages/pages/payOrder",
      });
    },
    gotoBang() {
      uni.navigateTo({
        url: "/subpages/pages/bangding",
      });
    },
    gotoMyOrder(id) {
      this.$comfun.userLogin(() => {
        uni.navigateTo({
          url: "/subpages/pages/orderList?current=" + id,
        });
      });
    },
    shoucang() {
      uni.navigateTo({ url: "/nopages/pages/shoucang" });
    },
    qianbao() {
      uni.navigateTo({ url: "/nopages/pages/moneyBox" });
    },
    kaifapiao() {
      uni.navigateTo({ url: "/subpages/pages/fapiao" });
    },
    gotodizhi() {
      uni.navigateTo({ url: "/subpages/pages/myAddress" });
    },
    gotoNullOrder() {
      uni.navigateTo({ url: "/pages/pages/nullOrder" });
    },
    gotoMyRenwu(id) {
      this.$comfun.userLogin(() => {
        uni.navigateTo({
          url: "/subpages/pages/renwuList?status=" + id,
        });
      });
    },
    changeRenwu(index) {
      this.changeIndex = index;
      //  if(index==1){
      //    uni.navigateTo({
      //   url: "/subpages/pages/orderList?status=" + 0,
      // });
      //  }else if(index==2){
      //    uni.navigateTo({
      //   url: "/subpages/pages/renwuList?status=" + 0,
      // });
      //  }
    },
    getUser() {
      this.isLogin = false;
      // uni.showLoading({
      //   mask: true
      // })
      let sendData = {
        userId: uni.getStorageSync("userId"),
      };
      this.$api.userMsg(sendData).then((res) => {
        // uni.hideLoading()
        this.authStatus = Number(res.data.authStatus);
        this.companyId = res.data.companyId;
        this.avatar = res.data.userInfo.avatar;
        // var Expression = /^https/;
        // if (Expression.test(res.data.avatar)) {
        //   console.log
        //   this.avatar = res.data.avatar;
        // } else {
        //   this.avatar = IMG_BEFORE_URL + res.data.avatar;
        // }
        this.shopList = res.data.shopList;
        this.nickName = res.data.nickName;
      });
    },
    pageTo(index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/subpages/pages/tuiguang",
        });
      } else if (index == 2) {
        uni.navigateTo({
          url: "/subpages/pages/swhz",
        });
      } else if (index == 3) {
        uni.navigateTo({
          url: "/subpages/pages/spgl",
        });
      } else if (index == 4) {
       uni.navigateTo({
          url: "/snow/pages/aboutMine",
        });
      } else if (index == 5) {
        uni.navigateTo({
          url: "/snow/pages/invite",
        });
      }
    },
    gotoChangeMsg(url) {
      uni.navigateTo({
        url,
      });
    },
    gotoMoneyBox() {},
    callKefu() {
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    },
    goPhone() {
      uni.makePhoneCall({
        phoneNumber: "400-029-4234",
        success: (res) => {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.indexbg {
  position: absolute;
  left: 0;
  width: 100% !important;
  top: -5upx;
  left: 0;
  z-index: 999;
  height: 350upx !important;
}
.userBox {
  position: relative;
  width: 100%;
  z-index: 1000;
  image {
    top: 50upx;
    position: absolute;
    width: 100%;
  }
}

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
.pageContainer {
  width: 100%;
  height: 115%;
  position: absolute;
  z-index: 10001;
  .headTop {
    width: 98%;
    margin: 0 1%;
    height: 300upx;
    position: relative;
    image {
      position: absolute;
      width: 100%;
      height: 300upx !important;
    }
    .xiaoxi {
      position: absolute;
      width: 60upx !important;
      height: 53upx !important;
      right: 30upx;
      top: 30upx;
    }
    .header {
      position: absolute;
      top: 50upx;
      width: 100%;
      padding: 0 50upx;
      display: flex;
      align-items: center;
      .headerLeft {
        width: 150upx;
        height: 150upx;
        margin: 20upx 0upx 0 0upx;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 150upx !important;
          height: 150upx !important;
          border-radius: 50%;
        }
      }
      .headerRight {
        padding-left: 20upx;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 20upx;
        color: #000;
        .no1 {
          height: 50upx;
          display: flex;
          align-items: center;
          .dengji {
            border: 1upx solid #363636;
            border-radius: 10upx;
            padding: 5upx 10upx;
          }
          .no1View {
            margin-right: 16upx;
            font-size: 32upx;
            font-weight: bold;
          }
          image {
            width: 36upx;
            height: 40upx;
            margin: 0 10upx 0 0;
          }
        }
        .no2 {
          font-size: 26upx;
          font-weight: normal;
          padding-top: 25upx;
        }
      }
    }
    .headBtn {
      width: 98%;
      margin: 0 1%;
      position: absolute;
      bottom: 10upx;
      left: 0;
      height: 100upx;
      display: flex;
      justify-content: center;
      align-items: center;
      .contBtn {
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28upx;
        color: #000;
        white-space: nowrap;
        image {
          position: static;
          width: 60upx !important;
          height: 60upx !important;
        }
        text {
          padding-left: 10upx;
        }
      }
    }
  }
  .contentOrder {
    width: 100%;
    height: 200upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .orderItem {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      image {
        width: 100upx;
      }
      text {
        font-size: 32upx;
        color: #000;
        padding-top: 10upx;
        font-weight: 600;
      }
    }
  }
  .money {
    width: 96%;
    height: 180upx;
    display: flex;
    color: #333;
    font-weight: bold;
    margin: 0 2% 16upx;
    box-shadow: 0px 9upx 19upx 5upx rgba(93, 186, 255, 0.26);
    .moneyLeft {
      width: 25%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      .naverBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        image {
          width: 88upx;
          height: 60upx;
          margin-bottom: 40upx;
        }
        text {
          padding-top: 105upx;
          font-size: 28upx;
          font-weight: normal;
          color: #333;
        }
        z-index: 20;
      }
      image {
        position: absolute;
        width: 86%;
      }
      .icon {
        padding-top: 16upx;
      }
    }
  }
  .statusBox {
    width: 100%;
    height: 470upx;
    border-radius: 25upx;
    box-shadow: 0px 9upx 19upx 5upx rgba(93, 186, 255, 0.26);
  }
  .status {
    width: 96%;
    height: 210upx;
    margin: 20upx 2% 0;
    .staHeader {
      margin-left: 20upx;
      width: 96%;
      height: 80upx;
      display: flex;
      align-items: center;
      color: #333;
      .headIm {
        display: flex;
        align-items: center;
        image {
          width: 10upx;
          height: 50upx !important;
        }
        text {
          padding-left: 10upx;
        }
      }
      .active {
        text-align: center;
        line-height: 60upx;
        color: #fff;
        background: #0198fe;
        border-radius: 30upx 30upx 0 30upx;
      }
      view {
        width: 170upx;
        height: 60upx;
        font-size: 30upx;
        font-weight: bold;
        text-align: center;
        line-height: 60upx;
      }

      image {
        width: 40upx;
        height: 40upx;
      }
    }
    .staContent {
      color: #333;
      font-size: 26upx;
      width: 100%;
      height: 150upx;
      border-radius: 0 0 30upx 30upx;
      display: flex;
      justify-content: center;
      align-items: center;
      .conIcon {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28upx;
        color: #333;
        view {
          padding-top: 20upx;
        }
        image {
          width: 60upx;
        }
      }
    }
  }
  .statuss {
    width: 96%;
    height: 500upx;
    margin: 20upx 2%;
    border-radius: 30upx;
    box-shadow: 5px 0px 20px 0px #e7ecfb;
    .staHeader {
      width: 96%;
      height: 100upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      view {
        padding-left: 25upx;
        padding-top: 30upx;
        font-size: 28upx;
        font-weight: bold;
      }
      image {
        width: 50upx;
        height: 50upx;
      }
    }
    .staContent {
      color: #333;
      font-size: 28upx;
      width: 100%;
      height: 150upx;
      border-radius: 0 0 30upx 30upx;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .conIcon {
        display: flex;
        width: 25%;
        height: 150upx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28upx;
        color: #333;
        view {
          padding-top: 20upx;
        }
        image {
          width: 60upx;
        }
      }
    }
  }
  .function {
    width: 96%;
    margin: 2%;
    border-radius: 60upx;
    height: 560upx;
    box-shadow: 0px -2px 17px 2px rgba(239, 0, 0, 0.24);
    display: flex;
    flex-direction: column;
    text {
      font-size: 32upx;
      font-weight: bold;
      padding: 30upx 25upx;
    }
    .func1 {
      width: 100%;
      height: 100upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28upx;
      color: #000000;
      .toright {
        width: 22upx !important;
        height: 45upx !important;
        margin-right: 30upx;
      }

      .func1Header {
        display: flex;
        align-items: center;
        image {
          width: 50upx;
          height: 50upx;
          margin: 0 25upx;
        }
        view {
          padding-left: 10upx;
          font-size: 32upx;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
