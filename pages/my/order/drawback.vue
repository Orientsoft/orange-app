<template>
	<view class="container bg-white">
		<view>
			<cu-custom :isBack="true" bgColor="container title-orange">
				<block slot="backText"><text class="title-black">退款</text></block>
			</cu-custom>
		</view>
		
		<view class="harf-top">
			<!-- 信息 -->
			<view class="card">
				<view class="cro_left_bottom"></view>
				<view class="cro_right_bottom"></view>
				<view class="flex align-end">
					<view class="card-desc flex-sub self-stretch">
						<view class="card-title">{{info.product.name}}</view>
						<view>{{info.desc_1}}</view>
						<view>{{info.desc_2}}</view>
					</view>
					<image :src="info.product.logo" class="card-logo" mode="aspectFit"></image>
				</view>	
			</view>
			
					
			<view class="info-border-top"></view>
			<!-- 用户信息 -->
			<view class="card">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view>
					<view class="flex input-v">
						<view class="name-connect">退款原因:</view>
						<input :value="reasonIndex" disabled style="flex: 1;" placeholder="请选择" placeholder-style="font-size:12px;color:#bbb"/>
						<view @click="showModal" class="more-right"><text class="cuIcon-right"></text></view>
					</view>
					<view class="flex input-v">
						<view class="name-connect">退款金额:</view>
						<view class="active-price" style="flex: 1;text-align: right;">¥<text class="card-active-price">&ensp;{{info.price}}</text></view>
					</view>
					<view class="input-image">
						<view class="name-connect">退款说明:</view>
						<textarea :value="remark" @input="onRemark" style="height: 80px;" placeholder="退款说明" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="input-image">
						<view class="name-connect">上传凭证:</view>
						<image @click="goChoose" :src="selectImages[0].data" class="image-select" mode="aspectFill"></image>
					</view>
					<view class="space-m"></view>
					<view @click="upload" class="long-bg">提交申请</view>
				</view>
			</view>
			
		</view>
		
		<!-- 选择地址 -->
		<view class="cu-modal bottom-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择原因</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<scroll-view class="padding-bottom" style="height: 500upx;" scroll-y="true">
					<radio-group @change="radioChange" style="width: 100%;">
					<view v-for="(item,index) in reasons" :key="index" class="flex align-center store-v store-item">
						<view class="margin-left-sm margin-right-lg" style="flex-grow: 1;">
							<view class="card-title text-left">{{item}}</view>
						</view>
						<label class="radio">
							<radio :value="item" :checked="reasonIndex==item" />
						</label>
					</view>
					</radio-group>
					
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { pathToBase64, base64ToPath } from '../../../js_sdk/image-tools/index.js'
	export default {
		computed: {...mapState(['app','inter'])},
		data() {
			
			return {
				id:'',
				info:{},
				modalName:'',
				modalName2:'',
				count:1,
				selectImages:[{
					data:''
				}],
				reasons:[
					'买错了',
					'没时间',
					'改变想法',
					'其他原因',
				],
				reasonIndex:'买错了',
				remark:'',
				isChoose:false,
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
		},
		methods: {
			...mapMutations(['TO','S','PUT','P']),
			onRemark(e){
				this.remark = e.target.value;
			},
			showModal(){
				this.modalName='Modal';
			},
			hideModal(){
				this.modalName='';
			},
			radioChange(e){
				console.log(e);
				// this.payIndex = index;
				this.reasonIndex = e.target.value;
				console.log( e.target.value);
				this.hideModal()
			},
			goPages(){
				let t = this;
				uni.navigateTo({
					url:'/pages/my/order/orderInfo?id='+t.id
				})
			},
			drawback(picUrl){
				let t=this;
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.PUT({
							url:"order",
							data:{
								id:t.id,
								reason:t.reasonIndex,
								pic:picUrl,
								remark:t.remark
							},
							callback:function(res){
								if(res.statusCode===200){
									console.log(JSON.stringify(res))
									if(res.data.status==1){
										t.$utils.msg(res.data.message)
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
			goChoose(){
				let t = this;
				uni.chooseImage({
					count: t.count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						
						t.selectImages = [];
						res.tempFilePaths.forEach((item,index)=>{
							var path= plus.io.convertLocalFileSystemURL(item);
							pathToBase64(path)
							.then(data=>{
								console.log(data.length);
								let tmpdata = data.substr(1);
								tmpdata = tmpdata.substr(0,tmpdata.length-1);
								// console.log(tmpdata);
								console.log(tmpdata.length);
								t.isChoose = true;
								t.selectImages.push({
									data:tmpdata,
									path:item
								});
							})
						})
					}
				});
			},
			///upload
			upload(){
				if(!this.isChoose){
					this.isChoose = false;
					this.drawback('');
					return;
				}
				console.log(this.selectImages[0].path)
				let t = this;
				// File imgFile = new File(t.selectImages[0].path);
				uni.showLoading({
					title:"上传中...",
					mask: true,
					success:function(){
						uni.uploadFile({
							url: 'http://testland.orientsoft.cn:7777/api/v1/upload', //仅为示例，非真实的接口地址
							filePath: t.selectImages[0].path,
							name: 'file',
							header:{
								"AccessToken": t.app.token.access_token,
								"Content-Type": "multipart/form-data",
								},
							success: (res) => {
								console.log(res.data);
								let json = JSON.parse(res.data);
								t.drawback(json.data[0]);
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../../css/mall.css");
	
	.store-item{
		border-bottom: 1upx solid #f0f0f0;
		padding-top: 10upx;
		padding-bottom: 10upx;
	}
	
	.input-image{
		border-bottom: 1upx solid #f0f0f0;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
	
	.image-select{
		height: 220upx;
		width: 220upx;
		margin-top: 20upx;
	}
</style>
