<template>
  <Mask flex="end" @closeMask="close">
    <view class="modalWrap" @click.stop="">
      <view class="publishListWrap">
        <view class="typeItem" v-for="(item, iIndex) of publishType" :key="iIndex" @click.stop="toPublish(item.type)">
          <image class="typeIcon" :src="item.icon" />
          <view class="typeName">{{item.name}}</view>
        </view>
      </view>
      <image class="closeIcon" src="/static/images/closeIcon.png" mode="widthFix" @click="close" />
    </view>
  </Mask>
</template>

<script>
import { IMG_BEFORE_URL } from "@/utils/app-config";
import Mask from "@/components/mask";
export default {
  components: {
    Mask,
  },
  computed: {},
  data() {
    return {
      IMG_BEFORE_URL,
      publishType: [
        {
          name: '踩盘信息',
          icon: '../static/images/publish_camera.png',
          type: 1
        },
        {
          name: '我要提问',
          icon: '../static/images/publish_question.png',
          type: 2
        },
        {
          name: '资讯投稿',
          icon: '../static/images/publish_news.png',
          type: 3
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit("close");
    },
    cancel () {
      this.$emit("cancel");
    },
    toExercise () {
      this.$emit("toExercise");
    },
    toPublish (type) {
      this.$emit('close')
      uni.navigateTo({
        url: `/pages/pages/publish?type=${type}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.modalWrap{
  position: relative;
  width: 100%;
  background: #fff;
  padding: 100upx 94upx 80upx;
  border-radius: 20upx 20upx 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .publishListWrap{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .typeItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      .typeIcon{
        width: 86upx;
        height: 86upx;
      }
      .typeName{
        font-size: 28upx;
      }
    }
  }
  .closeIcon{
    width: 48upx;
    height: 48upx;
    margin-top: 120upx;
  }
}
</style>