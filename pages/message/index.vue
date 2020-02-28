<template>
	<view>
			<view>
				<cu-custom :isBack="false" bgColor="container title-white bg-orange-lg">
					<block slot="content">消息</block>
				</cu-custom>
			</view>
			
			<view class="margin-lr-item card-list margin-top">
				<view class="card-item-title">订单信息</view>
				<view class="card-item-desc">1月18号 16:09</view>
				<view class="margin-lr-sm">
					<view class="flex align-center item-desc">
						<view class="margin-right-lg">订单金额:</view>
						<view>39.00</view>
					</view>
					<view class="flex align-center item-desc">
						<view class="margin-right-lg">订单编号:</view>
						<view>734979293</view>
					</view>
					<view class="flex align-center item-desc">
						<view class="margin-right-lg">下单时间:</view>
						<view>2020-02-28 13:23:00</view>
					</view>
				</view>
				<view class="item-line"></view>
				<view class="flex align-center justify-between item-desc">
					<view class="margin-right-lg">查看订单详情</view>
					<view><text class="cuIcon-right"></text></view>
				</view>
			</view>
			
			
			<view class="margin-lr-item card-list-adv margin-top">
				<image src="../../static/my/service/serive_header.png" class="image-adv" mode="scaleToFill"></image>
				<view class="flex align-center justify-between item-desc text-adv">
					<view class="margin-right-lg">2020的新年礼物</view>
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
	import { pathToBase64, base64ToPath } from '../../js_sdk/image-tools/index.js'
	export default {
		computed: {...mapState(['app','inter'])},
		data() {
			return {
				userInfo: {},
			}
		},
		onLoad() {
		},
		onShow() {
			// this.loadData();
			// this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','SET']),
			
		}
	}
</script>

<style>
	@import url("../../css/home.css");
	.image-adv{
		height: 400upx;
		border-radius: 8upx;
		width: 100%;
	}
	.text-adv{
		height: 100upx;
		margin-top: -100upx;
		background: #FFFFFF;
		position: relative;
		padding-left: 20upx;
		padding-right: 20upx;
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
	
	.card-list-adv{
		background: #FFFFFF;
		border-radius: 30upx;
		/* border: 1upx solid #F49100; */
		box-shadow:inset 0upx 0upx  10upx #F0F0F0;
		margin-bottom: 40upx;
		position: relative;
	}
</style>
