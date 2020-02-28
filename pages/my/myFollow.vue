<template>
	<view>
		<cu-custom :isBack="true" bgColor="container title-orange">
			<block slot="backText"><text class="title-black">我的关注</text></block>
		</cu-custom>
		<view class="gray-shadow"></view>
		<view class="space-s"></view>
		<view class="hospital-card-list">
			<view @tap="goPagesById(item.id)" v-for="(item,index) in list" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image-round" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="flex">
						<text class="card-item-title">{{item.name}}</text>
						<!-- <text class="card-item-sign">三甲</text> -->
						<text class="card-item-sign">可咨询</text>
					</view>
					<view class="card-item-desc">科室：麻醉科 病理科|神经外科</view>
					<view class="card-item-desc flex align-end">
						<text class="cuIcon-phone"></text> 66886768</view>
					<view class="card-item-desc flex align-end">
						<text class="cuIcon-location"></text> 五环之外</view>
				</view>
			</view>
		</view>
		<!--医院-->
		<!-- <view v-for="(item,index) in list" :key="index" class="margin-lr-item margin-top card-list">
			<view class="flex justify-between card-item-desc">
				<view>{{$utils.dateFormat('YYYY-mm-dd HH:MM',new Date())}}</view>
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
					<view class="name-connect flex-treble">{{item.hospitalAddr}}</view>
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
		</view> -->
		
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
					{
						createAt:'2020-02-23 12:30:20',
						name:'张三',
						content:'拔牙，洗牙，抛光牙',
						hospitalAddr:'东区大医院'
					}
				],
				list2:[]
			}
		},
		onLoad() {
		},
		onShow() {
			this.loadData();
			this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S']),
			loadData(){
				let t= this;
				t.S({
					url:"hospital/me",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.list = res.data.data;
							}else{
								console.log(JSON.stringify(res));
							}
						}else{
							if(res.statusCode==401){
								t.TO({
									url:'/pages/auth/login'
								})
							}else{
								t.$utils.msg(res.errMsg);
							}
						}
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
