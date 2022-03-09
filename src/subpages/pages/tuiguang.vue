<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="我的推广记录"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view class="pageContainer">
        <view class="header">
          <view class="headerLeft">
            <image
              src="http://www.mingtongxa.com/newxcx/userCount.png"
              mode="widthFix"
            ></image>
            <view>￥{{ userCount }}</view>
            <text>邀请人数</text>
          </view>
          <!-- <image class="no5"
                src="http://www.mingtongxa.com/newxcx/huafenxian.png"
                mode="widthFix"
              ></image> -->
          <view class="headerCenter">
            <image
              src="http://www.mingtongxa.com/newxcx/orderCount.png"
              mode="widthFix"
            ></image>
            <view>￥{{ orderCount }}</view>
            <text>订单总数</text>
          </view>
          <!-- <image class="no5"
                src="http://www.mingtongxa.com/newxcx/huafenxian.png"
                mode="widthFix"
              ></image> -->
          <view class="headerRight">
            <image
              src="http://www.mingtongxa.com/wanzhuan/yaoqingjine.png"
              mode="widthFix"
            ></image>
            <view>{{ monthOrderCount }}</view>
            <text>推广金</text>
          </view>
        </view>

        <view class="content">
          <view class="orsdg">
          <view class="myMoney">
            <view class="myNons">
              <text style="padding-left:10upx">每日任务</text>
              <view class="nosos">
                <text>查看完成记录</text>
                <image src="@/static/images/right.png" mode="widthFix"></image>
              </view>
            </view>
          </view>
          <view class="monetet"> 每日收藏 <text>分享点赞</text> </view>

          <view class="jindu">
            <view class="jindutiao">
              <view class="jindus" :style="'width:' + shareCount">
                
                <image
              
              src="http://www.mingtongxa.com/wanzhuan/jindutiaoss.png"
              mode="widthFix"
            ></image>
              </view>
            </view>
            <view class="shuzi">
              <view>0</view>
              <view class="no22">15</view>
              <view class="no33">30</view>
            </view>

            <view class="guize">
              <view></view>
              <view class="shuoming">规则说明</view>
            </view>
          </view>
          <view class="xian"></view>
          <view class="renwu">
            <view class="renwuLeft">
              <image src="../static/tianjiashops.png" mode="widthFix"></image>
              <view class="no5">
                <view class="no5tit">添加至少10家店铺</view>  
                <view class="no6text">
                  已完成
                  <text>{{shareShop}}</text>/10
                </view>
              </view>
            </view>
            <view class="renwuRight">继续完成</view>
          </view>
          </view>
          <view class="orTitke">
            <view>管理商铺</view>
            <text>查看和代理关联的商铺</text>
          </view>

          <view class="contents" v-if="shopList.length>0" v-for="(item,index) in shopList" :key="index">
          <view class="contLeft">
            <image
              v-if="/^http/.test(item.imgUrl)"
              :src="item.imgUrl"
              mode="widthFix"
            ></image>
            <image
              v-else
              :src="IMG_BEFORE_URL+item.imgUrl"
              mode="widthFix"
            ></image>
          </view>
          <view class="contRight">
            <view class="right1">{{item.name}}</view>
            
            <view class="right3"
              >{{item.address}}</view
            >
            <view class="right2">联系电话： <text>{{item.phonenumber}}</text> 
            <image
                src="http://www.mingtongxa.com/wanzhuan/yaoqingphone.png"
                mode="widthFix"
              ></image>
            </view>
            <view class="right4">
              <image
                src="http://www.mingtongxa.com/wanzhuan/chakanyeji.png"
                mode="widthFix"
              ></image>
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
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      IMG_BEFORE_URL,
      list: [],
      bankList: [],
      orderCount: null,
      userCount: null,
      monthOrderCount: null,
      task1: null,
      task5: null,
      task10: null,
      shopList:[],
      shareCount:null,
      shareShop:0
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
    this.getInviteCount();
    this.getInviteTaskList();
  },
  onShow() {
    this.getInviteCount();
    this.getInviteTaskList();
  },
  methods: {
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
        this.shopList = res.data.shopList
      });
    },
    getInviteCount() {
      uni.showLoading({
        mask: true,
      });
      this.$api.getTuiguangMsg().then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.userCount = res.data.userCount;
          this.orderCount = res.data.orderCount;
          this.monthOrderCount = res.data.inviteAmount;
          this.shopList = res.data.inviteShopList
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },

    getInviteTaskList() {
      uni.showLoading({
        mask: true,
      });

      this.$api.getInviteTaskList().then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          if(res.data.shareCount>0){
            
            let shareCounts = ((res.data.shareCount/30)*100).toFixed(1)
            this.shareCount = shareCounts +'%'
            console.log(this.shareCount,'155')
          }else{
            this.shareCount = 0+'%'
          }
          
          if(res.data.inviteShopCount!=null){
            this.shareShop = res.data.inviteShopCount
          }else{
            this.shareShop = 0
          }
          
        }
      });
    },
    getFee(id) {
      this.$api.getFee(id).then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
          this.getInviteTaskList();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.uni-flex {
  display: flex;
  flex-direction: row;
}
.uni-flex-item {
  flex: 1;
}
.uni-row {
  flex-direction: row;
}
.uni-column {
  flex-direction: column;
}
.contents {
    box-shadow: 0 2upx 8upx 2upx #f5a9ad;
    width: 98%;
    height: 400upx;
    margin: 20upx 1%;
    border-radius: 30upx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .contLeft {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        border-radius: 20upx;
        width: 250upx;
        height: 190px !important;
      }
    }
    .contRight {
      width: 60%;
      height: 100%;
      padding: 50upx 30upx 0 0;
      color: #000;
      .right1 {
        font-size: 28upx;
        font-weight: bold;
        padding-bottom: 50upx;
      }
      .right2 {
        font-size: 26upx;
        padding-bottom: 15upx;
        image{
          width: 35upx;
          margin-left: 20upx;
        }
      }
      .right3 {
        font-size: 26upx;
        padding-bottom: 50upx;
      }
      .right4 {
        width: 100%;
        height: 60upx;
        text-align: right;
        margin-top: 50upx;
        image {
          width: 220upx;
        }
      }
    }
  }
