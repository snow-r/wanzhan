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
      barTitle="刚需特惠"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="contentItem" v-for="(item,index) in list" :key="index">
          <image
            class="itemBg"
            src="http://www.mingtongxa.com/wanzhuan/quanbaoqiang.png"
            mode="widthFix"
          ></image>
          <view class="header">
            <view class="headerLeft">
              <image
                class="itemsBg"
                src="http://www.mingtongxa.com/wanzhuan/quanbaoleft.png"
                mode="widthFix"
              ></image>
              <view class="no2">
                <view style="padding-right:10upx;text-align:right">{{item.price}}元代 <text>{{item.amount}}</text> </view>
              <view class="top">代金券</view>
              </view>
              
            </view>
            <view class="headerRight" style="margin-left:15upx">
              <!-- <button open-type="share">
                <text>分享</text>
                <image
                  src="http://www.mingtongxa.com/wanzhuan/fenxiang.png"
                  mode="widthFix"
                ></image>
              </button> -->
            </view>
          </view>
          <view class="content">
            <view class="contLeft">
              <view>四川火锅店-高新店</view>
              <view class="tops">{{item.startTime}}-{{item.endTime}}</view>
              <button open-type="share">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/quanbaoshare.png"
                  mode="widthFix"
                ></image>
              </button>
            </view>
            <view class="contRight">
              <view class="contRiLeft">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shengyu.png"
                  mode="widthFix"
                ></image>
                <text>剩余<text style="color:#FB0A16">{{item.total-item.saleNum}}</text> 张</text>
              </view>
              <!-- <view class="contRiRight">立即抢购</view> -->
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
      list:null
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
    this.getCityGxth()
  },
  methods: {
    getCityGxth(){
      let code = uni.getStorageSync('quhao')
      let sendData={
        code
      }
      if(code){
        this.$api.getGxthList(sendData).then((res) => {
        if (res.code == 200) {
          this.list = res.data
        }
      });
      }else{
        this.$comfun.Toast('请允许小程序获取您的位置信息', "none");
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .contentItem {
    width: 98%;
    margin: 0 1%;
    height: 460upx;
    position: relative;
    .itemBg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .header {
      position: absolute;
      top: 70upx;
      width: 100%;
      height: 250upx;
      padding: 20upx 30upx 10upx 20upx;
      display: flex;
      justify-content: space-between;
      .headerLeft {
        width: 290upx;
        height: 170upx;
        border-radius: 30upx;
        font-size: 36upx;
        color: #BF823C;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .itemsBg{
          position: absolute;
          width: 290upx;
          height: 170upx !important;
        }
        .no2{
          position: absolute;
          z-index: 100;
          width: 290upx;
          height: 170upx;
          padding-top: 20upx;
        }
        text {
          font-size: 66upx;
          color: #FB0A16;
        }
        .top {
          padding-top: 10upx;
          text-align: right;
          padding-right: 10upx
        }
      }
      .headerRight {
        display: flex;
        font-size: 34upx;
        font-weight: bold;
        image {
          margin: 0 20upx 0 20upx;
          width: 60upx;
          height: 46upx;
        }
        button::after {
          border: none;
          padding: 0;
        }
        button {
          position: relative;
          background-color: transparent;
          font-size: 34upx;
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    .content {
      width: 100%;
      height: 250upx;
      position: absolute;
      bottom: 5upx;
      padding: 0 0 0 30upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .contLeft {
        font-size: 30upx;
        padding-top: 50upx;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        padding-left: 0;
         button::after {
          border: none;
          padding: 0;
        }
        button {
          width: 220upx;
          background-color: transparent;
          position: relative;
          display: block;
          margin-left: 0;
          margin-right: 0;
          font-size: 34upx;
          padding-left: 0;
          padding-right: 0;
        }
        image{
          width: 220upx;
          height: 60upx;
          padding-left: 0;
        }
        .tops {
          padding-top: 10upx;
        }
      }
      .contRight {
        margin-right: 10upx;
        display: flex;
        flex-direction: column;
        
        .contRiLeft {
          width: 260upx;
          height: 46upx;
          background: linear-gradient(#FDBFA9, #D65039);
          font-size: 28upx;
          font-weight: 600;
          display: flex;
          justify-content: center;
          margin-right: 50upx;
          align-items: center;
          image {
            width: 26upx;
            margin-right: 10upx;
          }
          text {
            padding-left: 6upx;
          }
        }
        .contRiRight{
          background: linear-gradient(70deg, #EF0000, #FFE801);
          margin-left: auto;
          margin-top: 15upx;
          width: 190upx;
          height: 58upx;
          border-radius: 30upx;
          font-size: 32upx;
          font-weight: 600;
          border: 4upx solid #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
