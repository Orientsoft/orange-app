<template>
	<view class="page">
		<cu-custom :isBack="true" bgColor="title-orange">
			<block slot="backText"></block>
		</cu-custom>
		<!-- logo -->
		<view class="flex reg-v">
			<view class="input-v">
				<view class="reg-title"><text>手机号注册</text></view>
				<view class="reg"><text class="color_666"> 亲，欢迎注册橙子账号</text></view>
			</view>
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
					<input class="flex-sub" type="number" placeholder="输入验证码" placeholder-style="color:#bbb;font-size:15px" :value="code" @input="onCode"/>
					<text v-if="isSend" @tap="getCode" class="code-str">获取验证码</text>
					<text v-if="!isSend" @tap="sendSms2" class="color_grey">验证码已发送 {{timeClock}} S</text>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="reg" class="text-center login-bg input-v">
				<text class="login-text">提交</text>
			</view>
			
			<view class="space-s"></view>
			<view class="flex align-center justify-between text-center input-v">
				<view class="margin-left-sm" @click="goPages('/pages/auth/regRules')">
					<text class="reg">已阅读并同意以下协议：<text class="code-str">&nbsp;隐私权政策</text></text>
				</view>
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
			onCode(e){
				this.code = e.target.value;
			},
			goPages(url){
				this.TO({
					url:url
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
										if(res.data.status==1){
											t.$utils.msg("发送验证码成功");
											t.startTimeClock();
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
			reg(){
				// this.goPages("/pages/auth/reg2")
				let params = 'account='+this.account+'&code='+this.code
				this.TO({
					url:"/pages/auth/reg2?"+params
				})
			}
		}
	}
</script>

<style>
	@import url("../../css/auth.css");
</style>
