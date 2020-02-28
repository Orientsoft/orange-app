<template>
	<view class="container">
		<image style="width: 100%;position: absolute;height: 350upx;" src="../../../static/home/head_bg_order.png" mode="scaleToFill"></image>
		<cu-custom :isBack="true" bgColor="title-white">
			<block slot="backText" class="title-white"><text class="title-white">套餐详情</text></block>
		</cu-custom>
		<!-- 信息 -->
		<view class="harf-top">
			<view class="space-m"></view>
			<view class="card flex align-end">
				<view class="card-desc">
					<view class="card-title">{{info.name}}</view>
					<view>{{info.desc_1}}</view>
					<view>{{info.desc_2}}</view>
					<view class="active-price">¥<text class="card-active-price">&ensp;{{info.price}}</text><text class="card-desc">¥{{info.sale}}</text></view>
					<view>已售{{info.volume}}</view>
				</view>
				<image :src="info.logo" class="card-logo" mode="aspectFit"></image>
			</view>
			<view class="space-s"></view>
			<!-- 门店 -->
			<view class="store-v">
				<view class="flex justify-between">
					<view class="card-title">适用门店（91）</view>
					<view class="store-more">其他门店 ></view>
				</view>
				<view class="flex align-center">
					<image :src="info.logo" class="store-logo" mode="aspectFit"></image>
					<view class="margin-left-sm" style="flex-grow: 1;">
						<view class="flex justify-between">
							<view class="card-title">成都格林阳关诊所</view>
							<view class="card-desc">4.5km</view>
						</view>
						<view class="flex justify-between card-desc">
							<view><text class="cuIcon-location"></text>太升南路25号</view>
							<view><text class="cuIcon-right"></text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- tab -->
			<view class="flex tab-all">
				<view @click="onSelTab(0)" class="tab">
					<text :class="tabIndex==0?'tab-sub-active':'tab-sub'">套餐详情</text>
				</view>
				<view @click="onSelTab(1)" class="tab">
					<text :class="tabIndex==1?'tab-sub-active':'tab-sub'">购买须知</text>
				</view>
			</view>
			<!-- picInfo -->
			<view class="picInfo">
				<image :src="info.pic" mode="aspectFit" style="width: 100%;"></image>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="flex padding-tb-sm padding-lr-lg" style="background: #fcfcfc;position: fixed;bottom: 0;justify-content: space-between;width: 100%;animation: show 2s  ;z-index: 1000;">
			<view class="active-price">¥<text class="card-active-price">{{info.price}}</text></view>
			<view @click="goPages()" class="order-btn text-center text-white">提交订单</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				info:{},
				tabIndex:0
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
		},
		methods: {
			...mapMutations(['TO','S']),
			onSelTab(index){
				this.tabIndex = index;
			},
			goPages(){
				let t = this;
				uni.navigateTo({
					url:'/pages/home/mall/order?id='+this.id
				})
			},
			getInfo(){
				let t=this;
				t.S({
					url:"product/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								t.info = res.data.data
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
	@import url("../../../css/mall.css");
	.tab-all{
		box-shadow:0 0 20upx #f3f4ec;
		padding-top: 20upx;
		padding-bottom: 20upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.tab{
		flex:1;
		align-items: center;
		height: 40upx;
		justify-content: center;
		text-align: center;
	}
	.tab-sub{
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		color: #666;
	}
	.tab-sub-active{
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		color: #F49100;
		border-bottom: 3upx solid #F49100;
	}
</style>
