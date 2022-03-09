<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <Dialog custom-class="demo-popup" position="center" v-model="visible">
      <view class="dialogs">
        <view class="dialogHeader" style="padding-top:30upx">
          选择店铺
        </view>
        <scroll-view class="no88" scroll-y>
          <view
            class="content"
            v-for="(item, index) in shopList"
            :key="index"
            @click="bangding(item)"
          >
            <view class="contLeft">
              <image :src="item.detail.imgUrl" mode="widthFix"></image>
            </view>
            <view class="contRight">
              <view class="right1">{{ item.detail.name }}</view>
              <view class="right2"
                ><text>{{ item.detail.address }}</text>
              </view>
              <view class="right5">
                <image
                  v-if="item.current"
                  src="@/static/images/iagree.png"
                  mode="widthFix"
                ></image>
                <image
                  v-else
                  src="@/static/images/inoagree.png"
                  mode="widthFix"
                ></image>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="btns">
          <view class="btnOn1" @click="closeDialog(1)">取消</view>
          <view class="btnOn" @click="closeDialog(2)">确认</view>
        </view>
      </view>
    </Dialog>
    <TopBar
      background="#f0f0f0"
      :back="true"
      barTitle="商铺管理"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view class="headLeft" @click="gotoBang()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl1.png"
              mode="widthFix"
            ></image>
            <text>绑定</text>
          </view>
          <view class="headLeft" @click="gotoQie()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl2.png"
              mode="widthFix"
            ></image>
            <text>切换</text>
          </view>
        </view>
        <view class="content" v-if="shopList.length > 0">
          <view class="contLeft">
            <image v-if="/^http/.test(shopLists.detail.imgUrl)"  :src="shopLists.detail.imgUrl" mode="widthFix"></image>
            <image v-else  :src="IMG_BEFORE_URL+shopLists.detail.imgUrl" mode="widthFix"></image>
          </view>
          <view class="contRight">
            <view class="right1">{{ shopLists.detail.name }}</view>
            <view class="right2"
              >营业时间：
              <text
                >{{ shopLists.detail.beginTime }}-{{
                  shopLists.detail.endTime
                }}</text
              >
            </view>
            <view class="right3">{{ shopLists.detail.address }}</view>
            <view class="right4">
              <!-- <image
                src="http://www.mingtongxa.com/wanzhuan/spglgai.png"
                mode="widthFix"
              ></image> -->
              <image  @click="didUp()"
                src="http://www.mingtongxa.com/wanzhuan/spglgai.png"
                mode="widthFix"
                style="padding-right:10px"
              ></image>
              <image  @click="changeShop()"
                src="http://www.mingtongxa.com/wanzhuan/spglgai.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="headers">
          <view class="headLeft" @click="changeDaijin()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl3.png"
              mode="widthFix"
            ></image>
            <text>代金券管理</text>
          </view>
          <view class="headLeft" @click="changeCaipin()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl4.png"
              mode="widthFix"
            ></image>
            <text>菜品管理</text>
          </view>
          <view class="headLeft" @click="gotoRenzheng()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl5.png"
              mode="widthFix"
            ></image>
            <text>商铺认证</text>
          </view>
          <view class="headLeft" @click="changeMeiyan()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spglno12.png"
              mode="widthFix"
            ></image>
            <text>商铺美颜</text>
          </view>
          <view class="headLeft" @click="scanCode()">
            <image
              src="http://www.mingtongxa.com/wanzhuan/spgl13.png"
              mode="widthFix"
            ></image>
            <text>核验扫码</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import Dialog from "@/components/dialog";
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar,
    Dialog,
  },
  data() {
    return {
      IMG_BEFORE_URL,
      visible: false,
      list: null,
      shopId: null,
      shopList: [],
      state:null,
      shopLists: uni.getStorageSync("shopLists"),
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
    this.getUser();
    // this.getShop()
    this.postSouList();
  },
  onShow() {
    this.getUser()
    // this.getShop()
  },
  methods: {
    getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.state = res.data.state
        }
      });
    },
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
        this.shopList = res.data.shopList;
        // this.shopLists = res.data.shopList[0]

        if (uni.getStorageSync("shopLists")) {
          this.shopLists = uni.getStorageSync("shopLists");
          this.shopId = uni.getStorageSync("shopLists").detail.shopId;
        } else {
          uni.setStorageSync("shopLists", res.data.shopList[0]);
          this.shopLists = uni.getStorageSync("shopLists");
          this.shopId = res.data.shopList[0].detail.shopId;
        }
        this.getShop()
      });
    },
    changeDaijin() {
      uni.navigateTo({
        url: "/nopages/pages/spQuanbao?id=" + this.shopId,
      });
    },
    changeMeiyan() {
      uni.navigateTo({
        url: "/nopages/pages/shopMeiyan?id=" + this.shopId,
      });
    },
    gotoRenzheng(){
      if(this.state==0){
        uni.navigateTo({
          url: "/subpages/pages/company?id=" + this.shopId,
        });
      }else if(this.state==1){
        uni.navigateTo({
          url: "/nopages/pages/msgCompany?id=" + this.shopId,
        });
      }else if(this.state==2){
          uni.navigateTo({
          url: "/nopages/pages/msgCompany?id=" + this.shopId,
        });
      }
      
    },
    changeCaipin() {
      uni.navigateTo({
        url: "/nopages/pages/caipinGl?id=" + this.shopId,
      });
    },
    closeDialog(index) {
      if (index == 1) {
        this.visible = false;
      } else if (index == 2) {
        this.$comfun.Toast("切换店铺成功", "none");
        this.visible = false;
      }
    },
    changeShop() {
      uni.navigateTo({
        url: "/nopages/pages/shopOrder?id=" + this.shopId,
      });
    },
    gotoBang() {
      uni.navigateTo({
        url: "/subpages/pages/bangding",
      });
    },
    gotoQie() {
      if (this.shopList.length >= 2) {
        // this.shopList.map(item=>{
        // item.current = false
        // })
        this.visible = true;
      }
    },
    bangding(ite) {
      this.shopLists = ite;
      uni.setStorageSync("shopLists", ite);
      this.shopId = ite.id;
      this.shopList.map((item) => {
        item.current = false;
        if (item.detailId == ite.detailId) {
          item.current = true;
        }
      });
    },
    scanCode() {
      var that = this;
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function(res) {
          var resultCode = res.result
          uni.showLoading({
            title: "识别中",
          });
          if (res.result) {
            let sendData = {
              code: resultCode,
              shopId: that.shopId,
            };
            that.$api.getQuanCodeMsg(sendData).then((reopnse) => {
              uni.hideLoading();
              if (reopnse.data) {
                uni.navigateTo({
                  url:
                    "/nopages/pages/heyanSaoma?number=" +
                    reopnse.data.voucherCode +
                    "&shopId=" +
                    reopnse.data.shopId+
                    "&start=" +
                    reopnse.data.startTime+
                    "&end=" +
                    reopnse.data.endTime+
                    "&name=" +
                    reopnse.data.name,
                });
              }
            });
          } else {
            uni.showToast({
              title: "核销码错误",
              icon: "none",
              duration: 1000,
            });
          }
        },
      });
    },
    postSouList() {
      let sendData = {
        inviteCode: this.inviside,
        createUserMobile: this.phone,
      };
      uni.showLoading();
      this.$api.postSouList(sendData).then((res) => {
        uni.hideLoading();
        console.log(res, "444");
        if (res.code == 200) {
          res.data.map((item) => {
            item.current = false;
          });
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    /// 点击上架
    didUp(shop){
      //   console.log('userId --- ',uni.getStorageSync("userId"),);
      //   this.enableShop
      //   let sendData = {
      //   userId: uni.getStorageSync("userId"),
      //   amount: this.confirmPop, // 金额
      // };

      console.log('shop === ',shop);
      this.$api.snow.enableShop(uni.getStorageSync("userId")).then((res) => {
        console.log('上架结果 -- ',res)
      })
    }
  },
};
</script>

<style lang="less" scoped>
.dialogs {
  background: #fff;
  width: 652upx;
  height: 905upx;
  // height: 900upx;
  box-shadow: 0 2upx 16upx 2upx #f5a9ad;
  .dialogHeader {
    font-size: 28upx;
    color: #000;
    font-weight: bold;
  }
  .no88 {
    height: 676upx;
  }
  .content {
    box-shadow: 0 2upx 18upx 3upx #f5a9ad;
    width: 90%;
    height: 300upx;
    margin: 30upx 5% 20upx;
    border-radius: 30upx;
    background: #fff;
    border: 2upx solid rgba(239, 111, 42, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .contLeft {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 280upx;
        border-radius: 20upx;
        margin-left: 20upx;
      }
    }
    .contRight {
      position: relative;
      width: 50%;
      height: 100%;
      padding: 50upx 30upx 0 20upx;
      color: #000;
      .right1 {
        font-size: 28upx;
        font-weight: bold;
        padding-bottom: 50upx;
      }
      .right2 {
        padding-left: 10upx;
        font-size: 26upx;
        text-align: left;
        padding-bottom: 15upx;
      }
      .right5 {
        position: absolute;
        image {
          width: 35upx;
        }

        right: 20upx;
        bottom: 20upx;
      }
    }
  }
  .btns {
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btnOn1 {
      background: #dadada;
      border-radius: 50upx;
      border: 4upx solid #ababab;
      width: 160upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btnOn {
      margin-left: 50upx;
      background: linear-gradient(to right, #fc4343, #cf0505);
      border-radius: 50upx;
      border: 4upx solid #000;
      width: 160upx;
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
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  .header {
    box-shadow: 0 2upx 8upx 2upx #f5a9ad;
    display: flex;
    align-items: center;
    width: 98%;
    margin: 20upx 1%;
    height: 260upx;
    border-radius: 30upx;
    background: #fff;
    border: 2upx solid rgba(239, 111, 42, 0.2);
    .headLeft {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        width: 120upx;
      }
      text {
        font-size: 28upx;
        font-weight: bold;
        padding-top: 20upx;
        color: #000;
      }
    }
  }
  .content {
    box-shadow: 0 2upx 8upx 2upx #f5a9ad;
    width: 98%;
    height: 400upx;
    margin: 0 1%;
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
        width: 230upx;
        height: 80% !important;
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
      }
      .right3 {
        font-size: 26upx;
        padding-bottom: 50upx;
      }
      .right4 {
        width: 100%;
        height: 60upx;
        text-align: right;
        image {
          width: 140upx;
        }
      }
    }
  }
  .line {
    width: 90%;
    margin: 50upx 5% 0;
    height: 2upx;
    border-bottom: 1upx dashed #979797;
  }
  .headers {
    display: flex;
    align-items: center;
    width: 98%;
    margin: 10upx 1%;
    height: 200upx;
    border-radius: 30upx;
    flex-wrap: wrap;
    .headLeft {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        width: 100upx;
      }
      text {
        font-size: 28upx;
        font-weight: bold;
        padding-top: 10upx;
        color: #000;
      }
    }
  }
}
</style>
