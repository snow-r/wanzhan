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
      barTitle="修改项目"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <!-- <view class="address">
          <view class="addressLeft">
            <image
            src="http://www.mingtongxa.com/wanzhuan/dai1.png"
            mode="widthFix"
          ></image>
            <text>开始使用时间</text> </view>
          <view class="addressRight">
            <DatePicker
              sTime="0"
              dayNum="30"
              @changeTime="changeTime"
              style="width:100%;height:100%"
            >
              <view
                slot="pCon"
                class="changeTime"
                v-if="time == ''"
              >
                <text>请选择开始时间</text>
              </view>
              <view slot="pCon" class="changeTimes" style="color:#DB0000" v-else>
                {{ time }}
              </view>
            </DatePicker>
          </view>
        </view> -->
        <!-- <view class="address">
          <view class="addressLeft">
            <image
            src="http://www.mingtongxa.com/wanzhuan/dai2.png"
            mode="widthFix"
          ></image>
            <text>结束使用时间</text> </view>
          <view class="addressRight">
            <DatePicker
              sTime="0"
              dayNum="30"
              @changeTime="changeTime"
              style="width:100%;height:100%"
            >
              <view
                slot="pCon"
                class="changeTime"
                v-if="time == ''"
              >
                <text>请选择结束时间</text>
              </view>
              <view slot="pCon" class="changeTimes" style="color:#DB0000" v-else>
                {{ time }}
              </view>
            </DatePicker>
          </view>
        </view> -->
        <view class="ruler">
          <view class="rulerHead">
            <image
              src="http://www.mingtongxa.com/wanzhuan/addPhoto1.png"
              mode="widthFix"
            ></image>
            <text>服务项目图片</text>
            
          </view>
          <view class="rulerText" v-if="!images" @click="chooseImg()">
            <image src="http://www.mingtongxa.com/wanzhuan/addPhotos.png" mode="widthFix"></image>
            <text>重新上传</text>
          </view>
          <view class="rulerTexts" v-else>
            <image :src='images' mode="widthFix"></image>
          </view>
        </view>
        <view class="fuwu">
          <image
            src="http://www.mingtongxa.com/wanzhuan/addPhoto2.png"
            mode="widthFix"
          ></image>
          <text>服务名称</text>
        </view>
        <view class="input">
          <input
            placeholder="请输入服务名称"
            v-model="name"
            type="text"
          />
        </view>
        <view class="header">
          <image
            src="http://www.mingtongxa.com/wanzhuan/fuwuTehui.png"
            mode="widthFix"
          ></image>
          <text>价格</text>
          <input
            class="headno"
            v-model="zhifuPrice"
            placeholder-style="color:#DB0000;"
            placeholder="支付价"
            type="number"
          />
          
          <image style="margin-left:40upx"
            src="http://www.mingtongxa.com/wanzhuan/fuwuYuanjia.png"
            mode="widthFix"
          ></image>
          <text>原价</text>
          <input
            class="headno"
            v-model="yuanjia"
            placeholder-style="color:#DB0000;"
            placeholder="原价"
            type="number"
          />
          
        </view>
        <view class="fuwu">
          <image
            src="http://www.mingtongxa.com/wanzhuan/addPhoto3.png"
            mode="widthFix"
          ></image>
          <text>服务描述</text>
        </view>
        <view class="input">
          <input
            placeholder="请输入服务描述"
            v-model="remark"
            type="text"
          />
        </view>
        <view class="btns">
          <view class="btnOn" @click="gotoAdd()">确认更改</view>
          <view class="btnOns" @click="gotoElect()">删除</view>
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
      shopDetail:{},
      IMG_BEFORE_URL,
      shopId:null,
      status:null,
      time: "",
      name:'',
      images:'',
      imgUrl:'',
      zhifuPrice:'',
      yuanjia:'',
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
    let obj = JSON.parse(opt.items)
      this.shopId=obj.shopId
      this.name=obj.name
      this.zhifuPrice=obj.price
      this.yuanjia=obj.originPrice
      this.caipinId = obj.id
      if(obj.remark){
        this.remark=obj.remark
      }else{
        this.remark=''
      }
      
  },
  methods: {
    changeTime(dates, ff, ll) {
      this.time = dates;
    },
    chooseImg() {
      var _this = this;
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          sizeType: ["original", "compressed"],
          success: (res) => {
            var path = res.tempFilePaths[0];
            _this.$comfun.uploadImg(path).then((res) => {
              var data = JSON.parse(res.data);
              console.log(res,'9999')
              _this.images = IMG_BEFORE_URL + data.data.url;
              _this.imgUrl = data.data.url;
            });
          },
        });
    },
    gotoAdd(){
      if (!this.imgUrl) {
        uni.showToast({
          title: "请上传服务项目图片！",
          icon: "none",
        });
        return;
      }
      if (!this.name) {
        uni.showToast({
          title: "请输入服务名称！",
          icon: "none",
        });
        return;
      }
      if (!this.zhifuPrice) {
        uni.showToast({
          title: "请填写支付价格！",
          icon: "none",
        });
        return;
      }
      if (!this.yuanjia) {
        uni.showToast({
          title: "请填写原价！",
          icon: "none",
        });
        return;
      }
      uni.showLoading();
      let sendData = {
        shopId:this.shopId,
        id: this.caipinId,
        price:this.zhifuPrice,
        originPrice:this.yuanjia,
        name:this.name,
        type:0,   //0普通  1 推荐
        imgUrl:this.imgUrl,
        remark:this.remark
      }
      this.$api.changeShopCai(sendData).then(res=>{
        uni.hideLoading()
        if(res.code==200){
          uni.showToast({
            title: "更改成功",
            duration: 1000,
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }else {
          this.$comfun.Toast(res.msg, "none");
        }
      })
    },
    //删除项目
    gotoElect() {
      var that = this;
      uni.showModal({
        title: "",
        content: "确定删除该项目吗？",
        success: function(res) {
          if (res.confirm) {
            let sendData = {
              id: that.caipinId,
            };
            uni.showLoading();
            that.$api.deleteShopCai(sendData).then((ress) => {
              uni.hideLoading();
              if (ress.code == 200) {
                uni.showToast({
                  title: "删除成功",
                  icon: "none",
                  duration: 1000,
                });
                setTimeout(() => {
                  uni.navigateBack();
                }, 1500);
              }
            });
          } else if (res.cancel) {
            uni.showToast({
              title: "操作取消",
              icon: "none",
              duration: 1500,
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 96%;
  margin: 0 2%;
  height: 100%;
  .header {
    width: 100%;
    margin: 40upx 0;
    height: 100upx;
    display: flex;
    align-items: center;
    border-bottom: 2upx dashed #707070;
    image{
      width: 40upx;
      margin: 0 10upx;
    }
    text {
      padding: 0 15upx;
      font-size: 28upx;
      font-weight: 600;
      color: #000;
    }
    .headno {
      width: 150upx;
      height: 60upx;
      border-radius: 10upx;
      border: 3upx solid #000;
      font-size: 24upx;
      font-weight: 600;
      color: #db0000;
      text-align: center;
    }
  }
  .address {
    margin-top: 20upx;
    width: 100%;
    height: 80upx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .addressLeft {
      width: 250upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .addressRight {
      font-size: 28upx;
      width: 350upx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .changeTime {
        display: flex;
        align-items: center;
        padding: 10upx 0;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
      }
      .changeTimes {
        display: flex;
        align-items: center;
        padding: 10upx 0;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
        font-weight: bold;
        font-size: 28upx;
      }
      text {
        font-size: 28upx;
        color: #db0000;
        font-weight: bold;
      }
      image {
        width: 45upx;
        height: 45upx;
      }
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
  .ruler {
    width: 100%;
    height: 390upx;
    .rulerHead {
      width: 250upx;
      height: 60upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .rulerText {
      width: 94%;
      height: 300upx;
      margin: 20upx;
      background: rgb(250, 219, 219);
      border: 3upx solid #000;
      border-radius: 15upx;
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
    .rulerTexts {
      width: 94%;
      height: 300upx;
      margin: 20upx;
      background: rgb(250, 219, 219);
      border: 3upx solid #000;
      border-radius: 15upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        width: 100%;
      }
    }
  }
  .fuwu {
    width: 250upx;
    height: 60upx;
    font-size: 28upx;
    color: #000;
    font-weight: 600;
    display: flex;
    align-items: center;
    image {
      width: 35upx;
      margin-right: 8upx;
    }
  }
  .input{
        width: 96%;
        margin: 20upx 2%;
        padding-left: 10upx;
        display: flex;
        align-items: center;
        input {
            padding: 10upx;
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
  .btns {
    width: 100%;
    height: 200upx;
    display: flex;
    flex-direction: column;
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
    .btnOns {
      background: #fff;
      margin-top: 20upx;
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
}
</style>
