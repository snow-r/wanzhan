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
      barTitle="服务项目列表"
      :backType="'fanhui'"
      :shopId = shopId
      :categoryId = categoryId
      :isfan="false"
      :isJia='false'
      :isJiaCai='false'
    />
    <view :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <scroll-view scroll-y class="pageContainer">
          <view class="content">
          <view class="contCon" :style="index%2 != 0 ? 'margin-left:0' : ''" v-for="(item,index) in goodsList" :key="index" @click="gotoChange(item)">
              <view class="huodongbb">
                
                <view class="bbno3">
                  <image
                    src="http://www.mingtongxa.com/wanzhuan/shopIcons.png"
                    mode="widthFix"
                  ></image
                  ><text>{{item.name}}</text>
                </view>
                <view class="bbno2"></view>
              </view>
              <image v-if="/^http/.test(item.imgUrl)" class="orders"
                :src="item.imgUrl"
                mode="widthFix"
              ></image>
              <image v-else  class="orders"
                :src="IMG_BEFORE_URL+item.imgUrl"
                mode="widthFix"
              ></image>
            </view>
            </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
import { IMG_BEFORE_URL } from "@/utils/app-config";
export default {
  components: {
    TopBar
  },
  data () {
    return {
        IMG_BEFORE_URL,
        categoryId:null,
        shopId:null,
        goodsList:null
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    }
  },
  onLoad (opt) {
      this.shopId = opt.id
      this.getShop()
  },
  onShow() {
      this.getShop()
  },
  methods: {
      getShop() {
      uni.showLoading();
      let sendData = {
        id: this.shopId,
      };
      this.$api.getShopDetail(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
            this.goodsList = res.data.goodsList
            this.categoryId = res.data.categoryId
        }
      });
    },
    gotoChange(item){
        uni.navigateTo({
          url: "/nopages/pages/changeCaipin?items=" + JSON.stringify(item),
        });
    }
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  font-size: 28upx;
  width: 100%;
  height: 100%;
  .content{
      display: flex;
      flex-wrap: wrap;
  }
  .contCon {
      margin: 10upx 25upx;
      position: relative;
      width: 45%;
      height: 360upx;
      border-radius: 15upx;
      overflow: hidden;
      .orders{
          width: 100%;
          height: 360upx !important;
      }
      .huodongtt {
        position: absolute;
        width: 160upx;
        height: 50upx;
        background: rgb(251, 13, 22);
        top: 0;
        right: 0;
        border-radius: 0 0 0 15upx;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 30upx;
        }
        text {
          font-size: 22upx;
          color: #fff;
          padding-left: 8upx;
        }
      }
      .huodongbb {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10upx;
        width: 100%;
        // height: 90upx;
        .bbno1 {
          color: #fff;
          font-size: 28upx;
        }
        .bbno2 {
          color: #fff;
          font-size: 22upx;
          padding: 8upx 0;
        }
        .bbno3 {
          display: flex;
          align-items: center;
          image {
            width: 30upx !important;
            height: 30upx !important;
          }
          text {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 24upx;
            font-weight: bold;
            color: #fff;
            padding-left: 10upx;
          }
        }
      }
      image {
        width: 100%;
      }
    }
}
</style>