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
      barTitle="详细信息"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="content">
          <view class="row">
            <view class="nominal">商户名称</view>
            <view class="input">
              <input
                placeholder="请输入公司名称"
                v-model="form.comyName"
                type="text"
              />
            </view>
          </view>
          <view class="row">
            <view class="nominal">手机号码</view>
            <view class="input">
              <input
                placeholder="请输入手机号码"
                v-model="form.phone"
                type="text"
              />
            </view>
          </view>
          <view class="row">
            <view class="nominal">营业时间</view>
            <view class="input">
              <input
                placeholder="请输入营业时间"
                v-model="form.time"
                type="text"
              />
              <text style="padding:0 30rpx">至</text> 
              <input
                placeholder="请输入营业时间"
                v-model="form.times"
                type="text"
              />
            </view>
          </view>
          <view class="row">
            <view class="nominal">商户地址</view>
            <view class="input">
              <input
                placeholder="请选择商户地址"
                v-model="form.address"
                type="text"
              />
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
        <!-- <view class="line"></view> -->

        <view class="ruler">
          <view class="rulerHead">
            <text>商户视频</text>
          </view>
          <view
            class="rulerText"
            style="width:45%;height:250rpx;background:#fff"
          >
            <view v-if="!form.shangVideo" class="orders">
              <image
                @click="chooseVideo()"
                src="http://www.mingtongxa.com/wanzhuan/videos.png"
                mode="widthFix"
              ></image>
              <view>上传视频</view>
            </view>
            <image
              class="userImage"
              v-else
              :src="form.shangVideo"
              mode="widthFix"
            />
          </view>
        </view>
        <view class="rulers">
          <view class="rulerHead">
            <text>商户照片</text>
          </view>
          <view class="rlkjkfgs">
            <view class="rulerText">
              <view class="orders" v-if="!form.shangZhao1">
                <image
                  @click="chooseImg()"
                  src="http://www.mingtongxa.com/wanzhuan/photos.png"
                  mode="widthFix"
                ></image>
                <view>上传商户照片</view>
              </view>
              <image
                class="userImage"
                v-else
                :src="form.shangZhao1"
                mode="widthFix"
              />
            </view>
            <view class="rulerText">
              <view class="orders" v-if="!form.shangZhao2">
                <image
                  @click="chooseImgs()"
                  src="http://www.mingtongxa.com/wanzhuan/photos.png"
                  mode="widthFix"
                ></image>
                <view>上传商户小图</view>
              </view>
              <image
                class="userImage"
                v-else
                :src="form.shangZhao2"
                mode="widthFix"
              />
            </view>
          </view>
        </view>
        <view class="line"></view>
        <view class="chengshi" style="padding:20rpx">
          <view class="contentTop">
            <view class="topLeft">
              <text>商户标签</text>
            </view>
            <view class="topInput">
              <input
                style="border:1rpx solid #000;height:50rpx;width:90%;border-radius:10rpx;padding-left:10rpx"
                type="text"
                v-model="form.tuijianOrder"
                placeholder="请选择商户标签"
                placeholder-style="color:#707070"
              />
            </view>
          </view>
        </view>
        <view class="tuiCont">
                <view
                :class="item.current ? 'contOrder active' : 'contOrder'"
                 class="contOrder"
                  v-for="(item, index) in tagsList"
                  :key="index"
                  ><text @click="addorNm(item)">{{ item.name }}</text></view
                >
              </view>
        <view class="ruler" style="padding:20rpx;height:320upx">
          <view class="rulerHead">
            <text>补充说明</text>
          </view>
          <view class="rulerText" style="height:200upx;background:#fff">
            <textarea
              style="padding-top:10upx"
              name=""
              id=""
              v-model="form.remark"
              placeholder="请提供更多商户介绍"
              placeholder-style="color:#A9A9A9;"
            ></textarea>
          </view>
        </view>
        <view class="btns">
          <view class="btnOn" @click="gotoTijiao()">提交</view>
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
      IMG_BEFORE_URL,
      shopId:'',
      detail:{},
      cateTags:'',
      tagsList:[],
      array: ["美食", "玩乐", "购物"],
      form: {
        comyName:'',   //公司名称
        phone:'',     //手机号码
        time:'',   //营业时间
        times:'',
        address:'',   //商户地址
        shangVideo:'',   //上传视频
        shangVideoUrl:'',  //传的路径
        shangZhao1:'',   //商户第一张图片
        shangZhao1Url:'',  //商户第一张传的路径
        shangZhao2:'',   //商户第二张图片
        shangZhao2Url:'',   //商户第二张路径
        tags:'',   //商户标签
        remark:'',   //补充说明
        x:null,
        tuijianOrder:'',
        y:null
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
  onLoad(opt) {
    this.getUserLocation();
    this.shopId = opt.id
    this.getShop()
    
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
              console.log(res,'9999')
              _this.form.shangZhao1 = IMG_BEFORE_URL + data.data.url;
              _this.form.shangZhao1Url = data.data.url;
            });
          },
        });
    },
    chooseImgs(){
        var _this = this;
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          sizeType: ["original", "compressed"],
          success: (res) => {
            var path = res.tempFilePaths[0];
            _this.$comfun.uploadImg(path).then((res) => {
              var data = JSON.parse(res.data);
              _this.form.shangZhao2 = IMG_BEFORE_URL + data.data.url;
              _this.form.shangZhao2Url = data.data.url;
            });
          },
        });
    },
    chooseVideo(){
        var _this = this;
        uni.chooseVideo({
          sourceType: ["album", "camera"],
          camera: "back",
          success: ({ tempFilePath }) => {
            _this.$comfun.uploadVideo(tempFilePath).then((res) => {
              var data = JSON.parse(res.data);
              _this.form.shangVideo = IMG_BEFORE_URL + data.data.url;
              _this.form.shangVideoUrl = data.data.url;
            });
          },
          fail: (error) => {},
        });
    },
    getTags() {
      uni.showLoading();
      let sendData = {
        id: this.cateTags,
      };
      this.$api.getTagsList(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
            let arr = []
            res.data.map(item=>{
                arr.push({
                    name:item.name,
                    current:false
                })
            })
            
            this.tagsList = arr
            console.log(this.tagsList,'55555')
        }else{
            this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    addorNm(item){
        item.current = !item.current
        let tuijianList = []
        this.tagsList.forEach(ite=>{
            if(ite.current){
                tuijianList.push(ite.name)
            }
        })
        this.form.tuijianOrder = tuijianList.join(",")

    },
    getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
            this.cateTags = res.data.detail.categoryId
            this.getTags()
          this.detail = res.data;
          this.form.comyName = res.data.detail.name
          this.form.phone = res.data.detail.phonenumber
          this.form.time = res.data.detail.beginTime
          this.form.times = res.data.detail.endTime
          this.form.address = res.data.detail.address
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
            _this.form.x = res.longitude
            _this.form.y = res.latitude
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
    // chooseGender(e) {
    //   this.gender = e;
    // },
    // bindPickerChange(e) {
    //   this.form.leixing = this.array[e.detail.value];
    //   this.form.leixings = Number(e.detail.value) + 1;
    // },
    gotoTijiao() {
      if (!this.form.comyName) {
        uni.showToast({
          title: "商户名称不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.time) {
        uni.showToast({
          title: "营业时间不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.address) {
        uni.showToast({
          title: "商铺位置不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.shangZhao1) {
        uni.showToast({
          title: "请上传商户照片！",
          icon: "none",
        });
        return;
      }
      if (!this.form.shangZhao2) {
        uni.showToast({
          title: "请上传商户小图！",
          icon: "none",
        });
        return;
      }
      if (!this.form.tuijianOrder) {
        uni.showToast({
          title: "请添加商户标签！",
          icon: "none",
        });
        return;
      }
      let sendData = {
        shopId:this.shopId,
        name:this.form.comyName,
        phonenumber:this.form.phone,
        beginTime:this.form.time,
        endTime:this.form.times,
        address:this.form.address,
        videoUrl:this.form.shangVideoUrl,
        imgUrl:this.form.shangZhao1Url,
        iconUrl:this.form.shangZhao2Url,
        cates:this.form.tuijianOrder,
        remark:this.form.remark,
        x: this.form.x,
        y: this.form.y
      };
      uni.showLoading();
      this.$api.changeShopMsg(sendData).then((res) => {
        uni.hideLoading();
        if(res.code == 200){
            uni.showToast({
              title: '更改成功',
              duration: 1500
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
        }else{
            uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
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
          border:1upx dashed #9e9e9e;
        //   background: linear-gradient(172deg, #FF8080 0%, #DC0303 100%);
      }
    }
  .content {
    width: 96%;
    margin: 0 2%;
    .row {
      display: flex;
      min-height: 90upx;
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
  .rulers {
    width: 96%;
    margin: 0 2%;
    height: 390upx;
    display: flex;
    flex-direction: column;
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
    .rlkjkfgs {
      display: flex;
    }
    .rulerText {
      width: 45%;
      height: 300upx;
      margin: 20upx;
      background: rgb(250, 219, 219);
      border: 3upx solid #000;
      border-radius: 15upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .orders {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        view {
          color: #000;
        }
      }
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
      .orders {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        view {
          color: #000;
        }
      }
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
