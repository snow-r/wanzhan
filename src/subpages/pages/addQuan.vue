<!-- 通用页面模板
  适用于非主页（无底部导航栏页面）
  已做苹果X系列刘海屏及底部高度适配
  使用需修改组件路径
-->
<template>
  <view>
    <TopBar
      background="#fff"
      :back="true"
      barTitle="添加代金券"
      :backType="'fanhui'"
      :isfan="false"
    />
    <view
      :class="isIpx ? 'xPage' : 'normalPage'"
      :style="'padding-top:' + navHeight + 'px'"
    >
      <scroll-view scroll-y class="pageContainer">
        <view class="header">
          <input
            class="headno"
            v-model="zhifuPrice"
            placeholder-style="color:#DB0000;"
            placeholder="支付价"
            type="number"
          />
          <text>元代</text>
          <input
            class="headno"
            v-model="yuanjia"
            placeholder-style="color:#DB0000;"
            placeholder="原价"
            type="number"
          />
          <text>元券</text>
        </view>
        <view class="address">
          <view class="addressLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai1.png"
              mode="widthFix"
            ></image>
            <text>开始使用时间</text>
          </view>
          <view class="addressRight">
            <picker class="changeTime"
                mode="date"
                :value="date"
                fields="day"
                :start="startDate"
                :end="endDate"
                @change="changeTime"
              >
                <text style="color:#000000;font-weight:600" v-if="time==''">请选择开始使用时间</text>
                <text style="color:#000000;font-weight:600" v-else>{{ time }}</text>
              </picker>
          </view>
        </view>
        <view class="address">
          <view class="addressLeft">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai2.png"
              mode="widthFix"
            ></image>
            <text>结束使用时间</text>
          </view>
          <view class="addressRight">
            <picker class="changeTime"
                mode="date"
                :value="date"
                fields="day"
                :start="startDate"
                :end="endDate"
                @change="changeTimes"
                
              >
                <text style="color:#000000;font-weight:600" v-if="times==''">请选择结束使用时间</text>
                <text style="color:#000000;font-weight:600" v-else>{{ times }}</text>
              </picker>
          </view>
        </view>
        <view class="changeDate">
          <view class="changHead">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai3.png"
              mode="widthFix"
            ></image>
            <text>选择使用日期</text>
          </view>
          <view class="changeD">
            <view
              :class="item.current ? 'active' : ''"
              v-for="(item, index) in tagsList"
              :key="index"
              ><text @click="addorNm(item)">{{ item.name }}</text></view
            >
          </view>
          <view class="xmTime">
            <view>营业时间：</view>
            <input type="text" v-model="startTime" placeholder="开始营业时间" />
            <text>~</text>
            <input type="text" v-model="endTime" placeholder="打烊时间" />
          </view>
          <view class="faNum">
            <view class="faNumLeft">
              <image
                src="http://www.mingtongxa.com/wanzhuan/dai4.png"
                mode="widthFix"
              ></image>
              <text>发布数量</text>
            </view>
            <view class="faNumRight">
              <input
                class="faNumno"
                v-model="number"
                placeholder-style="color:#DB0000;"
                placeholder="1"
                type="number"
              />
              <text>张</text>
            </view>
          </view>
        </view>

        <view class="ruler">
          <view class="rulerin"
            ><view><text>不可使用时间</text> </view>
            <picker @change="bindPickerChange" :value="index" :range="noKeyong">
              <input
                type="text"
                v-model="bukeshiyong"
                placeholder="请选择不可使用时间"
                disabled
              />
            </picker>
          </view>
          <view class="rulerin"
            ><view><text>使用范围</text></view>
            <picker
              @change="bindPickerChanges"
              :value="index"
              :range="keyongfw"
            >
              <input
                type="text"
                v-model="shiyongfw"
                placeholder="请选择使用范围"
                disabled
              />
            </picker>
          </view>
          <view class="rulerHead">
            <image
              src="http://www.mingtongxa.com/wanzhuan/dai5.png"
              mode="widthFix"
            ></image>
            <text>使用规则说明</text>
          </view>
          <popupCheckbox
            ref="popupCheckbox"
            title="使用规则说明"
            :value="checkList"
            v-model="checkList"
            @submit="submit"
          ></popupCheckbox>
          <view class="rulerText" @click="changeOr()">
            <textarea
              name=""
              id=""
              placeholder="点击选择规则说明"
              v-model="rulerList"
              disabled
              placeholder-style="color:#8F8F8F;"
            ></textarea>
          </view>
          <view class="orsfga" @click="clearRule()">清空</view>
        </view>
        <view class="btns">
          <view class="btnOn" @click="gotoAdd()">确认完成</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/topBar";
