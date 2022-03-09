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
      barTitle="商铺评论"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer"> 

          <view class="pinglunT" v-if="shopComList.length>0" v-for="(nav,indexs) in shopComList" :key="indexs">
            <view class="pinTitle">
              <image
                v-if="/^http/.test(nav.createUserHeadimg) && nav.isAgree==1"
                :src="nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==0"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==1"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else-if="!/^http/.test(nav.createUserHeadimg) && nav.isAgree==0"
                :src="IMG_BEFORE_URL+nav.createUserHeadimg"
                mode="widthFix"
              ></image>
              <image
                v-else
                src="http://www.mingtongxa.com/wanzhuan/noheading.png"
                mode="widthFix"
              ></image>
              <text v-if="nav.isAgree==1">{{nav.createUserName}}</text>
              <text v-else>匿名用户</text>
            </view>
            <view class="fabu">
              发布于{{nav.createTime.slice(0,9).replace(/\-/g,'.')}}
            </view>
            <view class="dafen">
              <text>打分</text>
              <image v-for="(ite,index) in 5" :key="index"
              :src="nav.score>index?'http://www.mingtongxa.com/wanzhuan/kouwei.png':'http://www.mingtongxa.com/wanzhuan/nokouwei.png'"
                mode="widthFix"
              ></image>
            </view>
            <view class="pingCon">
              <view
                >{{nav.content}}</view
              >
              <view class="pingImg" v-if="nav.imgUrl!='' || nav.videoUrl!=''">
                  <view v-if="nav.imgUrl">
                    <image v-if="/^http/.test(nav.imgUrl)"
                    :src="nav.imgUrl"
                    mode="widthFix"
                    >
                    <image v-else
                    :src="IMG_BEFORE_URL+nav.imgUrl"
                    mode="widthFix"
                    >
                </view>
                <view v-if="nav.videoUrl">
                <video
                   id="videos"
                   object-fit="fill" 
                   :show-center-play-btn="false" 
                   :controls="true" 
                   @fullscreenchange="fullscreenchange"
                  :src="IMG_BEFORE_URL+nav.videoUrl"
                  mode="widthFix"
                />
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
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar,
  },
  data() {
    return {
      shopId: null,
      shopComList:null,
      IMG_BEFORE_URL
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
    this.shopId = opt.shopId;
    this.getComList()
  },
  methods: {
    getComList() {
      uni.showLoading();
      let sendData = {
        shopId: this.shopId,
      };
      this.$api.getComentList(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
            this.shopComList = res.data
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
    fullscreenchange(e) {
	    if (!e.detail.fullScreen) {
		    this.videoContext.pause()
	    }
    }
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .pinglunT {
      width: 100%;
      // height: 300upx;
      padding-bottom: 30upx;
      &:last-child{
        padding-bottom: 150upx;
      }
      .pinTitle {
        width: 100%;
        height: 80upx;
        padding: 0 50upx;
        display: flex;
        align-items: center;
        image {
          width: 60upx;
          border-radius: 50%;
        }
        text {
          font-size: 28upx;
          color: rgb(70, 92, 109);
          padding-left: 20upx;
        }
      }
      .fabu {
        padding: 0 20upx 10upx 100upx;
        font-size: 28upx;
        color: #7e7e7e;
      }
      .dafen {
        padding: 0 20upx 10upx 100upx;
        width: 100%;
        height: 50upx;
        display: flex;
        align-items: center;
        image {
          width: 30upx;
          margin-left: 4upx;
          &:nth-child(1) {
            margin-left: 10upx;
          }
        }
      }
      .pingCon {
        width: 100%;
        padding: 0 20upx 10upx 100upx;
        display: flex;
        flex-direction: column;
        view {
          font-size: 28upx;
          color: #000;
          padding: 5upx 0;
        }
        .pingImg {
          padding-top: 15upx;
          display: flex;
          align-items: center;
          image {
            margin-left: 10upx;
            width: 120upx;
            height: 120upx !important;
            &:nth-child(1) {
              margin: 0;
            }
          }
          #videos{
              margin-left: 10upx;
            width: 120upx;
            height: 120upx !important;
          }
        }
      }
    }
}
</style>
