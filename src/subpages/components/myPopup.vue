<template>
	<!-- 弹窗 -->
	<view class="my-alert-box" :style="{justifyContent: position}" v-if="showAlert" @touchmove.stop.prevent="prevent">
		<view  :class="['my-alert-mask',ani?ani:''] " @click="close(true)"/>
		<view :class="['my-alert-center',ani?ani:''] " @click.stop="clear">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * 参数
	 * type 布局位置 上,中,下
	 * 方法
	 */
	export default {
		data(){
			return {
				showAlert:false,
				ani:'',
				position: 'center',
			}
		},
		name: "myAlert",
		props: {
			canClose: {
				type: Boolean,
				default: true
			},
			type:{
				type:String,
				default: 'center'
			}
		},
		methods:{
			clear(){},
			open() {
				let e = this.type
				if(e==='center'){
					this.position = 'center'
				}else if(e==='top'){
					this.position = 'flex-start'
				}else if (e==='bottom'){
					this.position = 'flex-end'
				}
				this.showAlert = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani = 'ani'
					}, 30)
				})
			},
			prevent(){
				return false;
			},
			close() {
				if(!this.canClose){
					return 
				}
				this.ani = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showAlert = false
					}, 300)
				})
				this.$emit('close')
			}
			
		}
	}
</script>
<style scoped>
	.codebox{
		padding-top: 72rpx;
		position: relative;
	}
	.closeimg{
		padding: 30rpx;
		width: 38rpx;
		height: 38rpx;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		z-index: 100;
	}
	
	.my-alert-box {
		/* background-color: #000; */
		position: fixed;
		top: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.my-alert-mask {
		transition: all .3s;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background: rgba(0, 0, 0, .4);
		opacity: 0;
		transition: .3s all;
	}
	.my-alert-mask.ani{
		opacity: 1
	}
	.my-alert-center{
		width: 100%;
		transform: scale(1.1);
		opacity: 0;
		/* background: #fff; */
		position: relative;
		z-index: 999;
		border-radius:8upx;
		text-align: center;
		overflow: hidden;
		transition: .3s all;
	}
	.my-alert-center.ani{
		transform: scale(1);
		opacity: 1
	}
	.my-alert-content{
		line-height: 48rpx;
		padding: 0 48rpx;
		font-size:34upx;
		font-weight: 500;
		color: rgba(15,15,15,.8);
		overflow: hidden;
	}
	.my-alert-_btns{
		display: flex;
		flex-direction: row;
		justify-content: center;
		border-top: 1rpx solid rgba(15,15,15,.2);
	}
	.my-alert-_btns .c-button{
		border: 0;
		width: 50%;
		height: 96rpx;
		border-radius: 0rpx;
		line-height: 96rpx;
		background: #fff;
		font-size:32upx;
		text-align: center;
		color: rgba(15,15,15,.8);
		box-sizing: border-box;
	}
	.my-alert-_btns .c-button.cancel{
		border-right: 1rpx solid rgba(15,15,15,.2);
	}
	.my-alert-_btns .c-button:after{
		border: 0;
	}
	.c-button:after{
		border: none;
	}
	.btm{
		margin-bottom: 72rpx;
	}
</style>