<template>
	<view>
		<view>
			<cu-custom :isBack="true" bgColor="container title-orange">
				<block slot="backText"><text class="title-black">合作伙伴认证</text></block>
			</cu-custom>
		</view>
		
		<view class="harf-top">
			<!-- 用户信息 -->
			<view class="padding-tb-sm align-center bg-orange-lg padding-lr-lg">
				<view v-if="!status" class="top-status"><text class="cuIcon-info margin-right-sm"></text>{{userInfo.status}} <text v-if="userInfo.status=='认证失败'">{{userInfo.reason}}</text></view>
			</view>
			<view class="card">
				<view>
					<view class="flex input-v">
						<view class="name-connect">医院名称:</view>
						<input @input="onName" :value="name" style="flex: 1;" placeholder="医院全称" placeholder-style="font-size:15px;color:#bbb"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect flex-sub">营业执照编号:</view>
						<input class="flex-twice" :value="idcard" @input="onIdCard" placeholder="2009092DBGC988" placeholder-style="font-size:15px;color:#bbb"/>
					</view>
					<view class="input-image">
						<view class="name-connect">营业执照:</view>
						<view class="flex justify-between">
							<image @click="goChoose" :src="selectImages" class="image-select" mode="aspectFill"></image>
							<image v-if="status" src="../../static/mall-old/demo_product.png" class="image-select" mode="aspectFill"></image>
							<image v-if="!status" :src="userInfo.doc[0]" class="image-select" mode="aspectFill"></image>
						</view>
					</view>
					<view class="input-image">
						<view class="name-connect">授权委托书:</view>
						<view class="flex justify-between">
							<image @click="goChoose2" :src="selectImages2" class="image-select" mode="aspectFill"></image>
							<image v-if="status" src="../../static/mall-old/demo_product.png" class="image-select" mode="aspectFill"></image>
							<image v-if="!status" :src="userInfo.doc[1]" class="image-select" mode="aspectFill"></image>
						</view>
					</view>
					<view class="space-m"></view>
					<view v-if="userInfo.status!='待审核'&& userInfo.status!='已认证'" @click="upload" class="long-bg">提交申请</view>
				</view>
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
				id:'',
				modalName:'',
				modalName2:'',
				count:1,
				selectImages:'',
				selectImages2:'',
				doc:[],
				idcard:'',
				name:'',
				userInfo:{},
				status:0,
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.userInfo = this.app.User;
			this.status = (this.userInfo.status == '未认证')
			if(!this.status){
				this.name = this.userInfo.name;
				this.idcard = this.userInfo.idcard;
			}
		},
		methods: {
			...mapMutations(['TO','S','PUT','P']),
			onIdCard(e){
				this.idcard = e.target.value;
			},
			onName(e){
				this.name = e.target.value;
				console.log('认证参数',this.name);
			},
			toCert(){
				
				let t = this;
				
				console.log('认证参数',t.name,t.idcard);
				uni.showLoading({
					title:"提交申请中...",
					mask: true,
					success:function(){
						t.P({
							url:"cert",
							data:{
								name:t.name,
								idcard:t.idcard,
								doc:t.doc
							},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res))
								
								if(res.statusCode===200){
									if(res.data.status==1){
										t.$utils.msg('提交申请成功,等待审核')
										t.userInfo.status = '待审核'
										t.status = 0
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
			goChoose(){
				let t = this;
				uni.chooseImage({
					count: t.count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						t.selectImages = res.tempFilePaths[0];
					}
				});
			},
			goChoose2(){
				let t = this;
				uni.chooseImage({
					count: t.count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						t.selectImages2 = res.tempFilePaths[0];
					}
				});
			},
			doupload(file,succ){
				let t=this;
				uni.showLoading({
					title:"上传中...",
					mask: true,
					success:function(){
						uni.uploadFile({
							url: 'http://testland.orientsoft.cn:7777/api/v1/upload', //仅为示例，非真实的接口地址
							filePath: file,
							name: 'file',
							header:{
								"AccessToken": t.app.token.access_token,
								"Content-Type": "multipart/form-data",
								},
							success: (res) => {
								uni.hideLoading();
								console.log(res.data);
								let json = JSON.parse(res.data);
								t.doc.push(json.data[0]);
								succ();
							}
						});
					}
				})
			},
			upload(){
				if(!this.name){
					this.$utils.msg("请输入医院名称");
					return;
				}
				if(!this.idcard){
					this.$utils.msg("请输入营业执照编号");
					return;
				}
				if(!this.selectImages){
					this.$utils.msg("请选择营业执照")
					return;
				}
				if(!this.selectImages2){
					this.$utils.msg("请选择授权委托书")
					return;
				}
				
				let t=this;
				console.log(t.selectImages)
				// File imgFile = new File(t.selectImages[0].path);
				t.doupload(t.selectImages,()=>{
					t.doupload(t.selectImages2,()=>{
						t.toCert();
					});
				});
				
			}
		}
	}
</script>

<style>
	@import url("../../../css/mall.css");
	page{
		background-color: #FFFFFF;
	}
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
