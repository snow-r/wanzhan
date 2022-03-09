<template>
  <Mask flex="end" @closeMask="close">
    <view class="pickerWrap" @click.stop="none">
      <view class="pickerHeader">
        <view @click="cancel">取消</view>
        <view @click="confirm">确认</view>
      </view>
      <view class="pickerContainer">
        <picker-view class="pickerView" indicator-style="height: 50px;" @change="timeChange">
          <picker-view-column>
            <view class="blockItem" v-for="(year, yIndex) of yearList" :key="yIndex">{{year}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="blockItem" v-for="(mon, mIndex) of monthLsit" :key="mIndex">{{mon}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="blockItem" v-for="(day, dIndex) of dayList" :key="dIndex">{{day}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="blockItem" v-for="(hour, hIndex) of hourList" :key="hIndex">{{hour}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="blockItem" v-for="(min, mIndex) of minuteList" :key="mIndex">{{min}}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </Mask>
</template>

<script>
import Mask from './mask'
export default {
  components: {
    Mask
  },
  data () {
    return {
      yearList: [],   //年 -下拉
      monthLsit: [], //月 -下拉
      dayList: [], //日 -下拉
      hourList: [], //时 -下拉
      minuteList: [], //分 -下拉
      selectIndexList: [1, 1, 1, 1, 1], //PickerViewColumn选择的索引
      current: '', //当前选择的数据
      hasChange: false, //是否更改
      year: '',  //时间值
      month: '',
      day: '',
      hour: '',
      minute: '',
      current: '',
      formatInitVal: '',
      selectIndexList: [1, 1, 1, 1, 1]
    }
  },
  mounted () {
    const arr = this.$comfun.getArrWithTime(this.current || this.formatInitVal || this.$comfun.getDate())
    const { yearList, monthLsit, dayList, hourList, minuteList } = this.$comfun.getPickerViewList()
    const [year, month, day, hour, minute] = arr 
    //根据arr  数据索引
    this.selectIndexList[0] = yearList.indexOf(arr[0] + '年') 
    this.selectIndexList[1] = monthLsit.indexOf(arr[1] + '月') 
    this.selectIndexList[2] = dayList.indexOf(arr[2] + '日') 
    this.selectIndexList[3] = hourList.indexOf(arr[3] + '点') 
    this.selectIndexList[4] = minuteList.indexOf(arr[4] + '分') 
    this.yearList = yearList
    this.monthLsit = monthLsit
    this.dayList = dayList
    this.hourList = hourList
    this.minuteList = minuteList
    this.year = year
    this.month = month
    this.day = day
    this.hour = hour
    this.minute = minute
  },
  methods: {
    close () {
      this.$emit('close')
    },
    none () {},
    timeChange (e) {
      const selectIndexList = e.detail.value;
      const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] = selectIndexList;
      const yearStr = this.yearList[yearIndex];
      const monthStr = this.monthLsit[monthIndex];
      const dayStr = this.dayList[dayIndex];
      const hourStr = this.hourList[hourIndex];
      const minuteStr = this.minuteList[minuteIndex];
      const year = Number(yearStr.substr(0, yearStr.length - 1));
      const month = Number(monthStr.substr(0, monthStr.length - 1));
      const day = Number(dayStr.substr(0, dayStr.length - 1));
      const hour = Number(hourStr.substr(0, hourStr.length - 1));
      const minute = Number(minuteStr.substr(0, minuteStr.length - 1));

      // 更新年、天数
      this.dayList = this.getDayList(year, month);
      this.hourList = this.getHouseList(year, month, Number(this.dayList[dayIndex].substr(0, this.dayList[dayIndex].length - 1)))
      this.minuteList = this.getMinuteList(year, month, Number(this.dayList[dayIndex].substr(0, this.dayList[dayIndex].length - 1)), Number(this.hourList[hourIndex].substr(0, this.hourList[hourIndex].length - 1)))
      // this.dayList = newDayList
      // this.hourList = newHourList
      // this.minuteList = newMinuteList
      this.year = year
      this.month = month
      this.day = day
      this.hour = hour
      this.minute = minute
      this.minute = minute
      this.hasChange = true
    },
    getHouseList (year, month, day) {
      var nowYear = new Date().getFullYear()
      var nowMonth = new Date().getMonth() + 1
      var nowDay = new Date().getDate()
      var nowHour = new Date().getHours()
      var list = []
      if (year == nowYear && month == nowMonth && day == nowDay) {
        for (var i = nowHour; i <= 23; i++) {
          list.push(i + '点')
        }
        return list
      } else {
        for (var i = 0; i <= 23; i++) {
          list.push(i + '点')
        }
        return list
      }
    },
    getMinuteList (year, month, day, hour) {
      var nowYear = new Date().getFullYear()
      var nowMonth = new Date().getMonth() + 1
      var nowDay = new Date().getDate()
      var nowHour = new Date().getHours()
      var nowMinute = new Date().getMinutes()
      var list = []
      if (year == nowYear && month == nowMonth && day == nowDay && hour == nowHour) {
        for (var i = nowMinute; i <= 59; i++) {
          list.push(i + '分')
        }
        return list
      } else {
        for (var i = 0; i <= 59; i++) {
          list.push(i + '分')
        }
        return list
      }
    },
    getDayList (year, month) {
      const dayList = [];
      var day = new Date().getDate()
      var d = new Date(year, month, 0);
      var now = new Date()
      var nowYear = now.getFullYear()
      var nowMonth = now.getMonth()+1
      if ((year > nowYear && month >= nowMonth) || (year = nowYear && month > nowMonth)) {
        for (let i = 1; i <= d.getDate(); i++) {
          dayList.push(i + "日");
        }
      } else {
        for (let i = day; i <= d.getDate(); i++) {
          dayList.push(i + "日");
        }
      }
      return dayList;
    },
    cancel () {
      this.$emit('close')
    },
    confirm () {
      var current = this.$comfun.formatDate(this.year, this.month, this.day, this.hour, this.minute)
      this.dateLater(current)
    },
    dateLater(time) {
      let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
      let date = new Date(time.split(' ')[0]);
      // getDay() 方法可返回表示星期的某一天的数字。
      let day = date.getDay();
      let week = show_day[day];
      let dateTime = time.split(' ')[0] + " " +week + " " + time.split(' ')[1]
      this.$emit('ok', dateTime)
    }
  }
}
</script>

<style lang="less" scoped>
.pickerWrap{
  width: 100%;
  background: #fff;
  .pickerHeader{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80upx;
    padding: 0 30upx;
    color: #238FAE;
    border-bottom: 1upx solid #d9d9d9;
    font-size: 28upx;
  }
  .pickerContainer{
    height: 600upx;
    padding: 0 20upx;
    .pickerView{
      height: 100%;
      picker-view-column{
        line-height: 50PX;
        .blockItem{
          text-align: center;
        }
      }
    }
  }
}
</style>