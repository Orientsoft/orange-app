<template>
	<view class="page">
		<cu-custom :isBack="true" bgColor="title-orange" :onBackPage="BackPage">
			<block slot="backText"></block>
		</cu-custom>
		<view v-if="false" class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style">
				<view class="action title-orange" @tap="BackPage(false)" >
					<text class="cuIcon-back"></text>
				</view>
			</view>
		</view>
		<!-- logo -->
		<view class="flex logo-v">
			<image src="../../static/home/logo.png" class="logo"></image>
		</view>
		
		<!-- 登陆 -->
		<view class="center-v">
			<view class="input-v">
				<input class="input-in" type="number" placeholder="请输入手机号" placeholder-style="color:#bbb;font-size:15px" :value="account" @input="onAccount"/>
				<view class="input-line"></view>
			</view>
			<view class="space-m"></view>
			<view class="input-v">
				<view class="input-in flex align-end">
					<input class="flex-sub" type="password" placeholder="请输入密码" placeholder-style="color:#bbb;font-size:15px" :value="password" @input="onPasswd"/>
					<text @tap="goPages('/pages/auth/reset')" class="forget">忘记密码</text>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="login" class="text-center login-bg input-v">
				<text class="login-text">登录</text>
			</view>
			
			<view class="space-s"></view>
			<view class="flex align-center justify-between text-center input-v">
				<view class="margin-left-sm" @click="goPages('/pages/auth/login2')"><text class="reg">短信验证码登陆</text></view>
				<view class="margin-right-sm" @tap="goPages('/pages/auth/reg')"><text class="reg">注册</text></view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="flex text-center justify-center version">
			<text>版权所有: 橙子</text>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		data() {
			return {
				account:'',
				password:'',
				token:''
			}
		},
		onLoad() {
		},
		onBackPress(){
			this.BackPage();
		},
		methods: {
			...mapMutations(['TO','S','SET','P']),
			onAccount(e){
				this.account = e.target.value;
			},
			onPasswd(e){
				this.password = e.target.value;
			},
			BackPage(login) {
				console.log(login)
				if(login){
					uni.navigateBack({
						delta: 1
					});
					return;
				}
				let pages = getCurrentPages();
				for (var i = 0; i < pages.length; i++) {
					console.log('BackPage',pages[i].route);
				}
				if(pages[0].route == 'pages/my/order/orderList' || 
					pages[0].route == 'pages/my/index'||
					pages[0].route == 'pages/message/index'){
					uni.switchTab({
						url:'/pages/home/index'
					})
				}
			},
			goPages(url){
				this.TO({
					url:url
				})
			},
			getUserInfo(){
				let t = this;
				t.S({
						url:'user/me',
						callback:function(res){
							console.log(JSON.stringify(res));
							if(res.statusCode===200){
								if(res.data.status==1){
									t.SET({
										key:'User',
										value:res.data.data
									})
									t.BackPage(true);
								}else{
									t.$utils.msg(res.data.message);
								}
							}else{
								if(res.statusCode==401){
									t.$utils.msg('登陆超时');
									setTimeout(()=>{
										t.TO({
											url:'/pages/auth/login'
										})
									},1000)
								}else{
									t.$utils.msg(res.errMsg);
								}
							}
						}
					})
			},
			login(){
				
				let t=this;
				if(!t.$utils.checkStr(t.account,'phone')){
					t.$utils.msg("请输入正确的手机号码");
					return;
				}
				if(!t.$utils.checkStr(t.password,'pay_pwd')){
					t.$utils.msg("请输入8-16位包含字母、数字的密码");
					return;
				}
				uni.showLoading({
					title:"登陆中。。。",
					mask: true,
					success:function(){
						t.P({
								url:'login',
								data:{phone:t.account,password:t.password,channel:'app'},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											let token = res.data.data;
											token.updatedAt = new Date().getTime();
											t.$utils.msg("登陆成功");
											t.SET({
												key:'token',
												value:res.data.data
											})
											t.getUserInfo();
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
			}
		}
	}
</script>

<style>
	@import url("../../css/auth.css");
</style>
