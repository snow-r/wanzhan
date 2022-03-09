<template>
  <view>
    <TopBar background="#fff" :back="true" barTitle="更换城市" />
    <view :class="isIpx?'xPage':'normalPage'" :style="'padding-top:' + navHeight + 'px'">
      <scroll-view scroll-y class="pageContainer">
        <view class="searchWrap">
          <view class="searchContainer">
            <image class="searchIcon" src='@/static/images/sousuo.png'  mode="widthFix" />
            <input class="searchInput" placeholder="搜索城市" placeholder-class="plac" @input="searchCity" />
          </view>
        </view>
        <view class="hotCityWrap">
          <view class="hotTitle">热门</view>
          <view class="hotWrap">
            <view class="hotItem" v-for="(hot, hIndex) of hotList" :key="hIndex" @click="chooseCity(hot)">{{hot}}</view>
          </view>
        </view>
        <view class="cityListWrap">
          <view class="wordItem" v-for="(word, wIndex) of cityList" :key="wIndex">
            <view class="wordWrap">{{word.tag}}</view>
            <view class="cityItem" v-for="(city, cIndex) of word.cities" :key="cIndex" @click="chooseCity(city.name)">{{city.name}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TopBar from '@/components/topBar'
import Citylist from '@/static/js/citylistData.json'

export default {
  components: {
    TopBar
  },
  data () {
    return {
      hotList: ['当前城市','西安市'],
      cityList: null
    }
  },
  computed: {
    isIpx() {
      return this.$isIpx;
    },
    navHeight() {
      return uni.getStorageSync("navHeight");
    }
  },
  onLoad () {
    this.cityList = Citylist
    console.log(this.cityList)
  },
  methods: {
    searchCity (e) {
      var word = e.detail.value
      if (word.trim() == '') {
        this.cityList = Citylist
      } else {
        var arr = []
        Citylist.forEach(item => {
          item.cities.map(value => {
            if (value.name.indexOf(word) != -1) {
              let obj = {};
              let cities = [];
              obj.tag = item.tag;
              cities.push(value);
              obj.cities = cities;
              arr.push(obj);
            }
          })
        })
        var cityList = []
        arr.map((val, i) => {
          if (i === 0) {
            cityList.push(val);
          } else {
            let had = false, index = 0;
            cityList.map((value, indx) => {
              if (value.tag === val.tag) {
                had = true;
                index = indx;
              }
            });
            if (had) {
              cityList[index].cities.push(val.cities[0]);
            } else {
              cityList.push(val);
            }
          }
        })
        this.keyword = word
        this.cityList = cityList
      }
    },
    chooseCity (city) {
      if (city == '当前城市') {
        console.log(121)
        this.$comfun.getUserCity(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          })
        })
      } else {
        uni.setStorageSync('location', city)
        // uni.removeStorageSync('key')
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pageContainer{
  background: #f5f5f5;
  .searchWrap{
    width: 100%;
    padding: 20upx 0;
  }
  .searchContainer{
    width: 600upx;
    height: 80upx;
    border-radius: 40upx;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 20upx;
    font-size: 28upx;
    .searchIcon{
      width: 40upx;
      height: 40upx;
      margin-right: 10upx;
    }
    .searchInput{
      flex: 1;
    }
  }
  .hotCityWrap{
    padding: 20upx;
    border-top: 1upx solid #eee;
    .hotTitle{
      font-size: 32upx;
      color: #888;
    }
    .hotWrap{
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20upx;
      .hotItem{
        height: 60upx;
        line-height: 60upx;
        padding: 0 20upx;
        font-size: 28upx;
        background: #fff;
        border-radius: 5upx;
      }
    }
  }
  .cityListWrap{
    .wordItem{
      .wordWrap{
        height: 80upx;
        line-height: 80upx;
        background: #f5f5f5;
        padding: 0 20upx;
        color: #888;
      }
      .cityItem{
        height: 80upx;
        line-height: 80upx;
        background: #fff;
        padding: 0 20upx;
        border-bottom: 1upx solid #eee;
      }
    }
  }
}
</style>