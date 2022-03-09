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
      barTitle="商务合作"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view class="headerLeft" @click="changeItem(1)">
            <image
              src="http://www.mingtongxa.com/wanzhuan/hezuo1.png"
              mode="widthFix"
            ></image>
            <text>商家合作</text>
          </view>
          <view class="headerRight" @click="changeItem(2)">
            <image
              src="http://www.mingtongxa.com/wanzhuan/hezuo2.png"
              mode="widthFix"
            ></image>
            <text>城市代理</text>
          </view>
        </view>
        <view class="cont" v-if="type == 1">
          <view class="contHead">
            <image
              src="http://www.mingtongxa.com/wanzhuan/hezuodian.png"
              mode="widthFix"
            ></image>
            <text>商家合作</text>
          </view>
          <view class="no5">商家推广曝光，消费引流，资源共享等</view>
          <view class="contttt">
            <image
              src="http://www.mingtongxa.com/wanzhuan/hezuodian.png"
              mode="widthFix"
            ></image>
            <text>加盟须知</text>
          </view>
          <view class="no6">1.具备法人资格的公司，非个体商户或个人</view>
          <view class="no6">2.至少能投入3名及以上员工开展业务</view>
          <view class="no6">3.自媒体、电商、旅游从业经验最优</view>
          <view class="no6">4.了解且认同联合的合作条款</view>
        </view>

        <view class="cont" v-if="type == 2">
          <view class="contHead">
            <image
              src="http://www.mingtongxa.com/wanzhuan/hezuodian.png"
              mode="widthFix"
            ></image>
            <text>城市代理</text>
          </view>
          <view class="no5">招募城市运营商</view>
        </view>
        <view v-if="type == 1">
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu1.png"
                mode="widthFix"
              ></image>
              所在区域 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="form.quyu"
                placeholder="请选择您的所在区域"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu2.png"
                mode="widthFix"
              ></image>
              姓名 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="form.username"
                placeholder="请填写您的姓名"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu3.png"
                mode="widthFix"
              ></image>
              手机号 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="number"
                v-model="form.phone"
                placeholder="请填写您的手机号"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu4.png"
                mode="widthFix"
              ></image>
              邮箱 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="form.email"
                placeholder="请填写您的邮箱地址"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu10.png"
                mode="widthFix"
              ></image>
              商铺名称 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="form.shopname"
                placeholder="请填写您的商铺名称"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu5.png"
                mode="widthFix"
              ></image>
              您的留言
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="form.remark"
                placeholder="请填写您的留言"
              />
            </view>
          </view>
        </view>

        <view v-if="type == 2">
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/yaoqing1.png"
                mode="widthFix"
              ></image>
              邀请码 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="daili.sharecode"
                placeholder="请选择邀请人所属邀请码"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu1.png"
                mode="widthFix"
              ></image>
              所在区域 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="daili.quyu"
                placeholder="请选择您的所在区域"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu2.png"
                mode="widthFix"
              ></image>
              姓名 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="daili.username"
                placeholder="请填写您的姓名"
              />
            </view>
          </view>

          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu4.png"
                mode="widthFix"
              ></image>
              邮箱 (<text>必填</text>)
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="daili.email"
                placeholder="请填写您的邮箱地址"
              />
            </view>
          </view>
          <view class="bottom">
            <view class="btt1">
              <image
                src="http://www.mingtongxa.com/wanzhuan/quyu5.png"
                mode="widthFix"
              ></image>
              您的留言
            </view>
            <view class="btt2">
              <input
                type="text"
                v-model="daili.remark"
                placeholder="请填写您的留言"
              />
            </view>
          </view>
          <view class="btt2">
            上传身份证
          </view>
          <view style="display:flex" class="bottoms">
            <view class="imgWrap">
              <view
                class="addPhoneBtn"
                v-if="!daili.frontSide"
                @click="chooseImg()"
              >
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shenfen1.png"
                  mode="widthFix"
                />
                <view>身份证正面</view>
              </view>
              <image
                class="userImage"
                v-else
                :src="daili.frontUrl"
                mode="aspectFill"
              />
            </view>
            <view class="imgWrap">
              <view
                class="addPhoneBtn"
                v-if="!daili.backSide"
                @click="chooseImgs()"
              >
                <image
                  src="http://www.mingtongxa.com/wanzhuan/shenfen2.png"
                  mode="widthFix"
                />
                <view>身份证反面</view>
              </view>
              <image
                class="userImage"
                v-else
                :src="daili.backUrl"
                mode="aspectFill"
              />
            </view>
          </view>
          <view class="tongyi">
            <!-- <image src="@/static/images/iagree.png" mode="widthFix"></image> -->
            <image
              v-if="!daili.isAgree"
              src="@/static/images/noAgree.png"
              @click="tongyi(1)"
              mode="widthFix"
            />
            <image
              v-else
              src="@/static/images/iagree.png"
              @click="tongyi(2)"
              mode="widthFix"
            />
            <text>已阅读（合作相关协议合同）</text>
          </view>
        </view>

        <view class="btns">
          <view class="btnOn" @click="getSave()">确认完成</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import { IMG_BEFORE_URL } from "@/utils/app-config";
