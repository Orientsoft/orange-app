<template>
	<view>
		<cu-custom :isBack="false" bgColor="bg-orange-lg title-white">
			<block slot="content">我的订单</block>
		</cu-custom>
		<view class="gray-shadow"></view>
		<view class="space-s"></view>
		<view class="flex justify-around">
			<view @click="onTag2(index)" v-for="(item,index) in tagList2" :key="index" :class="index==tag2?'tag2-active':'tag2'">
				{{item.name}}
			</view>
		</view>
		<view class="space-s"></view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" :style="[{height:windowHeight+'px'}]">
		<!--医院-->
		<view class="hospital-card-list">
			<view v-for="(item,index) in orderList" :key="index" class="padding-tb-sm card-list">
				<view class="flex justify-between card-item-desc">
					<view>{{$utils.dateUtils.format(item.updatedAt)}}</view>
					<view>{{tagList2[item.status].name}}</view>
				</view>
				<view class="flex">
					<view class="image align-center justify-center">
						<image :src="item.product.logo" class="image" mode="aspectFill"></image>
					</view>
					<view @click="getInfo(item.id)" class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
						<view class="card-item-title">产品:{{item.product.name}}</view>
						<view class="card-item-desc">总价:{{item.price}}</view>
					</view>
					<view>
						<view @click="getInfo(item.id)" v-if="item.status==0" class="pay-class">去支付</view>
						<view @click="buyMore(item.product.id)" v-if="item.status!=0" class="more-class">再来一单</view>
					</view>
				</view>
			</view>
		</view>
		<mixLoadMore :status="loadMoreStatus"></mixLoadMore>
		</scroll-view>
		
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
				orderList:[],
				current: 0,
				tagList2:[
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
				tag2:0,
				loadMoreStatus:0,
				now_page:1,
				windowHeight:0,
				limit:10
			}
		},
		onLoad() {
			this.calcHeight();
		},
		onShow() {
			this.userInfo = this.app;
			if(!this.userInfo.token){
				uni.navigateTo({
					url:"/pages/auth/login"
				})
			}else{
				this.loadData()
			}
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
			onTag2(index){
				if(this.tag2 == index){
					return;
				}
				this.tag2 = index;
				this.loadMoreStatus=0;
				this.now_page=1;
				this.loadData()
			},
			getInfo(id){
				let t = this;
				uni.navigateTo({
					url:'/pages/my/order/orderInfo?id='+id
				})
			},
			buyMore(id){
				uni.navigateTo({
					url:'/pages/home/mall/productInfo?id='+id
				})
			},
			loadMore(){
				console.log('loadMore',this.loadMoreStatus);
				if(this.loadMoreStatus<2)
					this.loadData();
			},
			loadData(){
				let t= this;
				t.loadMoreStatus = 1;
				t.S({
					url:"order/me",
					data:{page:t.now_page,limit:t.limit,status:t.tagList2[t.tag2].value},
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								if(parseInt(res.data.total)> t.now_page*t.limit){
									t.now_page ++;
								}else{
									t.loadMoreStatus = 2;
								}
								t.orderList = res.data.data;
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
	@import url("../../../css/home.css");
	page{
		background-color: #FFFFFF;
	}
	.gray-shadow{
		height: 1upx;
		box-shadow:inset 0upx 0upx  10upx #F0F0F0;
	}
	.hospital-card-list{
		background: #FFFFFF;
		padding: 30upx;
		/* border-radius: 30upx; */
		/* border: 1upx solid #F49100; */
		box-shadow:inset 0upx 0upx  10upx #F0F0F0;
		margin-bottom: 40upx;
	}
	
	.pay-class{
		color: #F49100;
		font-size: 24upx;
		border: 1upx solid #ed7100;
		border-radius: 20upx;
		padding-left: 20upx;
		padding-right: 20upx;
		margin-right: 10upx;
		margin-top: 100upx;
	}
	
	.more-class{
		color: #888;
		font-size: 24upx;
		border: 1upx solid #888;
		border-radius: 20upx;
		padding-left: 20upx;
		padding-right: 20upx;
		margin-right: 10upx;
		margin-top: 100upx;
	}
</style>
