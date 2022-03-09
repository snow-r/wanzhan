<template>
       
    <!-- <item v-if="type=='1'"></item> -->
    <item :value="value"></item>

  <!-- <view v-else class="msgcell">
    <view style="width: 100%; height: 100px" class="back">
      <image
        src="../../static/images/store_msg.png"
        style="width: 100%; height: 100%"
      ></image>
    </view>
    <view class="left">
      <image
        src="../../static/images/msg_0.png"
        style="width: 60px"
        mode="widthFix"
      />
    </view>

    <view class="center">
      <view class="row">
        <view class="richtext">
             <blue>dpuser.2312、哎呦… </blue>等2人赞了你的评论
        </view>
      </view>
      <view class="row">
        <view style="color: lightgray">22/01/21/</view>
      </view>
    </view>


    <view class="itemRight">
      <image
        src="../../static/images/msg_0.png"
        style="width: 60px"
        mode="widthFix"
      />
    </view>
  </view> -->
</template>



<script>
import item from "../pages/store_msg_item.vue";
export default {
  name: "messageCell",
  props: { value: Object }, // 0 点赞消息  1 会话消息
  components: {
    item
  },
  data() {
    return {
      src: "",
    };
  },
  computed: {},
  mounted() {
    console.log("data ---- ",value);
  },
};
</script>




<style scoped>
.msgcell {
    display: flex;
    width: 100%; 
    height: 100px;
    margin: 15px;
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
}

.center{
    height: 100px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.itemRight {
    margin-left: auto;
    width: 80px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
}


.richtext{
    color: black;
    /* font-weight: bolder */
}


.richtext blue{
    color: #2BAEC7;
}
/* .row {
  display: flex;
  flex-direction: row;
  
}

.item-row {
  margin-left: auto;
  margin-right: 10px;
  text-align: center;
} */

/* .circle {
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 100%;
  background: red;
  text-align: center;
  align-content: center;
  margin-right: 10px;
  color: white;
  font-size: 12px;
} */
</style>



