<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="我的收藏"
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
            <view v-if="alllist == null"></view>
            <view v-else-if="alllist.length > 0" class="allOrder">
              <view class="contCon" :style="index%2 == 0 ? 'margin-left:20rpx' : ''" v-for="(item,index) in alllist" :key="index" @click="gotoShopDetail(item.shopId)">
              <!-- <view class="huodongtt">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/huodongmo.png"
                  mode="widthFix"
                ></image>
                <text>最新·超值</text>
              </view> -->
              <view class="huodongbb">
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/hudongBtn.png"
                    mode="widthFix"
                  ></image
                  ><text>{{ item.name }}</text>
                </view>
                <view class="bbno2">{{item.address}}</view>
                
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/huodongno.png"
                mode="widthFix"
              ></image>
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
            <view v-if="meishiList == null"></view>
            <view v-else-if="meishiList.length > 0" class="allOrder">
              <view class="contCon" :style="index%2 == 0 ? 'margin-left:20rpx' : ''" v-for="(item,index) in meishiList" :key="index" @click="gotoShopDetail(item.shopId)">
              <!-- <view class="huodongtt">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/huodongmo.png"
                  mode="widthFix"
                ></image>
                <text>最新·超值</text>
              </view> -->
              <view class="huodongbb">
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/hudongBtn.png"
                    mode="widthFix"
                  ></image
                  ><text>{{ item.name }}</text>
                </view>
                <view class="bbno2">{{item.address}}</view>
                
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/huodongno.png"
                mode="widthFix"
              ></image>
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
            <view v-if="gouwuList == null"></view>
            <view v-else-if="gouwuList.length > 0" class="allOrder">
              <view class="contCon" :style="index%2 == 0 ? 'margin-left:20rpx' : ''" v-for="(item,index) in gouwuList" :key="index" @click="gotoShopDetail(item.shopId)">
              <!-- <view class="huodongtt">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/huodongmo.png"
                  mode="widthFix"
                ></image>
                <text>最新·超值</text>
              </view> -->
              <view class="huodongbb">
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/hudongBtn.png"
                    mode="widthFix"
                  ></image
                  ><text>{{ item.name }}</text>
                </view>
                <view class="bbno2">{{item.address}}</view>
                
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/huodongno.png"
                mode="widthFix"
              ></image>
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
            <view v-if="xiuxianList == null"></view>
            <view v-else-if="xiuxianList.length > 0" class="allOrder">
              <view class="contCon" :style="index%2 == 0 ? 'margin-left:20rpx' : ''" v-for="(item,index) in xiuxianList" :key="index" @click="gotoShopDetail(item.shopId)">
              <!-- <view class="huodongtt">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/huodongmo.png"
                  mode="widthFix"
                ></image>
                <text>最新·超值</text>
              </view> -->
              <view class="huodongbb">
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/hudongBtn.png"
                    mode="widthFix"
                  ></image
                  ><text>{{ item.name }}</text>
                </view>
                <view class="bbno2">{{item.address}}</view>
                
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/huodongno.png"
                mode="widthFix"
              ></image>
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
import Tabs from "./components/tabss";
import TabPane from "./components/tabPane";
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
        { title: "美食" },
        { title: "购物" },
        { title: "休闲" },
      ],
      list: null,
      pageNum: 1,
      status: null,
      authStatus: "0",
      companyId: null,
      gouwuList:null,
      xiuxianList:null,
      meishiList:null,
      alllist:null
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
    this.current = opt.status;
      this.getOrderList();
  },
  onShow() {
    // this.current = 0
    // this.getOrderList()
    if (this.status == null) {
      this.getOrderList();
    } 
  },

  mounted() {
    // this.getOrderList();
  },
  methods: {
    tabsChange(index) {
      console.log(index, "5555");
      this.current = index;
      this.pageNum = 1;
        this.getOrderList();
    },
    gotoShopDetail(id){
      uni.navigateTo({
        url: "/subpages/pages/shopTop?id=" + id,
      });
    },
    getOrderList() {
      let sendData = {
        pageNum: this.pageNum,
        pageSize: 10,
      };

      this.$api.collentList(sendData).then((res) => {
        uni.hideLoading();
        if (this.pageNum == 1) {
          this.alllist = res.data.list;
          let meiList=[]
          res.data.list.map(item=>{
              if(item.categoryId==1){
                  meiList.push(item)
              }
          })
          this.meishiList = meiList
          let xiuList=[]
          res.data.list.map(item=>{
              if(item.categoryId==2){
                  xiuList.push(item)
              }
          })
          this.xiuxianList = xiuList
          let gouList=[]
          res.data.list.map(item=>{
              if(item.categoryId==3){
                  gouList.push(item)
              }
          })
          this.gouwuList = gouList

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
    // getLists() {
    //   let sendData = {
    //     pageNum: this.pageNum,
    //     pageSize: 10,
    //     num: this.status,
    //   };
    //   uni.showLoading({
    //     mask: true,
    //   });
    //   this.$api.getOrderLists(sendData).then((res) => {
    //     uni.hideLoading();
    //     if (this.pageNum == 1) {
    //       this.list = res.data.list;
    //       console.log(this.list, "6666666");
    //     } else {
    //       if (res.data.list.length == 0) {
    //         uni.showToast({
    //           title: "没有更多了",
    //           icon: "none",
    //         });
    //       } else {
    //         let newDataList = this.list.concat(res.data.list);
    //         this.list = newDataList;
    //       }
    //     }
    //   });
    // },
   
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
  background: #fff;
  width: 100%;
  height: 100%;
  .contCon {
      margin: 20upx 15upx;
      position: relative;
      width: 45%;
      height: 400upx;
      border-radius: 15upx;
      overflow: hidden;
      .huodongtt {
        position: absolute;
        width: 160upx;
        height: 50upx;
        background: rgb(251, 13, 22);
        top: 0;
        right: 0;
        border-radius: 0 0 0 15upx;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 30upx;
        }
        text {
          font-size: 22upx;
          color: #fff;
          padding-left: 8upx;
        }
      }
      .huodongbb {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10upx;
        width: 100%;
        .bbno1 {
          color: #fff;
          font-size: 28upx;
        }
        .bbno2 {
          color: #fff;
          font-size: 22upx;
          padding: 8upx 0;
          white-space: nowrap;
        }
        .bbno3 {
          display: flex;
          align-items: center;
          image {
            width: 40upx !important;
            height: 30upx !important;
          }
          text {
            font-size: 24upx;
            color: #fff;
          }
        }
      }
      image {
        width: 100%;
      }
    }
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
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
            width: 300upx;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 28upx;
            padding-left: 10upx;
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
