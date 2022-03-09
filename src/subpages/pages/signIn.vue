<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="transparent"
      :back="true"
      barTitle="签到有礼"
      :backType="'fanhuis'"
      :fontColor="'rgb(250, 250, 250)'"
      :isfan="true"
    />
    <view :class="isIpx?'xPage':'normalPage'">
      <scroll-view scroll-y class="pageContainer">
          <view class="header">
              <image class="bgs" src="http://www.mingtongxa.com/wanzhuan/signBg.png" mode="widthFix" />
              <image class="rens" src="http://www.mingtongxa.com/wanzhuan/signRen.png" mode="widthFix" />
              
          <view class="headerCon">
            <view class="conHead"> <text>金币收益</text><image class="conbg" src="http://www.mingtongxa.com/wanzhuan/signToright.png" mode="widthFix" /> </view>    
            <view class="conContent">
                <view class="contleft"> <text>2673</text> </view>
                <view class="contright">
                    <image src="http://www.mingtongxa.com/wanzhuan/signTixian.png" mode="widthFix" />
                    <text>兑换提现</text> 
                </view>
            </view>
            <view class="bottm">
                <image src="http://www.mingtongxa.com/wanzhuan/signMoney.png" mode="widthFix" />
                <text>10000金币=1元，当前可兑换约0.2</text>
            </view>
          </view>   
          
          </view>
            <view class="contentt">
                <view class="contHeader">
                    <text>大额现金</text>
                    <view>专属惊喜福利</view>
                </view>
                <view class="contContt">
                    <view class="conttLeft">
                        <view>
                        邀请5位新用户必得
                        <image src="http://www.mingtongxa.com/wanzhuan/signYaoMoney.png" mode="widthFix" />
                        <text>113元</text>
                        </view>
                        <view class="leftllt">
                            双方都拿钱，详情
                            <image src="http://www.mingtongxa.com/wanzhuan/signTotoRight.png" mode="widthFix" />
                        </view>
                    </view>
                    <view class="conttRight">
                        <text>去邀请</text> 
                        <image src="http://www.mingtongxa.com/wanzhuan/signLing.png" mode="widthFix" />
                    </view>
                </view>
                <view class="conttBot">
                    <image class="orbgs" src="http://www.mingtongxa.com/wanzhuan/signHeng.png" mode="widthFix" />
                    <view class="contorder">
                        <view class="order1">
                            <view class="no1">首次邀请</view>
                            <image src="http://www.mingtongxa.com/wanzhuan/sign12.png" mode="widthFix" />
                            <view class="no3">31元</view>
                        </view>
                        <view class="order2">
                            <view class="no1">第2位</view>
                            <image src="http://www.mingtongxa.com/wanzhuan/sign2.png" mode="widthFix" />
                            <view class="no3">20元</view>
                        </view>
                        <view class="order2">
                            <view class="no1">第3位</view>
                            <image src="http://www.mingtongxa.com/wanzhuan/sign2.png" mode="widthFix" />
                            <view class="no3">16元</view>
                        </view>
                        <view class="order2">
                            <view class="no1">第4位</view>
                            <image src="http://www.mingtongxa.com/wanzhuan/sign2.png" mode="widthFix" />
                            <view class="no3">16元</view>
                        </view>
                        <view class="order1" style="padding-left:28upx">
                            <view class="no1">超大红包</view>
                            <image src="http://www.mingtongxa.com/wanzhuan/sign3.png" mode="widthFix" />
                            <view class="no3">31元</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="bottom">
                <view class="contHeader">
                    <text>签到有现金</text>
                    <view>今日可赚2.2元</view>
                </view>
                <view class="contContt">
                    <view class="conttLeft">
                        <view>
                        7天签到必得
                        <!-- <image src="http://www.mingtongxa.com/wanzhuan/signYaoMoney.png" mode="widthFix" /> -->
                        <text>3元</text>
                        </view>
                        <!-- <view class="leftllt">
                            双方都拿钱，详情
                            <image src="http://www.mingtongxa.com/wanzhuan/signTotoRight.png" mode="widthFix" />
                        </view> -->
                    </view>
                    <view class="conttRight">
                        <text>去领取</text> 
                        <image src="http://www.mingtongxa.com/wanzhuan/signLing.png" mode="widthFix" />
                    </view>
                </view>
                <view class="conttBot">
                    <image class="orbgs" src="http://www.mingtongxa.com/wanzhuan/signHeng.png" mode="widthFix" />
                    <view class="contorder">
                        <view class="order2">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign11.png" mode="widthFix" />
                            <view class="no3">4000</view>
                        </view>
                        <view class="order2">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign11.png" mode="widthFix" />
                            <view class="no3">1000</view>
                        </view>
                        <view class="order1">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign1.png" mode="widthFix" />
                            <view class="no3">1.0元</view>
                        </view>
                        <view class="order2">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign11.png" mode="widthFix" />
                            <view class="no3">1000</view>
                        </view>
                        <view class="order2">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign11.png" mode="widthFix" />
                            <view class="no3">6000</view>
                        </view>
                        <view class="order2">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign11.png" mode="widthFix" />
                            <view class="no3">1000</view>
                        </view>
                        <view class="order1">
                            <image src="http://www.mingtongxa.com/wanzhuan/sign1.png" mode="widthFix" />
                            <view class="no3">1.2元</view>
                        </view>
                    </view>
                </view>
            </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
