<template>
	<view>
			<view>
				<cu-custom :isBack="true" bgColor="container title-orange">
					<block slot="backText"><text class="title-black">家庭成员</text></block>
				</cu-custom>
			</view>
			
			<view class="margin-lr-item card margin-top">
				<view class="flex input-v">
					<view class="name-connect">姓名:</view>
					<input placeholder="家庭姓名" placeholder-style="font-size:12px;color:#bbb" :value="name" @input="onName"/>
				</view>
				<view class="flex input-v">
					<view class="name-connect">电话:</view>
					<input :value="phone" @input="onPhone" type="number" placeholder="成员电话" placeholder-style="font-size:12px;color:#bbb"/>
				</view>
				<view class="input-v">
					<view class="input-v flex align-end">
						<view class="name-connect">验证码:</view>
						<input class="flex-sub" type="number" placeholder="输入验证码" placeholder-style="color:#bbb;font-size:12px" :value="code" @input="onCode"/>
						<text v-if="isSend" @tap="getCode" class="code-str">获取验证码</text>
						<text v-if="!isSend" @tap="sendSms2" class="forget">验证码已发送{{timeClock}}s</text>
					</view>
				</view>
				
				<view class="space-s"></view>
			</view>
			<view class="flex justify-end margin-top-sm margin-right-lg">
				<view @click="onSave" class="order-btn text-center text-white">保存</view>
			</view>
			
			<view class="margin-lr-item card margin-top">
				<view class="card-title">我的家庭成员</view>
				
				<view v-for="(item,index) in list" :key="index" class="flex input-v">
					<view class="flex-sub">
						<view class="name-connect">{{item.name}}</view>
						<view class="card-desc">{{item.phone}}</view>
					</view>
					<view @click="onDel(item)" class="del-btn">删除</view>
				</view>
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
				phone:'',
				name:'',
				code:'',
				list:[
					{name:'张三',phone:'138574885'},
					{name:'李四',phone:'138574885'},
				],
				isSend:true,
				timeClock:0,
				timeInterval:null,
			}
		},
		onLoad() {
		},
		onShow() {
			this.loadData();
			// this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','SET','P','DEL']),
			onPhone(e){
				this.phone = e.target.value;
			},
			onName(e){
				this.name = e.target.value;
			},
			onCode(e){
				this.code = e.target.value;
			},
			sendSms2(){
				this.$utils.msg("短信验证码已发送，请稍后重试");
			},
			loadData(){
				let t = this;
				t.S({
						url:'user/me',
						callback:function(res){
							console.log(JSON.stringify(res.data));
							if(res.statusCode===200){
								if(res.data.status==1){
									t.list = res.data.data.members;
								}else{
									t.$utils.msg(res.data.message);
								}
							}else{
								t.$utils.msg(res.errMsg);
							}
						}
					})
			},
			onSave(){
				let t = this;
				if(!t.name){
					t.$utils.msg("请输入联系人");
					return
				}
				
				if(!t.code){
					t.$utils.msg("请输入验证码");
					return
				}
				
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.P({
								url:'user/member',
								data:{phone:t.phone,name:t.name,code:t.code},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											clearInterval(t.timeInterval);
											t.timeInterval = 0;
											t.isSend = true;
											t.list.push({
												name: t.name,
												phone: t.phone
											})
											t.$utils.msg("添加成功");
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
			onDel(item){
				let t = this;
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.DEL({
								url:'user/member',
								data:{phone:item.phone,name:item.name},
								callback:function(res){
									uni.hideLoading();
									console.log(JSON.stringify(res.data));
									if(res.statusCode===200){
										if(res.data.status==1){
											t.loadData();
											t.$utils.msg("删除成功");
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
			getCode(){
				let t=this;
				if(!t.$utils.checkStr(t.phone,'phone')){
					t.$utils.msg("请输入正确的手机号码");
					return;
				}
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success:function(){
						t.S({
								url:'code',
								data:{phone:t.phone,},
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
			}
		}
	}
</script>

<style>
	@import url("../../css/mall.css");
	.image-adv{
		height: 400upx;
		border-radius: 8upx;
		width: 100%;
	}
	.text-adv{
		height: 100upx;
		margin-top: -100upx;
		background: #FFFFFF;
		position: relative;
		padding-left: 20upx;
		padding-right: 20upx;
	}
	
	.item-desc{
		padding-top: 10upx;
		padding-bottom: 10upx;
	}
	.item-line{
		margin-top: 20upx;
		margin-bottom: 20upx;
		background-color: #F0F0F0;
		height: 1upx;
	}
	
	.card-list-adv{
		background: #FFFFFF;
		border-radius: 30upx;
		/* border: 1upx solid #F49100; */
		box-shadow:inset 0upx 0upx  10upx #F0F0F0;
		margin-bottom: 40upx;
		position: relative;
	}
</style>
