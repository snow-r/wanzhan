<template>
    <view>
        <TopBar
      background="#fff"
      :back="true"
      barTitle="公司资料详情"
      :backType="'fanhui'"
      :isfan="false"
    />
        <view
            :class="isIpx?'xPage':'normalPage'"
            :style="'padding-top:' + navHeight + 'px'"
        >
            <scroll-view
                scroll-y
                class="pageContainer"
            >
                <view class="centent">
                    <view class="editaddress">
                        <view class="content">
                            <view class="row">
                                <view class="nominal">公司名称</view>
                                <view class="input">
                                    <input
                                        placeholder="请输入公司名称"
                                        v-model="form.comyName"
                                        disabled
                                        type="text"
                                    >
                                </view>
                            </view>
                          <view class="row">
                                <view class="nominal">信用代码</view>
                                <view class="input">
                                    <input
                                        placeholder="请输入信用代码"
                                        disabled
                                        v-model="form.xinyong"
                                    ></input></view>
                            </view>
                            <view class="row">
                                <view class="nominal">法人姓名</view>
                                <view class="input">
                                    <input
                                        placeholder="请输入法人姓名"
                                        disabled
                                        v-model="form.customerName"
                                        type="text"
                                    ></input>
                                </view>
                            </view>
                            <view class="row">
                                <view class="nominal">法人电话</view>
                                <view class="input">
                                    <input
                                        placeholder="请输入法人电话"
                                        disabled
                                        v-model="form.number"
                                        type="number"
                                        maxlength="11"
                                    ></input>
                                </view>
                            </view>
                            <view class="row">
                                <view class="nominal">身份证号</view>
                                <view class="input">
                                    <input
                                        placeholder="请输入身份证号"
                                        disabled
                                        v-model="form.phoneNumber"
                                        maxlength="18"
                                    ></input></view>
                            </view>
                            <view class="row">
                                <view class="nominal">详细地址</view>
                                <view class="input">
                                    <input
                                        placeholder="请选择地址"
                                        disabled
                                        v-model="form.address"
                                    ></input></view>
                            </view>
                            <!-- <view class="row" style="display:flex;flex-direction: column;">
                                <view class="addressWrap">
            <map
              class="maps"
              :latitude="form.latitude"
              :longitude="form.longitude"
              :markers="markers"
              scale="15"
              @tap="openMap()"
            />
          </view>
                            </view> -->
                        </view>
                            <view class="nono"> <view>公司资料</view>
                        <view style="display:flex">
                            <view class="imgWrap">
            <view class="addPhoneBtn" v-if="!form.frontSide" @click="chooseImg(1)">
              <image src="/static/images/addPhone.png" mode="widthFix" />
              <view>营业执照</view>
            </view>
            <image class="userImage" v-else :src="form.frontSide" mode="aspectFill" />
          </view>
          <view class="imgWrap">
            <view class="addPhoneBtn" v-if="!form.backSide" @click="chooseImg(2)">
              <image src="/static/images/addPhone.png" mode="widthFix" />
              <view>许可证</view>
            </view>
            <image class="userImage" v-else :src="form.backSide" mode="aspectFill" />
          </view>
                        </view>
                        </view>
                        <!-- <view class="tongyi">
          <image
            src="@/static/images/iagree.png"
            mode="widthFix"
          ></image>
          <text>已阅读（合作相关协议合同）</text>
                        </view> -->
                        <!-- <view class="btns">
                            <view class="btnOn" @click="getSave()">确认完成</view>
                        </view> -->
                        <!-- 省市区选择 -->
                        <!-- <setcity
                            :show="show"
                            @sureSelectArea="onsetCity"
                            @hideShow="hideShow"
                        ></setcity> -->
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
      userId: "",
      IMG_BEFORE_URL,
      markers: [],
      shopId:null,
      form: {
        customerName: "",
        xinyong:'',
        comyName:'',
        phoneNumber: "",
        houseNumber: "",
        titleAddress: "",
        number:'',
      backSide:'',
      frontSide:'',
      frontSides:'',
      backSides:'',
      latitude: null,
      longitude: null,
      },
      isShow: true,
      tagIndex: -1,
      show: false,
      id: "",
      addressData: {},
      sheng:'',
      shi:'',
      qu:'',
      gender:0
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
    this.getShop()
  },
  methods: {
      chooseGender (e) {
      this.gender = e
    },
    hideShow() {
      this.show = false;
    },
    onsetCity(e) {
      let data = e.detail.target.dataset;
      let address = data.province + data.city + data.area;
      this.form.titleAddress = address;
      console.log(address);
      this.show = false;
    },

    openPicker() {
      // uni.navigateTo({
      // 	url:'./map'
      // })
      this.show = true;
    },
    getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
            this.form.customerName = res.data.frName
            this.form.xinyong = res.data.xyCode
            this.form.comyName = res.data.name
            this.form.number = res.data.frPhone
            this.form.phoneNumber = res.data.idcard
            this.form.address = res.data.address
            this.form.frontSide = IMG_BEFORE_URL+res.data.yingyePic
            //暂时没字段
            this.form.backSide = IMG_BEFORE_URL+res.data.xukePic
        }
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
                that.form.latitude = res.originalData.result.location.lat;
                that.form.longitude = res.originalData.result.location.lng;
                that.form.address = res.originalData.result.formatted_address;

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
      console.log(addressBean,'555555');
      this.sheng = addressBean.REGION_PROVINCE
      this.shi = addressBean.REGION_CITY
      this.qu = addressBean.REGION_COUNTRY
      uni.setStorageSync('district', addressBean.REGION_COUNTRY)
      this.getQuNumber()
      return addressBean;
    },
    getQuNumber(){
      cityList.map(item=>{
        item.cities.map(items=>{
          if(items.name == this.shi){
            items.dis.map(ite=>{
              if(ite.disname == this.qu){
                uni.setStorageSync('quhao', ite.disid)
              }
            })
          }
        })
        
      })
    },
    chooseImg(index){
      if(index==1){
        var _this = this;
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          sizeType: ["original", "compressed"],
          success: (res) => {
            var path = res.tempFilePaths[0];
            _this.$comfun.uploadImg(path).then((res) => {
              var data = JSON.parse(res.data);
              _this.form.frontSide = IMG_BEFORE_URL + data.data.url;
              _this.form.frontSides = data.data.url;
            });
          },
        });
      }else if(index==2){
        var _this = this;
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          sizeType: ["original", "compressed"],
          success: (res) => {
            var path = res.tempFilePaths[0];
            _this.$comfun.uploadImg(path).then((res) => {
              var data = JSON.parse(res.data);
              _this.form.backSide = IMG_BEFORE_URL + data.data.url;
              _this.form.backSides = data.data.url;
            });
          },
        });
      }
      
    },
    getSave() {
      
      if (!this.form.comyName) {
        uni.showToast({
          title: "公司名称不能为空！",
          icon: "none",
        });
        return;
      }
       if (!this.form.xinyong) {
        uni.showToast({
          title: "信用代码不能为空！",
          icon: "none",
        });
        return;
      }
       if (!this.form.customerName) {
        uni.showToast({
          title: "法人姓名不能为空！",
          icon: "none",
        });
        return;
      }
       if (!this.form.number) {
        uni.showToast({
          title: "法人电话不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.phoneNumber) {
        uni.showToast({
          title: "身份证号不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.address) {
        uni.showToast({
          title: "请选择地址！",
          icon: "none",
        });
        return;
      }
      if (!this.form.frontSide) {
        uni.showToast({
          title: "请上传公司营业执照！",
          icon: "none",
        });
        return;
      }
      if (!this.form.backSide) {
        uni.showToast({
          title: "请上传公司经营许可证！",
          icon: "none",
        });
        return;
      }
      let sendData = {
        id:this.shopId,
        address:this.form.address,
        frName:this.form.customerName,
        frPhone:this.form.number,
        idcard:this.form.phoneNumber,
        name:this.form.comyName,
        yingyePic:this.form.frontSides,
        xukePic:this.form.backSides,
        xyCode:this.form.xinyong,
      }
      uni.showLoading();
      this.$api.iWantComyAdd(sendData).then((res) => {
          if(res.code == 200){
            uni.hideLoading()
            uni.showToast({
              title: '提交审核成功',
              duration: 1500
            });
            setTimeout(() => {
              uni.navigateBack();
            }, 2000);
          }else{
            uni.showToast({
              title: res.msg,
              icon:'none',
              duration: 1500
            });
          }
        })
      // if (this.tagIndex >= 0) {
      //   this.form.label = this.tags[this.tagIndex];
      // }
      // if (this.id) {
      //   this.form.id = this.id;
      //   url = "/address/update";
      // } else {
      //   url = "/address/add";
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #fff;
  width: 100%;
  height: 100%;
  .addressWrap {
      width: 94%;
      margin: 10upx 3% 10upx;
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
  .nono{
      width: 100%;
      height: 360upx;
      background: #fff;
      font-weight: 600;
      margin-top: 20upx;
      border-radius: 20upx;
      >view{
          padding: 20upx;
      }
  }
  .imgWrap{
    width: 48%;
    height: 220upx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2upx dashed #B9B9B9;
    border-radius: 10upx;
    margin: 0 auto 0;
    .addPhoneBtn{
      font-size: 28upx;
      color: #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image{
        width: 50upx;
        height: 50upx;
        margin-bottom: 20upx;
      }
    }
    .userImage{
      width: 100%;
      height: 100%;
    }
  }
  .genderWrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28upx;
      margin-top: 44upx;
    }
  .editaddress {
    padding: 20upx;

    .content {
      background: #fff;
      border-radius: 20upx;
      padding: 4upx 20upx;

      .row {
        display: flex;
        min-height: 90upx;
      }
    .genderRadio{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: 20upx;
        .radioItemWrap{
          display: flex;
          align-items: center;
          image{
            width: 34upx;
            height: 34upx;
            margin-right: 12upx;
          }
        }
        .radioItemWrap:first-child{
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
        width: 74%;
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

        textarea {
          width: 100%;
          font-size: 26upx;
          color: #333;
          font-weight: bold;
        }
      }

      .textarea {
        padding: 30upx 0;
      }

      & > view:last-child {
        border: none !important;
      }
    }
  }

  .selectcity {
    display: flex;
    align-items: center;
    font-size: 28upx;
    font-weight: 500;
    color: #999;
    image {
      width: 45upx;
      height: 45upx;
    }
    .selectcity_box {
      display: flex;
      height: 90upx;
      line-height: 90upx;
      width: 90%;
      font-weight: bold;
      font-size: 26upx;
      > view:nth-child(2) {
        margin-left: 6upx;
        width: 22upx;
        height: 22upx;

        image {
          width: 22upx;
          height: 22upx;
        }
      }
    }
  }

  .switch {
    display: flex;
    justify-content: space-between;

    .switch_box {
      display: flex;

      > view {
        margin-top: 24upx;
        width: 80upx;
        margin-left: 20upx;
        height: 46upx;
        line-height: 46upx;
        text-align: center;
        font-size: 26upx;
        font-weight: 500;
        color: #18a45d;
        background: #eaf8f1;
        border: 1upx solid #009944;
        border-radius: 2upx;
      }

      > view.on {
        color: #fff;
        background: #009944;
        border: 1upx solid #009944;
        border-radius: 2upx;
      }
    }
  }
    .tongyi{
        width: 100%;
        height: 60upx;
        display: flex;
        align-items: center;
        justify-content: center;
        image{
            width: 25upx;
        }
        text{
            font-size: 24upx;
            color: #7A7A7A;
            padding-left: 10upx;
        }
    }
  .btns{
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btnOn{
      background: linear-gradient(to right, #FC4343, #CF0505);
      border-radius: 50upx;
      border: 4upx solid #000;
      width: 280upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center
    }
  }
}
</style>