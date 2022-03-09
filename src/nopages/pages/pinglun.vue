<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="写评价"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="tops">-写下真实体验，帮助万千用户选店-</view>
        <view class="header">
          <view>
            <!-- <view class="detailTop">
            服务结果
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
          </view> -->
            <view class="msg">
              <view class="detailTop">
                {{ shopName }}
              </view>
              <view class="name">
                <text>总体</text>
                <rate @change="onChange"></rate>
              </view>
              <view class="name">
                <text>口味</text>
                <rate @change="onChange1"></rate>
              </view>
              <view class="name">
                <text>环境</text>
                <rate @change="onChange2"></rate>
              </view>
              <view class="name">
                <text>服务</text>
                <rate @change="onChange3"></rate>
              </view>

              <!-- <textarea placeholder="" name="" id="" cols="30" rows="10"></textarea> -->
            </view>
            <textarea
              cols="30"
              rows="10"
              v-model="content"
              placeholder-style="color:#B9BABC"
              placeholder="大家都在问：服务态度好吗，环 境（空间、布置）怎么样？"
            />
            <view class="no9">写15个字，有机会被采纳为精选评价！</view>
            <view class="otns">
              <view class="upLoad">
                <view class="upLoadImg">
                  <view class="imgWrap">
                    <view
                      v-if="!descUrl"
                      class="addPhoneBtn"
                      @click="chooseImg(1)"
                    >
                      <image src="../static/photos.png" mode="widthFix" />
                      <view>上传照片</view>
                    </view>
                    <view v-else class="addPhoneBtns">
                      <image :src="descUrl" mode="widthFix" />
                    </view>
                  </view>
                </view>
                <view class="upLoadImg">
                  <view class="imgWrap">
                    <view
                      v-if="!videoUrl"
                      class="addPhoneBtn"
                      @click="chooseImg(2)"
                    >
                      <image src="../static/videos.png" mode="widthFix" />
                      <view>上传视频</view>
                    </view>
                    <view v-else class="addPhoneBtn">
                      <video :src="videoUrl" class="video"></video>
                    </view>
                  </view>
                </view>
              </view>
              <view class="rights">
                <view>100字+3张图或15秒视频</view>
                <view style="padding-top:25rpx"
                  >有机会被<text>评为优质评价</text>
                </view>
              </view>
            </view>
            <view class="niming">
              <view class="niLeft">
                <image
                  v-if="!agree"
                  src="@/static/images/noAgree.png"
                  @click="tongyi(1)"
                  mode="widthFix"
                />
                <image
                  v-else
                  src="../static/cheons.png"
                  @click="tongyi(2)"
                  mode="widthFix"
                />
                <text>匿名评价</text>
              </view>
              <view class="niRight">
                <text>对商家和其他用户隐藏头像和用户名</text>
                <image src="../static/wenhao.png" mode="widthFix" />
              </view>
            </view>
            <view class="tiao"></view>
            <view class="tuijian" v-if="goods.length > 0">
              <view class="tuiHeader">
                <view>推荐菜</view>
                <view class="headers">
                  <text>全部推荐菜</text>
                  <image src="@/static/images/right.png" mode="widthFix" />
                </view>
              </view>
              <view class="tuiCont">
                <view
                :class="item.current ? 'contOrder active' : 'contOrder'"
                 class="contOrder"
                  v-for="(item, index) in goods"
                  :key="index"
                  ><text @click="addorNm(item)">{{ item.name }}</text></view
                >
              </view>
            </view>
            <view class="tiao"></view>
            <view class="renjun">
              <view class="renLeft">
                <text class="text">人均</text>
                <text>￥</text>
              </view>
              <view class="renRight">
                <input v-model="price" type="number" placeholder="请输入人均消费金额" />
              </view>
            </view>
            <view class="tiao"></view>
            <view class="btns" @click="orderComment()">
              <view class="btnOn">确认</view>
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
import Rate from "./components/rate.vue";
export default {
  components: {
    TopBar,
    Rate,
  },
  data() {
    return {
      orderId: null,
      IMG_BEFORE_URL,
      detail: {},
      tags: "",
      content: "",
      score: null,
      frontSide: "",
      frontSides: "",
      resultId: 1,
      videoUrl: "",
      descUrl: "",
      descUrls: "",
      videoUrls: "",
      agree: false,
      agreeNo: 0,
      goods: [],
      shopName: "",
      zongti: "",
      kouwei: "",
      huanjing: "",
      fuwu: "",
      price:'',
      tuijianOrder:''
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
    this.orderId = opt.orderId;
    this.shopId = opt.id;
    // this.getOrder();
    this.getShop();
  },
  mounted() {},
  methods: {
    getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.shopName = res.data.name;
          if (res.data.goodsList.length > 0) {
             res.data.goodsList.map(item=>{
                  item.current = false
              })
            this.goods = res.data.goodsList;
          } else {
            this.goods = [];
          }
        }
      });
    },
    tongyi(index) {
      this.agree = !this.agree;
      if(this.agree){
          this.agreeNo = 1
      }else{
          this.agreeNo = 0
      }
      
    },
    addorNm(item){
        item.current = !item.current
        let tuijianList = []
        this.goods.forEach(ite=>{
            if(ite.current){
                tuijianList.push(ite.name)
            }
        })
        this.tuijianOrder = tuijianList.join(",")
    },
    getOrder() {
      let sendData = {
        id: this.orderId,
      };
      uni.showLoading({
        mask: true,
      });
      this.$api.getOrderDetail(sendData).then((res) => {
        uni.hideLoading();
        console.log(res, "66666");
        if (res.code == 200) {
          this.detail = res.data;
          this.tags = res.data.tags.replace(/,/g, " | ");
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    chooseImg(type) {
      if (type == 1) {
        var _this = this;
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          sizeType: ["original", "compressed"],
          success: (res) => {
            var path = res.tempFilePaths[0];
            _this.$comfun.uploadImg(path).then((res) => {
              var data = JSON.parse(res.data);
              _this.descUrl = IMG_BEFORE_URL + data.data.url;
              _this.descUrls = data.data.url;
            });
          },
        });
      } else if (type == 2) {
        var _this = this;
        uni.chooseVideo({
          sourceType: ["album", "camera"],
          camera: "back",
          success: ({ tempFilePath }) => {
            _this.$comfun.uploadVideo(tempFilePath).then((res) => {
              var data = JSON.parse(res.data);
              console.log(data.data.url, "66666");
              _this.videoUrl = IMG_BEFORE_URL + data.data.url;
              _this.videoUrls = data.data.url;
              console.log(_this.videoUrl, "66666");
            });
          },
          fail: (error) => {},
        });
      }
    },
    onChange(d) {
      console.log(d);
      this.zongti = d.value;
    },
    onChange1(d) {
      console.log(d);
      this.kouwei = d.value;
    },
    onChange2(d) {
      console.log(d);
      this.huanjing = d.value;
    },
    onChange3(d) {
      console.log(d);
      this.fuwu = d.value;
    },
    // chooseImg(index) {
    //   var _this = this;
    //   uni.chooseImage({
    //     count: 1,
    //     sourceType: ["camera", "album"],
    //     sizeType: ["original", "compressed"],
    //     success: (res) => {
    //       var path = res.tempFilePaths[0];
    //       _this.$comfun.uploadImg(path).then((res) => {
    //         var data = JSON.parse(res.data);
    //         _this.frontSide = IMG_BEFORE_URL + data.data.url;
    //         _this.frontSides = data.data.url;
    //       });
    //     },
    //   });
    // },
    changeList(item) {
      this.list.forEach((ite) => {
        ite.current = false;
      });
      item.current = true;
      this.result = item.name;
      this.resultId = item.id;
    },
    orderComment() {
      if (!this.zongti) {
        uni.showToast({
          title: "你还没有为星级打分",
          icon: "none",
        });
        return;
      }
      if (!this.kouwei) {
        uni.showToast({
          title: "你还没有为口味打分",
          icon: "none",
        });
        return;
      }
      if (!this.huanjing) {
        uni.showToast({
          title: "你还没有为环境打分",
          icon: "none",
        });
        return;
      }

      if (!this.fuwu) {
        uni.showToast({
          title: "你还没有为服务打分",
          icon: "none",
        });
        return;
      }
      if (!this.content) {
        uni.showToast({
          title: "请输入对该店铺的评价",
          icon: "none",
        });
        return;
      }
      let sendData = {
        content: this.content,
        shopId: this.shopId,
        imgUrl: this.descUrls,
        videoUrl: this.videoUrls,
        isAgree: this.agreeNo,
        score: this.zongti,
        score1: this.kouwei,
        score2: this.huanjing,
        score3: this.fuwu,
        popPrice: this.price,
        isGood: this.tuijianOrder
      };
      uni.showLoading({
        mask: true,
      });
      this.$api.pinglunShop(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            title: "评论成功",
            duration: 1500,
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
          });
        }
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
  .tiao {
    width: 100%;
    height: 40upx;
    background: #f5f6f7;
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
  .renjun {
    width: 100%;
    height: 100upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .renLeft {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30upx;
      .text {
        font-size: 34upx;
        color: #000;
        font-weight: bold;
      }
      text {
        font-size: 32upx;
        font-weight: bold;
        color: #b9babc;
      }
    }
    .renRight {
      width: 70%;
      height: 100%;
      input {
        width: 90%;
        height: 100%;
      }
    }
  }
  .tuijian {
    width: 100%;
    padding-bottom: 20upx;
    .tuiHeader {
      height: 80upx;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      padding: 0 20upx;
      font-size: 34upx;
      color: #000;
      font-weight: bold;
      .headers {
        text {
          font-size: 28upx;
          font-weight: normal;
          color: #797a7b;
          padding-top: 5upx;
        }

        image {
          width: 26upx;
          padding-left: 5upx;
        }
      }
    }
    .tuiCont {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .contOrder {
        padding: 10upx 25upx;
        background: #f3f4f5;
        margin: 10upx 10upx;
        border-radius: 30upx;
      }
      .active{
          background: linear-gradient(172deg, #FF8080 0%, #DC0303 100%);
          color: #fff;
      }
    }
  }
  .otns {
    width: 100%;
    height: 200upx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .niming {
    width: 100%;
    height: 80upx;
    display: flex;
    justify-content: space-between;
    padding: 0 20upx;
    .niLeft {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      image {
        width: 40upx;
      }
      text {
        font-size: 30upx;
        color: #000;
        padding-left: 15upx;
      }
    }
    .niRight {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      text {
        font-size: 24upx;
        color: #b9babc;
      }
      image {
        width: 34upx;
      }
    }
  }
  .rights {
    width: 42%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    view {
      font-size: 28upx;
      color: #b9babc;
    }
    text {
      color: #ee4444;
    }
  }
  .upLoad {
    width: 58%;
    height: 200upx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .upLoadImg {
    width: 50%;
    height: 150upx;
    .imgWrap {
      width: 150upx;
      height: 150upx;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2upx dashed #b9b9b9;
      border-radius: 10upx;
      margin: 10upx auto 0;
      .addPhoneBtn {
        font-size: 28upx;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .video {
          width: 150upx;
          height: 150upx;
        }
        image {
          width: 50upx;
          height: 50upx;
          margin-bottom: 20upx;
        }
      }
      .addPhoneBtns {
        width: 150upx;
        height: 150upx;
        image {
          width: 100%;
          height: 100% !important;
        }
      }
      .userImage {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tops {
    font-size: 24upx;
    color: #c88b46;
    text-align: center;
    font-weight: bold;
    height: 60upx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    width: 100%;
    height: 200upx;
    display: flex;
    flex-direction: column;
    .msg {
      width: 96%;
      margin: 20upx 2% 20upx;
      background: #fff;
      border-radius: 10upx;
      font-size: 34upx;
      color: rgb(7, 6, 6);
      padding: 20upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .detailTop {
        width: 100%;
        height: 60upx;
        font-size: 34upx;
        font-weight: bold;
      }
      .no1 {
        width: 100%;
        height: 60upx;
        line-height: 60upx;
        image {
          width: 40upx;
          height: 40upx;
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
    .order {
      width: 96%;
      margin: 0 2%;
      height: 150upx;
      background: #fff;
      border-radius: 30upx;
      color: #333;
      .orderHeader {
        padding: 20upx 0 20upx 30upx;
        display: flex;
        view {
          font-weight: bold;
        }
        text {
          padding-left: 40upx;
        }
      }
      .orderBottom {
        font-weight: normal;
        padding: 0 0 0 30upx;
      }
      //   margin-top: 100upx;
    }
    .orderTop {
      width: 96%;
      margin: 2%;
      height: 200upx;
      background: #fff;
      border-radius: 20upx;
      display: flex;
      .orderLeft {
        width: 30%;
        height: 200upx;
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
          font-size: 30upx;
          color: #333;
          padding: 0upx 0 20upx 20upx;
        }
      }
      .rightDetail {
        display: flex;
        width: 100%;
        color: #333;
        font-size: 28upx;
        flex-direction: column;
        .rightLeft {
          color: #999;
          display: flex;
          padding: 0 20upx;
          justify-content: space-between;
        }
        .rightRight {
          display: flex;
          justify-content: space-between;
          color: #999;
          padding: 15upx 20upx;
        }
      }
    }
    .time {
      display: flex;
      width: 96%;
      height: 75upx;
      margin: 20upx 2%;
      background: #fff;
      border-radius: 10upx;
      font-size: 32upx;
      color: #333;
      padding-left: 20upx;
      line-height: 75upx;
      text {
        color: #e49916;
        padding-left: 30upx;
      }
    }
    .detail {
      width: 96%;
      height: 260upx;
      margin: 0 2% 20upx;
      background: #fff;
      border-radius: 10upx;
      font-size: 38upx;
      color: #333;
      padding: 20upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .detailTop {
        width: 100%;
        height: 60upx;
      }
      .detailBottom {
        width: 100%;
        height: 190upx;
        display: flex;
        justify-content: center;
        align-items: center;
        view {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .name {
            width: 80upx;
            height: 80upx;
            border-radius: 50%;
            background: #bfbfbf;
            color: #fff;
            font-size: 42upx;
            text-align: center;
            line-height: 80upx;
            margin-top: 40upx;
          }
          image {
            width: 80upx !important;
            height: 80upx !important;
            margin-top: 40upx;
          }
          text {
            font-size: 30upx;
            padding-top: 20upx;
            color: #666;
          }
        }
      }
    }

    .msg {
      width: 96%;
      height: 400upx;
      margin: 0 2% 20upx;
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
        padding-bottom: 20upx;
        font-weight: bold;
      }
      .name {
        width: 100%;
        height: 80upx;
        display: flex;
        align-items: center;
        padding-bottom: 30upx;
        text {
          padding-right: 30upx;
          font-weight: bold;
        }
      }
      .no4 {
        width: 100%;
        height: 80upx;
        text {
          color: #999;
          padding-right: 20upx;
        }
      }
    }
    textarea {
      border-radius: 10upx;
      width: 100%;
      height: 280upx;
      width: 90%;
      padding: 20upx;
    }
    .no9 {
      width: 100%;
      color: #b9babc;
      font-size: 24upx;
      text-align: right;
      padding-right: 20upx;
    }
    .pay {
      width: 100%;
      height: 100upx;
      background: #f5f7ff;
      border-radius: 10upx;
      font-size: 28upx;
      color: #333;
      padding: 10upx 20upx;
      display: flex;
      justify-content: space-between;
      .no1 {
        width: 160upx;
        height: 60upx;
        background: #fff;
        border-radius: 50upx;
        border: 1upx solid #999;
        color: #999;
        text-align: center;
        line-height: 60upx;
      }
      .no2 {
        width: 160upx;
        height: 60upx;
        line-height: 60upx;
        border-radius: 50upx;
        border: 1upx solid #999;
        color: #fff;
        text-align: center;
        background: #0198fe;
      }
    }
    .pinglun {
      width: 94%;
      height: 80upx;
      margin: 0 3%;
      background: #0198fe;
      border-radius: 20upx;
      font-size: 28upx;
      color: #fff;
      text-align: center;
      line-height: 80upx;
    }
  }
}
</style>
