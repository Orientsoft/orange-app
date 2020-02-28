<template>
	<view>
			<view class="bg-orange-lg">
				<cu-custom :isBack="true" bgColor="title-white">
					<block slot="backText"><text>个人信息</text></block>
				</cu-custom>
				<view class="flex padding-tb-sm" style="align-items: center;width: 100%;justify-content: center;text-align: center;">
					<view>
						<image @tap="modifyHead" :src="'../../static/home/home_head_bg.png'" class="image"></image>
					</view>
				</view>
			</view>
			
			<!-- 列表 -->
			<view class="container">
					<view class="space-m"></view>
					<view v-for="(item,index) in itemList" :key="index" class="list" @tap="goPages(item)">
						<image :src="item.url" class="item-image margin-lr" mode="aspectFill"></image>
						<view class="flex-sub">
							<text class="item-title">{{item.name}}</text>
						</view>
						<view v-if="item.active" style="height: 16upx;width: 16upx;border-radius: 200upx;background-color: #ff6161;"></view>
						<image src="../../static/my/right.png" class="right-btn" mode="aspectFit"></image>
					</view>
					<view style="height: 40upx;"></view>
			</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { pathToBase64, base64ToPath } from '../../../js_sdk/image-tools/index.js'
	export default {
		computed: {...mapState(['app','inter'])},
		data() {
			return {
				userInfo: {
					username:'李四',
					mobile:'1367837849'
				},
				itemList:[
					{name:'1367837849',url:'../../../static/my/my_account.png'},
					{name:'修改密码',url:'../../../static/my/my_info.png',nav_url:'/pages/auth/reset'},
					{name:'退出登陆',url:'../../../static/my/my_logout.png'},
				],
				data:{'notice':false,'message':false}
			}
		},
		onLoad() {
			// console.log(this.app.User.Token);
			// // this.$utils.msg("ssss");
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// 	this.list[3].itemList[0].version=wgtinfo.version
			// })
		},
		onShow() {
			// this.loadData();
			// this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','SET']),
			modifyHead(){
				let t = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						
						t.selectImages = [];
						res.tempFilePaths.forEach((item,index)=>{
							var path= plus.io.convertLocalFileSystemURL(item);
							pathToBase64(path)
							.then(data=>{
								// console.log(data.length);
								let tmpdata = data.substr(1);
								tmpdata = tmpdata.substr(0,tmpdata.length-1);
								// console.log(tmpdata);
								console.log(tmpdata.length);
								uni.showLoading({
									title:'上传中...',
									success:function(){
										t.S({
											url:t.inter.upload,
											data:{
												image: tmpdata,
											},
											callback:function(res){
												console.log(res);
												uni.hideLoading();
												if(res.statusCode===200){
													console.log(JSON.stringify(res.data))
													let data = res.data;
													if(data.code==1){
														t.$utils.msg("上传成功"+(index+1)+"张图片");
														t.setUserHead(data.data.url);
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
							})
						})
					}
				});
			},
			//设置用户头像
			setUserHead(filePath){
				let t= this;
				uni.showLoading({
					title:'提交中...',
					success:function(){
						t.S({
							url:'api/user/profile',
							data:{
								avatar: filePath,
							},
							callback:function(res){
								console.log(res);
								uni.hideLoading();
								if(res.statusCode===200){
									console.log(JSON.stringify(res.data))
									let data = res.data;
									if(data.code==1){
										t.$utils.msg("设置成功");
										t.userInfo['avatar']=t.inter.server.url+filePath;
										t.SET({
											key:'User',
											value:{Token:t.userInfo.token,Info:t.userInfo}
										})
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
			},
			goPages(item){
				console.log(item.name)
				if(!item.nav_url){
					if(item.name=="退出登陆"){
						this.logout();
					}
					return;
				}
				
				var t=this;
				if(item.nav_url){
					uni.navigateTo({
						url:item.nav_url
					})
				}
			},
			logout(){
				let t = this;
				t.userInfo['password']='';
				t.SET({
					key:'User',
					value:{Token:'',Info:t.userInfo}
				})
				
				
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.S(
							{
								url:'logout?channel=app',
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res));
									//如果取消登录就不做后面的操作
									if(res.statusCode===200){
										// t.app.User.Token = res.data.userinfo.token;
										if(res.data.status==1){
											t.$utils.msg("退出成功");
											uni.reLaunch({
												url:'/pages/auth/login'
											})
										}else{
											t.$utils.msg(res.data.msg);
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
							}
						)
					}
				})
			}
			
		}
	}
</script>

<style>
	page{
		background-color: #FFFEF5;
	}
	.nav-title {
		font-size: 36upx;
		color: #333;
		font-weight: bold;
	}
	.user-card{
		margin-top: 0upx;
	}
	.home-lg{
		width: 200upx;
		height: 200upx;
		margin-left: 40upx;
	}
	.image{
		height: 120upx;
		width: 120upx;
		background-color: #02CFA9;
		border-radius: 120upx;
	}
	.account_change{
		height: 96upx;
		width: 96upx;
		margin-right: 40upx;
	}
	
	.list{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 30upx;
		padding-top: 30upx;
		border-bottom: #eee solid 1upx;
		background-color: #fff;
		margin-top: 10upx;
	}
	.item-image{
		height: 48upx;
		width: 48upx;
		margin-right: 20upx;
	}
	.item-title{
		font-size: 32upx;
		color: #333;
	}
	.item-subtitle{
		font-size: 26upx;
		color: #ccc;
	}
	.right-btn{
		height: 25upx;
		width: 35upx;
		margin-right: 40upx;
	}
</style>