.flex-item {
  width: 33.3%;
  text-align: center;
  padding: 20upx 0;
  view {
    background: linear-gradient(329deg, #027feb 0%, #76c4f9 100%);
    border-radius: 30upx;
    color: #fff;
    padding: 10upx 0;
  }
}
.content-box {
  box-shadow: 0px 9upx 19upx 5upx rgba(93, 186, 255, 0.26);
}
.nodata {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50upx;
  image {
    width: 720upx;
  }
  text {
    padding-top: 20upx;
    color: rgb(1, 126, 234);
    font-weight: bold;
    font-size: 32upx;
  }
}
.pageContainer {
  // position: relative;
  // z-index: 200;
  // top: 10upx;
  width: 100%;
  .header {
    width: 96%;
    height: 250upx;
    margin: 20upx 2%;
    box-shadow: -1px 1upx 35upx 1upx rgba(249, 169, 169, 0.34);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34upx;
    background: #fff;
    // font-weight: bold;
    border-radius: 20upx;
    color: #333;
    .headerLeft {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
        padding: 12upx 0;
        font-weight: bold;
      }
      image {
        width: 90upx;
      }
      text {
        font-size: 28upx;
      }
      .no1 {
        background: linear-gradient(329deg, #027feb 0%, #76c4f9 100%);
        width: 135upx;
        height: 60upx;
        text-align: center;
        line-height: 60upx;
        border-radius: 30upx;
        font-size: 26upx;
        padding: 0;
        color: #fff;
        margin: 12upx 0;
      }
    }
    .headerCenter {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
        padding: 12upx 0;
        font-weight: bold;
      }
      image {
        width: 90upx;
      }
      text {
        font-size: 28upx;
      }
      .no1 {
        background: linear-gradient(329deg, #027feb 0%, #76c4f9 100%);
        width: 135upx;
        height: 60upx;
        text-align: center;
        line-height: 60upx;
        border-radius: 30upx;
        font-size: 26upx;
        padding: 0;
        color: #fff;
        margin: 12upx 0;
      }
    }
    .no5 {
      width: 2upx;
    }
    .headerRight {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
        padding: 12upx 0;
        font-weight: bold;
      }
      text {
        font-size: 28upx;
      }
      image {
        width: 90upx;
      }
      .no2 {
        width: 170upx;
        height: 60upx;
        background: linear-gradient(329deg, #027feb 0%, #76c4f9 100%);
        text-align: center;
        line-height: 60upx;
        border-radius: 30upx;
        font-size: 26upx;
        padding: 0;
        color: #fff;
        margin: 12upx 0;
      }
    }
  }
  .shouzhi {
    width: 100%;
    height: 240upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .shouzhiList {
      display: flex;
      width: 25%;
      align-items: center;
      flex-direction: column;
      image {
        width: 80upx;
      }
      view {
        font-size: 26upx;
        padding: 10upx 0 5upx;
      }
      text {
        font-size: 28upx;
        font-weight: bold;
      }
    }
  }
  .content {
    width: 96%;
    margin: 0 2%;
    border-radius: 30upx;
    box-shadow: 5px 0px 20px 0px #e7ecfb;
    .shouru {
      width: 100%;
      height: 120upx;
      align-items: center;
      border-bottom: 1upx solid #f5f7ff;
      padding: 0 20upx;
      display: flex;
      justify-content: space-between;
      .shouru1 {
        display: flex;
        flex-direction: column;
        font-size: 26upx;
        view {
          color: #333;
        }
        text {
          color: #999;
          padding-top: 10upx;
        }
      }
      .shouru2 {
        color: #ef5656;
        font-size: 26upx;
      }
    }
    .orsdg{
      width: 100%;
      margin: 20upx 0 ;
      box-shadow: -1px 1rpx 35rpx 1rpx rgba(249, 169, 169, 0.34);
      border-radius: 30upx;
    }
    .myMoney {
      width: 100%;
      height: 80upx;
      font-size: 32upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 0 20upx;
      .myNons {
        width: 100%;
        font-size: 34upx;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nosos {
          width: 200upx;
          font-size: 24upx;
          color: #979797;
          image {
            width: 20upx;
          }
        }
      }
      .date {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      image {
        width: 30upx;
        height: 30upx;
        margin-left: 12upx;
      }
    }
    .monetet {
      padding: 0 30upx;
      font-size: 24upx;
      color: #707070;
      text {
        color: #db0000;
      }
    }
    .jindu {
      width: 100%;
      height: 200upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .jindutiao {
        width: 94%;
        height: 20upx;
        background: #e8e8e8;
        position: relative;
        z-index: 10;
        .jindus{
          height: 20upx;
          position: absolute;
          background: linear-gradient(45deg, #FCACAC, #DB0000);
          z-index: 100;
          image{
            width: 100%;
          }
        }
      }
      .shuzi {
        width: 94%;
        display: flex;
        height: 40upx;
        font-size: 24upx;
        color: #707070;
        view {
          width: 33%;
        }
        .no22 {
          text-align: center;
        }
        .no33 {
          text-align: right;
        }
      }
      .guize {
        width: 100%;
        height: 60upx;
        margin-top: 20upx;
        padding: 0 30upx;
        display: flex;
        justify-content: space-between;
        .shuoming {
          width: 160upx;
          height: 60upx;
          text-align: center;
          line-height: 60upx;
          border-radius: 30upx;
          border: 1upx solid #db0000;
          color: #db0000;
        }
      }
    }
    .xian {
      width: 94%;
      margin: 0 3%;
      height: 2upx;
      background: #f41e2b;
    }
    .renwu{
      width: 100%;
      height: 150upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20upx;
      .renwuLeft{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        image{
          width: 70upx;
        }
        .no5{
          font-size: 28upx;
          color: #000;
          font-weight: bold;
          margin-left: 10upx;
          .no6text{
            font-size: 24upx;
            color: #707070;
            text{
              color: #FE8525;
            }
          }
        }
      }
      .renwuRight{
        width: 160upx;
          height: 60upx;
          background: linear-gradient(45deg, #FFBB4C, #FE8525);
          text-align: center;
          line-height: 60upx;
          border-radius: 30upx;
          color: #fff;
          font-size: 30upx;
      }
    }
    .orTitke{
      width: 100%;
      height: 100upx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 34upx;
      color: #000;
      font-weight: bold;
      text{
        font-size: 24upx;
        color: #707070;
        padding-top: 10upx;
      }
    }
  }
}
</style>
