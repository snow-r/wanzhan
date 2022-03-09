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
      barTitle="邀请分享"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="inviteCell">
            <view style="display: flex;align-items: center;">
              <view>
                邀请码
              </view>
              <view v-if="code"> {{ code }} </view>
              <button v-else size="mini" @click="openInvite" type="primary" style="margin-left: 15px;">
                点击获取
              </button>
            </view>
        </view>

        <view style="padding-left: 15px">
          <view> 小程序分享码 </view>
          <view> </view>
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
      code: "",
      img: "",
    };
  },
  mounted() {
    this.getMyinviteCode();
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
    // 查询个人信息获取邀请码
    getMyinviteCode() {
      let sendData = {
        userId: uni.getStorageSync("userId"),
      };
      this.$api.userMsg(sendData).then((res) => {
        this.code = res.data.userInfo.inviteCode;
        if (this.code) {
          this.getQRCode();
        }
      });
    },
    // 开通邀请
    openInvite(){
      this.$api.snow.openInviteCode().then((res) => {
        console.log("开通邀请 --- ", res);
        this.code = res.data.inviteCode
      });
    },
    // 获取二维码
    getQRCode() {
      console.log("获取二维码 --- ", res);
      let sendData = {
        userId: uni.getStorageSync("userId"),
      };
      this.$api.snow.produceInviteCode(sendData).then((res) => {
        console.log("获取二维码 --- ", res);
      });
    },
  },
};
</script>

<style scoped>
.inviteCell {
  display: flex;
  width: 100%;
  height: 40px;
  padding-left: 15px;
}
</style>