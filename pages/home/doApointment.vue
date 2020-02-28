<template>
	<view>
			<view>
				<cu-custom :isBack="true" bgColor="container title-orange">
					<block slot="backText"><text class="title-black">精准预约</text></block>
				</cu-custom>
			</view>
			
			<view class="margin-lr-item card" style="padding: 0;">
				<view class="cro_left_bottom"></view>
				<view class="cro_right_bottom"></view>
				<image class="image-adv" mode="scaleToFill" src="../../static/home/doap_top.png"></image>
			</view>
			<view class="info-border-top"></view>
			<view class="margin-lr-item card">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view class="flex input-v">
					<view class="name-connect">预约项目:</view>
					<input placeholder="如洁牙" placeholder-style="font-size:12px;color:#bbb" :value="content" @input="onContent"/>
				</view>
				<view class="flex input-v">
					<view class="name-connect">备注:</view>
					<input :value="remark" @input="onRemark" placeholder="请选择" placeholder-style="font-size:12px;color:#bbb"/>
				</view>
				<view class="flex input-v">
					<view class="name-connect">预约人:</view>
					<input :value="name" @input="onName" placeholder="请选择" placeholder-style="font-size:12px;color:#bbb"/>
				</view>
				<view class="space-s"></view>
				
			</view>
			<view class="space-m"></view>
			<view @click="onSave" class="long-bg margin-lr-lg">提交预约</view>
		
			
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
				remark:'',
				content:''
			}
		},
		onLoad() {
		},
		onShow() {
			// this.loadData();
			// this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','P']),
			onPhone(e){
				this.phone = e.target.value;
			},
			onName(e){
				this.name = e.target.value;
			},
			onRemark(e){
				this.remark = e.target.value;
			},
			onContent(e){
				this.content = e.target.value;
			},
			onSave(){
				let t = this;
				if(!t.name){
					t.$utils.msg("请输入联系人");
					return
				}
				if(!t.content){
					t.$utils.msg("请输入预约项目");
					return
				}
				// if(t.$utils.checkStr(t.phone,'phone')){
				// 	t.$utils.msg("请输入正确的手机号码");
				// 	return;
				// }
				uni.showLoading({
					title:"提交中。。。",
					mask: true,
					success() {
						t.P({
							url:'appointment',
							data:{phone:t.phone,name:t.name,remark:t.remark,content:t.content},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res));
								if(res.statusCode == 200){
									if(res.data.status==1){
										// t.id = res.data.data.id;
										t.$utils.msg("提交成功,会尽快为您预约");
										
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
