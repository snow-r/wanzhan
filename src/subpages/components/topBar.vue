<template>
  <view
    class="nav"
    :style="
      'height:' + navH + 'px;background:' + background + ';color:' + fontColor
    "
  >
    <slot></slot>
    <!-- <view class="locationWrap" v-if="position">
      <image
        class="positionImg"
        src="@/static/images/dingwei.png"
        mode="widthFix"
      />
      <text>{{ location }}</text>
      <image
        class="downArraw"
        src="@/static/images/law-down.png"
        mode="widthFix"
      />
    </view> -->
    <view
      class="settingBtnWrap"
      :style="'color:' + fontColor"
      v-if="showSetting"
      @click="toSetting"
      >设置</view
    >
    <view class="goBackWrap" v-if="back" @click="goBack">
      <image
        class="backIcon"
        src="@/static/images/left_black.png"
        mode="widthFix"
        v-if="backType == 'black'"
      />
      <image
        class="backIcon"
        src="@/static/images/left_white.png"
        mode="widthFix"
        v-if="backType == 'white'"
      />
      <view v-if="backType == 'opacity'" class="opacity">
        <image
          class="backIcon"
          src="@/static/images/left_white.png"
          mode="widthFix"
        />
      </view>
      <view v-if="backType == 'guanbi'" class="goBackWrap">
        <image
          class="backIcon"
          src="@/static/images/closeButton.png"
          mode="widthFix"
        />
      </view>
    </view>
    <!-- <view class="goBackWrap" v-if="home" @click="goHome">
      <image
        class="backIcon"
        src="@/static/images/home.png"
        mode="widthFix"
        v-if="backType == 'black'"
      />
      <image
        class="backIcon"
        src="@/static/images/homeBtn.png"
        mode="widthFix"
        v-if="backType == 'white'"
      />
    </view> -->
    <!-- <view class="searchContainer" v-if="showSearch">
      <view class="searchBtn" @click="doSearch">
        <image class="searchIcon" src="@/static/images/searchIcon.png" />
        <view class="searchTip">{{ searchText }}</view>
      </view>
    </view> -->
    <view class="nav-title" v-if="!showSearch">
      {{ barTitle }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    home: {
      default: false,
    },
    myBack: {
      default: false,
    },
    searchText: {
      default: "",
    },
    showSearch: {
      default: false,
    },
    barTitle: {
      default: "",
    },
    showSetting: {
      default: false,
    },
    background: {
      default: "#fff",
    },
    fontColor: {
      default: "#000",
    },
    position: {
      default: false,
    },
    location: {
      default: "西安市",
    },
    back: {
      default: false,
    },
    backType: {
      default: "black",
    },
  },
  data() {
    return {};
  },
  watch: {
    back(val) {
      this.back = val;
    },
  },
  computed: {
    navH() {
      return uni.getStorageSync("navHeight");
    },
  },
  mounted() {},
  methods: {
    goBack() {
      if (this.myBack) {
        this.$emit("backFun");
      } else if (this.backType == "guanbi") {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      } else {
        if (this.barTitle == "登录") {
          this.$emit("changLoginType", 1);
        } else {
          uni.navigateBack({
            fail: (res) => {
              uni.reLaunch({
                url: "/pages/index/index",
              });
            },
          });
        }
      }
    },
    goHome() {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
    doSearch() {
      this.$emit("search");
    },
    toSetting() {
      uni.navigateTo({
        url: "/subpages/pages/setting",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.locationWrap {
  height: 45px;
  position: absolute;
  left: 15upx;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 28upx;
  .positionImg {
    width: 36upx;
    height: 36upx;
    margin-right: 10upx;
  }
  .downArraw {
    width: 20upx;
    margin-left: 8upx;
  }
}
.goBackWrap {
  height: 45px;
  position: absolute;
  left: 0;
  padding-left: 30upx;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 100;
  .opacity {
    width: 70upx;
    height: 70upx;
    background: #000;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .backIcon {
    width: 40upx;
    height: 40upx;
  }
}
.settingBtnWrap {
  height: 45px;
  position: absolute;
  left: 0;
  padding-left: 30upx;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 100;
}
.nav {
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-size: 100% 100% !important;
}
.searchContainer {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-size: 32upx;
  display: flex;
  align-items: center;
  padding-left: 92upx;
  box-sizing: border-box;
  .searchBtn {
    width: 422upx;
    height: 64upx;
    border-radius: 32upx;
    background: #f4f4f4;
    display: flex;
    align-items: center;
    padding-left: 30upx;
    box-sizing: border-box;
    .searchIcon {
      width: 36upx;
      height: 36upx;
      margin-right: 15upx;
    }
    .searchTip {
      color: #999;
      font-size: 26upx;
    }
  }
}
.nav-title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-size: 32upx;
}
.nav .back {
  width: 22px;
  height: 22px;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  padding: 10px 15px;
}
.bg-white {
  background-color: #ffffff;
}
.bg-gray {
  background-color: #f7f7f7;
}
.overflow {
  overflow: auto;
}
.hidden {
  overflow: hidden;
}
</style>
