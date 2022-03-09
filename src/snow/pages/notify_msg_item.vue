<template>
  <view class="msgcell">
    <view style="width: 100%; height: 100px" class="back">
      <image src="../../static/images/store_msg.png" style="width: 100%; height: 100%"></image>
    </view>
    <view style="font-weight: bolder;margin: 10px;padding-top:10px">
        {{value.content}}}
    </view>

    <view style="color:#A7A7A7;margin-left: auto;text-align: right;padding-right:10px;margin-top: auto;padding-bottom:10px">
      {{value.createTime}}
    </view>
  </view>
</template>



<script>
export default {
  name: "messageCell",
  props: {value:Object},
  data() {
    return {
      list:[]
    };
  },
  computed: {
  },
  mounted() {
  }
};
</script>




<style scoped>
.msgcell {
  margin: 15px;
  height: 100px;
  display: flex;
  flex-direction: column;
}

.back {
  position: absolute;
  margin-left: 0px;
  padding-right: 25px;
  height: 100px;
  z-index: -1;
}
</style>



