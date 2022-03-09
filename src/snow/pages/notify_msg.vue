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
      barTitle="消息通知"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <scroll-view scroll-y class="pageContainer">
          <item v-for="(value,index) in list" :key="index" :value="value"></item>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
import item from '../pages/notify_msg_item.vue'
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
  onLoad (options) {
      this.list = JSON.parse(options.data);
  },
  methods: {
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