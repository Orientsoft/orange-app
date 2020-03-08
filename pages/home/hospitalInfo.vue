<template>
	<view >
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
						<text v-for="(tag,index) in hospitalInfo.tag" :key="index+'tag'" class="card-item-sign">{{tag}}</text>
					</view>
					<view class="card-item-desc color_grey">科室：<text v-for="(dept,index) in hospitalInfo.department" :key="index+'dept'" class="margin-right-sm">{{dept}}</text></view>
					<view class="card-item-desc flex align-end color_grey">
						电话： {{hospitalInfo.phone}}</view>
					<view class="card-item-desc flex align-end">	
						<view v-if="operator==0" @click="onFork(1)" class="name-class">关注</view>
						<view v-if="operator==1" @click="onFork(0)" class="name-class">取消关注</view>
					</view>
				</view>
			</view>
			<view class="flex justify-between">
				<view class="card-item-desc flex align-end color_grey">
					<!-- <text class="cuIcon-location"></text> --> 地点：{{hospitalInfo.address}}</view>
			</view>
		</view>
		<view class="space-m"></view>
		<view class="margin-lr-item card-list">
			<view class="card-item-title">医院简介</view>
			<view>
				<rich-text :nodes="hospitalInfo.content"></rich-text>
			</view>
		</view>
		<view class="space-s"></view>
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
				list:[]
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.loadData();
		},
		onShow() {
			this.userInfo = this.app;
			console.log(this.userInfo)
		},
		methods: {
			...mapMutations(['TO','S','P']),
			onFork(value){
				if(!this.userInfo.token){
					this.$utils.msg('请先登陆');
					this.TO({
						url:'/pages/auth/login'
					})
					return;
				}
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
				})
			},
			loadFollow(){
				let t=this;
				t.S({
					url:"hospital/me",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.list = res.data.data;
								console.log(t.hospitalInfo.id)
								for (var i = 0; i < t.list.length; i++) {
									if(t.list[i].id == t.hospitalInfo.id){
										t.operator = 1;
										break;
									}
								}
							}else{
								console.log(JSON.stringify(res));
							}
						}else{
						}
					}
				})
			},
			loadData(){
				let t= this;
				
				t.S({
					url:"hospital/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.hospitalInfo = res.data.data;
								if(t.userInfo.token){
									t.loadFollow();
								}
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
