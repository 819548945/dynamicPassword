<template>
	<view>
		
		
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				动态密码
			</view>
			<view class="cu-progress round sm striped" :class="'active'">
				<view :class="{'bg-green':length<60,'bg-yellow':length>=60&&length<=90,'bg-red':length>90}" :style="[{ width:length+'%'}]"></view>
			</view>
			<view class="uni-common-mt" style=" padding:20rpx;">
				
				<div class='dpdiv'>{{dynamicPassword}}</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'rich-text',
				time:0,
				length:0,
				timer:null,
				dynamicPassword:""
			}
		},methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			setInfo() {
				this.time=new Date().getSeconds();
				this.length=this.time*100/60;
				this.dynamicPassword=this.getDynamicPassword(this.config().PWLength,this.getUID());
			}
			
		},onShow() {
			 this.timer = setInterval(this.setInfo, 1000);	
		},onHide() {
			clearTimeout(this.timer);
		}
		
	}
</script>

<style>
	.dpdiv{
		text-align:center;
		line-height: 20px;
		font-size:50px;
		color: red; 
	}
</style>
