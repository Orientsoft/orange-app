<template>
	<view class="page">
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
					<input class="flex-sub" type="number" placeholder="请输入验证码" placeholder-style="color:#bbb;font-size:15px" :value="password" @input="onPasswd"/>
					<text v-if="isSend" @tap="getCode" class="forget">获取验证码</text>
					<text v-if="!isSend" @tap="sendSms2" class="code-str">{{timeClock}}s</text>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="login" class="text-center login-bg input-v">
				<text class="login-text">登录</text>
			</view>
			
			<view class="space-s"></view>
			<view class="flex align-center justify-between text-center input-v">
				<view class="margin-left-sm" @click="goPages('/pages/auth/login')"><text class="reg">账户密码登陆</text></view>
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
		data() {
			return {
				account:'',
				password:'',
				isSend: true,
				timeClock:0,
				timeInterval:null,
			}
		},
		beforeMount(){
			if(this.timeInterval){
				clearInterval(this.timeInterval);
				this.timeInterval = null;
				this.isSend = true;
			}
		},
		methods: {
			...mapMutations(['TO','S','SET','P']),
			onAccount(e){
				this.account = e.target.value;
			},
			onPasswd(e){
				this.password = e.target.value;
			},
			goPages(url){
				this.TO({
					url:url
				})
			},
			login(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			sendSms2(){
				this.$utils.msg("短信验证码已发送，请稍后重试");
			},
			getCode(){
				let t=this;
				if(!t.$utils.checkStr(t.account,'phone')){
					t.$utils.msg("请输入正确的手机号码");
					return;
				}
				t.$utils.msg("发送验证码成功");
				t.startTimeClock();
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.S({
								url:'code',
								data:{phone:t.account,event:'register'},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.code==1){
											t.$utils.msg("发送验证码成功");
											t.startTimeClock();
										}else{
											t.$utils.msg(res.data.msg);
										}
									}else{
										t.$utils.msg(res.errMsg);
									}
								}
							})
					}
				})
			},
			startTimeClock(){
				let t = this;
				t.timeClock=60;
				t.isSend = false;
				t.timeInterval = setInterval(()=>{
					t.timeClock = t.timeClock - 1;
					if(t.timeClock < 0){
						clearInterval(t.timeInterval);
						t.timeInterval = 0;
						t.isSend = true;
					}
				},1000);
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
								data:{phone:t.account,code:t.password,channel:'app'},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											t.$utils.msg("登陆成功");
											t.SET({
												key:'token',
												value:res.data.data
											})
											setTimeout(()=>{
												uni.switchTab({
													url:'/pages/home/index'
												})
											},1000)
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
