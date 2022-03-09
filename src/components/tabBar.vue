<template>
  <view :class="['tabContainer topBorder', isIpx?'ipxBar':'']" :style="'background:'+currentBgColor">
    <view v-for="(tab, tIndex) of tabList" :key="tIndex" class="tabItem" :style="'width:calc(100% / '+tabList.length+')'" @click="tabChange(tab, tIndex)">
        <view :class="['tabIconWrap',current==tIndex?'upAndDown':'']">
          <image :src='tab.selectIcon' v-if="current === tIndex" class="tabIcon" />
          <image :src='tab.icon' class="tabIcon" v-if="current != tIndex" />
          <!-- <image
          v-if="msgNum>0 && tIndex == 2"
          class="xiaoxidian"
            src="@/static/images/xiaoxidian.png"
          /> -->
        </view>
      <text :style="current == tIndex?'color:#E10101':'color:#000'">{{tab.name}}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: {
      default: 0
    },
    msgNum:{
      default:0
    }
  },
  data () {
    return {
      currentBgColor: '#fff',
      tabList: [
        {
          name: '美食',
          selectIcon: 'http://www.mingtongxa.com/wanzhuan/shouyeon.png',
          icon: 'http://www.mingtongxa.com/wanzhuan/shouyeoff.png'
        },
        {
          name: '休闲',
          selectIcon: 'http://www.mingtongxa.com/wanzhuan/xiuxianon.png',
          icon: 'http://www.mingtongxa.com/wanzhuan/xiuxianoff.png'
        },
        {
          name: '购物',
          selectIcon: 'http://www.mingtongxa.com/wanzhuan/gouwuon.png',
          icon: 'http://www.mingtongxa.com/wanzhuan/gouwuoff.png'
        },
        {
          name: '我的',
          selectIcon: 'http://www.mingtongxa.com/wanzhuan/mingon.png',
          icon: 'http://www.mingtongxa.com/wanzhuan/mineoff.png'
        }
      ]
    }
  },
  mounted () {
  },
  computed: {
    isIpx () {
      return this.$isIpx
    }
  },
  methods: {
    tabChange (tab, idx) {
      if (!tab.background) tab.background = '#fff'
      this.currentBgColor = tab.background
      this.$emit('tabChange', idx)
    }
  }
}
</script>

<style lang="less" scoped>
.tabContainer{
  display: flex;
  align-items: center;
  height: 100upx;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  box-sizing: content-box;
}
.xiaoxidian{
  position: absolute;
  top: -30upx;
  width: 75upx;
  height: 75upx;
  left: 10upx;
}
.tabItem{
  font-size: 24upx;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: bold;
  .circleButton{
    position: absolute;
    top: -36upx;
    left: calc(50% - 50upx);
    width: 100upx;
    height: 100upx;
    border-radius: 50upx;
    background: #fff;
    border-top: 2upx solid #EFEFF4;
    display: flex;
    align-items: center;
    justify-content: center;
    .redPacketImg{
      width: 80upx;
      height: 80upx;
    }
  }
}
.tabIconWrap{
  position: relative;
}
.tabIcon{
  width: 44upx;
  height: 44upx;
  margin-bottom: 10upx;
  position: relative;
}

.hidden{
  opacity: 0;
}
.ipxBar{
  padding-bottom: 60upx;
}
.topBorder{
  border-top: 2upx solid #f0f0f0;
}
.noBorder{
  border-top: 2upx solid transparent;
}
.upAndDown{
  animation: myUpAndDown .8s 1 ease-out;
}
.shake{
  animation: myShake .5s 1;
}
@keyframes myShake {
  0%{
    transform: rotate(0deg);
  }
  20%{
    transform: rotate(30deg);
  }
  40%{
    transform: rotate(-30deg);
  }
  60%{
    transform: rotate(20deg);
  }
  80%{
    transform: rotate(-20deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
@keyframes myUpAndDown {
  0%{
    top: 0;
  }
  20%{
    top: -20upx;
  }
  40%{
    top: 0;
  }
  60%{
    top: -10upx;
  }
  80%{
    top: 0;
  }
}
</style>