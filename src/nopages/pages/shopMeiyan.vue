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
      barTitle="商铺美颜"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="top">申请商铺图片拍照</view>
        <view class="content">
          <view class="row">
            <view class="nominal">邮箱</view>
            <view class="input">
              <input
                placeholder="请输入接收照片邮箱"
                placeholder-style="color:#000"
                v-model="email"
                type="text"
              />
            </view>
          </view>
        </view>
        <view class="address">
          <view class="addressLeft">时间</view>
          <view class="addressRight">
            <DatePicker
              sTime="8"
              dayNum="7"
              @changeTime="changeTime"
              style="width:100%;height:100%"
            >
              <view
                slot="pCon"
                class="changeTime"
                v-if="time == ''"
                style="color:#999"
              >
                <text>请选择预约上门拍照时间</text>
              </view>
              <view slot="pCon" class="changeTimes" v-else>
                {{ time }}
              </view>
            </DatePicker>
          </view>
        </view>
        <view class="msg">
          <view class="detailTop">
            请选择规格
          </view>
          <view
            class="no1"
            v-for="(item, index) in list"
            :key="index"
            @click="changeList(item)"
          >
            <image v-if="!item.current" :src="item.icon" mode="widthFix" />
            <image v-else :src="item.icons" mode="widthFix" />
            <text>{{ item.name }}</text>
          </view>
        </view>
        <textarea placeholder="请描述拍照照片要求" v-model="remark" name="" id="" cols="30" rows="10"></textarea>
        <view class="btns">
          <view class="btnOn" @click="gotoAdd()">提交</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import DatePicker from "./components/datePicker.vue";
export default {
  components: {
    TopBar,
    DatePicker,
  },
  data() {
    return {
      time: "",
      list: [],
      price:null,
      id:null,
      amount:null,
      shopId:null,
      serviceName:'',
      email:'',
      remark:''
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
    this.shopId = opt.id
    this.getFuWulist()
  },
  methods: {
    changeTime(dates, ff, ll) {
      console.log(dates, ff, ll);
      this.time = dates;
    },
    changeList(item) {
      this.list.forEach((ite) => {
        ite.current = false;
      });
      item.current = true;
      this.id = item.id;
      this.price = item.price;
      this.amount = item.price
    },
    getFuWulist(){
      let sendData={
        type:1    //分类：1修图，2信息，3推荐
      }
      this.$api.getFuList(sendData).then(res=>{
        if(res.code == 200){
          var arr = []
          res.data.map((item,index)=>{
            arr.push({
                    name:`${item.name}-${item.price}元`,
                    current:false,
                    icon:"../static/nocheck.png",
                    icons:"../static/ischecked.png",
                    serviceName:item.name,
                    id:item.id,
                    price:item.price,
                    originPrice:item.originPrice
                })
          })
          arr.map((ite,inde)=>{
            if(inde==0){
              ite.current = true
              this.id = ite.id;
              this.price = ite.price
              this.amount = ite.price
              this.serviceName = ite.name
            }
          })
          
          this.list = arr
        }
      })
    },
    gotoAdd(){
      
      if (!this.email) {
        uni.showToast({
          title: "请输入接收图片邮箱！",
          icon: "none",
        });
        return;
      }
      if (!this.time) {
        uni.showToast({
          title: "请选择预约上门拍照时间！",
          icon: "none",
        });
        return;
      }
      let sendData={
        shopId:this.shopId,
        serviceId:this.id,
        serviceName:this.serviceName,
        price:this.price,
        amount:this.price,
        number:1,
        orderTime:this.time,
        email:this.email,
        remark:this.remark
      }
      this.$api.setFuList(sendData).then(res=>{
        if (res.code == 200) {
          uni.navigateTo({
            url:
              "/nopages/pages/payNumbers?number=" +
              res.data.price +
              "&orderId=" +
              res.data.id
          });
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      })
    }

  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  textarea {
        width: 94%;
        font-size: 26upx;
        padding: 30upx 0;
        padding-left: 15upx;
        border: 1upx solid #000;
        margin: 0 2%;
        border-radius: 30upx;
        color: #333;
        font-weight: bold;
      }
  .top {
    width: 100%;
    height: 100upx;
    text-align: center;
    font-size: 32upx;
    font-weight: 600;
    color: #000;
  }
  .btns {
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btnOn {
      background: linear-gradient(to right, #fc4343, #cf0505);
      border-radius: 50upx;
      border: 4upx solid #000;
      width: 280upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .msg {
    width: 98%;
    margin: 20upx 1% 20upx;
    background: #fff;
    border-radius: 10upx;
    font-size: 32upx;
    color: #333;
    padding: 20upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .detailTop {
      width: 100%;
      height: 60upx;
      font-weight: bold;
    }
    .no1 {
      width: 100%;
      height: 60upx;
      line-height: 60upx;
      image {
        width: 26upx;
      }
      text {
        font-size: 26upx;
        color: #333;
        padding-left: 20upx;
      }
    }
    text {
      color: #333;
    }
    .nono {
      width: 100%;
      height: 240upx;
      background: #fff;
      border-radius: 20upx;
      > view {
        padding: 20upx;
      }
    }
    .imgWrap {
      width: 48%;
      height: 220upx;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2upx dashed #b9b9b9;
      border-radius: 10upx;
      margin: 0 auto 0;
      .addPhoneBtn {
        font-size: 28upx;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        image {
          width: 50upx;
          height: 50upx;
          margin-bottom: 20upx;
        }
      }
      .userImage {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    background: #fff;
    border-radius: 20upx;
    padding: 20upx;

    .row {
      display: flex;
      min-height: 90upx;
    }
    .genderRadio {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: 20upx;
      .radioItemWrap {
        display: flex;
        align-items: center;
        image {
          width: 34upx;
          height: 34upx;
          margin-right: 12upx;
        }
      }
      .radioItemWrap:first-child {
        margin-right: 30upx;
      }
    }
    .row .nominal {
      width: 20%;
      line-height: 90upx;
      font-size: 28upx;
      font-weight: 600;
      color: #000;
    }

    .row .input {
      width: 71%;
      margin-left: 20upx;
      padding-left: 10upx;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        border: 3upx solid #000;
        border-radius: 10upx;
        height: 60upx;
        line-height: 60upx;
        font-size: 26upx;
        font-weight: 600;
        color: #000;
        padding-left: 20upx;
      }

      
    }

    & > view:last-child {
      border: none !important;
    }
  }
  .address {
    width: 100%;
    height: 100upx;
    padding: 20upx 0 20upx 20upx;
    background: #fff;
    border-radius: 20upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .addressLeft {
      width: 23%;
      font-size: 28upx;
      color: #000;
      font-weight: bold;
    }
    .addressRight {
      font-size: 28upx;
      width: 77%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .changeTime {
        border-radius: 10upx;
        border: 3upx solid #000;
        width: 500upx;
        display: flex;
        padding: 12upx 20upx;
      }
      .changeTimes {
        border-radius: 10upx;
        border: 3upx solid #000;
        width: 500upx;
        display: flex;
        padding: 12upx 20upx;
        font-weight: bold;
      }
      text {
        font-size: 26rpx;
        font-weight: bold;
        color: #000;
      }
      image {
        width: 35upx !important;
        height: 35upx;
      }
    }
  }
}
</style>
