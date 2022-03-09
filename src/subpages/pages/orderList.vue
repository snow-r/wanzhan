<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="我的订单"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <Tabs
          :TabList="TabList"
          :currentTab="current"
          @tabs="tabsChange"
          @scrolltolower="loadMore"
        >
          <TabPane>
            <view v-if="list == null"></view>
            <view v-else-if="list.length > 0" class="allOrder">
              <view
                class="orderDetail"
                v-for="(item, index) in list"
                :key="index"
                @click="gotoOrderDetail(item)"
              >
                <view class="header">
                  <view class="no55">
                    <image
                      class="headShop"
                      src="@/static/images/shopIcon.png"
                      mode="widthFix"
                    ></image>

                    <view>{{ item.shopName }}</view>
                    <image
                      class="headRhg"
                      src="@/static/images/right.png"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text v-if="item.status == 0">待支付</text>
                  <text v-else-if="item.status == 5">待使用</text>
                  <text v-else-if="item.status == 10">已完成</text>
                  <text v-else-if="item.status == 20">已取消</text>
                </view>
                <view class="content">
                  <view class="orderTop">
                    <view class="orderLeft">
                      <image
                        v-if="/^http/.test(item.shopDetail.imgUrl)"
                        :src="item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="
                          !/^http/.test(item.shopDetail.imgUrl) &&
                            item.shopDetail.imgUrl != ''
                        "
                        :src="IMG_BEFORE_URL + item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="item.shopDetail.imgUrl == ''"
                        src="@/static/images/noOrderImg.png"
                        mode="widthFix"
                      ></image>
                    </view>
                    <view class="orderRight">
                      <view class="rightTitle">
                        {{ item.detail }}
                      </view>
                      <view class="rightDetail">
                        <view class="rightRight">
                          <text>时间：</text>
                          <view
                            ><text
                              >{{ item.startTime }}~{{ item.endTime }}</text
                            >
                          </view>
                        </view>
                        <view class="rightRight">
                          {{ item.shopDetail.address }}
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="left"></view>
                  <view class="right">
                    <view
                      class="no1"
                      v-if="item.status <= 5"
                      @click.stop="cancelOrderList(item.id)"
                      >取消订单</view
                    >
                    <view
                      class="no1"
                      v-if="item.status == 0"
                      @click.stop="gotoPay(item.id, item.pay)"
                      >去支付</view
                    >
                    
                  </view>
                </view>
              </view>
            </view>
            <view class="nodatas" v-else>
              <image
                src="https://www.baibianlg.com/xcx/nodata.png"
                mode="widthFix"
              ></image>
            </view>
          </TabPane>
          <TabPane>
            <view v-if="list == null"></view>
            <view v-else-if="list.length > 0" class="allOrder">
              <view
                class="orderDetail"
                v-for="(item, index) in list"
                :key="index"
                @click="gotoOrderDetail(item)"
              >
                <view class="header">
                  <view class="no55">
                    <image
                      class="headShop"
                      src="@/static/images/shopIcon.png"
                      mode="widthFix"
                    ></image>

                    <view>{{ item.shopName }}</view>
                    <image
                      class="headRhg"
                      src="@/static/images/right.png"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text v-if="item.status == 0">待支付</text>
                  <text v-else-if="item.status == 5">待使用</text>
                  <text v-else-if="item.status == 10">已完成</text>
                  <text v-else-if="item.status == 20">已取消</text>
                </view>
                <view class="content">
                  <view class="orderTop">
                    <view class="orderLeft">
                      <image
                        v-if="/^http/.test(item.shopDetail.imgUrl)"
                        :src="item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="
                          !/^http/.test(item.shopDetail.imgUrl) &&
                            item.shopDetail.imgUrl != ''
                        "
                        :src="IMG_BEFORE_URL + item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="item.shopDetail.imgUrl == ''"
                        src="@/static/images/noOrderImg.png"
                        mode="widthFix"
                      ></image>
                    </view>
                    <view class="orderRight">
                      <view class="rightTitle">
                        {{ item.detail }}
                      </view>
                      <view class="rightDetail">
                        <view class="rightRight">
                          <text>时间：</text>
                          <view
                            ><text
                              >{{ item.startTime }}~{{ item.endTime }}</text
                            >
                          </view>
                        </view>
                        <view class="rightRight">
                          {{ item.shopDetail.address }}
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="left"></view>
                  <view class="right">
                    <view
                      class="no1"
                      v-if="item.status <= 5"
                      @click.stop="cancelOrderList(item.id)"
                      >取消订单</view
                    >
                    <view
                      class="no1"
                      v-if="item.status == 0"
                      @click.stop="gotoPay(item.id, item.pay)"
                      >去支付</view
                    >
                    
                  </view>
                </view>
              </view>
            </view>
            <view class="nodatas" v-else>
              <image
                src="https://www.baibianlg.com/xcx/nodata.png"
                mode="widthFix"
              ></image>
            </view>
          </TabPane>
          <TabPane>
            <view v-if="list == null"></view>
            <view v-else-if="list.length > 0" class="allOrder">
              <view
                class="orderDetail"
                v-for="(item, index) in list"
                :key="index"
                @click="gotoOrderDetail(item)"
              >
                <view class="header">
                  <view class="no55">
                    <image
                      class="headShop"
                      src="@/static/images/shopIcon.png"
                      mode="widthFix"
                    ></image>

                    <view>{{ item.shopName }}</view>
                    <image
                      class="headRhg"
                      src="@/static/images/right.png"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text v-if="item.status == 0">待支付</text>
                  <text v-else-if="item.status == 5">待使用</text>
                  <text v-else-if="item.status == 10">已完成</text>
                  <text v-else-if="item.status == 20">已取消</text>
                </view>
                <view class="content">
                  <view class="orderTop">
                    <view class="orderLeft">
                      <image
                        v-if="/^http/.test(item.shopDetail.imgUrl)"
                        :src="item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="
                          !/^http/.test(item.shopDetail.imgUrl) &&
                            item.shopDetail.imgUrl != ''
                        "
                        :src="IMG_BEFORE_URL + item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="item.shopDetail.imgUrl == ''"
                        src="@/static/images/noOrderImg.png"
                        mode="widthFix"
                      ></image>
                    </view>
                    <view class="orderRight">
                      <view class="rightTitle">
                        {{ item.detail }}
                      </view>
                      <view class="rightDetail">
                        <view class="rightRight">
                          <text>时间：</text>
                          <view
                            ><text
                              >{{ item.startTime }}~{{ item.endTime }}</text
                            >
                          </view>
                        </view>
                        <view class="rightRight">
                          {{ item.shopDetail.address }}
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="left"></view>
                  <view class="right">
                    <view
                      class="no1"
                      v-if="item.status <= 5"
                      @click.stop="cancelOrderList(item.id)"
                      >取消订单</view
                    >
                    <view
                      class="no1"
                      v-if="item.status == 0"
                      @click.stop="gotoPay(item.id, item.pay)"
                      >去支付</view
                    >
                    
                  </view>
                </view>
              </view>
            </view>
            <view class="nodatas" v-else>
              <image
                src="https://www.baibianlg.com/xcx/nodata.png"
                mode="widthFix"
              ></image>
            </view>
          </TabPane>
          <TabPane>
            <view v-if="list == null"></view>
            <view v-else-if="list.length > 0" class="allOrder">
              <view
                class="orderDetail"
                v-for="(item, index) in list"
                :key="index"
                @click="gotoOrderDetail(item)"
              >
                <view class="header">
                  <view class="no55">
                    <image
                      class="headShop"
                      src="@/static/images/shopIcon.png"
                      mode="widthFix"
                    ></image>

                    <view>{{ item.shopName }}</view>
                    <image
                      class="headRhg"
                      src="@/static/images/right.png"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text v-if="item.status == 0">待支付</text>
                  <text v-else-if="item.status == 5">待使用</text>
                  <text v-else-if="item.status == 10">已完成</text>
                  <text v-else-if="item.status == 20">已取消</text>
                </view>
                <view class="content">
                  <view class="orderTop">
                    <view class="orderLeft">
                      <image
                        v-if="/^http/.test(item.shopDetail.imgUrl)"
                        :src="item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="
                          !/^http/.test(item.shopDetail.imgUrl) &&
                            item.shopDetail.imgUrl != ''
                        "
                        :src="IMG_BEFORE_URL + item.shopDetail.imgUrl"
                        mode="widthFix"
                      ></image>
                      <image
                        v-else-if="item.shopDetail.imgUrl == ''"
                        src="@/static/images/noOrderImg.png"
                        mode="widthFix"
                      ></image>
                    </view>
                    <view class="orderRight">
                      <view class="rightTitle">
                        {{ item.detail }}
                      </view>
                      <view class="rightDetail">
                        <view class="rightRight">
                          <text>时间：</text>
                          <view
                            ><text
                              >{{ item.startTime }}~{{ item.endTime }}</text
                            >
                          </view>
                        </view>
                        <view class="rightRight">
                          {{ item.shopDetail.address }}
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="left"></view>
                  <view class="right">
                    <view
                      class="no1"
                      v-if="item.status <= 5"
                      @click.stop="cancelOrderList(item.id)"
                      >取消订单</view
                    >
                    <view
                      class="no1"
                      v-if="item.status == 0"
                      @click.stop="gotoPay(item.id, item.pay)"
                      >去支付</view
                    >
                   
                  </view>
                </view>
              </view>
            </view>
            <view class="nodatas" v-else>
              <image
                src="https://www.baibianlg.com/xcx/nodata.png"
                mode="widthFix"
              ></image>
            </view>
          </TabPane>
        </Tabs>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import Tabs from "../components/tabss";
