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
      barTitle="添加商户"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="content">
          <view class="top">
            <view class="topLeft">
              <image
                src="http://www.mingtongxa.com/wanzhuan/guize.png"
                mode="widthFix"
              ></image>
              <text>规则说明</text>（ <text class="texttop">请详细阅读</text>）
              <image
                class="itemBg"
                src="http://www.mingtongxa.com/wanzhuan/guizeyou.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="topcont">
            <view class="top" style="border:none">
              <view class="topLeft">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shanghu.png"
                  mode="widthFix"
                ></image>
                <text>商户类型</text>（ <text class="texttop">必填</text>）
              </view>
            </view>
            <view class="topContent"
              >成功添加指定类型商户最高可获得 <text>50积分</text>
            </view>
            <view class="topInput">
              <picker @change="bindPickerChange" :value="index" :range="array">
                <input
                  type="text"
                  v-model="form.leixing"
                  placeholder="请选择最贴近商户经营范围的类型"
                  disabled
                />
              </picker>
              <image
                src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="chengshi">
            <view class="contentTop">
              <view class="topLeft">
                <image
                  class="leftimg"
                  src="http://www.mingtongxa.com/wanzhuan/shopNames.png"
                  mode="widthFix"
                ></image>
                <text>商户名称</text>（ <text class="texttop">必填</text>）
              </view>
              <view class="topInput">
                <input
                  type="text"
                  placeholder="填写门店照片上的招牌名称，长度1-50字"
                  v-model="form.name"
                  minlength="1"
                  maxlength="50"
                  placeholder-style="color:#707070"
                />
              </view>
            </view>
          </view>
          <view class="chengshi">
            <view class="contentTop">
              <view class="topLeft">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/chengshi.png"
                  mode="widthFix"
                ></image>
                <text>城市</text>（ <text class="texttop">必填</text>）
              </view>
              <view class="topInput">
                <input
                  type="text"
                  v-model="form.city"
                  placeholder="请选择店铺所属城市"
                  placeholder-style="color:#707070"
                />
                <image
                  src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
                  mode="widthFix"
                ></image>
              </view>
            </view>
          </view>
          <view class="chengshi">
            <view class="contentTop">
              <view class="topLeft">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/dizhiaddress.png"
                  mode="widthFix"
                ></image>
                <text>商铺位置</text>（ <text class="texttop">必填</text>）
              </view>
              <view class="topInput">
                <input
                  type="text"
                  disabled
                  v-model="form.address"
                  placeholder="前选择门店位置"
                  placeholder-style="color:#707070"
                />
                <!-- <image
                  src="http://www.mingtongxa.com/wanzhuan/mingToright.png"
                  mode="widthFix"
                ></image> -->
              </view>
            </view>
          </view>
          <view class="addressWrap">
            <map
              class="maps"
              :latitude="latitude"
              :longitude="longitude"
              :markers="markers"
              scale="15"
              @tap="openMap()"
            />
          </view>

          <!-- <view class="genderRadio">
              <view class="topLeft">
                <image
                  src="http://www.mingtongxa.com/wanzhuan/yingye.png"
                  mode="widthFix"
                ></image>
                <text>营业状态</text>（ <text class="texttop">必填</text>）
              </view>
              <view class="wraps">
              <view class="radioItemWrap" @click="chooseGender(1)">
                <image src="http://www.mingtongxa.com/wanzhuan/xuanzhong.png" v-if="gender == 1" />
                <image src="http://www.mingtongxa.com/wanzhuan/weixuanzhong.png" v-else />
                <text>正在营业</text>
              </view>
              <view class="radioItemWrap" @click="chooseGender(2)">
                <image src="http://www.mingtongxa.com/wanzhuan/xuanzhong.png" v-if="gender == 2" />
                <image src="http://www.mingtongxa.com/wanzhuan/weixuanzhong.png" v-else />
                <text>尚未营业</text>
              </view>
              <view class="radioItemWrap" @click="chooseGender(3)">
                <image src="http://www.mingtongxa.com/wanzhuan/xuanzhong.png" v-if="gender == 3" />
                <image src="http://www.mingtongxa.com/wanzhuan/weixuanzhong.png" v-else />
                <text>暂停营业</text>
              </view>
              </view>   
            </view> -->
        </view>
        <view class="line"></view>

        <view class="ruler">
          <view class="rulerHead">
            <text>门脸照片</text>（<text class="ordsa">必填</text>）
          </view>
          <view class="rulerText">
            <image
              v-if="!form.backSide"
              @click="chooseImg()"
              src="http://www.mingtongxa.com/wanzhuan/addPhotos.png"
              mode="widthFix"
            ></image>
            <image
              class="userImage"
              v-else
              :src="form.backSide"
              mode="widthFix"
            />
          </view>
        </view>
        <view class="bottom" @click="changeElse(1)" v-if="elseMsgs">
          <text>展开更多信息</text>
          <image src="http://www.mingtongxa.com/wanzhuan/tobottom.png" />
        </view>
        <view class="elseItem" v-if="elseMsg">
          <view class="elseMsg" @click="changeElse(0)">
            <view class="elseLeft">
              其他信息
              <text>商户电话、营业时间等</text>
            </view>
            <view class="elseRight">
              <image src="@/static/images/totopj.png" />
            </view>
          </view>
          <view class="chengshi">
            <view class="contentTop">
              <view class="topLeft">
                <text>商户电话</text>
              </view>
              <view class="topInput">
                <input
                  type="number"
                  v-model="form.phone"
                  maxlength="11"
                  placeholder="请输入商户电话"
                  placeholder-style="color:#707070"
                />
              </view>
            </view>
          </view>
          <view class="chengshi">
            <view class="contentTop">
              <view class="topLeft">
                <text>营业时间</text>
              </view>
              <view class="topInput">
                <input
                  type="text"
                  v-model="form.yingye"
                  placeholder="请输入营业时间"
                  placeholder-style="color:#707070"
                />
              </view>
            </view>
          </view>
          <view class="ruler" style="margin:0;margin-top:20upx；height:320upx">
            <view class="rulerHead">
              <text>补充说明</text>
            </view>
            <view class="rulerText" style="height:200upx;background:#fff">
              <textarea
                style="padding-top:10upx"
                name=""
                id=""
                v-model="form.remark"
                placeholder="请提供更多参考信息帮助我们核实，如周边标志行建 筑、邻近商户等"
                placeholder-style="color:#A9A9A9;"
              ></textarea>
            </view>
          </view>
          <view class="btns">
            <view class="btnOn" @click="gotoTijiao()">提交</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import QQMapWX from "@/utils/bmap-wx.js";
