<template>
	<view>
		<view>
			<cu-custom :isBack="true" bgColor="container title-orange">
				<block slot="backText"><text class="title-black">订单详情</text></block>
			</cu-custom>
		</view>
		
		<image style="width: 100%;margin-bottom: -320upx;height: 350upx" src="../../../static/home/head_bg_order.png" mode="scaleToFill"></image>
		<view class="harf-top">
			<view class="store-v padding-tb-sm align-center">
				<view class="top-status"><text class="cuIcon-info margin-right-sm"></text>{{statusArr[info.status].name}}</view>
				<view v-if="info.status==0" class="top-status-s">剩余23小时59分28秒关闭订单</view>
			</view>
			<!-- 信息 -->
			<view class="card card-none">
				<view class="cro_left_bottom"></view>
				<view class="cro_right_bottom"></view>
				<view class="flex align-end">
					<view class="card-desc flex-sub self-stretch">
						<view class="card-title">{{info.product.name}}</view>
						<view class="active-price">¥<text class="card-active-price">&ensp;{{info.price}}</text></view>
					</view>
					<image :src="info.product.logo" class="card-logo" mode="aspectFit"></image>
				</view>	
			</view>
			
					
			<view class="info-border-top"></view>
			<!-- 用户信息 未付款，待预约-->
			<view v-if="info.status == 0||info.status == 1||info.status == 6||info.status == 7" class="card card-none">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view>
					<view class="name-connect">订单信息</view>
					<view class="space-s"></view>
					<view class="flex text-v">
						<view class="info">订单编号:</view>
						<view class="info">{{info.id}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">下单时间:</view>
						<view class="info">{{$utils.dateUtils.format(info.updatedAt)}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">联系电话:</view>
						<view class="info">{{info.connect.phone}}</view>
					</view>
					<view class="space-s"></view>
					<view class="flex justify-end align-end">
						<view class="info">共一件商品需支付:</view>
						<view class="active-price">¥<text class="card-active-price">{{info.price}}</text></view>
					</view>
					<view class="space-s"></view>
				</view>
			</view>
			<!-- 待挂号 -->
			<view v-if="info.status == 2" class="card card-none">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view>
					<view class="name-connect">预约信息</view>
					<view class="space-s"></view>
					<view class="flex text-v">
						<view class="info">预约门店:</view>
						<view class="info">{{info.appointment.address}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">预约时间:</view>
						<view class="info">{{$utils.dateUtils.format(info.appointment.orderAt)}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">预约人:</view>
						<view class="info">{{info.appointment.name}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">预约电话:</view>
						<view class="info">{{info.appointment.phone}}</view>
					</view>
					<view class="space-s"></view>
					<view class="flex justify-center align-center">
						<view class="flex-sub text-center title-orange"><text class="cuIcon-location"></text><text @click="openMap" class="text-black">地图导航</text></view>
						<view class="flex-sub text-center title-orange"><text class="cuIcon-phone"></text><text class="text-black">联系电话</text></view>
					</view>
					<view class="space-s"></view>
				</view>
			</view>
			
			<!-- 二维码 待使用-->
			<view v-if="info.status == 3" class="card card-none">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view class="align-center justify-center flex">
					<tki-qrcode
					    ref="qrcode"
					    :cid="cid"
						:val="val"
						:size="size"
						:unit="unit"
						:background="background"
						:foreground="foreground"
						:pdground="pdground"
						:icon="icon"
						:iconSize="iconsize"
						:lv="lv" 
						:onval="onval"
						:loadMake="loadMake"
						:showLoading="showLoading"
						:loadingText="loadingText"
					    @result="qrR" />
				</view>
			</view>
			<!-- 待评价，已完成 -->
			<view v-if="info.status == 4 || info.status == 5" class="card card-none">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view class="flex text-v">
					<view class="info">使用门店:</view>
					<view class="info">{{info.appointment.address}}</view>
				</view>
				<view class="flex text-v">
					<view class="info">使用时间:</view>
					<view class="info">{{info.appointment.updatedAt}}</view>
				</view>
				<view class="flex text-v">
					<view class="info">使用人:</view>
					<view class="info">{{info.appointment.name}}</view>
				</view>
				<view class="flex text-v">
					<view class="info">使用人电话:</view>
					<view class="info">{{info.appointment.phone}}</view>
				</view>
				<view class="space-s"></view>
				<view @click="goCase" class="long-bg" style="margin-left: 100upx;margin-right: 100upx;">查看报告</view>
			</view>
			<view class="space-m"></view>
			<!-- 订单信息 -->
			<view v-if="info.status >= 2 && info.status < 6" class="card card-none">
				<view>
					<view class="name-connect">订单信息</view>
					<view class="space-s"></view>
					<view class="flex text-v">
						<view class="info">订单编号:</view>
						<view class="info">{{info.id}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">下单时间:</view>
						<view class="info">{{$utils.dateUtils.format(info.updatedAt)}}</view>
					</view>
					<view class="flex text-v">
						<view class="info">联系电话:</view>
						<view class="info">{{info.connect.phone}}</view>
					</view>
					<view class="space-s"></view>
					<view class="flex justify-end align-end">
						<view class="info">共一件商品需支付:</view>
						<view class="active-price">¥<text class="card-active-price">{{info.price}}</text></view>
					</view>
					<view class="space-s"></view>
				</view>
			</view>
			<view v-if="info.status == 4">
				<view class="card">
					<view>
						<view class="name-connect">评价:</view>
						<textarea :value="comment" @input="onComment" style="height: 80px;" placeholder="使用者姓名" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="space-s"></view>
					<view @click="goComment" class="long-bg" style="margin-left: 100upx;margin-right: 100upx;">提交</view>
				</view>
				<view class="space-m"></view>
			</view>
			
			
			<view v-if="info.status == 5">
				<view class="space-m"></view>
				<view class="card">
					<view>
						<view class="flex justify-between margin-bottom-sm">
							<view class="flex align-center">
								<image :src="commServer.commentLogo" mode="scaleToFill" class="comment-logo margin-right-sm"></image>
								<view>{{commServer.commentName}}</view>
							</view>
						</view>
						<view>{{commServer.comment}}</view>
						<view class="card-desc">{{$utils.dateUtils.format(commServer.commentAt)}}</view>
					</view>
					<view class="space-s"></view>
					<view v-if="commServer.answer">
						<view class="flex justify-between margin-bottom-sm">
							<view class="card-desc"></view>
							<view class="flex align-center">
								<image :src="commServer.answerLogo" mode="scaleToFill" class="comment-logo margin-right-sm"></image>
								<view>{{commServer.answerName}}</view>
							</view>
						</view>
						<view class="justify-end text-right">{{commServer.answer}}</view>
						<view class="card-desc text-right">{{$utils.dateUtils.format(commServer.answerAt)}}</view>
					</view>
				</view>
				<view class="space-m"></view>
			</view>
		</view>
		
		
		<view class="space-l"></view>
		<view class="space-l"></view>
		<!-- 底部 -->
		<view v-if="info.status < 4" class="flex padding-tb-sm padding-lr-lg price-foot" >
			<view class="active-price"></view>
			<view v-if="info.status==1||info.status==2" @click="drawBack()" class="drawback-btn">退款</view>
			<view v-if="info.status==2" @click="cancelApt()" class="drawback-btn">取消预约</view>
			<view v-if="info.status==2" @click="goPagesById('/pages/my/order/appointmentModify',id)" class="drawback-btn">修改预约</view>
			<view v-if="info.status==0" @click="goPay()" class="order-btn text-center text-white">去支付</view>
			<view v-if="info.status==1" @click="goPagesById('/pages/my/order/appointment',id)" class="order-btn text-center text-white">预约时间</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {tkiQrcode},
		data() {
			return {
				id:'',
				statusArr:[
					{
						value:0,
						name:'待支付'
					},
					{
						value:1,
						name:'待预约'
					},
					{
						value:2,
						name:'待挂号'
					},
					{
						value:3,
						name:'待使用'
					},
					{
						value:4,
						name:'待评价'
					},
					{
						value:5,
						name:'已完成'
					},
					{
						value:6,
						name:'已关闭'
					},
					{
						value:7,
						name:'已退款'
					},
				],
				info:{status:0,
					product:{
						name:'',
						desc_1:'',
						desc_2:'',
						logo:''
					},
					connect:{
						name:'',
						phone:''
					}
				},
				payIndex:1,
				comment:"",
				commServer:"",
				cid:'qrcode',
				val: '二维码', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				showLoading:true,
				loadingText:'生成中...',
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
		},
		methods: {
			...mapMutations(['TO','S','P','DEL']),
			onComment(e){
				this.comment = e.target.value;
			},
			radioChange(e){
				console.log(e);
				// this.payIndex = index;
			},
			drawBack(){
				let t = this;
				uni.navigateTo({
					url:'/pages/my/order/drawback?id='+t.id
				})
			},
			openMap(){
				let t=this;
				t.S({
					url:"hospital/"+t.info.appointment.hospId,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								let hosp = res.data.data;
								uni.openLocation({
									latitude: hosp.latitude,
									longitude: hosp.longitude,
									success: function () {
										console.log('success');
									}
								})
							}else{
								console.log(JSON.stringify(res));
							}
						}else{
							if(res.data.status==2){
								t.TO({
									url:'/pages/auth/login'
								})
							}else{
								t.$utils.msg(res.data.message);
							}
						}
					}
				})
			},
			qrR(res) {
				this.src = res
			},
			goPay(){
				
			},
			goPagesById(url,id){
				let t = this;
				uni.navigateTo({
					url:url+'?id='+id
				})
			},
			goComment(){
				let t= this;
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.P({
							url:'order/comment',
							data:{
								id: t.id,
								comment: t.comment
							},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res));
								if(res.statusCode===200){
									if(res.data.status==1){
										t.$utils.msg(res.data.message);
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
			goCase(){
				let params = 'id='+this.id;
				uni.navigateTo({
					url:'./orderCase'+'?'+params
				})
			},
			cancelApt(){
				let t=this;
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.DEL({
							url:'appointment/product/'+t.id,
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res));
								if(res.statusCode===200){
									if(res.data.status==1){
										t.$utils.msg(res.data.message);
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
			doScan(){
				let t=this;
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.P({
							url:'order/scan',
							data:{id:t.id},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res));
								if(res.statusCode===200){
									if(res.data.status==1){
										t.$utils.msg(res.data.message);
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
			getInfo(){
				let t=this;
				t.S({
					url:"order/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								t.info = res.data.data
								t.val = t.info.id
								if(t.info.status == 5){
									t.getComment();
								}
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
			getComment(){
				let t=this;
				t.S({
					url:"order/comment/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								t.commServer = res.data.data
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
			}
		}
	}
</script>

<style>
	@import url("../../../css/mall.css");
</style>