import TabPane from "../components/tabPane";
import { IMG_BEFORE_URL } from "@/utils/app-config";

export default {
  components: {
    TopBar,
    Tabs,
    TabPane,
  },
  data() {
    return {
      current: 0,
      IMG_BEFORE_URL,
      TabList: [
        { title: "全部" },
        { title: "待使用" },
        { title: "已使用" },
        { title: "已取消" },
      ],
      list: null,
      pageNum: 1,
      status: null,
      authStatus: "0",
      companyId: null,
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
    this.getUser();
    this.current = opt.status;
    if (this.current == 0) {
      this.status = null;
    } else if (this.current == 1) {
      this.status = 5;
    } else if (this.current == 2) {
      this.status = 10;
    } else if (this.current == 3) {
      this.status = 20;
    }
    if (this.status == null) {
      this.getOrderList();
    } else {
      this.getLists();
    }
  },
  onShow() {
    // this.current = 0
    // this.getOrderList()
    if (this.status == null) {
      this.getOrderList();
    } else {
      this.getLists();
    }
  },

  mounted() {
    // this.getOrderList();
  },
  methods: {
    getUser() {
      let sendData = {
        userId: uni.getStorageSync("userId"),
      };
      this.$api.userMsg(sendData).then((res) => {
        this.authStatus = Number(res.data.authStatus);
        this.companyId = res.data.companyId;
      });
    },
    tabsChange(index) {
      console.log(index, "5555");
      this.current = index;
      if (index == 0) {
        this.status = null;
      } else if (index == 1) {
        this.status = 5;
      } else if (index == 2) {
        this.status = 10;
      } else if (index == 3) {
        this.status = 20;
      }
      this.pageNum = 1;
      if (this.status == null) {
        this.getOrderList();
      } else {
        this.getLists();
      }
    },
    getOrderList() {
      let sendData = {
        pageNum: this.pageNum,
        pageSize: 10,
      };

      this.$api.getOrderList(sendData).then((res) => {
        uni.hideLoading();
        if (this.pageNum == 1) {
          this.list = res.data.list;
        } else {
          if (res.data.list.length == 0) {
            uni.showToast({
              title: "没有更多了",
              icon: "none",
            });
          } else {
            let newDataList = this.list.concat(res.data.list);
            this.list = newDataList;
          }
        }
      });
    },
    getLists() {
      let sendData = {
        pageNum: this.pageNum,
        pageSize: 10,
        num: this.status,
      };
      uni.showLoading({
        mask: true,
      });
      this.$api.getOrderLists(sendData).then((res) => {
        uni.hideLoading();
        if (this.pageNum == 1) {
          this.list = res.data.list;
          console.log(this.list, "6666666");
        } else {
          if (res.data.list.length == 0) {
            uni.showToast({
              title: "没有更多了",
              icon: "none",
            });
          } else {
            let newDataList = this.list.concat(res.data.list);
            this.list = newDataList;
          }
        }
      });
    },
    gotoPay(id, pay) {
      uni.navigateTo({
        url: "/subpages/pages/payNumber?number=" + pay + "&orderId=" + id,
      });
    },
    gotoPinglun() {
      uni.navigateTo({
        url: "/subpages/pages/orderComment?id=" + item.id,
      });
    },
    cancelOrderList(id) {
      var that = this;
      console.log(that, "4444444");
      uni.showModal({
        title: "",
        content: "确定取消该订单吗？",
        success: function(res) {
          if (res.confirm) {
            let sendData = {
              id: id,
            };
            uni.showLoading();
            that.$api.cancelOrder(sendData).then((ress) => {
              uni.hideLoading();
              if (ress.code == 200) {
                setTimeout(() => {
                  uni.showToast({
                    title: "取消订单成功",
                    icon: "none",
                    duration: 1500,
                  });
                }, 1500);
                that.pageNum = 1;
                if (that.status == null) {
                  that.getOrderList();
                } else {
                  that.getLists();
                }
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
    loadMore() {
      this.pageNum += 1;
      uni.showLoading({
        title: "加载中",
      });
      uni.hideLoading();
      this.getDataList();
    },
    gotoOrderDetail(item) {
      let price = null;
      if (this.companyId != null) {
        price = item.receiveCompanyPay;
      } else {
        price = item.receivePay;
      }
      uni.navigateTo({
        url: "/subpages/pages/renwuDetail?id=" + item.id + "&prices=" + price,
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
  .nodatas {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: 100%;
    }
    text {
      color: #3e3e3e;
      font-size: 28upx;
      padding-top: 30upx;
    }
  }
  .allOrder {
    width: 96%;
    height: 100%;
    margin: 15upx 2% 0;
    background: #f5f7ff;
    .orderDetail {
      width: 100%;
      height: 380upx;
      padding: 20upx;
      margin-bottom: 20upx;
      background: #fff;
      .header {
        display: flex;
        justify-content: space-between;
        font-size: 30upx;
        font-weight: bold;
        .no55 {
          display: flex;
          align-items: center;
          view {
            // width: 300upx;

            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 28upx;
            padding: 0 10upx;
          }
        }
        .headShop {
          width: 32upx;
        }
        .headRhg {
          width: 22upx;
        }
        text {
          color: #db0000;
          font-weight: normal;
          font-size: 28upx;
        }
      }
      .content {
        width: 100%;
        height: 220upx;
        margin-top: 20upx;
        border-radius: 10upx;
        .orderTop {
          width: 96%;
          margin: 2%;
          height: 230upx;
          display: flex;
          .orderLeft {
            width: 30%;
            height: 230upx;
            display: flex;
            align-items: center;
            padding-left: 20upx;
            image {
              width: 100%;
              height: 86% !important;
            }
          }
          .orderRight {
            display: flex;
            width: 70%;
            flex-direction: column;
            justify-content: center;
            .rightTitle {
              font-size: 32upx;
              font-weight: bold;
              color: #000;
              padding: 0upx 0 20upx 20upx;
            }
          }
          .rightDetail {
            display: flex;
            width: 100%;
            color: #000;
            font-size: 28upx;
            flex-direction: column;
            padding-top: 30upx;
            .rightLeft {
              display: flex;
              padding: 0 20upx;
              justify-content: space-between;
            }
            .rightRight {
              display: flex;
              padding: 5upx 20upx;
            }
          }
        }
      }
      .bottom {
        width: 100%;
        height: 80upx;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          image {
            width: 20upx;
            height: 20upx;
          }
          text {
            padding-left: 15upx;
          }
        }
        .right {
          display: flex;
          // width: 260upx;
          align-items: center;
          justify-content: center;
          view {
            width: 120upx;
            margin: 0 5upx;
            height: 45upx;
            text-align: center;
            line-height: 45upx;
            border: 1upx solid #999;
            color: #999;
            border-radius: 20upx;
          }
          text {
            width: 80upx;
            height: 45upx;
            text-align: center;
            line-height: 45upx;
            border: 1upx solid #7472ff;
            color: #999;
            margin-left: 20upx;
            border-radius: 20upx;
          }
        }
      }
    }
  }
}
</style>
