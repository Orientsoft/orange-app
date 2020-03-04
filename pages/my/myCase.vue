<template>
	<view>
		<cu-custom :isBack="true" bgColor="container title-orange">
			<block slot="backText"><text class="title-black">病历详情</text></block>
		</cu-custom>
		<view class="gray-shadow"></view>
		<view class="space-s"></view>
		<!--医院-->
		<view v-for="(item,index) in list" :key="index" class="margin-lr-item margin-top card-list">
			<view class="flex justify-between card-item-desc">
				<view>{{$utils.dateUtils.format(item.createdAt)}}</view>
				<view></view>
			</view>
			<view class="space-s"></view>
			<view>
				<view class="flex margin-bottom-sm">
					<view class="card-desc margin-right-lg">姓名:</view>
					<view class="name-connect flex-treble">{{item.name}}</view>
				</view>
				<view class="flex margin-bottom-sm">
					<view class="card-desc margin-right-lg">医院:</view>
					<view class="name-connect flex-treble">{{item.hospital}}</view>
				</view>
				<view class="flex">
					<view class="card-desc margin-right-lg">内容:</view>
					<view class="name-connect flex-treble">{{item.content}}</view>
				</view>
			</view>
			<view class="item-line"></view>
			<view class="flex align-center justify-between item-desc">
				<view class="margin-right-lg">查看详情</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {...mapState(['app','inter'])},
		data() {
			return {
				userInfo: {},
				list:[
				],
			}
		},
		onLoad() {
		},
		onShow() {
			// this.loadData();
			this.userInfo = this.app.User;
			this.list = this.userInfo.record;
		},
		methods: {
			...mapMutations(['TO','S']),
			loadData(){
				let t=this;
				uni.showLoading({
					title:'加载中。。。',
					success() {
						t.S({
							url:"order/case/"+t.id,
							callback:function(res){
								// console.log(res);
								uni.hideLoading();
								if(res.statusCode===200){
									console.log(JSON.stringify(res.data))
									let data = res.data;
									if(data.status==1){
										t.list = data.data;
									}else{
										t.$utils.msg(data.msg);
									}
								}else{
									if(res.statusCode==401){
										t.TO({
											url:'/pages/charge/login'
										})
									}else{
										t.$utils.msg(res.errMsg);
									}
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../css/home.css");
	.gray-shadow{
		height: 1upx;
		box-shadow:inset 0upx 0upx  10upx #F0F0F0;
	}
	.item-desc{
		padding-top: 10upx;
		padding-bottom: 10upx;
	}
	.item-line{
		margin-top: 20upx;
		margin-bottom: 20upx;
		background-color: #F0F0F0;
		height: 1upx;
	}
</style>
