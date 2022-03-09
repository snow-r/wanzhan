<template>
  <view class="msgcell">
    <view style="width: 100%; height: 100px" class="back">
      <image src="../../static/images/store_msg.png" style="width: 100%; height: 100%"></image>
    </view>
    <view class="left">
      <image :src="value.imgUrl" style="width: 60px" mode="widthFix" />
    </view>
    <view class="right">
      <view class="row">
        <view style="font-weight: bolder;">{{value.title}}</view>
          <view class="item-row" style="color:lightgray;">{{data.createTime}}</view>
      </view>
      <view class="row">
        <view  style="color:lightgray;">{{value.content}}</view>
        <view v-if="value.hasRead == '0'" class="circle,item-row"></view>
      </view>
    </view>
  </view>
</template>



<script>
export default {
  name: "messageCell",
  props: { value:Object },
  data() {
    return {
      src: "",
    };
  },
  computed: {
  },
  mounted() {
  },
};
</script>




<style scoped>
.msgcell {
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

.right {
  margin-left: 80px;
  height: 100px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row{
    display: flex;
    flex-direction: row;
    margin-right: 5px;
    align-items: center;
}

.item-row{
    margin-left: auto;
    text-align: center;
}

.circle{
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



