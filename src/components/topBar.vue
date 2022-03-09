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
    <!-- <view
      class="settingBtnWrap"
      v-if="showSetting"
      >{{topText}}</view
    > -->
    <view class="goBackWrap" v-if="back">
      <image
        class="backIcon"
        @click="goBack"
        src="@/static/images/left_black.png"
        mode="widthFix"
        v-if="backType == 'black'"
      />

      <image
        class="backIcon"
        @click="goBack"
        src="@/static/images/left_white.png"
        mode="widthFix"
        v-if="backType == 'white'"
      />
      <view v-if="backType == 'opacity'" class="opacity" @click="goBack">
        <image
          class="backIcon"
          src="@/static/images/houtui.png"
          mode="widthFix"
        />
      </view>
      <view v-if="backType == 'fanhui'" class="fanhui" @click="goBack">
        <image
          class="backIcon"
          src="http://www.mingtongxa.com/wanzhuan/fanhui.png"
          mode="widthFix"
        />
      </view>
      <view v-if="backType == 'fanhuis'" class="fanhui" @click="goBack">
        <image
          class="backIcon"
          src="http://www.mingtongxa.com/wanzhuan/fanhuis.png"
          mode="widthFix"
        />
      </view>
      <!-- #ifdef H5 -->
      <image
        class="backIcon"
        v-if="backType == 'black'"
        style="margin-left:30upx;"
        @click="goBacks"
        src="@/static/images/closeNo.png"
        mode="widthFix"
      />
      <image
        class="backIcon"
        v-if="backType == 'white'"
        style="margin-left:30upx;"
        @click="goBacks"
        src="@/static/images/no8.png"
        mode="widthFix"
      />
      <image
        class="opacity"
        v-if="backType == 'opacity'"
        style="margin-left:30upx;"
        @click="goBacks"
        src="@/static/images/no9.png"
        mode="widthFix"
      />
      <!-- #endif -->
      <view v-if="backType == 'guanbi'" class="goBackWrap" @click="goHome">
        <image class="backIcon" src="@/static/images/no8.png" mode="widthFix" />
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
    <view class="searchContainer" v-if="showSearch">
      <view class="searchBtn">
        <image class="searchIcon" src="@/static/images/sousuo.png" />
        <input
          style="text-align:left"
          v-model="searchVal"
          @input="doSearch"
          type="text"
          :placeholder="searchText"
        />
      </view>
    </view>
    <view class="nav-titles" v-if="!showSearch && !isfan && isJia && isJiaCai">
      <view>
        {{ barTitle }}
      </view>
    </view>
    <view class="nav-titless" v-if="!showSearch && !isfan && !isJia && isJiaCai">
      <view>
        {{ barTitle }}
      </view>
      <image
        class="titlesImg"
        @click="gotoAdd()"
        src="@/static/images/addQuan.png"
        mode="widthFix"
      />
    </view>
    <view class="nav-titless" v-if="!showSearch && !isfan && !isJia && !isJiaCai">
      <view>
        {{ barTitle }}
      </view>
      <image
        class="titlesImg"
        @click="gotoAddCai()"
        src="@/static/images/addQuan.png"
        mode="widthFix"
      />
    </view>
    <view class="nav-title" v-if="!showSearch && isfan && isJia && isJiaCai">
      {{ barTitle }}
    </view>
    <view class="searchContainer" v-if="showSearchs">
      <view class="settingBtnWrap" v-if="showSetting">{{ topText }}</view>
      <view class="searchBtn" @click="doSearchs">
        <view class="searchTip">{{ searchText }}</view>
        <image class="searchIcon" src="@/static/images/sousuo.png" />
      </view>
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
    showSearchs: {
      default: false,
    },
    isfan: {
      default: true,
    },
    isJia: {
      default: true,
    },
    isJiaCai: {
      default: true,
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
    shopId: {
      default: null,
    },
    categoryId: {
      default: null,
    },
    backType: {
      default: "black",
    },
    topText: {
      default: "",
    },
  },
  data() {
    return {
      searchVal: "",
      timeID: -1,
    };
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
    topHeight() {
      return uni.getStorageSync("topHeight");
    },
  },
  mounted() {},
  methods: {
    goBack() {
      if (this.myBack) {
        this.$emit("backFun");
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
    goBacks() {
      window.android.back();
    },
    gotoAdd() {
      console.log(this.shopId, "444444");
      if (this.shopId) {
        uni.navigateTo({
          url: "/subpages/pages/addQuan?id=" + this.shopId+ "&status=" + this.categoryId,
        });
      }
    },
    gotoAddCai() {
      console.log(this.shopId, "444444");
      if (this.shopId) {
        uni.navigateTo({
          url: "/subpages/pages/addXm?id=" + this.shopId+ "&status=" + this.categoryId,
        });
      }
    },
    goHome() {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
    doSearch(e) {
      if (this.timeID) clearTimeout(this.timeID);
      this.timeID = setTimeout(() => {
        this.$emit("changes", e.detail.value);
      }, 600);

      // console.log(e,'66666')
      // if (this.timeID) clearTimeout(this.timeID);
      // this.timeID = setTimeout(() => {
      //   this.searchVal = e.detail.value;
      // }, 600);
      // uni.setStorageSync('searchWork', this.searchVal)
    },
    doSearchs() {
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
  z-index: 100;
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
    width: 60upx;
    height: 60upx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    image {
      width: 70upx;
    }
  }
  .fanhui {
    width: 60upx;
    height: 60upx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    image {
      width: 50upx;
    }
  }
  .backIcons {
    width: 36upx;
    height: 36upx;
  }
  .backIcon {
    width: 32upx;
    height: 32upx;
  }
}
.settingBtnWrap {
  width: 60px;
  height: 60upx;
  background: #db0000;
  border: 4upx solid #000;
  border-radius: 30upx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  z-index: 100;
}
.nav {
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
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
  box-sizing: border-box;
  .searchBtn {
    width: 320upx;
    height: 60upx;
    border-radius: 32upx;
    background: #ffe801;
    border: 4upx solid #000;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
    font-weight: 600;
    box-sizing: border-box;
    margin-left: 60upx;
    .searchIcon {
      width: 36upx;
      height: 36upx;
      margin-right: 26upx;
      margin-left: 10upx;
      input {
        text-align: left;
      }
    }
    .searchTip {
      color: #000;
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
.nav-titless {
  height: 45px;
  margin-left: 120upx;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  view {
    padding: 2px 15px;
    background: #db0000;
    color: #000;
    font-weight: bold;
    font-size: 30upx;
    border-radius: 30upx;
    border: 4upx solid #000;
  }
  .titlesImg {
    width: 60upx !important;
    height: 60upx !important;
    margin-left: 100upx;
  }
  bottom: 0;
  left: 0;
  z-index: 10;
}
.nav-titles {
  height: 45px;
  margin-left: 120upx;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  view {
    padding: 2px 15px;
    background: #db0000;
    color: #000;
    font-weight: bold;
    font-size: 30upx;
    border-radius: 30upx;
    border: 4upx solid #000;
    .titlesImg {
      width: 60upx !important;
      height: 60upx !important;
    }
  }

  bottom: 0;
  left: 0;
  z-index: 10;
}
.nav .back {
  width: 22px;
  height: 22px;
  position: absolute;
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
