<template>
  <view class="itemWrap" :style="border?'border:2rpx solid #f5f5f5':''" @click="itemClick">
    <view class="itemLabel">{{label}}</view>
    <view class="itemContent">
      <text>{{content}}</text>
      <image src="@/static/images/toright.png" mode="widthFix" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    border: {
      default: false
    },
    label: {
      default: ''
    },
    content: {
      default: ''
    },
    pageUrl: {
      default: ''
    },
    content: {
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    itemClick () {
      this.$emit('itemClick')
    }
  }
}
</script>

<style lang="less" scoped>
.itemWrap{
  padding: 0 30upx;
  height: 100upx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .itemLabel{
    font-size: 30upx;
  }
  .itemContent{
    color: #999;
    display: flex;
    align-items: center;
    image{
      width: 40upx;
      margin-left: 10upx;
    }
  }
}
</style>