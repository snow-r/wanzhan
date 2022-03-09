<template>
  <view>
    <image
      class="indexbg"
      src="http://www.mingtongxa.com/wanzhuan/indexBg.png"
      mode="widthFix"
    ></image>
    <!-- <TopBar
      :background=" 'linear-gradient(to right, #0195fc, #0181eb)'"
      :back="false"
      :fontColor="'rgb(250, 250, 250)'"
      barTitle="百变零工"/> -->

    <scroll-view style="height:100%">
      <view
        class="container"
        :style="{
          height:
            navHeight < 70 ? navHeight + 580 + 'rpx' : navHeight + 560 + 'rpx',
        }"
      >
        <!-- <image src="@/static/images/bg.png" mode="widthFix"></image> -->
        <view class="outer" :style="'top:' + navHeight + 'px'">
          <view></view>
          <view
            class="header"
            :style="
              'padding-top:' +
                topHeight +
                'px;height:' +
                navHeight +
                'px;background:' +
                opacc
            "
          >
            <view class="headerLeft">
              <view class="adderss" @click="gotoSou">
                <image
                  src="@/static/images/sanjiao.png"
                  mode="widthFix"
                ></image>
                <text v-if="userCity" style="font-size:28upx">{{
                  userCity
                }}</text>
                <text v-else style="font-size:26upx">手动定位</text>
              </view>
            </view>
            <view class="headerRight">
              <view class="search" @click="gotoSearch">
                <view class="searchLeft">请输入店名</view>
                <view class="searchRight">
                  <image
                    src="@/static/images/sousuo.png"
                    @click="gotoServe"
                    mode="widthFix"
                  ></image>
                </view>
              </view>
            </view>
          </view>
          <view class="topHeader">
            <view @click="pageTo(1)">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quanbao1.png"
                mode="widthFix"
              ></image>
              <text>券包</text>
            </view>
            <view @click="pageTo(2)">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quanbao2.png"
                mode="widthFix"
              ></image>
              <text>折券</text>
            </view>
            <view @click="pageTo(3)">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quanbao3.png"
                mode="widthFix"
              ></image>
              <text>刚需特惠</text>
            </view>
            <view @click="pageTo(4)">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quanbao4.png"
                mode="widthFix"
              ></image>
              <text>添加商铺</text>
            </view>
          </view>
        </view>
      </view>
      <view class="swiper-home" @click="gotoSign()">
        <swiper
          class="swiper-home"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          :circular="true"
        >
          <swiper-item class="banner">
            <image
              src="http://www.mingtongxa.com/wanzhuan/qiandaoBanner.png"
              mode="widthFix"
            />
          </swiper-item>
        </swiper>
      </view>

      <view class="huodong">
        <view class="huodongTop">
          <view class="huodongLeft">最新抢购</view>
          <view class="huodongRight">
            <text>西安124671人正在抢购，快来！</text>
            <image src="@/static/images/totoright.png" mode="widthFix"></image>
          </view>
        </view>
        <!-- <view class="huodongCon"> -->
        <scroll-view class="toleft" scroll-x>
          <block v-for="(item, index) in newLists" :key="index">
            <view class="contCon" :style="index == 0 ? 'margin-left:0' : ''">
              <view class="huodongtt">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/huodongmo.png"
                  mode="widthFix"
                ></image>
                <text>最新·超值</text>
              </view>
              <view class="huodongbb">
                <view class="bbno1">{{ item.name }}</view>
                <view class="bbno2">川味火锅</view>
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/hudongBtn.png"
                    mode="widthFix"
                  ></image
                  ><text style="padding-left:8upx;color:#E10101">{{
                    item.voucherName
                  }}</text
                  ><text>代金券</text>
                </view>
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/huodongno.png"
                mode="widthFix"
              ></image>
            </view>
          </block>
        </scroll-view>
        <!-- </view> -->
      </view>
      <view class="staContent">
        <image
          src="http://www.mingtongxa.com/wanzhuan/huodongbg.png"
          mode="widthFix"
        ></image>
        <view class="titlecontent">
          <view class="titleLeft">
            <image
              src="@/static/images/xiaohongbao.png"
              mode="widthFix"
            ></image>
            <text>代金券分享</text>
          </view>
          <view class="titleRight">
            分享一次一元钱
          </view>
        </view>
        <view class="titleBg">
          <view class="titleImg">
            <view class="posMoney">
              <view class="moneyLeft">
                <view
                  ><text>{{ shareObj.price }}</text
                  >元代 <text>{{ shareObj.amount }}</text
                  >元券</view
                >
                <view class="nopr">
                  <image
                    src="@/static/images/xiaohongbao.png"
                    mode="widthFix"
                  ></image>
                  <text>成都火锅店高新店</text>
                </view>
              </view>
              <view class="moneyRight">
                <button open-type="share">
                  <image
                  src="http://www.mingtongxa.com/wanzhuan/zhuanfa.png"
                  mode="widthFix"
                ></image>
                </button>
                
              </view>
            </view>
            <image
              src="http://www.mingtongxa.com/wanzhuan/huodong1bg.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="moreAll">
            <view>更多</view>
            <image src="@/static/images/totoright.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
      <view
        :class="flags ? 'moreTop fixed' : 'moreTop'"
        :style="{
          top: flags ? navHeight + 'px' : 0,
        }"
      >
        <scroll-view class="toscrol" scroll-x>
          <block
            ><view
              :class="change_index == -1 ? 'tocolX active' : 'tocolX'"
              @click="changeIndex"
              style="padding-left:0"
              >离我最近</view
            ></block
          >
          <block
            ><view
              :class="change_index === index ? 'tocolX active' : 'tocolX'"
              v-for="(ite, index) in foodLists"
              @click="changeIte(ite, index)"
              :key="index"
              >{{ ite.name }}</view
            ></block
          >
        </scroll-view>
      </view>
      <view
        class="more"
        v-if="change_index != -1"
      >
        <view
          class="txtCont"
          v-for="(nav, tips) in shopOrder.itemList"
          :key="tips"
          :style="tips % 2 != 0 ? 'margin-left:5px' : ''"
          @click="gotoShopDetail(nav.objId)"
        >
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
        <view
          class="txtCont"
          v-for="(nav, tips) in nearLists"
          :key="tips"
          :style="tips % 2 != 0 ? 'margin-left:5px' : ''"
          @click="gotoShopDetail(nav.shopId)"
        >
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
    </scroll-view>
    <!-- <TabBar @tabChange="tabChange" :current="currentTabIndex" /> -->
  </view>