import { tryStatement } from "@babel/types";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      IMG_BEFORE_URL,
      type: 1,
      form: {
        quyu: uni.getStorageSync("location"),
        username: uni.getStorageSync("nickName"),
        phone: uni.getStorageSync("phonenumber"),
        email: "",
        remark: "",
        shopname: "",
      },
      daili: {
        sharecode: "",
        quyu: uni.getStorageSync("location"),
        username: uni.getStorageSync("nickName"),
        email: "",
        remark: "",
        frontSide: "",
        frontUrl: "",
        backSide: "",
        backUrl: "",
        isAgree: true,
        agreeNo: 1,
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
  onLoad() {},
  methods: {
    changeItem(index) {
      this.type = index;
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
            _this.daili.frontUrl = IMG_BEFORE_URL + data.data.url;
            _this.daili.frontSide = data.data.url;
          });
        },
      });
    },
    chooseImgs() {
      var _this = this;
      uni.chooseImage({
        count: 1,
        sourceType: ["camera", "album"],
        sizeType: ["original", "compressed"],
        success: (res) => {
          var path = res.tempFilePaths[0];
          _this.$comfun.uploadImg(path).then((res) => {
            var data = JSON.parse(res.data);
            _this.daili.backUrl = IMG_BEFORE_URL + data.data.url;
            _this.daili.backSide = data.data.url;
          });
        },
      });
    },
    tongyi(index) {
      this.daili.isAgree = !this.daili.isAgree;
      if (this.daili.isAgree) {
        this.daili.agreeNo = 1;
      } else {
        this.daili.agreeNo = 0;
      }
    },
    getSave() {
      if (this.type == 1) {
        //商家合作
        if (!this.form.quyu) {
          uni.showToast({
            title: "所在区域不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.form.username) {
          uni.showToast({
            title: "姓名不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.form.phone) {
          uni.showToast({
            title: "手机号不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.form.email) {
          uni.showToast({
            title: "邮箱不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.form.shopname) {
          uni.showToast({
            title: "商铺名称不能为空！",
            icon: "none",
          });
          return;
        }
        let sendData = {
          area: this.form.quyu,
          userName: this.form.username,
          mobile: this.form.phone,
          email: this.form.email,
          name: this.form.shopname,
          remark: this.form.remark,
        };
        uni.showLoading();

        this.$api.shangwuGoutong(sendData).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: "提交成功",
              duration: 2000,
            });
            setTimeout(() => {
            uni.navigateBack()
          }, 1500)
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
              duration: 1000,
            });
          }
        });
      } else if (this.type == 2) {
        //城市代理
        if (!this.daili.sharecode) {
          uni.showToast({
            title: "邀请码不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.quyu) {
          uni.showToast({
            title: "区域不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.username) {
          uni.showToast({
            title: "姓名不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.email) {
          uni.showToast({
            title: "邮箱不能为空！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.frontUrl) {
          uni.showToast({
            title: "请上传身份证正面！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.backUrl) {
          uni.showToast({
            title: "请上传身份证反面面！",
            icon: "none",
          });
          return;
        }
        if (!this.daili.isAgree) {
          uni.showToast({
            title: "请勾选同意合作相关协议合同！",
            icon: "none",
          });
          return;
        }
        let sendData = {
          area: this.daili.quyu,
          inviteUserCode: this.daili.sharecode,
          realName: this.daili.username,
          email: this.daili.email,
          cardZheng: this.daili.frontSide,
          cardFan: this.daili.backSide,
        };
        uni.showLoading();

        this.$api.cityGoutong(sendData).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: "提交成功",
              duration: 2000,
            });
            setTimeout(() => {
            uni.navigateBack()
          }, 1500)
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
              duration: 1000,
            });
          }
        });
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
  .header {
    width: 100%;
    height: 260upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .headerLeft {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        width: 180upx;
      }
      text {
        font-size: 34upx;
        color: #000;
        font-weight: bold;
        padding-top: 10upx;
      }
    }
    .headerRight {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        width: 180upx;
      }
      text {
        font-size: 34upx;
        color: #000;
        font-weight: bold;
        padding-top: 10upx;
      }
    }
  }
  .cont {
    width: 98%;
    margin: 40upx 1% 20upx;
    background: rgba(153, 153, 153, 0.15);
    border-radius: 30upx;
    padding-bottom: 20upx;
    // height: 440upx;
    .contHead {
      width: 100%;
      height: 80upx;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 20upx;
      }
      text {
        padding-left: 10upx;
        font-size: 34upx;
        color: #000;
        font-weight: bold;
      }
    }
    .no5 {
      font-size: 28upx;
      color: rgba(124, 124, 124, 1);
      text-align: center;
      font-weight: bold;
    }
    .contttt {
      padding: 30upx 0 20upx 50upx;
      image {
        width: 20upx;
      }
      text {
        padding-left: 10upx;
        font-size: 26upx;
        color: #000;
        font-weight: bold;
      }
    }
    .no6 {
      font-size: 26upx;
      color: rgba(112, 112, 112, 1);
      padding: 10upx 50upx;
      font-weight: bold;
    }
  }
  .bottom {
    width: 94%;
    margin: 20upx 3%;
    padding: 0 20upx;
    height: 120upx;
    display: flex;
    flex-direction: column;
    .btt1 {
      height: 50upx;
      font-size: 32upx;
      color: #000;
      font-weight: bold;
      image {
        width: 30upx;
        margin-right: 10upx;
      }
      text {
        color: rgba(223, 5, 7, 1);
        font-weight: bold;
        font-size: 32upx;
      }
    }
    .btt2 {
      width: 100%;
      height: 70upx;
      border-bottom: 2upx solid #707070;
      display: flex;
      align-items: center;
      padding-left: 10upx;
    }
  }
  .btt2 {
    height: 50upx;
    font-size: 28upx;
    color: #000;
    font-weight: bold;
    padding: 0 40upx;
  }
  .bottoms {
    width: 94%;
    margin: 20upx 3%;
    padding: 0 20upx;
    height: 260upx;
    display: flex;
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
      font-size: 24upx;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        width: 52upx;
        margin-bottom: 6upx;
      }
    }
    .userImage {
      width: 100%;
      height: 100%;
    }
  }
  .tongyi {
    width: 100%;
    height: 60upx;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 25upx;
    }
    text {
      font-size: 24upx;
      color: #7a7a7a;
      padding-left: 10upx;
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
