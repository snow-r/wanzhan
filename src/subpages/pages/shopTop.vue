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
      barTitle="商铺详情"
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
            :src="detail.detail.imgUrl"
            mode="widthFix"
          ></image>
          <view class="headBox">
            <image
              class="headimg"
              src="http://www.mingtongxa.com/wanzhuan/shopPhote.png"
              mode="widthFix"
            ></image>
            <image
              class="headdimg"
              src="http://www.mingtongxa.com/wanzhuan/shopShexiang.png"
              mode="widthFix"
            ></image>
            <text>100</text>
            <image
              class="headddimg"
              src="http://www.mingtongxa.com/wanzhuan/shopToWhite.png"
              mode="widthFix"
            ></image>
          </view>
        </view>
        <view class="content">
          <view class="contHead">{{ detail.name }}</view>
          <view class="contTon">
            <view class="tonLeft">
              <image
                class="tonImg"
                src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                mode="widthFix"
              ></image>
              <image
                class="tonImg"
                src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                mode="widthFix"
              ></image>
              <image
                class="tonImg"
                src="http://www.mingtongxa.com/wanzhuan/shopStar.png"
                mode="widthFix"
              ></image>
              <image
                class="tonImg"
                src="http://www.mingtongxa.com/wanzhuan/shopStar1.png"
                mode="widthFix"
              ></image>
              <image
                class="tonImg"
                src="http://www.mingtongxa.com/wanzhuan/shopStar2.png"
                mode="widthFix"
              ></image>
              <text>4.1</text>
              <text>详情</text>
              <image
                class="ton1Img"
                src="http://www.mingtongxa.com/wanzhuan/shopToright.png"
                mode="widthFix"
              ></image>
              <text>{{ detail.detail.commentCount }}条</text>
            </view>
            <view class="tonRight"> ￥{{ detail.detail.avgPrice }}/人 </view>
          </view>
          <view class="contCen">
            <view>口味：{{ detail.detail.score1 }}</view>
            <view>环境：{{ detail.detail.score2 }}</view>
            <view>服务：{{ detail.detail.score3 }}</view>
          </view>
          <view class="contDian">
            <image
              src="http://www.mingtongxa.com/wanzhuan/shopTiao.png"
              mode="widthFix"
            ></image>
            <view class="diandian">
              <view>点评榜单</view>
              <text>西安火锅热门榜第四名</text>
            </view>
          </view>
          <view class="tiaotiao"></view>
          <view class="conTime">
            <view class="timeLeft">
              <text>营业时间</text>
              <text>{{ detail.detail.beginTime }} - {{ detail.detail.endTime }}</text>
            </view>
            <view class="timeRight">
              <image
                src="http://www.mingtongxa.com/wanzhuan/shopToright.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="contTitle">
            <view v-for="(ite, index) in tags" :key="index">{{ ite }}</view>
          </view>
          <view class="contAddress">
            <view class="addLeft">
              <view>{{ detail.detail.address }}</view>
              <text>距地铁3号线市图书馆B口步行 970m</text>
            </view>
            <view class="addRight">
              <view class="rightImg">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopCar.png"
                  mode="widthFix"
                ></image>
              </view>
              <view class="right1Img">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopPhone.png"
                  mode="widthFix"
                ></image>
              </view>
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="bottom">
          <view class="moreTop">
            <scroll-view class="toscrol" scroll-x>
              <block><view class="tocolX active">优惠</view></block>
              <block><view class="tocolX">菜品</view></block>
              <block><view class="tocolX">评价</view></block>
              <block><view class="tocolX">周边</view></block>
            </scroll-view>
          </view>
          <view class="orderPay">
            <view class="payLeft">
              <view class="leftno1">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shopMai.png"
                  mode="widthFix"
                ></image>
                <text>买单</text>
              </view>
              <view class="leftno2">手机买单更便捷</view>
            </view>
            <view class="payRight">
              <view class="right1">买单</view>
              <view class="right2">半年售<text>100</text></view>
            </view>
          </view>
          <view class="orderQuan" v-if="couponList.length > 0">
            <image
              src="http://www.mingtongxa.com/wanzhuan/shopQuan.png"
              mode="widthFix"
            ></image>
            <text>代金券</text>
          </view>
          <view
            class="daijinquan"
            v-if="couponList.length > 0"
            v-for="(item, index) in couponList"
            :key="index"
            @click="payMoneyOrder(item.id)"
          >
            <image
              src="http://www.mingtongxa.com/wanzhuan/daijinquanbg5.png"
              mode="widthFix"
            ></image>
            <view class="quanBox">
              <view class="quanBLeft">
                <view class="quanL1">{{ item.amount }}元代金券</view>
                <view class="quanL2">{{ item.useDayRule }}</view>
                <view class="quanL3">
                  <view class="quanlss">￥{{ item.price }}</view>
                  <text
                    >{{ ((item.price / item.amount) * 10).toFixed(1) }}折</text
                  >
                </view>
              </view>
              <view class="quanBRight">
                <view class="qright1">抢购</view>
                <view class="qright2">半年售{{ item.saleNum }}</view>
              </view>
            </view>
          </view>
          <view class="orderQuan" v-if="goodsList.length > 0">
            <image
              src="http://www.mingtongxa.com/wanzhuan/shopHui.png"
              mode="widthFix"
            ></image>
            <text>代金券套餐</text>
          </view>
          <view class="bommssf" v-if="goodsList.length > 0">
            <view class="bomLeft" v-for="(ite, inde) in goodsList" :key="inde">
              <view class="bomTop">
                <image class="bomImg" :src="ite.imgUrl" mode="widthFix"></image>
                <image
                  class="bom1Img"
                  src="http://www.mingtongxa.com/wanzhuan/shopDaijin.png"
                  mode="widthFix"
                ></image>
              </view>
              <view class="bomMsg">
                <view class="msgHead">{{ ite.name }}</view>
                <view class="msgTitle">
                  <view class="titleLeft">7折</view>
                  <view class="titleRight">半年售{{ ite.saleNum }}</view>
                </view>
              </view>
              <view class="bomBom">
                <view class="bommLeft">￥{{ ite.price }}</view>
                <view class="bommRight">抢购</view>
              </view>
            </view>
          </view>
          <view class="line" style="margin-top:20upx;"></view>
          <view class="tuijian">
            <view class="tuijian1">
              <view class="tuijjsn">
                <text>推荐服务</text>
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/shopToright.png"
                mode="widthFix"
              ></image>
            </view>
            <view class="remen">
              商家热门服务（<text>5</text>）
            </view>
          </view>
          <scroll-view class="toleft" scroll-x>
            <block v-for="(item, index) in detail.goodsList" :key="index">
              <view class="bomLeft" :style="index == 0 ? 'margin-left:0' : ''">
                <view class="bomTop">
                  <image
                    class="bomImg"
                    :src="item.imgUrl"
                    mode="widthFix"
                  ></image>
                  <image
                    class="bom1Img"
                    src="http://www.mingtongxa.com/wanzhuan/shopDaijin.png"
                    mode="widthFix"
                  ></image>
                </view>
                <view class="bomMsg">
                  <view class="msgHead">正宗重庆4人餐</view>
                </view>
              </view>
            </block>
          </scroll-view>
          <view class="line"></view>
          <view class="tuijian" style="padding-bottom:30rpx;height:80rpx" @click="gotoComent()">
            <view class="tuijian1">
              <view class="tuijjsn">
                <text
                  >精选评价（<text>{{ comNum }}</text
                  >）</text
                >
              </view>
              <image
                src="http://www.mingtongxa.com/wanzhuan/shopToright.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="pinglunT" v-if="shopComList.length>0" v-for="(nav,indexs) in shopComList" :key="indexs">
            <view class="pinTitle">
              <image
                v-if="/^http/.test(nav.createUserHeadimg) && nav.isAgree==1"
                :src="nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==0"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==1"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==0"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else
                src="http://www.mingtongxa.com/wanzhuan/noheading.png"
                mode="widthFix"
              ></image>
              <text v-if="nav.isAgree==1">{{nav.createUserName}}</text>
              <text v-else>匿名用户</text>
            </view>
            <view class="fabu">
              发布于{{nav.createTime.slice(0,9).replace(/\-/g,'.')}}
            </view>
            <view class="dafen">
              <text>打分</text>
              <image v-for="(ite,index) in 5" :key="index"
              :src="nav.score>index?'http://www.mingtongxa.com/wanzhuan/kouwei.png':'http://www.mingtongxa.com/wanzhuan/nokouwei.png'"
                mode="widthFix"
              ></image>
            </view>
            <view class="pingCon">
              <view
                >{{nav.content}}</view
              >
              <view class="pingImg" v-if="nav.imgUrl">
                <image v-if="/^http/.test(nav.imgUrl)"
                  :src="nav.imgUrl"
                  mode="widthFix"
                ></image>
                <image v-else
                  :src="IMG_BEFORE_URL+nav.imgUrl"
                  mode="widthFix"
                ></image>
              </view>
            </view>
          </view>
        </view>
        <view class="noBTn">
          <view class="noBTn1">
            <image
              v-if="dianzan"
              @click="shoucangs(1)"
              src="http://www.mingtongxa.com/wanzhuan/shopYesD.png"
              mode="widthFix"
            ></image>
            <image
              v-else
              @click="dianzans(1)"
              src="http://www.mingtongxa.com/wanzhuan/shopNoD.png"
              mode="widthFix"
            ></image>
            <text>点赞</text>
          </view>
          <view class="noBTn1">
            <image
              v-if="shoucang"
              @click="shoucangs(2)"
              src="http://www.mingtongxa.com/wanzhuan/shopAixin.png"
              mode="widthFix"
            ></image>
            <image
              v-else
              @click="dianzans(2)"
              src="http://www.mingtongxa.com/wanzhuan/shopNoAixin.png"
              mode="widthFix"
            ></image>

            <text>收藏</text>
          </view>
          <view class="noBTn1" @click="gotoPinglun()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/shopPingl.png"
              mode="widthFix"
            ></image>
            <text>评论</text>
          </view>
          <view class="noBTn1">
            <image
              src="http://www.mingtongxa.com/wanzhuan/shopFenxia1.png"
              mode="widthFix"
            ></image>
            <text>分享</text>
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
      userId: uni.getStorageSync("userId"),
      IMG_BEFORE_URL,
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
      shopId: "",
      tags: [],
      dianzan: false,
      shoucang: false,
      detail: {},
      goodsList: [],
      couponList: [],
      comNum: 0,
      shopComList:[]
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
    this.shopId = opt.id;
    this.getShop();
  },
  methods: {
    gotoComent(){
      uni.navigateTo({
        url: "/nopages/pages/comment?shopId=" + this.shopId,
      });
    },
    gotoPinglun() {
      uni.navigateTo({
        url: "/nopages/pages/pinglun?id=" + this.shopId,
      });
    },
    dianzans(index) {
      if (index == 1) {
        let sendData = {
          shopId: this.shopId,
          userId: this.userId,
          opType: 1,
          type: 1,
        };
        this.$api.userLikeShop(sendData).then((res) => {
          if (res.code == 200) {
            this.dianzan = true;
            this.$comfun.Toast("点赞成功", "none");
          }
        });
      } else if (index == 2) {
        let sendData = {
          shopId: this.shopId,
          userId: this.userId,
          opType: 1,
          type: 2,
        };
        this.$api.userLikeShop(sendData).then((res) => {
          if (res.code == 200) {
            this.shoucang = true;
            this.$comfun.Toast("收藏店铺成功", "none");
          }
        });
      }
    },
    shoucangs(index) {
      if (index == 1) {
        let sendData = {
          shopId: this.shopId,
          userId: this.userId,
          opType: 0,
          type: 1,
        };
        this.$api.userLikeShop(sendData).then((res) => {
          if (res.code == 200) {
            this.dianzan = false;
            this.$comfun.Toast("取消点赞", "none");
          }
        });
      } else if (index == 2) {
        let sendData = {
          shopId: this.shopId,
          userId: this.userId,
          opType: 0,
          type: 2,
        };
        this.$api.userLikeShop(sendData).then((res) => {
          if (res.code == 200) {
            this.shoucang = false;
            this.$comfun.Toast("取消收藏", "none");
          }
        });
      }
    },
    getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.detail = res.data;
          if (res.data.collect == 1) {
            this.shoucang = true;
          } else {
            this.shoucang = false;
          }
          if (res.data.like == 1) {
            this.dianzan = true;
          } else {
            this.dianzan = false;
          }
          if (res.data.detail.tags) {
            this.tags = res.data.detail.tags.split(",");
          }
          if (res.data.couponList.length > 0) {
            res.data.couponList.map((item) => {
              if (item.type == 1) {
                this.couponList.push(item);
              } else if (item.type == 2) {
                this.goodsList.push(item);
              }
            });
          }
          this.comNum = res.data.detail.commentCount;
          if (res.data.commentList.length > 0) {
            this.shopComList = res.data.commentList;
          }
        }
      });
    },
    payMoneyOrder(id) {
      uni.navigateTo({
        url: "/subpages/pages/shopDetail?id=" + id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 30upx;
  width: 100%;
  height: 100%;
  .line {
    width: 100%;
    height: 30upx;
    background: #ebeced;
  }
  .noBTn {
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    .noBTn1 {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        width: 60upx;
      }
      text {
        padding-top: 8upx;
        font-size: 24upx;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .header {
    width: 96%;
    height: 370upx;
    margin: 10upx 2%;
    position: relative;
    .hadimg {
      width: 100%;
      height: 360upx !important;
      position: absolute;
    }
    .headBox {
      position: absolute;
      width: 200upx;
      height: 50upx;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 30upx;
      bottom: 20upx;
      right: 8upx;
      display: flex;
      align-items: center;
      justify-content: center;
      text {
        font-size: 24upx;
        color: #fff;
        padding: 0 10upx 0 0;
      }
      .headimg {
        margin: 0 10upx 0 10upx;
        width: 42upx;
      }
      .headdimg {
        margin: 0 10upx 0 0;
        width: 48upx;
      }
      .headddimg {
        width: 12upx;
        height: 20upx !important;
      }
    }
  }
  .content {
    width: 96%;
    // height: 500upx;
    margin: 20upx 2%;
    .contHead {
      font-size: 36upx;
      font-weight: 600;
      color: #000;
    }
    .contTon {
      width: 100%;
      height: 65upx;
      display: flex;
      align-items: center;
      font-size: 30upx;
      color: #000;
      .tonLeft {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        text {
          padding: 0 10upx 0 8upx;
        }
        .tonImg {
          width: 38upx;
        }
        .ton1Img {
          width: 14upx;
          height: 22upx !important;
        }
      }
      .tonRight {
        font-size: 32upx;
        color: #db0000;
        font-weight: 600;
        text-align: center;
        line-height: 100%;
      }
    }
    .contCen {
      font-size: 24upx;
      height: 50upx;
      width: 100%;
      display: flex;
      align-items: center;
      font-weight: 600;
      view {
        width: 150upx;
      }
    }
    .contDian {
      width: 68%;
      height: 60upx;
      display: flex;
      align-items: center;
      position: relative;
      image {
        width: 100%;
        position: absolute;
      }
      .diandian {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 24upx;
        font-weight: 600;
        view {
          color: #000;
          padding-left: 20upx;
        }
        text {
          color: #ac0000;
          padding-left: 50upx;
        }
      }
    }
    .tiaotiao {
      width: 100%;
      height: 8upx;
      border-bottom: 2upx dashed #979797;
    }
    .conTime {
      padding-top: 10upx;
      width: 100%;
      height: 45upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .timeLeft {
        font-size: 24upx;
        font-weight: 600;
        width: 400upx;
        color: #000;
        display: flex;
        text {
          padding-right: 20upx;
        }
      }
      .timeRight {
        image {
          width: 14upx;
        }
      }
    }
    .contTitle {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 24upx;
      padding-top: 10upx;
      padding-bottom: 20upx;
      border-bottom: 2upx dashed #979797;
      view {
        margin: 10upx;
        padding: 0upx 20upx;
        height: 40upx;
        background: #e7e4e6;
        border-radius: 10upx;
        text-align: center;
        line-height: 40upx;
        color: #000;
        font-weight: 600;
        flex-wrap: wrap;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
    .contAddress {
      width: 100%;
      // height: 180upx;
      display: flex;
      padding: 30upx 0 30upx 0;
      align-items: center;
      justify-content: space-between;
      .addLeft {
        width: 55%;
        font-size: 24upx;
        display: flex;
        flex-direction: column;
        view {
          font-weight: 600;
          color: #000;
        }
        text {
          font-weight: normal;
          color: #7a7a7a;
          padding-top: 20upx;
        }
      }
      .addRight {
        // padding-left: 10%;
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        .rightImg {
          width: 100upx;
          height: 70upx;
          padding-right: 10upx;
          border-right: 2upx dashed #979797;
          image {
            width: 78upx;
          }
        }
        .right1Img {
          width: 80upx;
          height: 70upx;
          display: flex;
          align-items: center;
          image {
            margin-left: 22upx;
            width: 55upx;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    // height: 100%;
    // margin: 20upx 2%;
    .moreTop {
      width: 100%;
      height: 70upx;
      padding: 0 20upx;
      font-size: 32upx;
      .toscrol {
        width: 100%;
        white-space: nowrap;
        height: 100%;
      }
      .tocolX {
        padding: 0 40upx;
        height: 100%;
        display: inline-block;
        position: relative;
        font-weight: 600;
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
        bottom: 20upx;
      }
    }
    .orderPay {
      width: 96%;
      margin: 0 2%;
      height: 120upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1upx dashed #979797;
      .payLeft {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #000;
        font-weight: bold;
        .leftno1 {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 30upx;
          image {
            width: 40upx;
          }
        }
        .leftno2 {
          width: 100%;
          font-size: 24upx;
          font-weight: bold;
          color: #000;
          padding-top: 15upx;
        }
        text {
          font-size: 30upx;
          padding-left: 10upx;
        }

        view {
          font-size: 26upx;
        }
      }
      .payRight {
        width: 200upx;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .right1 {
          background: #db0000;
          width: 140upx;
          height: 60upx;
          border-radius: 30upx;
          color: #fff;
          font-size: 30upx;
          font-weight: bold;
          text-align: center;
          line-height: 60upx;
        }
        .right2 {
          padding-top: 10upx;
          font-size: 24upx;
          color: #7e7e7e;
          font-weight: bold;
        }
      }
    }
    .orderQuan {
      width: 96%;
      margin: 0 2%;
      height: 80upx;
      display: flex;
      align-items: center;
      font-size: 30upx;
      font-weight: bold;
      image {
        width: 40upx;
        margin-right: 10upx;
      }
    }
    .daijinquan {
      width: 96%;
      margin: 0 2%;
      height: 190upx;
      border-bottom: 1upx dashed #979797;
      position: relative;
      image {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
      }
      .quanBox {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .quanBLeft {
          width: 70%;
          height: 100%;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;
          padding-left: 35upx;
          .quanL1 {
            padding-bottom: 10upx;
            font-size: 24upx;
            color: #000;
            font-weight: bold;
          }
          .quanL2 {
            padding-bottom: 10upx;
            font-size: 24upx;
            color: #000;
            font-weight: normal;
          }
          .quanL3 {
            display: flex;
            .quanlss {
              font-size: 26upx;
              color: #db0000;
              font-weight: bold;
            }
            text {
              font-size: 20upx;
              background: rgba(219, 0, 0, 0.2);
              border-radius: 5upx;
              padding: 2upx 8upx;
              color: #db0000;
              font-weight: normal;
              margin-left: 15upx;
            }
          }
        }
        .quanBRight {
          width: 200upx;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 50upx;
          .qright1 {
            background: #db0000;
            width: 140upx;
            height: 60upx;
            border-radius: 30upx;
            color: #fff;
            font-size: 30upx;
            font-weight: bold;
            text-align: center;
            line-height: 60upx;
          }
          .qright2 {
            padding-top: 10upx;
            font-size: 24upx;
            color: #7e7e7e;
            font-weight: bold;
          }
        }
      }
    }
    .bommssf {
      width: 96%;
      margin: 0 2%;
      .bomLeft {
        width: 46%;
        height: 320upx;
        border-radius: 20upx;
        border: 1upx solid #979797;
        .bomTop {
          width: 100%;
          height: 48%;
          position: relative;
          .bomImg {
            position: absolute;
            width: 100%;
          }
          .bom1Img {
            position: absolute;
            left: 0;
            top: 0;
            width: 45%;
          }
        }
        .bomMsg {
          width: 100%;
          .msgHead {
            font-size: 28upx;
            font-weight: 600;
            color: #000;
            padding: 10upx 0 0 8upx;
          }
          .msgTitle {
            display: flex;
            justify-content: space-between;
            padding: 5upx 10upx;
            .titleLeft {
              color: #db0000;
              font-size: 24upx;
              font-weight: 600;
              background: rgba(248, 204, 204);
              padding: 5upx 20upx;
              border-radius: 10upx;
            }
            .titleRight {
              font-weight: 600;
              font-size: 24upx;
              color: #7e7e7e;
            }
          }
        }
        .bomBom {
          width: 100%;
          padding: 10upx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .bommLeft {
            font-size: 30upx;
            color: #db0000;
            font-weight: 600;
          }
          .bommRight {
            width: 120upx;
            height: 55upx;
            background: #db0000;
            border-radius: 30upx;
            color: #fff;
            font-size: 30upx;
            text-align: center;
            line-height: 55upx;
            font-weight: 600;
            letter-spacing: 2px;
          }
        }
      }
    }

    .tuijian {
      width: 96%;
      margin: 0 2%;
      height: 120upx;
      .tuijian1 {
        width: 100%;
        height: 60upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tuijjsn {
          padding: 30upx 0 25upx 0;
          font-size: 30upx;
          font-weight: bold;
          color: #000;
        }
        image {
          width: 14upx;
        }
      }
      .remen {
        width: 100%;
        height: 40upx;
        display: flex;
        align-items: center;
        font-size: 28upx;
        font-weight: bold;
      }
    }
    .pinglunT {
      width: 100%;
      // height: 300upx;
      padding-bottom: 30upx;
      &:last-child{
        padding-bottom: 150upx;
      }
      .pinTitle {
        width: 100%;
        height: 80upx;
        padding: 0 50upx;
        display: flex;
        align-items: center;
        image {
          width: 60upx;
          border-radius: 50%;
        }
        text {
          font-size: 28upx;
          color: rgb(70, 92, 109);
          padding-left: 20upx;
        }
      }
      .fabu {
        padding: 0 20upx 10upx 100upx;
        font-size: 28upx;
        color: #7e7e7e;
      }
      .dafen {
        padding: 0 20upx 10upx 100upx;
        width: 100%;
        height: 50upx;
        display: flex;
        align-items: center;
        image {
          width: 30upx;
          margin-left: 4upx;
          &:nth-child(1) {
            margin-left: 10upx;
          }
        }
      }
      .pingCon {
        width: 100%;
        padding: 0 20upx 10upx 100upx;
        display: flex;
        flex-direction: column;
        view {
          font-size: 28upx;
          color: #000;
          white-space: pre-wrap;
          padding: 5upx 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .pingImg {
          padding-top: 15upx;
          display: flex;
          align-items: center;
          image {
            margin-left: 10upx;
            width: 120upx;
            height: 120upx !important;
            &:nth-child(1) {
              margin: 0;
            }
          }
        }
      }
    }
    .toleft {
      white-space: nowrap;
      width: 96%;
      margin: 0 2%;
      height: 250upx;
      // padding-bottom: 60upx;
      .bomLeft {
        display: inline-block;
        margin: 0 10upx;
        width: 46%;
        height: 220upx;
        border-radius: 20upx;
        // border: 1upx solid #979797;
        .bomTop {
          width: 100%;
          height: 75%;
          position: relative;
          .bomImg {
            position: absolute;
            width: 100%;
            height: 92px !important;
          }
          .bom1Img {
            position: absolute;
            left: 0;
            top: 0;
            width: 45%;
          }
        }
        .bomMsg {
          width: 100%;
          .msgHead {
            font-size: 28upx;
            font-weight: 600;
            color: #000;
            padding: 10upx 0 0 8upx;
            text-align: center;
          }
          .msgTitle {
            display: flex;
            justify-content: space-between;
            padding: 5upx 10upx;
            .titleLeft {
              color: #db0000;
              font-size: 24upx;
              font-weight: 600;
              background: rgba(248, 204, 204);
              padding: 5upx 20upx;
              border-radius: 10upx;
            }
            .titleRight {
              font-weight: 600;
              font-size: 24upx;
              color: #7e7e7e;
            }
          }
        }
        .bomBom {
          width: 100%;
          padding: 10upx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .bommLeft {
            font-size: 30upx;
            color: #db0000;
            font-weight: 600;
          }
          .bommRight {
            width: 120upx;
            height: 55upx;
            background: #db0000;
            border-radius: 30upx;
            color: #fff;
            font-size: 30upx;
            text-align: center;
            line-height: 55upx;
            font-weight: 600;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
}
</style>
