<template>
	<view class="container">
		<cu-custom :isBack="true" bgColor="title-orange">
			<block slot="backText"></block>
		</cu-custom>
		<!-- top -->
		<view class="flex reg-v">
			<view class="input-v" style="width: 100%;">
				<view class="reg-title"><text>找回密码</text></view>
				
				<view class="flex justify-around margin-top-lg">
					<view class="align-center reset-progress-active">
						<view class="font_fb font-sx">1</view>
						<view>请输入手机号码</view>
					</view>
					<view class="align-center reset-progress ">
						<view class="font-sx font_fb">2</view>
						<view>请重置密码</view>
					</view>
					<view class="align-center reset-progress ">
						<view class="font-sx font_fb">3</view>
						<view>完成</view>
					</view>
				</view>
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
					<input class="flex-sub" type="number" placeholder="输入验证码" placeholder-style="color:#bbb;font-size:15px" :value="code" @input="onPasswd"/>
					<text v-if="isSend" @tap="getCode" class="code-str">获取验证码</text>
					<text v-if="!isSend" @tap="sendSms2" class="color_grey font_14">验证码已发送 {{timeClock}} s</text>
				</view>
				<view class="input-line"></view>
			</view>
			
			<view class="space-l"></view>
			<view @tap="reg" class="text-center login-bg input-v">
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
				t.$utils.msg("发送验证码成功");
				t.startTimeClock();
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.S({
								url:'code',
								data:{phone:t.account,event:'reset'},
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
			reg(){
				let params = 'account='+this.account+'&code='+this.code
				this.TO({
					url:'/pages/auth/reset2?'+params
				})
			}
		}
	}
</script>

<style>
	@import url("../../css/auth.css");
</style>
