<template>
    <view>
        <TopBar
            background="#fff"
            :back="true"
            barTitle="新增银行卡"
        />
        <view
            :class="isIpx?'xPage':'normalPage'"
            :style="'padding-top:' + navHeight + 'px'">
            <scroll-view scroll-y class="pageContainer">
              <view class="rights">
              <image
                                            src="https://www.baibianlg.com/xcx/bank.png"
                                            @click="gotoAdd"
                                            
                                        ></image>
                                        <view class="posst">
                                          <view class="no1">VISA</view>
                                          <view class="no2">**** **** **** ****</view>
                                        </view>
                                        </view>
                <view class="centent">
                    <view class="editaddress">
                        <view class="content">
                            <view class="row">
                                <view class="nominal">绑定银行</view>
                                <view class="input">
                                    <input
                                        placeholder="银行名称"
                                        v-model="form.bankName"
                                        type="text"
                                    ></input>
                                </view>
                            </view>
                            <view class="row">
                                <view class="nominal">开户行网点</view>
                                <view class="input">
                                    <input
                                        placeholder="开户行网点信息"
                                        v-model="form.wangdian"
                                        type="text"
                                    ></input>
                                </view>
                            </view>
                            <view class="row">
                                <view class="nominal">绑定卡号</view>
                                <view class="input">
                                    <input
                                        placeholder="银行卡号"
                                        v-model="form.bankNumber"
                                        type="number"
                                    ></input>
                                </view>
                            </view>

                            <view class="row">
                                <view class="nominal">姓&emsp;&emsp;名</view>
                                <view class="input">
                                    <input
                                        placeholder="银行卡预留姓名"
                                        v-model="form.userName"
                                        type="text"
                                    ></input>
                                </view>
                            </view>

                            <view class="row">
                                <view class="nominal">联系电话</view>
                                <view class="input">
                                    <input
                                        placeholder="银行卡预留电话"
                                        v-model="form.phoneNumber"
                                        type="number"
                                        maxlength="11"
                                    ></input>
                                </view>
                            </view>
                                <view class="save">
                            <view
                                class="btn"
                                @click="getSave()"
                            >确认提交</view>
                        </view>
                        </view>
                        
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
      userId: "",
      form: {
        bankName: "",
        bankNumber: "",
        phoneNumber: "",
        userName: "",
        wangdian:""
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
    getSave() {
      if (!this.form.bankName) {
        uni.showToast({
          title: "银行名称不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.wangdian) {
        uni.showToast({
          title: "开户行网点不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.bankNumber) {
        uni.showToast({
          title: "银行卡号不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.userName) {
        uni.showToast({
          title: "预留姓名不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.form.phoneNumber) {
        uni.showToast({
          title: "预留电话不能为空！",
          icon: "none",
        });
        return;
      }
      let sendData = {
        account:this.form.userName,
        bankName:this.form.bankName,
        cardNo:this.form.bankNumber,
        phone:this.form.phoneNumber,
        address:this.form.wangdian
      };
      uni.showLoading();
      this.$api.addBankId(sendData).then((res) => {
        if (res.code == 200) {
          uni.hideLoading();
          uni.showToast({
            title: "添加成功",
            duration: 1500,
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        }else{
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500,
          });
        }
      });
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
  .rights{
    width: 100%;
    
    image{
      position: relative;
      width: 100%;
    }
    .posst{
    position: absolute;
    width: 80%;
    height: 300upx;
    top: 80upx;
    left: 80upx;
    z-index: 10;
    display: flex;
    flex-direction: column;
    .no1{
      font-size: 46upx;
      font-weight: bold;
      color: #fff;
    }
    .no2{
      padding-top: 80upx;
      font-size: 38upx;
      font-weight: bold;
      color: #fff;
    }
  }
  }
  .centent{
    margin-top: -90upx;
  }
  .editaddress {
    padding: 50upx;

    .content {
      background: #fff;
      border-radius: 20upx;
      padding: 4upx 20upx 30upx;
      box-shadow: 0px 7px 44px 2px rgba(36, 77, 210, 0.15);
      .row {
        display: flex;
        min-height: 120upx;
        border-bottom: solid 1upx #e6e6e6;
      }

      .row .nominal {
        width: 28%;
        line-height: 120upx;
        font-size: 26upx;
        font-weight: 500;
        color: #333;
        padding-left: 30upx;
      }

      .row .input {
        width: 74%;
        margin-left: 20upx;
        padding-left: 10upx;
        input {
          height: 120upx;
          line-height: 90upx;
          font-size: 26upx;
          font-weight: 500;
          color: #666666;
        }

        textarea {
          width: 100%;
          font-size: 26upx;
          color: #333;
        }
      }

      .textarea {
        padding: 30upx 0;
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

  .save {
    width: 100%;
    height: 100upx;
    margin-top: 30upx;
    display: flex;
    justify-content: center;
    .btn {
      width: 55%;
      font-size: 32upx;
      color: #ffffff;
      text-align: center;
      height: 100upx;
      line-height: 100upx;
      background: #0198FE;
      border-radius: 50upx;
    }
  }
}
</style>