<template>
	<view class="container">
		<image style="width: 100%;position: absolute;height: 350upx;" src="../../../static/home/head_bg_order.png" mode="scaleToFill"></image>
		<cu-custom :isBack="true" bgColor="title-white">
			<block slot="backText" class="title-white"><text class="title-white">套餐详情</text></block>
		</cu-custom>
		<!-- 信息 -->
		<view class="harf-top">
			<view class="space-m"></view>
			<view class="card flex align-end">
				<view class="card-desc flex-sub self-stretch">
					<view class="card-title">{{info.name}}</view>
					<view>{{info.desc_1}}</view>
					<view>{{info.desc_2}}</view>
					<view class="active-price">¥<text class="card-active-price">&ensp;{{info.sale}}</text><text class="card-desc" style="text-decoration:line-through">¥{{info.price}}</text></view>
					<view>已售{{info.volume}}</view>
				</view>
				<image :src="info.logo" class="card-logo" mode="aspectFit"></image>
			</view>
			<view class="space-s"></view>
			<!-- 门店 -->
			<view class="store-v">
				<view class="flex justify-between">
					<view class="card-title">适用门店（{{supportList.length}}）</view>
					<view @click="showModal" class="store-more">其他门店 ></view>
				</view>
				<view class="flex align-center">
					<image :src="info.logo" class="store-logo" mode="aspectFit"></image>
					<view class="margin-left-sm" style="flex-grow: 1;">
						<view class="flex justify-between">
							<view class="card-title flex-treble">{{supportList[0].name}}</view>
							<view class="card-desc">{{supportList[0].distance}}km</view>
						</view>
						<view @click="openMap(supportList[0])" class="flex justify-between card-desc padding-tb-sm">
							<view><text class="cuIcon-location"></text>{{supportList[0].address}}</view>
							<view class="text-lg"><text class="cuIcon-right"></text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- tab -->
			<view class="flex tab-all">
				<view @click="onSelTab(0)" class="tab">
					<text :class="tabIndex==0?'tab-sub-active':'tab-sub'">套餐详情</text>
				</view>
				<view @click="onSelTab(1)" class="tab">
					<text :class="tabIndex==1?'tab-sub-active':'tab-sub'">购买须知</text>
				</view>
				<view @click="onSelTab(2)" class="tab">
					<text :class="tabIndex==2?'tab-sub-active':'tab-sub'">评论</text>
				</view>
			</view>
			<!-- picInfo -->
			<view v-if="tabIndex==0" class="picInfo">
				<scroll-view>
					<image :src="info.pic" mode="widthFix" style="width: 100%;"></image>
				</scroll-view>
			</view>
			<!-- 购买须知 -->
			<view v-if="tabIndex==1" class="card">
				<view class="card-title">暂无</view>
				<view class="space-s"></view>
			</view>
			<!-- 评论 -->
			<view v-if="tabIndex==2">
				<view class="card">
					<view class="card-title justify-between flex">
						<view>评论</view>
					</view>
					<view class="space-s"></view>
					<scroll-view scroll-y="true" @scrolltolower="loadMore" :style="[{height:windowHeight+'px'}]">
					<view v-for="(commServer,index) in commServers" :key="index">
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
					<view v-if="commServer.answer">
						<view class="flex justify-between margin-bottom-sm">
							<view class="card-desc"></view>
							<view class="flex align-center">
								<image :src="commServer.answerLogo" mode="scaleToFill" class="comment-logo margin-right-sm"></image>
								<view>{{commServer.answerName}}</view>
							</view>
						</view>
						<view class="text-right">{{commServer.answer}}</view>
						<view class="card-desc text-right">{{$utils.dateUtils.format(commServer.answerAt)}}</view>
					</view>
					<view class="space-s"></view>
				</view>
				<mixLoadMore :status="loadMoreStatus"></mixLoadMore>
				</scroll-view>
				</view>
			</view>
		</view>
		<view class="space-l"></view>
		<view class="space-l"></view>
		
		<!-- 底部 -->
		<view class="flex padding-tb-sm padding-lr-lg" style="background: #fcfcfc;position: fixed;bottom: 0;justify-content: space-between;width: 100%;animation: show 2s  ;z-index: 1000;">
			<view class="active-price">¥<text class="card-active-price">{{info.sale}}</text></view>
			<view @click="goPages()" class="order-btn text-center text-white">提交订单</view>
		</view>
		
		<!-- 选择地址 -->
		<view class="cu-modal bottom-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">该套餐适用以下门店</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<scroll-view class="padding-bottom" style="height: 500upx;" scroll-y="true">
					<view v-for="(item,index) in supportList" :key="index" class="flex align-center store-v store-item">
						<image :src="supportList[index].logo" class="store-logo" mode="aspectFit"></image>
						<view class="margin-left-sm margin-right-lg" style="flex-grow: 1;">
							<view class="card-title text-left">{{supportList[index].name}}</view>
							<view class="flex justify-between align-center more-right">
								<view class="text-left card-desc flex-sub"><text class="cuIcon-location"></text>{{supportList[index].address}}</view>
								<view><text class="cuIcon-right"></text></view>
								<view>{{supportList[index].distance}}km</view>
							</view>
						</view>
					</view>
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
		data() {
			return {
				id:'',
				info:{},
				tabIndex:0,
				location:{
					longitude:0,
					latitude:0
				},
				supportList:[{
					name:'',
					logo:'',
					distance:'',
					address:''
				}],
				modalName:'',
				commServers:[],
				loadMoreStatus:0,
				now_page:1,
				windowHeight:0,
				limit:10
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
			this.calcHeight();
			this.getComment();
		},
		methods: {
			...mapMutations(['TO','S']),
			calcHeight(){
				let t = this;
				uni.getSystemInfo({
					success:function(res){
						console.log(JSON.stringify(res));
						t.windowHeight=res.windowHeight;
					}
				});
			},
			showModal(){
				this.modalName='Modal';
			},
			hideModal(){
				this.modalName='';
			},
			getLocation(){
				let t=this;
				uni.getLocation({
				    type: 'wgs84',//gcj02:国测局坐标,wgs84:gps
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						t.location = res;
						t.calcDistance();
				    }
				});
			},
			calcDistance(){
				this.supportList = [];
				for(let i=0;i<this.info.support.length;i++){
					let hosp = this.info.support[i];
					let dis = this.$utils.geoDistance(this.location.latitude,this.location.longitude,
					hosp.latitude,hosp.longitude);
					hosp.distance = dis;
					this.supportList.push(hosp);
				}
				console.log("距离"+this.supportList[0].distance);
			},
			openMap(hosp){
				uni.openLocation({
					latitude: hosp.latitude,
					longitude: hosp.longitude,
					success: function () {
						console.log('success');
					}
				})
			},
			onSelTab(index){
				this.tabIndex = index;
			},
			goPages(){
				let t = this;
				uni.navigateTo({
					url:'/pages/home/mall/order?id='+this.id
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
								t.supportList = [];
								for(let i=0;i<t.info.support.length;i++){
									let hosp = t.info.support[i];
									hosp.distance = 0;
									t.supportList.push(hosp);
								}
								t.getLocation();
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
			loadMore(){
				console.log('loadMore',this.loadMoreStatus);
				if(this.loadMoreStatus<2)
					this.getComment();
			},
			getComment(){
				let t=this;
				t.loadMoreStatus = 1;
				t.S({
					url:"product/comment",
					data:{
						id:t.id,
						page:t.now_page,
						limit:t.limit
					},
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								if(parseInt(res.data.total)> t.now_page*t.limit){
									t.now_page ++;
								}else{
									t.loadMoreStatus = 2;
								}
								t.commServers = res.data.data
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
	page{ background-color: #fff;}
	.tab-all{
		box-shadow:0 0 20upx #f3f4ec;
		padding-top: 20upx;
		padding-bottom: 20upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.tab{
		flex:1;
		align-items: center;
		height: 40upx;
		justify-content: center;
		text-align: center;
	}
	.tab-sub{
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		color: #666;
	}
	.tab-sub-active{
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		color: #F49100;
		border-bottom: 3upx solid #F49100;
	}
</style>
