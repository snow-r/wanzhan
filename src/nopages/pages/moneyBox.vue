<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="我的钱包"
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
                src="http://www.mingtongxa.com/wanzhuan/moneyBox.png"
                mode="widthFix"
              ></image>
            <view>余额：{{totalMoney}}</view>
            <!-- <view class="no1" v-if="isShow" style="font-weight:400" @click="pageTo(1)"
              >提现</view
            > -->
          </view>
          <!-- <image class="no5" v-if="isShow"
                src="http://www.mingtongxa.com/newxcx/huafenxian.png"
                mode="widthFix"
              ></image> -->
          <view class="headerRight" v-if="isShow">
            <!-- <image
                src="http://www.mingtongxa.com/newxcx/yinhangka.png"
                mode="widthFix"
              ></image> -->
            <!-- <view>{{cardCount}}</view> -->
            <view class="no2" @click="pageTo(2)"
              >立即提现</view
            >
          </view>
        </view>
        <!-- <view class="shouzhi">
          <view class="shouzhiList">
            <image
                src="http://www.mingtongxa.com/newxcx/yue.png"
                mode="widthFix"
              ></image>
              <view>￥{{totalMoney}}</view>
              <text>余额</text>
          </view>
          <view class="shouzhiList"  @click="pageTo(3)">
            <image
                src="http://www.mingtongxa.com/newxcx/tuiguangjin.png"
                mode="widthFix"
              >
              </image>
              <image v-if="peopleType == 1"
                src="http://www.mingtongxa.com/newxcx/lingqu.png"
                 style="position: absolute;width: 30upx;height: 60upx;margin-left: 40upx;"
              ></image>
              <view>￥{{tuiguangjin}}</view>
              <text>推广金</text>
          </view>
          <view class="shouzhiList">
            <image
                src="http://www.mingtongxa.com/newxcx/zongshouru.png"
                mode="widthFix"
              ></image>
              <view>￥{{zongshouru}}</view>
              <text>总收入</text>
          </view>
          <view class="shouzhiList">
            <image
                src="http://www.mingtongxa.com/newxcx/zongzhichu.png"
                mode="widthFix"
              ></image>
              <view>￥{{zongzhichu}}</view>
              <text>总支出</text>
          </view>
        </view> -->
        <view class="content">
          <view class="myMoney">
            <view style="font-size:32upx;font-weight:bold;display:flex;align-items:center">
                <image
              style="width: 50upx;"
              src="http://www.mingtongxa.com/wanzhuan/moneyIcon.png"
              mode="widthFix"
            ></image>
              <image
              style="width: 8upx;"
              src="../static/moneyLine.png"
              mode="widthFix"
            ></image>
            
              <text style="padding-left:10upx;">我的收入支出</text>
            </view>
            <view class="date">
              <picker
                mode="date"
                :value="date"
                fields="month"
                :start="startDate"
                :end="endDate"
                @change="dateChange"
              >
                <view style="color:#000000;font-weight:600">{{ date }}</view>
              </picker>
              <image
              style="width:"
                src="http://www.mingtongxa.com/wanzhuan/moneyBot.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view v-if="list.length > 0">
            <scroll-view scroll-y @scrolltolower="loadMore" style="height:550upx">
                <view class="shouru" v-for="(item, index) in list" :key="index">
              <view class="shouru1">
                <view>{{ item.content }}</view>
                <text>{{ item.createTime }}</text>
              </view>
              <view class="shouru2">{{ item.fee }}</view>
            </view>
            </scroll-view>
            
          </view>
          <view class="nodata" v-else>
            <image
                src="http://www.mingtongxa.com/newxcx/zanwumingxi.png"
                mode="widthFix"
              ></image>
              <text>暂无内容</text>
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
      date: this.getDate({
        format: "yyyy-mm",
      }),
      pageNum: 1,
      list: [],
      bankList: [],
      totalMoney:0,
      cardCount:null,
      tuiguangjin:null,
      zongshouru:null,
      zongzhichu:null,
      peopleType: 0,
      isShow:false
    };
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
  },
  onLoad() {
    this.getDataList();
    this.getUser();
    this.getShowLog();
  },
  onShow() {
    // this.getDataList();
    // this.getUser();
  },
  methods: {
    getBankList() {
      uni.showLoading({
        mask: true,
      });
      this.$api.getBankList().then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.bankList = res.data;
        }else{
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      // day = day > 9 ? day : '0' + day;
      return `${year}-${month}`;
    },
    dateChange(e) {
      this.date = e.target.value.slice(0, 7);
      console.log(this.date.slice(0, 7));
      this.getDataList();
    },
    loadMore() {
      this.pageNum += 1;
      uni.showLoading({
        title: "加载中",
      });
      uni.hideLoading();
      this.getDataList();
    },
    getUser() {
        uni.showLoading({
            mask: true
        })
      let sendData = {
        userId: uni.getStorageSync("userId"),
      };
      this.$api.userMsg(sendData).then((res) => {
          uni.hideLoading()
          this.totalMoney = res.data.userInfo.amount

      });
    },
    pageTo(index) {
      if (index == 1) {
        if (this.bankList.length > 0) {
          uni.navigateTo({ url: "/nopages/pages/tixian" });
        } else {
          uni.showModal({
            title: "提示",
            content: "您暂未绑定银行卡，请前往绑定！",
            success: function(res) {
              if (res.confirm) {
                uni.navigateTo({ url: "/nopages/pages/addBank" });
              } else if (res.cancel) {
              }
            },
          });
        }
      }else if(index == 2){
        uni.navigateTo({ url: "/nopages/pages/addBankCard" });
      }else if(index == 3){
        if (this.peopleType == 1) {
          uni.navigateTo({ url: "/nopages/pages/inviteMoney" });
        }
      }
      // uni.showToast({
      //     title: '敬请期待',
      //     icon: 'none',
      //     mask: true
      //   })
    },
    getDataList() {
      uni.showLoading({
        mask: true,
      });
      let sendData = {
        date: this.date,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      this.$api.getMoneyOrder(sendData).then((res) => {
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
    getShowLog(){
      this.$api.isShowLog().then(res=>{
        let orl = res.data.toLowerCase() == "false" ? false : true; 
        this.isShow = orl
      })
    }
  },
};
</script>

<style lang="less" scoped>
.headers {
  width: 100%;
  height: 150upx;
  background: linear-gradient(to right, #0195fc, #0181eb);
  border-radius: 0 0 50% 50%;
  position: absolute;
  z-index: 10;
}
.nodata{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50upx;
  image{
    width: 720upx;
  }
  text{
    padding-top: 20upx;
    color: rgb(1, 126, 234);
    font-weight: bold;
    font-size: 32upx;
  }
}
.pageContainer {
  position: relative;
  z-index: 200;
  top: 10upx;
  width: 100%;
  height: 100%;
  .header {
    width: 96%;
    height: 22%;
    margin: 0 2%;
    background: linear-gradient(-45deg, #DC0000 0%, #EA6363 100%);
    // box-shadow: 0px 9upx 19upx 5upx rgba(93, 186, 255, 0.26);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34upx;
    font-weight: bold;
    border-radius: 20upx;
    color: #333;
    .headerLeft {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
          font-size: 28upx;
          font-weight: normal;
          color: #fff;
        padding: 12upx 0;
      }
      image{
        width: 120upx;
      }
      .no1 {
        background: linear-gradient(329deg, #027FEB 0%, #76C4F9 100%);
        width: 135upx;
        height: 60upx;
        text-align: center;
        line-height: 60upx;
        border-radius: 30upx;
        font-size: 30upx;
        padding: 0;
        color: #fff;
        margin: 12upx 0;
      }
    }
    .no5{
      width: 2upx;
    }
    .headerRight {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      view {
        padding: 12upx 0;
      }
      image{
        width: 90upx;
      }
      .no2 {
        box-shadow: 0px 9upx 19upx 5upx rgba(220, 0, 0, 0.8);
        background: #fff;
        width: 170upx;
        height: 60upx;
        text-align: center;
        line-height: 60upx;
        border-radius: 30upx;
        font-size: 28upx;
        padding: 0;
        color: rgb(219, 0,0);
        font-weight: bold;
        margin: 12upx 0;
      }
    }
  }
  .shouzhi{
    width: 100%;
    height: 240upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .shouzhiList{
      display: flex;
      width: 25%;
      align-items: center;
      flex-direction: column;
      image{
        width: 80upx;
      }
      view{
        font-size: 26upx;
        padding: 10upx 0 5upx;
      }
      text{
        font-size: 28upx;
        font-weight: bold;
      }
    }
  }
  .content {
    width: 96%;
    height: 78%;
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
    .myMoney {
      width: 100%;
      height: 160upx;
      font-size: 32upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20upx;
      .date {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      image {
        width: 20upx;
        margin-left: 12upx;
      }
    }
  }
}
</style>
