<script>
export default {
  onLaunch(scene) {
    uni.setStorageSync("isPop", false);
    uni.setStorageSync("showAuthModal", true);
    // debugger
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
    });
    // 下载新版本
    updateManager.onUpdateReady(function() {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 重启应用
            updateManager.applyUpdate();
          }
        },
      });
    });
    // 新版本下载失败
    updateManager.onUpdateFailed(function(res) {
      // 新的版本下载失败
      uni.showModal({
        title: "已经有新版本了哟~",
        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
      });
    });
    /* #ifdef H5 */
    this.init();
    /* #endif */
  },
  methods: {
    init() {
      let data = window.android.getUserInfo();
      data = JSON.parse(data);
      uni.setStorageSync("token", data.token);
      uni.setStorageSync("userId", data.userId);
      uni.setStorageSync("avatar", data.avatar);
      uni.setStorageSync("realName", data.realName);
      uni.setStorageSync("nickName", data.nickName);
      uni.setStorageSync("phonenumber", data.phonenumber);
    },
  },

  onShow: function() {
    // uni.setStorageSync('isMask', true)
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style lang="less">
/*每个页面公共css */
.iphoneX-page {
  height: 100vh;
  padding-bottom: 160upx;
  box-sizing: border-box;
  font-size: 28upx;
}
.normalHomePage {
  height: 100vh;
  padding-bottom: 100upx;
  box-sizing: border-box;
  font-size: 28upx;
}
.xPage {
  font-size: 28upx;
  height: 100vh;
  padding-bottom: 60upx;
  box-sizing: border-box;
}
.normalPage {
  font-size: 28upx;
  height: 100vh;
  padding-bottom: 0;
  box-sizing: border-box;
}
image {
  vertical-align: middle;
}
/* 输入框占位符样式 */
.plac {
  color: #999;
}
.backBtnWrap {
  height: 45px;
  position: absolute;
  left: 0;
  padding-left: 30upx;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 100;
  .backBtn {
    width: 62upx;
    height: 62upx;
  }
}
.pageContainer {
  width: 100%;
  box-sizing: border-box;
}
view {
  box-sizing: border-box;
}
.noDataBtn {
  width: 260upx;
  height: 84upx;
  border-radius: 42upx;
  background: linear-gradient(to right, #2f8ec8, #53aadf);
  line-height: 84upx;
  text-align: center;
  color: #fff;
  font-size: 28upx;
  margin-top: 80upx;
  box-shadow: 0 5upx 10upx #2888c3;
}
.formBtn {
  width: 600upx;
  height: 90upx;
  text-align: center;
  line-height: 90upx;
  color: #fff;
  border-radius: 45upx;
  background: #383838;
  box-shadow: 0 7rpx 13rpx 0 rgba(12, 6, 9, 0.21);
  margin: 50upx auto;
}
.nextBtn {
  width: 592upx;
  height: 92upx;
  line-height: 92upx;
  text-align: center;
  color: #fff;
  background: linear-gradient(to right, #2f8ec8, #53aadf);
  font-size: 30upx;
  margin: 60upx auto 0;
  border-radius: 46upx;
}
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
.dialogs {
  width: 550upx;
  height: 400upx;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-radius: 20upx;
  .dialogHeader {
    font-size: 32upx;
    color: #000;
    font-weight: bold;
    padding: 40upx 0 20upx;
  }
  .dialogContent {
    width: 100%;
    color: #363636;
    height: 200upx;
    font-size: 30upx;
    padding: 10upx 15upx 0upx;
  }
  .dialogBottom {
    width: 100%;
    height: 100upx;
    padding: 20upx 0;
    border-top: 1upx solid #efeff4;
  }
  .dialogBottoms {
    width: 100%;
    height: 110upx;
    padding: 30upx 0 0;
    display: flex;
    justify-content: space-around;
    font-size: 32upx;
    font-weight: bold;
    border-top: 1upx solid #efeff4;
    view:nth-child(1) {
      color: #f8b135;
      width: 50%;
    }
    view:nth-child(2) {
      color: #2f8ec8;
      width: 50%;
    }
  }
}
</style>
