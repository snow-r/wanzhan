<template>
  <view :class="['maskWrap',flex,animated?'animated':'']" @click="closeMask" @touchMove="false" :style="'padding-top:'+navHeight+'px;background: rgba(0, 0, 0, '+opacity+')'">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    animated: {
      default: false
    },
    flex: {
      default: 'center'
    },
    opacity: {
      default: 0.5
    }
  },
  data () {
    return {}
  },
  computed: {
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  methods: {
    closeMask () {
      this.$emit('closeMask')
    }
  }
}
</script>

<style lang="less" scoped>
  .maskWrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .center{
    justify-content: center;
    padding-bottom: 200upx;
  }
  .start{
    justify-content: flex-start;
  }
  .end{
    justify-content: flex-end;
  }
  .animated{
    animation: toBig 1s linear  1;
  }
  @keyframes toBig {
    0%{
      top: 0!important;
      transform: scale(0);
    }
    50%{
      top: 200upx!important;
      transform: scale(0.5);
    }
    100%{
      top: 0!important;
      transform: scale(1);
    }
  }
</style>