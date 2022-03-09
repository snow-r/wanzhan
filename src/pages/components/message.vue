<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="transparent"
      :back="false"
      :showSearchs="true"
      :showSetting="true"
      topText='购物'
      searchText="请输入店名"
      @search="doSearch"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="content">

        
        <view :class="flagss?'moreTop fixed':'moreTop'"
      :style="{
          top:
            flagss ? navHeight + 'px' : 0,
        }">
        <scroll-view class="toscrol" scroll-x>
          <block><view :class="change_index == -1 ? 'tocolX active' : 'tocolX'" @click="changeIndex" style="padding-left:0">离我最近</view></block>
          <block
            ><view
             :class="change_index === index ? 'tocolX active' : 'tocolX'"
              v-for="(ite, index) in shopLists"
              @click="changeIte(ite,index)"
              :key="index"
              >{{ ite.name }}</view
            ></block
          >
        </scroll-view>
      </view>
      <view class="more" v-if="change_index != -1" :style="'height:' + (610*shopOrder.itemList.length/2) + 'rpx'">
        <view class="txtCont" v-for="(nav,tips) in shopOrder.itemList" :key="tips" :style="tips%2!=0?'margin-left:5px':''" @click="gotoShopDetail(nav.objId)">
          <image
            src="http://www.mingtongxa.com/wanzhuan/tuijian1.png"
            mode="widthFix"
          ></image>
          <view class="conText">
            <view class="header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/xinpin.png"
                mode="widthFix"
              ></image>
              <view class="biaoqian">全店通用</view>
            </view>
            <view class="contet">
              <view class="no1">罗马街·</view>
              <view class="no1">{{nav.name}}</view>
              <view class="no2">
                <view class="noleft">
                  <image
                    src="@/static/images/addresss.png"
                    mode="widthFix"
                  ></image>
                  <text>北大街</text>
                </view>
                <view>2.2km</view>
              </view>
              <view class="no4">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/rexiao.png"
                  mode="widthFix"
                ></image>
                <text
                  >最热 北大街沿线特色小吃热榜第<text style="color:#E10101"
                    >3</text
                  >名</text
                >
              </view>
              <view class="no5">
                <view class="left">
                  <view class="left1">
                    <view class="leftno1">
                      <image
                        src="http://www.mingtongxa.com/wanzhuan/daijinquan1.png"
                        mode="widthFix"
                      ></image>
                      <text>代金券</text>
                    </view>
                    <view class="leftno2">
                      <image
                        src="http://www.mingtongxa.com/wanzhuan/shengyu.png"
                        mode="widthFix"
                      ></image>
                      <text>剩余40张</text>
                    </view>
                  </view>
                </view>
                <view class="right">正在抢购</view>
              </view>
            </view>
          </view>
        </view>

        
      </view>
      <view class="more" v-if="change_index == -1">
      <view class="txtCont" v-for="(nav,tips) in nearLists" :key="tips" :style="tips%2!=0?'margin-left:5px':''" @click="gotoShopDetail(nav.shopId)">
          <image
            src="http://www.mingtongxa.com/wanzhuan/tuijian1.png"
            mode="widthFix"
          ></image>
          <view class="conText">
            <view class="header">
              <image
                src="http://www.mingtongxa.com/wanzhuan/xinpin.png"
                mode="widthFix"
              ></image>
              <view class="biaoqian">全店通用</view>
            </view>
            <view class="contet">
              <view class="no1">{{nav.cates}}</view>
              <view class="no1">{{nav.name}}</view>
              <view class="no2">
                <view class="noleft">
                  <image
                    src="@/static/images/addresss.png"
                    mode="widthFix"
                  ></image>
                  <text>北大街</text>
                </view>
                <view>2.2km</view>
              </view>
              <view class="no4">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/rexiao.png"
                  mode="widthFix"
                ></image>
                <text
                  >最热 北大街沿线特色小吃热榜第<text style="color:#E10101"
                    >3</text
                  >名</text
                >
              </view>
              <view class="no5">
                <view class="left">
                  <view class="left1">
                    <view class="leftno1">
                      <image
                        src="http://www.mingtongxa.com/wanzhuan/daijinquan1.png"
                        mode="widthFix"
                      ></image>
                      <text>代金券</text>
                    </view>
                    <view class="leftno2">
                      <image
                        src="http://www.mingtongxa.com/wanzhuan/shengyu.png"
                        mode="widthFix"
                      ></image>
                      <text>剩余40张</text>
                    </view>
                  </view>
                </view>
                <view class="right">正在抢购</view>
              </view>
            </view>
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
export default {
  components: {
    TopBar,
  },
  props: {
    dataList: {
      default: {},
    },
    dataListS: {
      default: [],
    },
  },
  data() {
    return {
      nums: 0,
      change_index:-1,
      shopLists:[],
      nearLists:[],
      shopOrder:[]
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
  onLoad() {
    // this.getnoList();
  },
  mounted() {
    this.getCityHot()
    this.getNearLists()
    // this.getMsgNum();
  },
  methods: {
    changeIte(item,index){
      console.log(item,'444')
      this.change_index = index
      this.shopOrder = item
    },
    changeIndex(){
      this.change_index = -1
    },
    gotoShopDetail(id) {
      uni.navigateTo({
        url: "/subpages/pages/shopTop?id=" + id,
      });
    },
    getCityHot() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
      };
      if (code) {
        this.$api.getLanmuList(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.shopLists = res.data.shop;
            this.newLists = res.data.new;
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    getNearLists() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
        classId: 3,
        x: uni.getStorageSync("longitude"),
        y: uni.getStorageSync("latitude"),
      };
      if (code) {
        this.$api.getNearList(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.nearLists = res.data
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #fff;
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    margin-top: 16upx;
    .moreTop {
  width: 100%;
  height: 100upx;
  padding: 20upx;
  font-size: 32upx;
  .toscrol {
    width: 100%;
    white-space: nowrap;
    height: 100%;
  }
  .tocolX {
    padding: 0 10upx;
    height: 100%;
    display: inline-block;
    position: relative;
  }
  .active {
    font-weight: 600;
    display: inline-block;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 60upx;
    height: 6upx;
    background: #e10101;
    border: 1upx solid #000;
    border-radius: 8upx;
    bottom: 0upx;
  }
}
.more {
  width: 98%;
  margin: 10upx 1%;
  background: #fff;
  border-radius: 30upx;
  display: flex;
  flex-wrap: wrap;
  .txtCont {
    margin-top:20upx;
    flex-wrap: wrap;
    width: 49%;
    position: relative;
    display: inline-block;
    height: 585upx;
    image {
      width: 100%;
      position: absolute;
    }
    .conText {
      position: absolute;
      width: 100%;
      height: 100%;
      .header {
        display: flex;
        justify-content: space-between;
        height: 63%;
        padding-right: 10upx;
        image {
          position: static;
          width: 100upx !important;
          height: 43upx !important;
        }
        .biaoqian {
          margin-top: 6upx;
          width: 110upx;
          height: 38upx;
          text-align: center;
          line-height: 35upx;
          color: #fff;
          font-size: 22upx;
          border-radius: 30upx;
          border: 1upx solid #000;
          background: #e10101;
        }
      }
      .contet {
        width: 100%;
        height: 37%;
        padding: 0 10upx;
        .no1 {
          font-size: 28upx;
          color: #fff;
          font-weight: 600;
        }
        .no2 {
          padding-top: 10upx;
          display: flex;
          justify-content: space-between;
          color: #fff;
          font-size: 22upx;
          align-items: center;
          .noleft {
            image {
              position: static;
              width: 19upx !important;
              height: 21upx !important;
              padding-right: 5upx;
            }
          }
        }
        .no4 {
          font-size: 19upx;
          background: #ffe801;
          border-radius: 8upx;
          height: 30upx;
          display: flex;
          align-items: center;
          margin-top: 10upx;
          image {
            position: static;
            width: 24upx !important;
            height: 26upx !important;
            padding-right: 3upx;
            padding-left: 2upx;
          }
        }
        .no5 {
          margin-top: 16upx;
          height: 50upx;
          align-items: flex-end;
          display: flex;
          justify-content: space-between;
          font-size: 22upx;
          color: #fff;
          .left {
            width: 64%;
            .left1 {
              display: flex;
              align-items: center;
              white-space: nowrap;
              align-items: flex-end;
            }
            .leftno1 {
              display: flex;
              align-items: center;
              image {
                position: static;
                width: 28upx !important;
                height: 28upx !important;
                padding-right: 3upx;
                padding-left: 2upx;
              }
              text {
                padding-left: 5upx;
                font-size: 22upx;
              }
            }
            .leftno2 {
              margin-left: 10upx;
              background: #e10101;
              border-radius: 30upx;
              display: flex;
              align-items: center;
              padding: 0 10upx 0 5upx;
              image {
                position: static;
                width: 16upx !important;
                height: 20upx !important;
                padding-right: 3upx;
                padding-left: 2upx;
              }
              text {
                padding-left: 5upx;
                font-size: 18upx;
              }
            }
          }
          .right {
            width: 36%;
            height: 42upx;
            background: #ffe801;
            border-radius: 30upx;
            color: #000;
            font-size: 26upx;
            font-weight: 600;
            text-align: center;
            line-height: 42upx;
            padding: 0 4upx;
          }
        }
      }
    }
  }
}
  }
}
</style>
