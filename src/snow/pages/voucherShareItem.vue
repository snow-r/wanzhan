<template>
  <view class="msgcell">
    <view style="width: 100%; height: 150px" class="back">
      <image
        src="../../static/images/v-share-b.png"
        style="width: 100%; height: 100%"
        mode="widthFix"
      ></image>
    </view>

    <view style="width: 60%; height: 150px" class="back">
      <image
        src="../../static/images/v-share-b1.png"
        style="width: 100%; height: 100%; margin-left: 10px"
        mode="heightFix"
      ></image>
    </view>

    <view class="top">
      <text style="font: bolder; font-size: 19px; margin-right: auto">{{
        value.name
      }}</text>

        <view
          style="
            margin-left: auto;
            width: 100px;
            height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
        >
        <!-- <button open-type="share" style="btn"> -->
          <image
            src="../../static/images/v-share-btn.png"
            style="
              width: 100px;
              height: 20px;
              position: absolute;
              margin-left: 0px;
              padding-right: 25px;
              z-index: -1;
            "
            mode="widthFix"
          ></image>
        <!-- </button> -->
          

          <view
            style="
              width: 100px;
              height: 20px;
              display: flex;
              justify-content: center;
            "
          >
            <image
              src="../../static/images/v-share-item.png"
              style="width: 20px; height: 20px"
              mode="heightFix"
            />
            <view style="padding-left: 5px"> 分享 </view>
          </view>
        </view>
    </view>

    <view
      style="
        font: bold;
        font-size: 16px;
        margin-top: auto;
        margin-bottom: 5px;
        margin-left: 25px;
      "
    >
      <view>四川火锅店</view>
      <view>科技二路与地铁口</view>
    </view>
  </view>
</template>



<script>
export default {
  name: "messageCell",
  props: { value: Object },
  data() {
    return {
      list: [],
    };
  },
  methods: {},
  onShareAppMessage(res) {
    if (res.from == "button") {
    }
    return {
      title: `好友送你1张80元代金券`,
      path:
        "/pages/index/index?myId=" +
        userId +
        "&composId=" +
        comsId +
        "&ids=" +
        id,
      imageUrl: "http://www.mingtongxa.com/xcx/shareOmg.png",
    };
  },
  mounted() {},
};
</script>




<style scoped>
.msgcell {
  margin: 15px;
  height: 150px;
  display: flex;
  flex-direction: column;
}

.back {
  position: absolute;
  margin-left: 0px;
  padding-right: 25px;
  height: 150px;
  z-index: -1;
}

.top {
  /* margin-left: 20px; */
  /* margin-right: 10px; */
  padding-left: 25px;
  padding-top: 15px;
  padding-right: 10px;
  height: 100px;
  /* text-align: left; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
}

/* .btn{
  border: 0;
} */
</style>



