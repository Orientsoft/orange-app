<template>
	<view class="container">
		<cu-custom :isBack="true" bgColor="title-orange">
			<block slot="backText"></block>
		</cu-custom>
		<!-- logo -->
		<view class="flex reg-v">
			<view class="input-v" style="width: 100%;">
				<view class="reg-title"><text>设置密码</text></view>
				<view class="flex justify-around margin-top-lg">
					<view class="align-center reset-progress">
						<view>1</view>
						<view>请输入手机号码</view>
					</view>
					<view class="align-center reset-progress-active">
						<view>2</view>
						<view>请重置密码</view>
					</view>
					<view class="align-center reset-progress">
						<view>3</view>
						<view>完成</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 登陆 -->
		<view class="center-v">
			<view class="input-v">
				<input class="input-in" type="password" placeholder="请输入密码" placeholder-style="color:#bbb;font-size:12px" :value="password" @input="onAccount"/>
				<view class="input-line"></view>
			</view>
			<view class="space-m"></view>
			<view class="input-v">
				<view class="input-in flex align-end">
					<input class="flex-sub" type="password" placeholder="请再次输入密码" placeholder-style="color:#bbb;font-size:12px" :value="password2" @input="onPasswd"/>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="setPasswd" class="text-center login-bg input-v">
				<text class="login-text">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				account:'',
				code:'',
				password:'',
				password2:'',
			}
		},
		beforeMount(){
		},
		onLoad(option) {
			console.log(option)
			this.account = option.account;
			this.code = option.code;
		},
		methods: {
			...mapMutations(['TO','S','SET','P']),
			onAccount(e){
				this.password = e.target.value;
			},
			onPasswd(e){
				this.password2 = e.target.value;
			},
			goPages(url){
				this.TO({
					url:url
				})
			},
			setPasswd(){
				let t=this;
				if(t.password != t.password2){
					t.$utils.msg("两次密码不一致,请重新输入");
					t.password = '';
					t.password2 = '';
					return;
				}
				if(!t.$utils.checkStr(t.password,'pay_pwd')){
					t.$utils.msg("请输入8-16位包含字母、数字的密码");
					return;
				}
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.P({
								url:'resetpasswd',
								data:{phone:t.account,code:t.code,password:t.password},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											t.$utils.msg("密码设置成功");
											setTimeout(()=>{
												t.goPages("/pages/auth/reset3")
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
				// this.goPages("/pages/auth/reset3")
				// uni.switchTab({
				// 	url:'/pages/auth/login'
				// })
			}
		}
	}
</script>

<style>
	@import url("../../css/auth.css");
</style>
