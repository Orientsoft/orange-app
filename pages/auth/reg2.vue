<template>
	<view class="container">
		<!-- logo -->
		<view class="flex reg-v">
			<view class="input-v">
				<view class="reg-title"><text>设置密码</text></view>
				<view class="reg"><text>亲，欢迎注册橙子账号</text></view>
			</view>
		</view>
		
		<!-- 登陆 -->
		<view class="center-v">
			<view class="input-v">
				<input class="input-in" disabled type="number" placeholder="请输入手机号" placeholder-style="color:#bbb;font-size:12px" :value="account" @input="onAccount"/>
				<view class="input-line"></view>
			</view>
			<view class="space-m"></view>
			<view class="input-v">
				<input class="input-in" placeholder="请您的姓名" placeholder-style="color:#bbb;font-size:12px" :value="name" @input="onName"/>
				<view class="input-line"></view>
			</view>
			<view class="space-m"></view>
			<view class="input-v">
				<radio-group @change="radioChange">
					<view class="flex">
						<label class="flex align-center margin-right-lg">
							<view>
								<radio value="1" :checked="male === 1" />
							</view>
							<view class="text-lg margin-left-sm">男</view>
						</label>
						<label class="flex align-center">
							<view>
								<radio value="2" :checked="male === 2" />
							</view>
							<view class="text-lg margin-left-sm">女</view>
						</label>
					</view>
				</radio-group>
			</view>
			<view class="space-m"></view>
			<view class="input-v">
				<view class="input-in flex align-end">
					<input class="flex-sub" type="password" placeholder="输入8-16位数字与字母" placeholder-style="color:#bbb;font-size:12px" :value="password" @input="onPasswd"/>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="setPasswd" class="text-center login-bg input-v">
				<text class="login-text">完成</text>
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
				name:'',
				password:'',
				male:1
			}
		},
		beforeMount(){
		},
		onLoad(option){
			console.log(option)
			this.account = option.account;
			this.code = option.code;
		},
		methods: {
			...mapMutations(['TO','S','SET','P']),
			onAccount(e){
				this.account = e.target.value;
			},
			onName(e){
				this.name = e.target.value;
			},
			onPasswd(e){
				this.password = e.target.value;
			},
			radioChange(e){
				this.male = e.target.value;
			},
			goPages(url){
				this.TO({
					url:url
				})
			},
			setPasswd(){
				let t=this;
				if(!t.name){
					t.$utils.msg("请输入您的姓名");
					return;
				}
				if(!t.$utils.checkStr(t.password,'pay_pwd')){
					t.$utils.msg("请输入8-16位包含字母、数字的密码");
					return;
				}
				
				uni.showLoading({
					title:"注册中。。。",
					mask: true,
					success:function(){
						t.P({
								url:'register',
								data:{phone:t.account,code:t.code,password:t.password,name:t.name,male:t.male},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											t.$utils.msg("注册成功");
											setTimeout(()=>{
												t.goPages("/pages/auth/login")
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
			},
			
		}
	}
</script>

<style>
	@import url("../../css/auth.css");
</style>