import DatePicker from "../components/datePicker.vue";
import PopupCheckbox from "../components/popupCheckbox.vue";
export default {
  components: {
    TopBar,
    DatePicker,
    PopupCheckbox,
  },
  data() {
    return {
      time: "", //开始时间
      times: "", //结束时间
      zhifuPrice: "",
      yuanjia: "",
      shopId: null,
      status: null,
      noFanweiStatus: "",
      fanweiStatus: "",
      guizeStatus: "",
      tagsList: [
        {
          name: "周一",
          num: 1,
          current: false,
        },
        {
          name: "周二",
          num: 2,
          current: false,
        },
        {
          name: "周三",
          num: 3,
          current: false,
        },
        {
          name: "周四",
          num: 4,
          current: false,
        },
        {
          name: "周五",
          num: 5,
          current: false,
        },
        {
          name: "周六",
          num: 6,
          current: false,
        },
        {
          name: "周日",
          num: 7,
          current: false,
        },
      ],
      startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
      checkList: [],
      keyongfw: [],
      noKeyong: [],
      useShiyongS:[],  //使用日期数组
      startTime: "", //营业开始时间
      endTime: "", //营业结束时间
      shiyongRiqi: "", //使用日期
      number: null, //发布数量
      bukeshiyong: "", //不可使用范围
      shiyongfw: "", //使用范围
      rulerList: "", //使用规则
      daytypeOptions: [],
      useTimeShow: '',
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
  onLoad(opt) {
    this.shopId = opt.id;
    this.status = opt.status;

    this.noFanweiStatus = `tb_voucher_${this.status}_notusable`;
    this.fanweiStatus = `tb_voucher_${this.status}_usescope`;
    this.guizeStatus = `tb_voucher_${this.status}_userule`;
    this.getGuizeList(this.noFanweiStatus);
    this.getGuizeLists(this.fanweiStatus);
    this.getGuizeListss(this.guizeStatus);
    this.getDateList();
  },
  methods: {
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      // day = day > 9 ? day : '0' + day;
      return `${year}-${month}`;
    },
     changeTime(dates, ff, ll) {
      this.time = dates.target.value;
    },
    changeTimes(dates) {
      this.times = dates.target.value;
    },
    clearRule() {
      this.rulerList = "";
      this.checkList.map((item) => {
        item.select = false;
      });
    },
    addorNm(item) {
      item.current = !item.current;
      let tuijianList = [];
      this.tagsList.forEach((ite) => {
        if (ite.current) {
          tuijianList.push(ite.num);
        }
      });
      this.useShiyongS = tuijianList
      this.shiyongRiqi = tuijianList.join(",");
      console.log(this.shiyongRiqi,'98999')
      this.userShowDates();
    },
    submit(e) {
      let drr = [];
      if (e.length > 0) {
        e.map((item) => {
          drr.push(item.name);
        });
      }
      this.rulerList = drr.join(",");
    },
    changeOr() {
      this.$refs.popupCheckbox.open();
    },
    getGuizeList(id) {
      uni.showLoading();
      let sendData = {
        ids: id,
      };
      this.$api.getZidianStatus(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          let arr = [];
          res.data.map((item) => {
            arr.push(item.dictLabel);
          });
          this.noKeyong = arr;
        }
      });
    },
    getGuizeLists(id) {
      uni.showLoading();
      let sendData = {
        ids: id,
      };
      this.$api.getZidianStatus(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          let crr = [];
          res.data.map((item) => {
            crr.push(item.dictLabel);
          });
          this.keyongfw = crr;
        }
      });
    },
    getGuizeListss(id) {
      uni.showLoading();
      let sendData = {
        ids: id,
      };
      this.$api.getZidianStatus(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          let brr = [];
          res.data.map((item) => {
            brr.push({
              name: item.dictLabel,
              select: false,
            });
          });
          this.checkList = brr;
        }
      });
    },
    getDateList() {
      uni.showLoading();
      let sendData = {
        ids: "tb_coupon_daytype",
      };
      this.$api.getZidianStatus(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.daytypeOptions = res.data;
        }
      });
    },
    userShowDates() {
      if (this.useShiyongS) {
        let useDayss = [...this.useShiyongS];
        useDayss.sort();
        console.log(useDayss,'5555555')
        if (
          useDayss.length > 1 &&
          useDayss.length == useDayss[useDayss.length - 1] - useDayss[0] + 1
        ) {
          this.useTimeShow =
            // this.beginTime +
            // "~" +
            // this.endTime +
            // "," +
            this.daytypeOptions.find((a) => a.dictValue == useDayss[0]).dictLabel + "至" + this.daytypeOptions.find((a) => a.dictValue == useDayss[useDayss.length - 1]).dictLabel;
            console.log(this.useTimeShow, "65566");
        } else {
          this.useTimeShow =
            // this.beginTime +
            // "~" +
            // this.endTime +
            // "," +
            useDayss
              .map(
                (b) =>
                  this.daytypeOptions.find((a) => a.dictValue == b).dictLabel
              )
              .join(",");
              console.log(this.useTimeShow, "65566");
        }
        
      }
    },
    bindPickerChange(e) {
      this.bukeshiyong = this.noKeyong[e.detail.value];
    },
    bindPickerChanges(e) {
      this.shiyongfw = this.keyongfw[e.detail.value];
    },
    gotoAdd() {
      if (!this.zhifuPrice) {
        uni.showToast({
          title: "支付价格不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.yuanjia) {
        uni.showToast({
          title: "代金券原价不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.time) {
        uni.showToast({
          title: "开始时间不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.times) {
        uni.showToast({
          title: "结束时间不能为空！",
          icon: "none",
        });
        return;
      }

      if (!this.shiyongRiqi) {
        uni.showToast({
          title: "使用日期不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.startTime) {
        uni.showToast({
          title: "营业时间不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.endTime) {
        uni.showToast({
          title: "打烊时间不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.bukeshiyong) {
        uni.showToast({
          title: "不可使用时间不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.shiyongfw) {
        uni.showToast({
          title: "使用范围不能为空！",
          icon: "none",
        });
        return;
      }
      if (!this.rulerList) {
        uni.showToast({
          title: "使用规则不能为空！",
          icon: "none",
        });
        return;
      }
      uni.showLoading();
      let sendData = {
        name: `${this.zhifuPrice}元代${this.yuanjia}元券`,
        amount: this.yuanjia,
        price: this.zhifuPrice,
        startTime: this.time,
        endTime: this.times,
        useTimeRule: `${this.startTime},${this.endTime}`,
        useDayRule: this.shiyongRiqi,
        total: this.number,
        type: 1, //类型 代金券，或团购
        useScope: this.shiyongfw,
        useRule: this.rulerList,
        notUsable: this.bukeshiyong,
        shopId: this.shopId,
        useTimeShow:`${this.startTime}-${this.endTime},${this.useTimeShow}`
      };
      this.$api.shopAddQuan(sendData).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            title: "添加成功",
            duration: 1000,
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          this.$comfun.Toast(res.msg, "none");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  font-size: 28upx;
  width: 96%;
  margin: 0 2%;
  height: 100%;
  .header {
    width: 100%;
    margin: 40upx 0;
    height: 100upx;
    display: flex;
    align-items: center;
    border-bottom: 2upx dashed #707070;
    text {
      padding: 0 25upx;
      font-size: 28upx;
      font-weight: 600;
      color: #000;
    }
    .headno {
      width: 150upx;
      height: 60upx;
      border-radius: 10upx;
      border: 3upx solid #000;
      font-size: 24upx;
      font-weight: 600;
      color: #db0000;
      text-align: center;
    }
  }
  .address {
    margin-top: 20upx;
    width: 100%;
    height: 80upx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .addressLeft {
      width: 250upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .addressRight {
      font-size: 28upx;
      width: 350upx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      picker {
        width: 300upx;
        height: 60upx;
        border: 3upx solid #000;
      }
      .changeTime {
        display: flex;
        align-items: center;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
      }
      .changeTimes {
        display: flex;
        align-items: center;
        padding: 10upx 0;
        margin-top: 10upx;
        margin-right: 20upx;
        border: 3upx solid #000;
        justify-content: center;
        border-radius: 10upx;
        font-weight: bold;
        font-size: 28upx;
      }
      text {
        font-size: 28upx;
        color: #db0000;
        font-weight: bold;
      }
      image {
        width: 45upx;
        height: 45upx;
      }
    }
  }
  .changeDate {
    width: 100%;
    margin-top: 20upx;
    padding: 50upx 0 10upx 0;
    border-top: 2upx solid #707070;
    .changHead {
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .xmTime {
      font-size: 24upx;
      color: #000;
      font-weight: bold;
      display: flex;
      align-items: center;
      padding-left: 20upx;
      text {
        padding: 0 10upx;
      }
      input {
        width: 160upx;
        height: 60upx;
        border: 1upx solid #000;
        border-radius: 10upx;
        padding-left: 10upx;
      }
    }
    .changeD {
      width: 100%;
      margin: 20upx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      view {
        padding: 6upx 15upx;
        background: #fff;
        color: #000;
        border-radius: 15upx;
        border: none;
        margin: 10upx 10upx;
        font-size: 24upx;
        font-weight: normal;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
      .active {
        // background: #DB0000;
        color: #000;
        border-radius: 15upx;
        border: 2upx dashed #000;
        font-size: 24upx;
        font-weight: bold;
      }
    }
  }
  .faNum {
    width: 100%;
    height: 126upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2upx solid #707070;
    .faNumLeft {
      width: 250upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .faNumRight {
      width: 160upx;
      height: 60upx;
      border: 3upx solid #000;
      border-radius: 10upx;
      margin-right: 20upx;
      font-size: 26upx;
      font-weight: 600;
      color: #db0000;
      display: flex;
      align-items: center;
      justify-content: center;
      .faNumno {
        width: 50%;
        height: 100%;
        text-align: center;
      }
    }
  }
  .ruler {
    width: 100%;
    // height: 390upx;
    .rulerin {
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      picker {
        width: 80%;
      }
      view {
        display: flex;
        button::after {
          border: none;
          padding: 0;
        }
        button {
          width: 150upx;
          background-color: transparent;
          position: relative;
          display: block;
          margin-left: 0;
          margin-right: 0;
          font-size: 24upx;
          color: #000;
          border: 1upx solid #000;
          padding-left: 0;
          padding-right: 0;
        }
      }
      text {
        padding: 10upx 0;
      }
      input {
        width: 700upx;
        height: 60upx;
        border-radius: 10upx;
        border: 1upx solid #000;
        padding-left: 10upx;
      }
    }
    .rulerHead {
      width: 250upx;
      height: 60upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      image {
        width: 35upx;
        margin-right: 8upx;
      }
    }
    .orsfga {
      margin-left: 600upx;
      border: 1upx solid #000;
      border-radius: 10upx;
      width: 100upx;
      height: 50upx;
      text-align: center;
      line-height: 50upx;
    }
    .rulerText {
      width: 100%;
      height: 250upx;
      margin: 20upx 20upx 0 20upx;
      textarea {
        width: 88%;
        height: 190upx;
        background: rgb(250, 219, 219);
        border-radius: 15upx;
        border: 3upx solid #000;
        padding: 20upx;
      }
    }
  }
  .btns {
    width: 100%;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btnOn {
      background: linear-gradient(to right, #fc4343, #cf0505);
      border-radius: 50upx;
      border: 4upx solid #000;
      width: 280upx;
      height: 70upx;
      font-size: 28upx;
      color: #000;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
