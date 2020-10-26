<!--<template>
	 
	<view class="padding flex flex-direction">
		<button class="cu-btn bg-blue lg">玄灰</button>
		<button class="cu-btn bg-red margin-tb-sm lg">嫣红</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.button{
		margin: auto;
		padding: auto;
		justify-content: center;
	}
</style>-->

<template>
	<view>
		
		<form>
			
			<view class="cu-form-group margin-top">
				<view class="title">当前UID</view>
				<input  name="input" :value="UID" disabled="disable" ></input>
			</view>
			<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue lg" 	@tap="showModal" data-target="DialogModal1">重置UID</button>
			
		
			
			</view>
			
		</form>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">重置UID</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					重置UID后原UID动态密码将无法使用
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="newUID">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
//	var  graceChecker = require("../../../common/graceChecker.js");
	export default {
		data() {
			return {
				UID:"",
				modalName:null
			}
		},
		onShow() {
			this.UID=this.getUID();
		},
		methods: {
			showModal(e) {
					this.modalName = e.currentTarget.dataset.target
			},hideModal(e) {
				this.modalName = null
			},
			newUID(e){
				this.hideModal(e);
				this.UID=this.refreshUID();
			}
			
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>



