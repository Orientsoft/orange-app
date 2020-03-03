<template>
	<view class="container">
		<view>
			<cu-custom :isBack="true" bgColor="container title-orange">
				<block slot="backText"><text class="title-black">订单详情</text></block>
			</cu-custom>
		</view>
		<image style="width: 100%;margin-bottom: -300upx;height: 350upx" src="../../../static/home/head_bg_order.png" mode="scaleToFill"></image>
		<view class="harf-top">
			
			<!-- 信息 -->
			<view class="card">
				<view class="cro_left_bottom"></view>
				<view class="cro_right_bottom"></view>
				<view class="card2 flex align-end">
					<view class="card-desc flex-sub self-stretch">
						<view class="card-title">{{info.name}}</view>
						<view>{{info.desc_1}}</view>
						<view>{{info.desc_2}}</view>
						<view class="active-price">¥<text class="card-active-price">&ensp;{{info.price}}</text><text class="card-desc">¥{{info.sale}}</text></view>
						<view>已售{{info.volume}}</view>
					</view>
					<image :src="info.logo" class="card-logo" mode="aspectFit"></image>
				</view>	
			</view>
			
					
			<view class="info-border-top"></view>
			<!-- 用户信息 -->
			<view class="card">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view class="name-connect">付款方式</view>
					<radio-group @change="radioChange" style="width: 100%;">
						<view class="flex justify-between input-v">
							<view class="flex align-center">
								<image src="../../../static/charge-old/telephone_expense.png" class="icon-pay"></image>
								<text class="name-connect">微信</text>
							</view>
							<label class="radio">
								<radio :value="channelList[0]" :checked="channel==channelList[0]"/>
							</label>
						</view>
						<view class="flex justify-between input-v">
							<view class="flex align-center">
								<image src="../../../static/charge-old/telephone_expense.png" class="icon-pay"></image>
								<text class="name-connect">支付宝</text>
							</view>
							<label class="radio">
								<radio :value="channelList[1]" :checked="channel==channelList[1]"/>
							</label>
						</view>
					</radio-group>
				</view>
				
			</view>
			
			<view class="space-s"></view>
			<!-- 付款方式 -->
			<!-- <view class="card-pay">
				<view>
					<view class="flex input-v">
						<view class="name-connect">联系人:</view>
						<input placeholder="(必填)请填写联系人姓名" placeholder-style="font-size:12px;color:#bbb" :value="name" @input="onName"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect">联系电话:</view>
						<input :value="phone" @input="onPhone" type="number" placeholder="(必填)请填写联系人电话" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="space-s"></view>
				</view>
			</view> -->
		
		
		
		<!-- 底部 -->
		<view class="flex padding-tb-sm padding-lr-lg" style="background: #fcfcfc;position: fixed;bottom: 0;justify-content: space-between;width: 100%;animation: show 2s  ;z-index: 1000;">
			<view class="active-price">¥<text class="card-active-price">{{info.price}}</text></view>
			<view @click="doBuy()" class="order-btn text-center text-white">提交订单</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				info:{},
				payIndex:1,
				name:'',
				phone:'',
				channel:'WEIXINPAY',
				channelList:['WEIXINPAY','ALIPAY']
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
		},
		methods: {
			...mapMutations(['TO','S','P']),
			onPhone(e){
				this.phone = e.target.value;
			},
			onName(e){
				this.name = e.target.value;
			},
			radioChange(e){
				console.log(e.target.value);
				// this.payIndex = index;
				this.channel = e.target.value;
			},
			goPages(){
				let t = this;
				uni.navigateTo({
					url:'/pages/my/order/orderInfo?id='+t.id
				})
			},
			getInfo(){
				let t=this;
				t.S({
					url:"product/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								t.info = res.data.data
							}else{
								console.log(JSON.stringify(res));
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
				})
			},
			doBuy(){
				let t = this;
				// if(!t.name){
				// 	t.$utils.msg("请输入联系人");
				// 	return
				// }
				// if(t.$utils.checkStr(t.phone,'phone')){
				// 	t.$utils.msg("请输入正确的手机号码");
				// 	return;
				// }
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.P({
							url:'buy/product',
							data:{phone:t.phone,name:t.name,channel:t.channel,id:t.id},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res));
								if(res.statusCode===200){
									if(res.data.status==1){
										t.id = res.data.data.id;
										setTimeout(()=>{
											t.goPages()
										},100)
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
	@import url("../../../css/mall.css");
</style>