export default {
  components: {
    TopBar
  },
  data () {
    return {
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    }
  },
  onLoad () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  font-size: 28upx;
  width: 100%;
  height: 100%;
  background: #FFF7E7;
  position: relative;
  .header{
      width: 100%;
      height: 800upx;
      .bgs{
          width: 100%;
          height: 100%;
          position: absolute;
      }
      .rens{
          width: 100%;
          position: absolute;
          z-index: 10;
      }
      .headerCon{
          position: absolute;
          top: 200upx;
          width: 96%;
          height: 320upx;
          background: linear-gradient(50deg, #FFEFD2, #EF7300);
          border-radius: 30upx;
          margin: 0 2%;
          .conHead{
              width: 100%;
              height: 80upx;
              display: flex;
              align-items: center;
              padding: 30upx;
              color: #EF7400;
              font-size: 30upx;
              .conbg{
                  width: 12upx;
                  margin-left: 10upx;
              }
          }
          .conContent{
              width: 100%;
              height: 150upx;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 20upx;
              .contleft{
                  font-size: 78upx;
                  color: #fff;
                  font-weight: bold;
              }
              .contright{
                  width: 240upx;
                  height: 80upx;
                  text-align: center;
                  color: #EF7300;
                  font-size: 32upx;
                  font-weight: bold;
                  position: relative;
                  image{
                      width: 100%;
                      height: 100%;
                      position: absolute;
                      right: 10upx;
                      top: 0upx;
                  }
                  text{
                      text-align: center;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0upx;
                      top: 18upx;
                  }
              }
          }
          .bottm{
              padding: 20upx;
              width: 100%;
              height: 60upx;
              display: flex;
              align-items: center;
              image{
                  width: 40upx;
              }
              text{
                  padding-left: 10upx;
                  font-size: 24upx;
                  color: #fff;

              }
          }
      }
      
  }
  .contentt{
          width: 98%;
          height: 480upx;
          background: #fff;
          border-radius: 30upx;
          margin: 20upx 1%;
          border:4upx solid #F27600;
          position: relative;
          top: -250upx;
          .contHeader{
              display: flex;
              align-items: center;
              padding: 30upx 20upx;
              margin-top: 30upx;
              text{
                font-weight: bold;
                color: #EF7400;
                font-size: 32upx;
              }
              view{
                  margin-left: 20upx;
                  background: rgba(239, 116, 0, 0.23);
                  padding: 6upx 8upx;
                  color: #EF7400;
                  font-size: 24upx;
              }
          }
          .contContt{
              padding: 0 20upx;
              width: 100%;
              height: 120upx;
              display: flex;
              justify-content: space-between;
              font-size: 34upx;
              color: #000;
              font-weight: 600;
              .conttLeft{
                  width: 70%;
                  height: 100%;
                  .leftllt{
                      font-size: 28upx;
                      color: #646464;
                      font-weight: normal;
                      padding-top: 10upx;
                      image{
                          width: 10upx;
                      }
                  }
                  image{
                      padding: 0 4upx;
                      width: 40upx;
                  }
                  text{
                      color: #DB1616;
                  }
              }
              .conttRight{
                  width: 30%;
                  height: 100%;
                  display: flex;
                  align-content: center;
                  justify-content: center;
                  position: relative;
                  text{
                      position: absolute;
                      z-index: 12;
                      color: #fff;
                      top: 18upx;
                  }
                  image{
                      width: 100%;
                      position: absolute;
                  }
              }
          }
          .conttBot{
              position: relative;
              width: 98%;
              height: 180upx;
              margin: 10upx 1%;
              background: rgba(216, 216, 216, 0.2);
              border-radius: 30upx;
              .orbgs{
                  width: 90%;
                  position: absolute;
                  left: 5%;
                  top: 85upx;
              }
              .contorder{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  .order1{
                      width: 20%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                    //   margin-left: 35upx;
                    align-items: center;
                      position: relative;
                      z-index:13;
                      .no1{
                          padding: 20upx 0 10upx 0;
                          font-size:22upx;
                          color: #FF2B3F;
                      }
                      image{
                          width: 80upx;
                      }
                      .no3{
                          font-size:24upx;
                          color: #656565;
                          padding-left: 12upx;
                      }
                  }
                  .order2{
                      width: 20%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      position: relative;
                      z-index:13;
                      .no1{
                          padding: 20upx 0 10upx 0;
                          font-size:22upx;
                          color: #656565;
                      }
                      image{
                          width: 60upx;
                      }
                      .no3{
                          font-size:24upx;
                          color: #656565;
                          padding-left: 12upx;
                      }
                  }
              }
          }
      }
      .bottom{
          width: 98%;
          height: 480upx;
          background: #fff;
          border-radius: 30upx;
          margin: 20upx 1%;
          border:4upx solid #F27600;
          position: relative;
          top: -250upx;
          .contHeader{
              display: flex;
              align-items: center;
              padding: 30upx 20upx;
              margin-top: 30upx;
              text{
                font-weight: bold;
                color: #EF7400;
                font-size: 32upx;
              }
              view{
                  margin-left: 20upx;
                  background: rgba(239, 116, 0, 0.23);
                  padding: 6upx 8upx;
                  color: #EF7400;
                  font-size: 24upx;
              }
          }
          .contContt{
              padding: 0 20upx;
              width: 100%;
              height: 120upx;
              display: flex;
              justify-content: space-between;
              font-size: 34upx;
              color: #000;
              font-weight: 600;
              .conttLeft{
                  width: 70%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  .leftllt{
                      font-size: 28upx;
                      color: #646464;
                      font-weight: normal;
                      padding-top: 10upx;
                      image{
                          width: 10upx;
                      }
                  }
                  image{
                      padding: 0 4upx;
                      width: 40upx;
                  }
                  text{
                      color: #DB1616;
                  }
              }
              .conttRight{
                  width: 30%;
                  height: 100%;
                  display: flex;
                  align-content: center;
                  justify-content: center;
                  position: relative;
                  text{
                      position: absolute;
                      z-index: 12;
                      color: #fff;
                      top: 38upx;
                  }
                  image{
                      width: 100%;
                      top: 20upx;
                      position: absolute;
                  }
              }
          }
          .conttBot{
              position: relative;
              width: 98%;
              height: 180upx;
              margin: 10upx 1%;
              background: rgba(216, 216, 216, 0.2);
              border-radius: 30upx;
              .orbgs{
                  width: 90%;
                  position: absolute;
                  left: 5%;
                  top: 85upx;
              }
              .contorder{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  .order1{
                      width: 20%;
                      height: 100%;
                      display: flex;
                      margin-top: 20upx;
                      flex-direction: column;
                    //   margin-left: 35upx;
                    justify-content: center;
                    align-items: center;
                      position: relative;
                      z-index:13;
                      .no1{
                          padding: 20upx 0 10upx 0;
                          font-size:22upx;
                          color: #FF2B3F;
                      }
                      image{
                          width: 70upx;
                      }
                      .no3{
                          font-size:24upx;
                          color: #656565;
                          padding-left: 12upx;
                      }
                  }
                  .order2{
                      width: 20%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      margin-top: 20upx;
                      justify-content: center;
                      position: relative;
                      z-index:13;
                      .no1{
                          padding: 20upx 0 10upx 0;
                          font-size:22upx;
                          color: #656565;
                      }
                      image{
                          width: 60upx;
                      }
                      .no3{
                          font-size:24upx;
                          color: #656565;
                          padding-left: 12upx;
                      }
                  }
              }
          }
      }
}
</style>