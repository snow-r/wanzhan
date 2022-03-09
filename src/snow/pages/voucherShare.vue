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
      barTitle="代金券分享"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <scroll-view scroll-y class="pageContainer">
        <view v-for="(value,index) in list" :key="index">
            <item :value="value"></item>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
import item from "../pages/voucherShareItem.vue"
export default {
  components: {
    TopBar,
    item
  },
  data () {
    return {
      list:[]
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
  mounted(){
      this.getlist()
  },
  onLoad () {
  },
  methods: {
    // 查询可分享优惠券列表
    getlist(){
        let code = uni.getStorageSync("quhao");
        this.$api.snow.shareVoucherList(code).then((res) => {
            this.list = res.data
            console.log(this.list);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  font-size: 28upx;
  width: 100%;
  height: 100%;
}
</style>