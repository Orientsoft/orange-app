<template>
	<view class="container">
		<image style="width: 100%;position: absolute;" src="../../static/home/head_bg_order.png" mode="aspectFill"></image>
		<cu-custom :isBack="true" bgColor="title-white">
			<block slot="backText" class="title-white"><text class="title-white">医院详情</text></block>
		</cu-custom>
		<view class="space-s"></view>
		<!--医院-->
		<view class="margin-lr-item card-list">
			<view class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="hospitalInfo.logo" class="image-round" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="flex">
						<text class="card-item-title">{{hospitalInfo.name}}</text>
						<text class="card-item-sign">三甲</text>
						<text class="card-item-sign">可咨询</text>
					</view>
					<view class="card-item-desc">科室：麻醉科 病理科|神经外科</view>
					<view class="card-item-desc flex align-end">
						<text class="cuIcon-phone"></text> 66886768</view>
				</view>
			</view>
			<view class="flex justify-between margin-top">
				<view class="card-item-desc flex align-end">
					<text class="cuIcon-location"></text> 五环之外</view>
					<view v-if="operator==0" @click="onFork(1)" class="name-class">关注</view>
					<view v-if="operator==1" @click="onFork(0)" class="name-class">取消关注</view>
			</view>
		</view>
		<view class="space-m"></view>
		<view class="margin-lr-item card-list">
			<view class="card-item-title">医院简介</view>
			<view>{{hospitalInfo.content}}</view>
		</view>
		
		<view class="space-m"></view>
		<view class="margin-lr-item card-list">
			<view class="card-item-title">医生</view>
			<view>{{hospitalInfo.content}}</view>
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
				hospitalInfo:{},
				id:'',
				operator:0,
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.loadData();
			this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','P']),
			onFork(value){
				let t = this;
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.P({
								url:'hospital/fork',
								data:{id:t.id,operator:value},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											t.operator = value;
										}else{
											t.$utils.msg(res.data.message);
										}
									}else{
										t.$utils.msg(res.errMsg);
									}
								}
							})
					}
				})
			},
			getInfo(id){
				let t = this;
				uni.navigateTo({
					url:'/pages/home/hospitalInfo?id='+id
				})
			},
			loadData(){
				let t= this;
				t.S({
					url:"hospital?id="+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.hospitalInfo = res.data.data;
							}else{
								console.log(JSON.stringify(res));
							}
						}else{
							if(res.data.status==2){
								t.TO({
									url:'/pages/auth/login'
								})
							}else{
								t.$utils.msg(res.data.message);
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
</style>