import TopBar from "@/components/topBar";
import cityList from "@/static/js/citylistData.json";
import { IMG_BEFORE_URL } from "@/utils/app-config";
var qqmapsdk;
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      latitude: null,
      longitude: null,
      address: "",
      markers: [],
      gender: 1,
      elseMsg: false,
      elseMsgs: true,
      IMG_BEFORE_URL,
      array: ["美食", "玩乐", "购物"],
      form: {
        leixing: "",
        leixings: "",
        name: "",
        city: uni.getStorageSync("location"),
        houseNumber: "",
        titleAddress: "",
        address: "",
        backSide: "",
        backSides: "", //传
        phone: "",
        yingye: "",
        remark: "",
      },
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
    this.getUserLocation();
  },
  methods: {
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
            console.log(data, "444");
            _this.form.backSide = IMG_BEFORE_URL + data.data.url;
            _this.form.backSides = data.data.url;
          });
        },
      });
    },
    getUserLocation() {
      var that = this;
      uni.getLocation({
        success: (res) => {
          if ((res.errMsg = "getLocation:ok")) {
            qqmapsdk = new QQMapWX.BMapWX({
              ak: "o9FZ3zhus8bwG08ros15iWXqehXp7zAE", //这里自己的key秘钥进行填充
            });
            qqmapsdk.regeocoding({
              location: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              success: function(res) {
                console.log(res, "4444");
                that.latitude = res.originalData.result.location.lat;
                that.longitude = res.originalData.result.location.lng;
                that.address = res.originalData.result.formatted_address;

                that.markers[0] = {
                  longitude: res.originalData.result.location.lng,
                  latitude: res.originalData.result.location.lat,
                  width: 23,
                  height: 25,
                  title: res.originalData.result.formatted_address,
                  iconPath: "http://www.mingtongxa.com/wanzhuan/addressto.png",
                };
              },
              fail: function(res) {},
              complete: function(res) {},
            });
          }
        },
      });
    },
    openMap() {
      //点击地图
      let _this = this;
      uni.chooseLocation({
        success: function(res) {
          console.log(res, "55555");
          _this.form.houseNumber = res.name;
          var locationObj = _this.formatLocation(res);
          _this.form.titleAddress =
            locationObj.REGION_PROVINCE +
            locationObj.REGION_CITY +
            locationObj.REGION_COUNTRY;
          _this.form.address = res.address;
          console.log("位置名称：", res);
          console.log("详细地址：" + res.address);
        },
      });
    },
    formatLocation(res) {
      var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
      var REGION_PROVINCE = [];
      var addressBean = {
        REGION_PROVINCE: null,
        REGION_COUNTRY: null,
        REGION_CITY: null,
        ADDRESS: null,
      };

      function regexAddressBean(address, addressBean) {
        // regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
        regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
        var addxress = regex.exec(address);
        addressBean.REGION_CITY = addxress[1];
        addressBean.REGION_COUNTRY = addxress[2];
        addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
        // console.log(addxress);
      }
      if (!(REGION_PROVINCE = regex.exec(res.address))) {
        regex = /^(.*?(省|自治区))(.*?)$/;
        REGION_PROVINCE = regex.exec(res.address);
        addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
        regexAddressBean(REGION_PROVINCE[3], addressBean);
      } else {
        addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
        regexAddressBean(res.address, addressBean);
      }
      console.log(addressBean, "555555");
      this.sheng = addressBean.REGION_PROVINCE;
      this.shi = addressBean.REGION_CITY;
      this.qu = addressBean.REGION_COUNTRY;
      uni.setStorageSync("district", addressBean.REGION_COUNTRY);
      uni.setStorageSync("street", addressBean.ADDRESS);
      this.getQuNumber();
      return addressBean;
    },
    getQuNumber() {
      cityList.map((item) => {
        item.cities.map((items) => {
          if (items.name == this.shi) {
            uni.setStorageSync("quhao", items.id);
          }
        });
      });
    },
    chooseGender(e) {
      this.gender = e;
    },
    changeElse(index) {
      if (index == 1) {
        this.elseMsg = true;
        this.elseMsgs = false;
      } else {
        this.elseMsgs = true;
        this.elseMsg = false;
      }
    },
    bindPickerChange(e) {
      this.form.leixing = this.array[e.detail.value];
      this.form.leixings = Number(e.detail.value) + 1;
    },
    gotoTijiao() {
      if (!this.form.leixing) {
        uni.showToast({
          title: "商户类型不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.name) {
        uni.showToast({
          title: "商户名称不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.name) {
        uni.showToast({
          title: "商户名称不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.city) {
        uni.showToast({
          title: "城市不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.city) {
        uni.showToast({
          title: "商铺位置不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.backSides) {
        uni.showToast({
          title: "请上传门脸照片！",
          icon: "none",
        });
        return;
      }
      let sendData = {
        categoryId: this.form.leixings,
        categoryName: this.form.leixing,
        city: uni.getStorageSync("quhao"),
        cityName: this.form.city,
        name: this.form.name,
        remark: this.form.remark,
        address: this.form.address,
        area: uni.getStorageSync("district"),
        imgUrl: this.form.backSides,
        street: uni.getStorageSync("street"),
        phonenumber: this.form.phone,
        useTimeShow: this.form.yingye,
        x: uni.getStorageSync("longitude"),
        y: uni.getStorageSync("latitude"),
      };
      uni.showLoading();
      this.$api.addShops(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            title: "提交成功",
            duration: 1000,
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .content {
    width: 96%;
    margin: 0 2%;
    .top {
      width: 100%;
      height: 80upx;
      border-bottom: 1upx solid #707070;
      display: flex;
      align-items: center;
      .topLeft {
        display: flex;
        align-items: center;
        image {
          padding: 0 10upx;
          width: 38upx;
        }
        .itemBg {
          padding: 0 10upx;
          width: 30upx;
        }
        text {
          color: #000;
          font-size: 28upx;
          font-weight: 600;
        }
        .texttop {
          color: #db0000;
          font-size: 28upx;
          font-weight: 600;
        }
      }
    }
    .topcont {
      padding-top: 50upx;
      width: 100%;
      height: 280upx;
      border-bottom: 1upx solid #707070;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        width: 100%;
        height: 80upx;
        display: flex;
        align-items: center;
        .topLeft {
          display: flex;
          align-items: center;
          image {
            padding: 0 10upx;
            width: 50upx;
          }
          text {
            color: #000;
            font-size: 32upx;
            font-weight: 600;
          }
          .texttop {
            color: #db0000;
            font-size: 32upx;
            font-weight: 600;
          }
        }
      }
      .topContent {
        width: 100%;
        height: 80upx;
        color: #707070;
        font-size: 26upx;
        font-weight: 600;
        padding-left: 15upx;
        display: flex;
        align-items: center;
        text {
          color: #db0000;
        }
      }
      .topInput {
        width: 100%;
        height: 80upx;
        color: #000;
        font-size: 26upx;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        padding-right: 20upx;
        align-items: center;
        picker {
          width: 80%;
        }
        image {
          width: 13upx;
        }
        input {
          width: 100%;
          color: #000;
          padding-left: 20upx;
        }
      }
    }
    .chengshi {
      padding-top: 50upx;
      width: 100%;
      height: 200upx;
      border-bottom: 1upx solid #707070;
      display: flex;
      flex-direction: column;
      align-items: center;
      .contentTop {
        width: 100%;
        display: flex;
        flex-direction: column;

        .topLeft {
          height: 80upx;
          display: flex;
          align-items: center;
          image {
            padding: 0 10upx;
            width: 50upx;
          }
          .leftimg {
            width: 40upx !important;
          }
          text {
            color: #000;
            font-size: 32upx;
            font-weight: 600;
          }
          .texttop {
            color: #db0000;
            font-size: 32upx;
            font-weight: 600;
          }
        }
      }
      .topInput {
        width: 100%;
        height: 80upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        font-size: 26upx;
        font-weight: 600;
        display: flex;
        align-items: center;
        input {
          width: 80%;
          color: #000;
          padding-left: 20upx;
        }
        image {
          width: 13upx;
          margin-right: 20upx;
        }
      }
    }
    .addressWrap {
      width: 94%;
      margin: 50upx 3% 20upx;
      border: 1upx solid #000;
      height: 280upx;
      border-radius: 20upx;
      .maps {
        width: 100%;
        height: 100%;
        border-radius: 20upx;
        overflow: hidden;
      }
    }
    .genderRadio {
      width: 96%;
      margin: 0 2%;
      display: flex;
      flex-direction: column;
      margin-left: 20upx;
      font-size: 26upx;
      color: #000;
      font-weight: 600;
      .topLeft {
        height: 100upx;
        display: flex;
        align-items: center;
        image {
          padding: 0 10upx;
          width: 50upx;
        }
        text {
          color: #000;
          font-size: 32upx;
          font-weight: 600;
        }
        .texttop {
          color: #db0000;
          font-size: 32upx;
          font-weight: 600;
        }
      }
      .wraps {
        width: 100%;
        height: 60upx;
        display: flex;
        justify-content: center;
        align-items: center;
        .radioItemWrap {
          width: 33%;
          display: flex;
          align-items: center;
          image {
            width: 34upx;
            height: 34upx;
            margin-right: 12upx;
          }
        }
      }

      .radioItemWrap:first-child {
        margin-right: 30upx;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 100upx;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 30upx;
      height: 13upx;
    }
    text {
      font-size: 26upx;
      font-weight: 600;
      padding-right: 10upx;
    }
  }
  .line {
    width: 100%;
    height: 30upx;
    background: #ebeced;
  }
  .ruler {
    width: 96%;
    margin: 0 2%;
    height: 390upx;
    .rulerHead {
      width: 250upx;
      height: 60upx;
      font-size: 32upx;
      color: #000;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
      text {
        font-weight: 600;
      }
      .ordsa {
        color: #db0000;
        font-size: 32rpx;
        font-weight: 600;
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
      .userImage {
        width: 100%;
      }
    }
  }
  .elseItem {
    width: 96%;
    margin: 20upx 2%;
    .elseMsg {
      display: flex;
      justify-content: space-between;
      height: 50upx;
      align-items: center;
      .elseLeft {
        font-size: 32upx;
        color: #000;
        font-weight: 600;
        text {
          font-size: 28upx;
          font-weight: 600;
          color: #707070;
          padding-left: 8upx;
        }
      }
      .elseRight {
        image {
          width: 25upx;
          height: 12upx !important;
        }
      }
    }
  }
  .chengshi {
    padding-top: 20upx;
    width: 100%;
    height: 180upx;
    border-bottom: 1upx solid #707070;
    display: flex;
    flex-direction: column;
    align-items: center;
    .contentTop {
      width: 100%;
      display: flex;
      flex-direction: column;

      .topLeft {
        height: 80upx;
        display: flex;
        align-items: center;
        image {
          padding: 0 10upx;
          width: 50upx;
        }
        .leftimg {
          width: 40upx !important;
        }
        text {
          color: #000;
          font-size: 32upx;
          font-weight: 600;
        }
        .texttop {
          color: #db0000;
          font-size: 32upx;
          font-weight: 600;
        }
      }
    }
    .topInput {
      width: 100%;
      height: 80upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      font-size: 26upx;
      font-weight: 600;
      display: flex;
      align-items: center;
      input {
        width: 80%;
        color: #000;
      }
      image {
        width: 13upx;
        margin-right: 20upx;
      }
    }
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
}
</style>
