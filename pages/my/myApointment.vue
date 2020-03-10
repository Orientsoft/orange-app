<template>
	<view>
			<view>
				<cu-custom :isBack="true" bgColor="container title-orange">
					<block slot="backText"><text class="title-black">我的精准预约</text></block>
				</cu-custom>
			</view>
			
			<view v-for="(item,index) in list" :key="index" class="margin-lr-item card margin-top">
				<view class="card-desc flex-sub">创建时间:{{$utils.dateUtils.format(item.createdAt)}}</view>
				<view class="flex align-center">
					<view class="margin-left-sm margin-top-sm flex-sub">
						<view class="flex">
							<view class="card-desc margin-right-lg">预约项目</view>
							<view class="name-connect flex-treble">{{item.content}}</view>
						</view>
						<view class="flex">
							<view class="card-desc margin-right-lg">推荐医院</view>
							<view class="name-connect flex-treble">{{item.hospName==null?'待定':item.hospName}}</view>
						</view>
						<view class="flex">
							<view class="card-desc margin-right-lg">备注</view>
							<view class="name-connect flex-treble">{{item.remark}}</view>
						</view>
						<view class="flex">
							<view class="card-desc margin-right-lg">预约人</view>
							<view class="name-connect flex-treble">{{item.name}}-{{item.phone}}</view>
						</view>
					</view>
					<view>
						<image @click="goPage" class="phone" mode="scaleToFill" src="../../static/my/phone.png"></image>
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
				userInfo: {},
				list:[
					{"address":null,"content":"拔牙","createdAt":"Wed, 26 Feb 2020 15:31:46 GMT",
					"hospId":null,"hospName":null,"id":"5e561ee20b253288cb101b6d","name":"李四",
					"orderAt":null,"phone":"13666232614","remark":"","updatedAt":"Wed, 26 Feb 2020 15:31:46 GMT"},
					{"address":null,"content":"箍牙","createdAt":"Wed, 26 Feb 2020 15:32:38 GMT","hospId":null,
					"hospName":null,"id":"5e561f160b253288cb101b6e","name":"wangwu","orderAt":null,
					"phone":"13666232614","remark":"","updatedAt":"Wed, 26 Feb 2020 15:32:38 GMT"}
				]
			}
		},
		onLoad() {
		},
		onShow() {
			this.loadData();
			// this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S','SET']),
			goPage(){
				uni.navigateTo({
					url:"/pages/my/exclusiveService/exclusiveService"
				})
			},
			loadData(){
				let t = this;
				uni.showLoading({
					title:"查询中。。。",
					mask: true,
					success() {
						t.S({
							url:"appointment/me",
							callback:function(res){
								uni.hideLoading();
								if(res.statusCode===200){
									console.log(JSON.stringify(res))
									if(res.data.status==1){
										t.list= res.data.data;
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
			}
		}
	}
</script>

<style>
	@import url("../../css/mall.css");
	.phone{
		width: 60upx;
		height: 60upx;
	}
</style>
