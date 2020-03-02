<template>
	<view>
			<view>
				<cu-custom :isBack="true" bgColor="container title-orange bg-white">
					<block slot="content"><text class="title-black">专属客服</text></block>
				</cu-custom>
			</view>
			<view class="space-l"></view>
			<view class="margin-lr-item">
				<image class="service-header" src="../../../static/my/service/serive_header.png" mode="aspectFill"></image>
			</view>
			<view v-for="(item,index) in list" :key="index" class="margin-lr-item card-list margin-top flex align-center">
				<image class="service-icon" src="../../../static/my/alipay.png" mode="scaleToFill"></image>
				<view class="column-line"></view>
				<view class="flex-sub">
					<view class="card-item-title">{{item.name}}</view>
					<view class="card-item-desc">{{item.phone}}</view>
				</view>
				<view class="text-xl"><text class="cuIcon-right more"></text></view>
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
				list: {},
			}
		},
		onLoad() {
		},
		onShow() {
			// this.loadData();
			this.list = this.app.User.connect;
		},
		methods: {
			...mapMutations(['TO','S','SET']),
			
		}
	}
</script>

<style>
	@import url("../../../css/home.css");
	.service-header{
		height: 300upx;
		border-radius: 8upx;
		width: 100%;
	}
	.service-icon{
		height: 70upx;
		width: 70upx;
		margin-left: 20upx;
	}
	.column-line{
		background-color: #DDDDDD;
		width: 3upx;
		margin-left: 40upx;
		margin-right: 40upx;
		align-self: stretch;
	}
</style>
