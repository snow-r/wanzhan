<template>
	<view class="">
		<myPopup type="bottom" ref="myPopup">
			<view class="height-father">
				<view class="top_box_popup">
					<image class="width-14 height-14 absolute top-12 left-16" @click="cancel"
						src="../static/icon_close.png" mode=""></image>
					<text class="text-203040 font-600 fontsize-16">
						{{title}}
					</text>
				</view>
				<view class="bg-ffffff">
					<view class="pt-8 mr-15 ml-16 height-48 bg-ffffff height-father">
						<scroll-view class="maxHeight-200" scroll-y>
							<view class="flex pl-17  ptb-15 pr-10 border-b-1-EEEEEE align-items-center"
								v-for="(item,index) in check" :key="index" @click="select(item,index)">
								<view class="flex align-items-end">
									<image  class="width-20 height-20"
										src="../static/icon_unCheck.png" mode="" v-if="!item.select">
									</image>
									<image  class="width-20 height-20"
										src="../static/icon_isCheck.png" mode="" v-if="item.select"></image>
								</view>
								<view class="ml-13 fontsize-16 color-2D3033">{{item.name}}</view>
							</view>
						</scroll-view>
					</view>
					<view class="mt-8 flex plr-16 justify-space-between pb-40">
						<view class="text-1E63A6 border-1-1E63A6 p-12-68 fontsize-16 br-4" @click="cancel">
							取消
						</view>
						<view class="text-ffffff p-12-68 bg-1E63A6 fontsize-16 br-4" @click="submit">
							确定
						</view>
					</view>
				</view>
			</view>
		</myPopup>
	</view>
</template>
<script>
	import myPopup from './myPopup.vue'
	export default {
		components: {
			myPopup
		},
		props: {
			title: {
				type: String,
				default: '标题'
			},
			value: {
				type: Array,
				default: []
			},
			name_key: {
				type: String,
				default: 'dictText'
			}
		},
		data() {
			return {
				selected: [],
				check: []
			}
		},
		mounted(){
		},
		methods: {
			open() {
				this.$refs.myPopup.open()
				this.check = this.value
			},
			submit() {
				this.$emit('input',this.check)
				this.selected = this.check.filter(val=>val.select)
				this.$emit('submit', this.selected)
				this.$refs.myPopup.close()
			},
			cancel() {
				this.$refs.myPopup.close()
			},
			select(item, index) {
				this.$set(this.check[index],'select',!item.select)
			}
		},
	}
</script>
<style lang='less' scoped>
	.top_box_popup {
		text-align: center;
		position: relative;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #FFFFFF;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
	}
	.maxHeight-200{
		max-height: 400rpx;
	}
  .width-14{
    width: 28rpx;
  }
  .height-14{
    height: 28rpx;
  }
  .absolute{
    position: absolute;
  }
  .top-12{
    top: 24rpx;
  }
  .left-16{
    left:32rpx
  }
  .text-203040{
    color: #203040;
  }
  .font-600{
    font-weight: 600;
  }
  .fontsize-16{
    font-size: 32rpx;
  }
  .bg-ffffff{
    background-color: #fff;
  }
  .pt-8{
    padding-top: 16rpx;
  }
  .mr-15{
    margin-right: 30rpx;
  }
  .ml-16{
    margin-left: 32rpx;
  } 
  .height-48{
    height: 96rpx;
  }
  .height-father{
    height: 100%;
  }
  .flex{
    display: flex;
  } 
  .pl-17{
    padding-left: 34rpx;
  } 
  .ptb-15{
    padding: 30rpx 0;
  } 
  .pr-10{
    padding-right: 20rpx;
  } 
  .border-b-1-EEEEEE{
    border-bottom: 2rpx solid #eee;
  } 
  .align-items-center{
    align-items: center;
  }
  .width-20{
    width: 40rpx;
  } .height-20{
    height: 40rpx;
  }
  .mt-8{
    margin-top: 16rpx;
  }
  .ml-13{
    margin-left: 26rpx;
  }
  .color-2D3033{
    color: #2d3033;
  }
  .plr-16 {
    padding: 0 32rpx;
  }
  .pb-40{
    padding-bottom: 80rpx;
  }
  .text-1E63A6{
    color: #1e63a6;
  }
  .border-1-1E63A6{
    border: 2rpx solid #1e63a6;
  }
  .p-12-68{
    padding: 24rpx 136rpx;
  }
  .br-4{
    border-radius: 8rpx;
  }
  .text-ffffff{
    color: #fff;
  }
  .bg-1E63A6{
    background-color: #1e63a6;
  }
</style>
