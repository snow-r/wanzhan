<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="#f0f0f0"
      :back="true"
      barTitle="绑定商铺"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <view class="row">
            <view class="nominal">邀请码</view>
            <view class="input">
              <input
                placeholder="请输入邀请码"
                v-model="inviside"
                type="number"
              />
            </view>
          </view>
          <view class="row">
            <view class="nominal">邀请人电话</view>
            <view class="input">
              <input
                placeholder="请输入邀请人电话"
                v-model="phone"
                type="number"
              />
            </view>
          </view>
        </view>
        <view class="btns">
          <view class="btnOn" @click="postSouList()">搜索</view>
        </view>
        <view v-if="list == null"></view>
        <view
          class="content"
          v-else-if="list.length > 0"
          v-for="(item, index) in list"
          :key="index"
          @click="bangding(item.id)"
        >
          <view class="contLeft">
            <image :src="item.imgUrl" mode="widthFix"></image>
          </view>
          <view class="contRight">
            <view class="right1">{{ item.name }}</view>
            <view class="right2"
              >地址： <text>{{ item.address }}</text>
            </view>
          </view>
        </view>
        <view class="no12" v-else-if="list.length == 0"
          >暂无符合条件的商铺~</view
        >
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
      inviside: "",
      phone: "",
      list: null,
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
    postSouList() {
      if (!this.inviside) {
        uni.showToast({
          title: "邀请码不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.phone) {
        uni.showToast({
          title: "邀请人电话不能为空！",
          icon: "none",
        });
        return;
      }
      let sendData = {
        inviteCode: this.inviside,
        createUserMobile: this.phone,
      };
      uni.showLoading({
        title: "搜索中",
        mask: true,
      });
      this.$api.postSouList(sendData).then((res) => {
        uni.hideLoading();
        console.log(res, "444");
        if (res.code == 200) {
          this.list = res.data;
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    bangding(id) {
      var that = this;
      uni.showModal({
        title: "提示",
        content: "确定绑定当前商铺吗？",
        success: function(res) {
          if (res.confirm) {
            let sendData = {
              detailId: id,
            };
            that.$api.userBangDing(sendData).then((res) => {
              if (res.code == 200) {
                that.$comfun.Toast("绑定商铺成功", "none");
              } else {
                that.$comfun.Toast(res.msg, "none");
              }
            });
          } else if (res.cancel) {
            that.$comfun.Toast("操作取消", "none");
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #f0f0f0;
  font-size: 28upx;
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 260upx;
    .row {
      display: flex;
      min-height: 90upx;
      padding: 20upx 100upx;
    }
    .row .nominal {
      width: 30%;
      line-height: 90upx;
      font-size: 28upx;
      font-weight: 600;
      color: #000;
    }

    .row .input {
      width: 60%;
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
      width: 350upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content {
    box-shadow: 0 2upx 18upx 3upx #f5a9ad;
    width: 90%;
    height: 300upx;
    margin: 10upx 5% 10upx;
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
        width: 300upx;
        border-radius: 20upx;
      }
    }
    .contRight {
      width: 50%;
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
    }
  }
  .no12 {
    height: 100upx;
    width: 100%;
    font-size: 28upx;
    color: #000;
    text-align: center;
    line-height: 100upx;
  }
}
</style>
