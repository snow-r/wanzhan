<template>
  <view>
    <TopBar background="#fff" :back="true" barTitle="搜索" />
    <scroll-view
      scroll-y
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <view class="pageContainer">
        <view class="search">
          <view class="searchBox">
            <image src="@/static/images/sousuo.png"></image>
            <input
              type="text"
              placeholder="请输入搜索内容"
              v-model="keyBord"
              @input="goSearchs"
            />
          </view>
          <view class="searchBtn" @click="goSearch">搜索</view>
        </view>
        <view style="position: absolute;top:80rpx;width:100%">
        <view class="keyword-box" v-if="keyBord == ''">
          <view class="keyword-block">
            <view class="keyword-list-header" style="padding-top:14upx">
              <view style="font-size:34upx">大家都在搜</view>
              <view>
                <view></view>
              </view>
            </view>
            <view class="keyword">
              <view
                v-for="(item, index) in hotSearch"
                :key="index"
                @tap="ondoSearchs(item.name)"
                >{{ item.name }}</view
              >
            </view>
          </view>
        </view>
        <view class="keyword-box" v-if="oldKeys.length > 0 && keyBord == ''">
          <view class="keyword-block">
            <view class="keyword-list-header">
              <view>搜索历史</view>
              <view @click="oldDelete" style="font-size:28upx;color:#999">
                清空
              </view>
            </view>
            <view class="keyword">
              <view
                v-for="(item, index) in oldKeys"
                :key="index"
                @tap="ondoSearch(item)"
                >{{ item }}</view
              >
            </view>
          </view>
        </view>
        </view>
        <view v-if="contentArr == null"></view>
        <view class="pageCont" v-else-if="contentArr.length > 0">
          <view
            class="pageIcon"
            v-for="(item, index) in contentArr"
            :key="index"
            @click="pageTo(item, index)"
          >
            <view class="iconLeft">
              <image :src="item.imgUrl" mode="widthFix"></image>
            </view>
            <view class="iconRight">
              <view
                class="iconHeader"
                style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
              >
                {{ item.name }}
              </view>
              <view class="iconCont" v-if="item.tags != 'null'">
                {{ item.tags.replace(/,/g, " | ") }}
              </view>
              <view class="iconCont" v-else> </view>
              <view class="iconBottom">
                <view class="bottomLeft">
                  <text>{{ item.price }}</text
                  >/元
                </view>
                <view class="bottomRight">
                  <view>已售 {{ item.saleNum }}</view>
                  <view v-if="item.favorableRate != null"
                    >好评 <text>{{ item.favorableRate }}%</text></view
                  >
                  <view v-else>好评 <text>100%</text></view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else-if="isShowKeywordList" style="padding-top:100upx;text-align:center">暂无您搜索的内容~</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      IMG_BEFORE_URL,
      type: "",
      current: 1,
      currentType: 1,
      totalPage: 1,
      houseList: [],
      keyBord: "",
      oldKeywordList: [],
      isShowKeywordList: false,
      oldKeys: [],
      headerActive: 1,
      timeID: -1,
      contentArr: null,
      hotSearch: [
        {
          name: "疏通",
        },
        {
          name: "开锁",
        },
        {
          name: "洗衣机",
        },
        {
          name: "衣物清洗",
        },
        {
          name: "装修",
        },
      ],
    };
  },
  onLoad(options) {
    if (uni.getStorageSync("indexKeys")) {
      this.oldKeys = JSON.parse(uni.getStorageSync("indexKeys"));
      console.log(this.oldKeys, "111");
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  mounted() {},
  methods: {
    doSearch() {},
    chooseAvtiveClick(i, title) {
      this.headerActive = i;
      this.getDataList(i);
    },
    goSearch() {
      if (this.keyBord != "") {
        this.saveKeyword(this.keyBord);
      }
      if (!this.keyBord) {
        this.contentArr = [];
        this.isShowKeywordList = false;
        return;
      }
      uni.showLoading({
        mask: true,
      });
      let sendData = {
        searchValue: this.keyBord,
      };
      this.$api.searchIndex(sendData).then((res) => {
        uni.hideLoading();
        this.contentArr = res.data;
        if (this.contentArr.length == 0) {
          this.isShowKeywordList = true;
        }
      });
    },

    goSearchs(e) {
      if (this.timeID) clearTimeout(this.timeID);
      this.timeID = setTimeout(() => {
        this.keyBord = e.detail.value;
        this.goSearch();
      }, 600);

      // uni.showLoading({
      //   mask: true
      // })
      // let sendData = {
      //   searchValue:this.keyBord
      // }
      // this.$api.searchIndex(sendData).then(res=>{
      //   uni.hideLoading()
      //   this.contentArr = res.data
      // })
    },
    // 热门搜索
    // getHotSearch() {
    //   uni.showLoading({ mask: true });
    //   this.$api.indexHotSearch().then((res) => {
    //     uni.hideLoading();
    //     if (res.code === "1") {
    //       this.hotSearch = res.obj.split(",");
    //       let arr = this.hotSearch.splice(0, 5);
    //       this.hotSearch = arr;
    //     }
    //   });
    // },
    getDataList(index) {
      if (this.keyBord == "") {
        uni.showToast({
          title: "请输入要搜索的内容",
          icon: "none",
        });
        return;
      }
      uni.showLoading({ mask: true });
      let sendData = {};
      //   this.$api.indexSearchHouse(sendData).then((res) => {
      //     uni.hideLoading();
      //   });
    },
    ondoSearch(item) {
      this.keyBord = item;
      this.goSearch();
    },
    ondoSearchs(item) {
      this.keyBord = item;
      this.goSearch();
    },
    oldDelete() {
      uni.showModal({
        content: "确定清除历史搜索记录？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            this.oldKeys = [];
            this.oldKeys = [];
            uni.removeStorage({
              key: "indexKeys",
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    saveKeyword(keyword) {
      uni.getStorage({
        key: "indexKeys",
        success: (res) => {
          var indexKeys = JSON.parse(res.data);
          var findIndex = indexKeys.indexOf(keyword);
          if (findIndex == -1) {
            indexKeys.unshift(keyword);
          } else {
            indexKeys.splice(findIndex, 1);
            indexKeys.unshift(keyword);
          } //最多10个纪录
          let newKeys = [];
          indexKeys.forEach((item, index) => {
            newKeys.push(item.split(" ").join(""));
          });
          let newKeysList = [];
          for (var i = 0; i < newKeys.length; i++) {
            if (newKeysList.indexOf(newKeys[i]) === -1) {
              newKeysList.push(newKeys[i]);
            }
          }
          this.indexKeys = newKeysList;
          newKeysList.length > 10 && indexKeys.pop();
          uni.setStorage({
            key: "indexKeys",
            data: JSON.stringify(indexKeys),
          });
          this.oldKeys = newKeysList; //更新历史搜索
        },
        fail: (e) => {
          var indexKeys = [keyword];
          uni.setStorage({
            key: "indexKeys",
            data: JSON.stringify(indexKeys),
          });
          this.oldKeys = indexKeys; //更新历史搜索
        },
      });
    },
    pageTo(item, idx) {
      uni.navigateTo({
        url: "/subpages/pages/shopDetail?id=" + item.id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  background: #fff;
  .pageCont {
    width: 100%;
    background: #f5f7ff;
    position: absolute;
    top: 80upx;
    .pageIcon {
      width: 96%;
      margin: 6upx 2%;
      height: 240upx;
      background: #fff;
      border-radius: 10upx;
      margin-top: 20upx;
      display: flex;
      .iconLeft {
        width: 220upx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          margin-left: 20upx;
          width: 100%;
          height: 100%;
        }
      }
      .iconRight {
        display: flex;
        flex-direction: column;
        padding-left: 30upx;
        width: 70%;
        .iconHeader {
          width: 450upx;
          color: #333;
          font-weight: bold;
          font-size: 32upx;
          padding-top: 25upx;
        }
        .iconCont {
          margin: 20upx 0 60upx 0;
          color: #999;
          font-size: 28upx;
        }
        .iconBottom {
          display: flex;
          justify-content: space-between;
          .bottomLeft {
            font-size: 32upx;
            text {
              color: #d83c23;
            }
          }
          .bottomRight {
            display: flex;
            width: 300upx;
            font-size: 30upx;
            text {
              color: #d83c23;
            }
            view {
              margin-left: 15upx;
              color: #999;
            }
          }
        }
      }
    }
  }
  .scrool-more {
    white-space: nowrap;
    width: 100%;
    height: 78upx;
    margin-top: 30upx;
  }
  .nodata {
    width: 100%;
    height: 600upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: 180upx;
      height: 180upx;
    }
    text {
      color: #3e3e3e;
      font-size: 28upx;
      padding-top: 30upx;
    }
  }
  .nameActive {
    // color: #238fae;
    // width: 20%;
    font-weight: bold;
    font-size: 33upx;
    text {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -18upx;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30upx;
        height: 6upx;
        background: #e89020;
      }
    }
  }
  .scrool-more view {
    // width: 140upx;
    height: 60upx;
    display: inline-block;
    font-size: 28upx;
    padding: 20rpx;
  }
  .topList {
    // width: 100%;
    display: flex;
    background: #fff;
    justify-content: space-between;
    padding: 50upx 30upx 30upx 30upx;
    view {
      width: 140rpx;
      height: 40rpx;
      padding: 0 10upx;
      color: #dd6f51;
    }
  }
  .search {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 90upx;
    padding: 0upx 0 0 30upx;
    display: flex;
    .searchBtn {
      width: 90upx;
      height: 66upx;
      line-height: 66upx;
      text-align: center;
      color: #333;
      font-size: 30upx;
      padding-left: 20upx;
    }
  }
  .searchBox {
    width: 613upx;
    height: 66upx;
    background: #f5f7ff;
    border-radius: 33upx;
    display: flex;
    align-items: center;
    color: #999;
    input {
      margin-left: 20upx;
      width: 80%;
      height: 66upx;
      line-height: 66upx;
      font-size: 26upx;
      color: #000;
    }
    image {
      width: 34upx;
      height: 34upx;
      margin-left: 30upx;
    }
  }
}
.keyword-box {
  border-radius: 20upx 20upx 0 0;
  background-color: #fff;
}
.keyword-box .keyword-block {
  padding: 10upx 0 0;
}
.keyword-box .keyword-block .keyword-list-header {
  width: 100%;
  padding: 10upx 3% 0;
  font-size: 34upx;
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.keyword-box .keyword-block .keyword-list-header image {
  width: 40upx;
  height: 40upx;
}
.keyword-box .keyword-block .keyword {
  width: 100%;
  padding: 20upx 3%;
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
}
.keyword-box .keyword-block .hide-hot-tis {
  display: flex;
  justify-content: center;
  font-size: 28upx;
  color: #6b6b6b;
}
.keyword-box .keyword-block .keyword > view {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20upx;
  padding: 0 20upx;
  margin: 10upx 20upx 10upx 0;
  height: 60upx;
  font-size: 24upx;
  background-color:#f5f7ff;
  color: #333;
  line-height: 60upx;
}
.houseSearchCont {
  width: 94%;
  padding: 10upx 3%;
  border-bottom: 1upx solid #eee;
  display: flex;
  align-items: center;
  padding-right: 10upx;
  justify-content: space-between;
  .searchLeft {
    display: flex;
    flex-direction: column;
    .houseName {
      padding: 10upx;
      font-size: 30upx;
      color: #000;
    }
    .houseMsg {
      font-size: 24upx;
      color: #999;
      display: flex;
      view:nth-child(1) {
        padding-left: 0upx;
      }
      view {
        padding-left: 10upx !important;
      }
      image {
        width: 150upx;
        height: 150upx;
      }
    }
  }

  .housePirce {
    font-size: 30upx;
    color: #dd6f51;
    text {
      font-size: 24upx;
    }
  }
}
.houseSearchConts {
  width: 94%;
  margin: 20upx 3%;
  border-bottom: 1upx solid #eee;
  height: 240upx;
  display: flex;
  align-items: center;
  padding-right: 10upx;
  justify-content: space-between;

  .searchLeft {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: auto;
    .houseName {
      padding: 10upx;
      font-size: 30upx;
      color: #000;
    }
    .houseMsgs {
      font-size: 24upx;
      color: #999;
      display: flex;
      view:nth-child(1) {
        padding-left: 0upx;
      }
      view {
        padding-left: 10upx !important;
      }
      image {
        width: 120upx;
        height: 120upx;
      }
    }
  }
  .housePirce {
    font-size: 30upx;
    color: #dd6f51;
    text {
      font-size: 24upx;
    }
  }
}
.noHouse {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150upx;
  image {
    width: 160upx;
    height: 147upx;
  }
  view {
    font-size: 28upx;
    color: #3e3e3e;
    text-align: center;
    padding: 20upx 0;
  }
}
</style>
