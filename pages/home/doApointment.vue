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
					<input disabled :value="name" class="flex-sub" @input="onName" placeholder="请选择" placeholder-style="font-size:12px;color:#bbb"/>
					<view @click="showModal" class="more-right margin-right-sm text-lg padding"><text class="cuIcon-right"></text></view>
				</view>
				<view class="space-s"></view>
				
			</view>
			<view class="space-m"></view>
			<view @click="onSave" class="long-bg margin-lr-lg">提交预约</view>
		
			<view class="cu-modal bottom-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">请选择预约人</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<scroll-view class="padding-bottom" style="height: 500upx;" scroll-y="true">
						<radio-group @change="radioChange" style="width: 100%;">
						<view v-for="(item,index) in memberList" :key="index" class="flex align-center store-v store-item">
							<view class="card-title text-left flex-sub padding-tb-sm">{{memberList[index].name}}</view>
							<view class="card-title text-left flex-sub">{{memberList[index].phone}}</view>
							<label class="radio">
								<radio :value="'+'+index+'+'" :checked="selectItem.name==memberList[index].name" />
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
	export default {
		computed: {...mapState(['app','inter'])},
		data() {
			return {
				userInfo: {},
				phone:'',
				name:'',
				remark:'',
				content:'',
				selectItem:{
					name:'',
					phone:''
				},
				memberList:[],
				modalName:''
			}
		},
		onLoad() {
		},
		onShow() {
			this.userInfo = this.app;
			this.memberList = this.userInfo.User.members;
			console.log(this.userInfo)
			if(!this.memberList){
				this.memberList = []
				this.memberList.push({
					name:'张三',
					phone:'16789076654'
				})
			}
			
			if(!this.userInfo.token){
				this.$utils.msg("您没有登陆，请先登陆");
			}
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
			showModal(){
				this.modalName='Modal';
			},
			hideModal(){
				this.modalName='';
			},
			radioChange(e){
				console.log(e.target.value);
				let index = parseInt(e.target.value);
				this.selectItem = this.memberList[index];
				this.name = this.selectItem.name;
				this.phone = this.selectItem.phone;
				this.hideModal()
			},
			clear(){
				this.name = '';
				this.phone = '';
				this.content = '';
				this.remark = '';
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
										t.$utils.msg("已经帮你预约，请注意接听预约确认电话");
										t.clear();
									}else{
										t.$utils.msg(res.data.message);
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
