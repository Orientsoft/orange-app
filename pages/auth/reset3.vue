<template>
	<view class="container">
		<!-- logo -->
		<view class="flex reg-v">
			<view class="input-v" style="width: 100%;">
				<view class="reg-title"><text>完成</text></view>
				<view class="flex justify-around margin-top-lg">
					<view class="align-center reset-progress">
						<view>1</view>
						<view>请输入手机号码</view>
					</view>
					<view class="align-center reset-progress">
						<view>2</view>
						<view>请重置密码</view>
					</view>
					<view class="align-center reset-progress-active">
						<view>3</view>
						<view>完成</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 登陆 -->
		<view class="center-v">
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
				password:'',
			}
		},
		beforeMount(){
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
			setPasswd(){
				this.goPages("/pages/auth/login")
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
