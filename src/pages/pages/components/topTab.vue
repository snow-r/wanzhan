<template>
  <view class="tabWrap">
    <view class="tabItem" v-for="(tab, tIndex) of tabs" :key="tIndex" :style="currentTabIndex == tIndex?'font-weight:bold;':''" @click="tabChange(tIndex)">
      <view>{{tab.name}}</view>
    </view>
    <view class="activeFlag" :style="'left:calc(25% + 50% * '+ currentTabIndex +' - 16rpx)'"></view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      default: []
    }
  },
  data () {
    return {
      currentTabIndex: 0
    }
  },
  methods: {
    tabChange (idx) {
      this.currentTabIndex = idx
      this.$emit('tabChange', idx)
    }
  }
}
</script>

<style lang="less" scoped>
  .tabWrap{
    height: 100upx;
    box-shadow: 0 5upx 10upx #eee;
    display: flex;
    align-items: center;
    position: relative;
    .tabItem{
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .activeFlag{
      width: 32upx;
      height: 5upx;
      position: absolute;
      bottom: 20upx;
      background: #057AC1;
      transition: 300ms;
    }
  }
</style>