</template>

<script>
import topBar from "../../components/topIndex.vue";
import QQMapWX from "./../../utils/bmap-wx.js";
import { IMG_BEFORE_URL } from "@/utils/app-config";
import { returnStatement } from "@babel/types";
import { setTimeout } from "timers";
// import TabBar from '@/components/tabBar.vue'
var qqmapsdk;
export default {
  components: {
    topBar,
  },
  props: {
    userCity: {
      default: null,
    },
    scrollTop: {
      default: 0,
    },
    topsOll: {
      default: 0,
    },
    opacity: {
      default: 0,
    },
    flags: {
      default: false,
    },
    foodLists:{
      default: null,
    } ,
    newLists:{
      default: null,
    } ,
    nearLists:{
      default: null,
    } ,
    // bannerList:{
    //   default:[]
    // }
  },
  data() {
    return {
      userInfo: uni.getStorageSync("userId"),
      userId: 0,
      latitude: 0,
      longitude: 0,
      autoplay: true,
      interval: 2500,
      duration: 800,
      current: 1,
      bannerList: [],
      videoMsg: {},
      atticMsg: {},
      flag: false,
      IMG_BEFORE_URL,
      shopOrder: [],
      foodLists:[],
      newLists:[],
      nearLists:[],
      totoList: [
        {
          name: "jij",
        },
        {
          name: "jij",
        },
        {
          name: "jij",
        },
      ],
      change_index: -1,
      shareObj: {},
    };
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
    topHeight() {
      return uni.getStorageSync("topHeight");
    },
    opacc() {
      return "rgba(216, 0, 0, " + this.opacity + ")";
    },
  },
  onLaunch() {},
  onLoad(opt) {
    // this.getUserLocation()
  },
  onShow() {},
  mounted() {
    this.getCityHot();
    this.getNearLists();
    this.getIndexLists();
    // this.getCityHot();

    this.getShareList();
    const query = uni.createSelectorQuery().in(this);
    query
      .select(".moreTop")
      .boundingClientRect((data) => {
        this.scroTop = data.top;
        uni.setStorageSync("scroTop", data.top);
      })
      .exec();
    // this.getCityOrder();
    // this.$comfun.getUserCity(() => {});
  },
  onShareAppMessage(res){
    if(res.from == 'button'){
    }
		return {
				title: `好友送你1张80元代金券`,
				path: '/pages/index/index?myId='+userId+'&composId='+comsId+'&ids='+id,
				imageUrl: "http://www.mingtongxa.com/xcx/shareOmg.png"
			}
  },
  methods: {
    isLogin() {},
    getCityHot() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
      };
      if (code) {
        this.$api.getLanmuList(sendData).then((res) => {
          if (res.code == 200) {
            this.foodLists = res.data.food;
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
        classId: 1,
        x: uni.getStorageSync("longitude"),
        y: uni.getStorageSync("latitude"),
      };
      if (code) {
        this.$api.getNearList(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.nearLists = res.data;
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    gotoLink(item) {
      if (item.miniLink) {
        uni.navigateTo({
          url: item.miniLink,
        });
      }
    },
    gotoSign() {
      uni.navigateTo({
        url: "/subpages/pages/signIn",
      });
    },
    gotoShopDetail(id) {
      uni.navigateTo({
        url: "/subpages/pages/shopTop?id=" + id,
      });
    },
    playVideo(num) {
      if (num == 1) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },

    // scroll(e) {
    //   console.log(e,'4444444444')

    // },
    changeIte(item, index) {
      this.change_index = index;
      this.shopOrder = item;
      console.log(item, "44444");
    },
    changeIndex() {
      this.change_index = -1;
      // this.getNearLists()
    },
    gotoQiandao() {
      this.$comfun.userLogin(() => {
        uni.navigateTo({ url: "/nopages/pages/signIn" });
      });
    },
    gotoYouhui() {
      this.$comfun.userLogin(() => {
        uni.navigateTo({ url: "/pages/pages/coupon" });
      });
    },
    gotoXiyi() {
      uni.navigateTo({ url: "/nopages/pages/partyThree" });
    },
    getIndexLists() {
      this.$api.getIndexList().then((res) => {
        if (res.code == 200) {
          this.bannerList = res.data.bannerList;
          this.videoMsg = res.data.userProductList[0];
          this.atticMsg = res.data.arlist[0];
        }
      });
    },
    getCityOrder() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
      };
      if (code) {
        this.$api.getCityOrderList(sendData).then((res) => {
          if (res.code == 200) {
            this.bannerList = res.data.bannerList;
            this.videoMsg = res.data.userProductList[0];
            this.atticMsg = res.data.arlist[0];
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    pageTo(index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/pages/pages/quanbao",
        });
      } else if (index == 2) {
        // this.$comfun.userLogin(() => {
        uni.navigateTo({
          url: "/subpages/pages/chquan",
        });
        // });
      } else if (index == 3) {
        uni.navigateTo({
          url: "/subpages/pages/gxtehui",
        });
      } else if (index == 4) {
        uni.navigateTo({
          url: "/subpages/pages/addShop",
        });
      }
    },
    gotoDetail(item) {
      this.$comfun.userLogin(() => {
        uni.navigateTo({
          url: "/subpages/pages/msgDetail?id=" + this.atticMsg.id,
        });
      });
    },
    gotoUtilService() {
      uni.navigateTo({ url: "/subpages/pages/universalServie" });
    },
    gotoMine() {
      uni.navigateTo({
        url: "/pages/index/mine",
      });
    },
    gotoServie(id, idx, child) {
      uni.navigateTo({
        url:
          "/subpages/pages/allserveDetail?id=" +
          id +
          "&idx=" +
          idx +
          "&startId=" +
          child,
      });
    },
    gotoServies() {
      uni.navigateTo({
        url: "/nopages/pages/clothes",
      });
    },

    getShareList() {
      let code = uni.getStorageSync("quhao");
      let sendData = {
        code,
      };
      if (code) {
        this.$api.getIndexShare(sendData).then((res) => {
          console.log(res, "555");
          if (res.code == 200) {
            this.shareObj = res.data[0];
          }
        });
      } else {
        this.$comfun.Toast("请允许小程序获取您的位置信息", "none");
      }
    },
    gotoServices() {
      console.log(this, "55555555");
      this.$emit("tabChanges", this.current);
      // uni.navigateTo({
      //   url:"/subpages/pages/allServeIndex"
      // })
      //         uni.navigateTo({
      //         url:'/pages/index/index?idx='+2
      //       })
    },
    gotoSheng() {
      uni.navigateTo({ url: "/nopages/pages/shenghuo" });
    },
    gotoServe() {
      uni.navigateTo({
        url: "/subpages/pages/allServe",
      });
    },
    gotoSou() {
      uni.navigateTo({
        url: "/pages/pages/changeCity",
      });
    },
    gotoSearch() {
      uni.navigateTo({
        url: "/nopages/pages/indexSearch",
      });
    },
    gotoCoupon() {
      uni.navigateTo({
        url: "/pages/pages/coupon",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.bgcs {
  background: rgb(1, 135, 240) !important;
}
.noBgcs {
  background: transparent !important;
}
.indexbg {
  position: absolute;
  left: 0;
  width: 100%;
  top: -5upx;
}
.topHeader {
  width: 100%;
  height: 125upx;
  padding: 0 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28upx;
  view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  }
  image {
    width: 80upx;
  }
  text {
    color: #fff;
    padding-top: 10upx;
  }
}
.huodong {
  display: flex;
  flex-direction: column;
  height: 420upx;
  background: rgba(246, 183, 118, 0.55);
  border-radius: 30upx 30upx 0 0;
  padding: 0 10upx 0 10upx;
  .huodongTop {
    width: 100%;
    height: 100upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .huodongLeft {
      font-size: 34upx;
      color: #000;
      font-weight: 600;
    }
    .huodongRight {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        font-size: 28upx;
        color: rgb(0, 0, 0);
      }
      image {
        width: 29upx;
      }
    }
  }
  // .huodongCon {
  // width: 100%;
  // height: 320upx;
  .toleft {
    white-space: nowrap;
    width: 100%;
    height: 300upx;
    .contCon {
      display: inline-block;
      margin: 0 10upx;
      position: relative;
      width: 35%;
      height: 300upx;
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
        height: 134upx;
        .bbno1 {
          color: #fff;
          font-size: 28upx;
        }
        .bbno2 {
          color: #fff;
          font-size: 24upx;
          padding: 8upx 0;
        }
        .bbno3 {
          display: flex;
          align-items: center;
          image {
            width: 40upx !important;
            height: 30upx !important;
          }
          text {
            font-size: 22upx;
            color: #fff;
          }
        }
      }
      image {
        width: 100%;
      }
    }
  }
}
// }
.no20 {
  width: 100%;
  height: 250upx;
  margin-top: 30upx;
  border-radius: 20upx;
  box-shadow: 0px 9upx 19upx 5upx rgba(93, 186, 255, 0.26);
  display: flex;
  padding: 30upx 0 0 20upx;
  .nonoLeft {
    width: 40%;
  }
  image {
    width: 280upx;
    border-radius: 10upx;
  }
  .noRight {
    width: 60%;
    padding-left: 30upx;
    .right1 {
      font-size: 28upx;
      font-weight: bold;
      line-height: 40upx;
    }
    .right2 {
      color: rgb(109, 108, 108);
      font-weight: normal;
      font-size: 24upx;
      padding-top: 10upx;
    }
    .right3 {
      display: flex;
      padding-top: 20upx;
      height: 40upx;
      align-items: center;
      text {
        color: rgb(32, 150, 239);
        font-size: 24upx;
      }
      .aixin {
        display: flex;
        align-items: center;
        padding-left: 60upx;
        image {
          width: 24upx;
        }
        text {
          padding-left: 10upx;
        }
      }
    }
  }
}
.bannerCont {
  width: 96%;
  margin: 20upx 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  image {
    width: 746upx;
  }
}
.fixed {
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 999;
  background: #fff;
}
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
    padding: 0 30upx;
    height: 100%;
    display: inline-block;
    position: relative;
  }
  .active {
    font-weight: 600;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 90upx;
    height: 10upx;
    background: #e10101;
    border: 1upx solid #000;
    border-radius: 8upx;
    vertical-align: middle;
    bottom: 0upx;
  }
}
.more {
  width: 98%;
  margin: 10upx 1%;
  background: #fff;
  border-radius: 30upx;
  padding-bottom: 100upx;
  display: flex;
  flex-wrap: wrap;
  .txtCont {
    margin-top: 20upx;
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
.staContent {
  color: #333;
  font-size: 28upx;
  width: 96%;
  margin: 20upx 2% 20upx;
  height: 205upx;
  position: relative;
  .titlecontent {
    width: 100%;
    height: 80upx;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .titleLeft {
      display: flex;
      align-items: center;
      padding: 0 20upx;
      width: 250upx;
      image {
        width: 55upx !important;
      }
      text {
        font-size: 28upx;
        color: #fff;
        font-weight: bold;
        padding-left: 60upx;
      }
    }
    .titleRight {
      font-size: 22upx;
      font-weight: normal;
      color: #fff;
      padding-right: 20upx;
      font-weight: 500;
    }
  }
  .titleBg {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 120upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .moreAll {
      width: 100upx;
      font-size: 28upx;
      height: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      image {
        width: 16upx !important;
        height: 25upx !important;
        padding-left: 65upx;
      }
    }
    .titleImg {
      width: 98%;
      margin: 0 1%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      image {
        width: 86% !important;
      }
      .posMoney {
        position: absolute;
        width: 86%;
        height: 100%;
        z-index: 11;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .moneyLeft {
          width: 75%;
          height: 100%;
          padding-left: 150upx;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 32upx;
          color: #c1731a;
          font-weight: bold;
          text {
            font-size: 42upx;
            color: #fb0a16;
            font-weight: bold;
          }
          .nopr {
            height: 50upx;
            display: flex;
            align-items: center;
            image {
              width: 30upx !important;
              height: 30upx !important;
              border-radius: 50%;
            }
            text {
              padding-left: 35upx;
              font-size: 22upx;
              font-weight: bold;
              color: #000;
            }
          }
        }
        .moneyRight {
          width: 25%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          button{
            width: 100%;
            height: 100%;
            background: transparent;
            display: flex;
          justify-content: center;
          align-items: center;
          }
          image {
            width: 59upx !important;
          }
        }
      }
      text {
      }
    }
  }
  image {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.swiper-home {
  width: 98%;
  margin: 0upx 1% 0upx;
  height: 260upx;
  overflow: hidden;
  image {
    width: 100%;
  }
}
.container {
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  font-size: 28upx;

  .outer {
    width: 100%;
    position: absolute;
    left: 0;

    z-index: 100;
  }

  .header {
    position: fixed;
    top: 0;
    z-index: 100000;
    width: 100%;
    height: 120rpx;
    padding-top: 40upx;
    padding-bottom: 20upx;
    // background: linear-gradient(to right, #0195fc, #0181eb);
    display: flex;
    align-items: center;
    border: none;
    .headerLeft {
      box-sizing: border-box;
      width: 180upx;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .adderss {
        width: 100%;
        height: 60upx;
        border-bottom: 1upx solid #fff;
        display: flex;
        justify-content: center;
        align-content: center;
        margin-left: 20upx;
        text {
          width: 66%;
          height: 100%;
          font-size: 28upx;
          color: #fff;
          line-height: 60upx;
          padding-left: 12upx;
        }
        image {
          width: 26upx;
          height: 28upx;
          margin: 16upx 0 0 0;
          border: 0;
          border-radius: 0;
          line-height: 60upx;
        }
      }
      image {
        width: 100upx;
        height: 100upx;
        margin: 0 30upx;
        border-radius: 50%;
        border: 10upx solid #f5f7ff;
      }
    }
    .headerRight {
      width: 390rpx;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .search {
        // margin-top: 10upx;
        width: 80%;
        // margin: 20upx 3%;
        height: 60upx;
        border-radius: 50upx;
        background: #f5f7ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchLeft {
          color: #999;
          font-size: 28upx;
          padding-left: 30upx;
        }
        .searchRight {
          image {
            margin-right: 30upx;
            margin-top: -8upx;
            width: 36upx;
          }
        }
      }
    }
  }
}
.content {
  width: 100%;
  height: 320upx;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .icon1 {
    position: absolute;
    left: 3%;
    width: 38%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100% !important;
    }
  }
  .icon1Box {
    width: 38%;
    height: 90%;
    border-radius: 50upx;
    margin: 2% 3%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 148upx;
    }
    text {
      font-size: 28upx;
      color: rgb(228, 27, 92);
      margin-left: -20upx;
      font-weight: bold;
      padding-top: 10upx;
    }
  }
  .icon2 {
    position: absolute;
    left: 41%;
    width: 57%;
    top: 0;
    height: 44%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .no3 {
      width: 88upx;
    }
    image {
      width: 100%;
    }
  }
  .icon2Box {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50upx;
    z-index: 20;
    display: flex;
    padding: 0 20upx;
    justify-content: space-between;
    align-items: center;
    .no2 {
      display: flex;
      flex-direction: column;
      color: #fff;
      text {
        padding-left: 50upx;
        &:nth-child(1) {
          color: rgb(254, 94, 0);
          font-size: 28upx;
          font-weight: bold;
        }
        &:nth-child(2) {
          color: #fff;
          font-size: 26upx;
          font-weight: normal;
        }
      }
    }
    image {
      width: 88upx;
      margin-right: 30upx;
    }
    text {
      font-size: 26upx;
      color: #333;
    }
  }
  .icon3 {
    position: absolute;
    left: 41%;
    width: 57%;
    top: 50%;
    height: 44%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .no3 {
      width: 146upx;
    }
    image {
      width: 100%;
    }
  }
  .icon3Box {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50upx;
    z-index: 20;
    display: flex;
    padding: 0 20upx;
    justify-content: space-between;
    align-items: center;
    .no2 {
      display: flex;
      width: 400upx;
      flex-direction: column;
      color: #fff;
      margin-top: -20upx;
      text {
        padding-left: 50upx;
        &:nth-child(1) {
          color: rgb(14, 135, 235);
          font-size: 28upx;
          font-weight: bold;
        }
        &:nth-child(2) {
          color: #fff;
          font-size: 26upx;
          font-weight: normal;
        }
      }
    }
    image {
      width: 88upx;
      margin-right: 30upx;
    }
    text {
      padding-top: 15upx;
    }
  }

  .icon4 {
    position: absolute;
    left: 2%;
    top: 50%;
    width: 46%;
    height: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .icon4Box {
    width: 40%;
    height: 39%;
    border-radius: 50upx;
    margin: 2% 6%;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    image {
      width: 150upx;
      height: 150upx;
    }
    text {
      font-size: 26upx;
      color: #333;
      padding-top: 25upx;
    }
  }
}
</style>
