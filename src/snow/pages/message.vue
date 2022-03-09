<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="消息"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view @click="push(0)">
          <cell :type="0" :content="list[0]" :value="items[0]"></cell>
        </view>

        <view @click="push(1)">
          <cell :type="1" :content="list[1]" :value="items[1]"></cell>
        </view>
        
        <view @click="push(2)">
          <cell :type="2" :content="list[2]" :value="items[2]"></cell>
        </view>

        <view @click="push(3)">
          <cell :type="3" :content="list[3]" :value="items[3]"></cell>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import cell from "../pages/messgaeCell.vue";
// import publishDialogVue from '../../components/publishDialog.vue';
export default {
  components: {
    TopBar,
    cell,
  },
  data() {
    return {
      list:[
        "您喜欢的店铺上新了~~",
        "您有条新的信息通知哟！",
        "有人找你发信息了~~",
        "订单消息~"
      ],
      items:[{},{},{},{}], // 取出数组的第一个元素
      listData:[[],[],[],[]] // 全部数据
    };
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    },
  },
  onLoad() {},
  mounted() {
    this.getlist()
  },
  methods: {
    push(type) {
      let paths = [
        "/snow/pages/store_msg",
        "/snow/pages/notify_msg",
        "/snow/pages/interact_msg",
      ];
      let data_str = JSON.stringify(this.listData[type])
      uni.navigateTo({
        url: paths[type]+'?data='+data_str,
      });
    },
    getlist(){
      this.$api.snow.getMessageList().then((res) => {
        let dic = res.data
        if(dic.list1.length > 0){
          this.list[0] = dic.list1[0].content
          this.items[0] = dic.list1[0]
          this.listData[0] = dic.list1
        }
        if(dic.list2.length > 0){
          this.list[1] = dic.list2[0].content
          this.items[1] = dic.list2[0]
          this.listData[1] = dic.list2
        }
        if(dic.list3.length > 0){
          this.list[2] = dic.list3[0].content
          this.items[2] = dic.list3[0]
          this.listData[2] = dic.list3
        }
        if(dic.list4.length > 0){
          this.list[3] = dic.list4[0].content
          this.items[3] = dic.list4[0]
          this.listData[3] = dic.list4
        }
        console.log('this.data === ',this.data);
        this.$set(this.list)
        this.$set(this.items)        
        this.$set(this.listData)
      })
    }
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 100%;
  height: 100%;
}
</style>