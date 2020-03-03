<template>
	<view>
		<cu-custom :isBack="true" bgColor="container title-orange">
			<block slot="backText"><text class="title-black">我的病历</text></block>
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
					{
						createAt:1582852683,
						name:'张三',
						content:'拔牙，洗牙，抛光牙',
						hospital:'东区大医院'
					}
				],
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
				this.list = this.app.User.record;
			}
		}
	}
</script>

<style>
	@import url("../../../css/home.css");
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
