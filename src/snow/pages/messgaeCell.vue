<template>
  <view class="msgcell">
    <view style="width: 100%; height: 100px" class="back">
      <image :src="src" style="width: 100%; height: 100%"></image>
    </view>
    <view class="left">
      <image v-bind:src="imgSrc" style="width: 60px" mode="widthFix" />
    </view>
    <view class="right">
      <text style="font: bold; font-size: 18px">{{ value.title }}</text>
      <text style="color: darkgrey">{{ content }}</text>
    </view>
   <view  v-if="value.hasRead == '0'" class="circle"></view>
  </view>
</template>



<script>
export default {
  name: "messageCell",
  props: { type: String,content:String, value: Object }, // 0 店铺  1 消息通知  2互动
  data() {
    return {
      titles: ["店铺上新", "消息通知", "互动消息","订单消息"],
      back: [
        "../../static/images/msg_b_0.png",
        "../../static/images/msg_b_1.png",
        "../../static/images/msg_b_2.png",
        "../../static/images/msg_b_2.png",
      ],
      src: "",
    };
  },
  computed: {
    imgSrc() {
      return "../../static/images/msg_" + this.type + ".png";
    },
    title() {
      return this.titles[this.type];
    },
    // msg() {
    //   return this.msgs[this.type];
    // }
  },
  mounted() {
    this.src = this.back[this.type];
  },
};
</script>




<style scoped>
.msgcell {
  margin: 15px;
  display: flex;
  align-items: center;
}

.back {
  position: absolute;
  margin-left: 0px;
  padding-right: 25px;
  height: 100px;
  z-index: -1;
}

.left {
  width: 80px;
  height: 100px;
  float: left;
  display: table;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
}

.right {
  margin-left: 10px;
  margin-right: 10px;
  height: 100px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.circle {
  
  margin-left: auto;
  min-width: 15px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 100%;
  background: red;
  text-align: center;
  align-content: center;
  margin-right: 10px;
  color: white;
  font-size: 12px;

  
}
</style>



