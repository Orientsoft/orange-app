<template>
	<view>
		<view>
			<cu-custom :isBack="true" class="title-orange" bgColor="bg-white">
				<block slot="backText"><text class="title-black">健康商城</text></block>
			</cu-custom>
		</view>
		<view class="gray-shadow"></view>
		<view class="space-s"></view>
		<!-- <view class="flex justify-center margin-bottom-sm">
			<view @click="onTag(index)" v-for="(item,index) in tagList" :key="index" :class="index==tag?'tag2-active margin-right-sm':'tag2 margin-right-sm'">
				{{item.name}}
			</view>
		</view> -->
		<view v-if="tag==0" class="flex justify-around">
			<view @click="onTag2(index)" v-for="(item,index) in tagList2" :key="index" :class="index==tag2?'tag2-active':'tag2'">
				{{item.name}}
			</view>
		</view>
		<view class="space-s"></view>
		<!--医院-->
		<scroll-view scroll-y="true" @scrolltolower="loadMore" :style="[{height:windowHeight+'px'}]">
		<view class="hospital-card-list">
			<view @tap="getInfo(item.id)" v-for="(item,index) in productList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image" mode="aspectFit"></image>
					<image class="hot" src="../../static/home/star_active.png" mode="aspectFit"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="card-item-title">{{item.name}}</view>
					<view class="card-item-desc">{{item.desc_1}}{{item.desc_2}}</view>
					<view class="flex card-item-desc" style="justify-content: space-between;">
						<view class="active-price">¥<text class="active-price-big">{{item.price}}</text><text>¥{{item.sale}}</text></view>
						<view class="card-item-desc">已售{{item.volume}}</view>
					</view>
					<view class="card-item-desc">可用门店:66家</view>
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
				productList:[],
				current: 0,
				tagList2:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"成人"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"儿童"},
					{"id":"5e3a59530b842cf5a5d3d7b9","name":"老人"},
					{"id":"5e3a59630b842cf5a5d3d7ba","name":"家庭"}
				],
				tagList:[
					{"name":"优选商品"},
					{"name":"附近门店"},
				],
				tag:0,
				tag2:0,
				limit:10,
				page:1,
				loadMoreStatus:0
			}
		},
		onLoad() {
			this.calcHeight();
		},
		onShow() {
			this.loadData();
			this.userInfo = this.app.User.Info;
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
			onTag(index){
				if(this.tag == index){
					return;
				}
				this.clear();
				this.tag = index;
				this.loadData();
			},
			onTag2(index){
				if(this.tag2 == index){
					return;
				}
				this.tag2 = index;
				this.clear();
				this.loadProduct(this.tagList2[index].name)
			},
			getInfo(id){
				let t = this;
				uni.navigateTo({
					url:'/pages/home/mall/productInfo?id='+id
				})
			},
			clear(){
				this.page = 1;
				this.loadMoreStatus = 0;
			},
			loadMore(){
				console.log('loadMore',this.loadMoreStatus);
				if(this.loadMoreStatus<2){
					if(this.tag == 0){
						this.loadProduct();
					}else{
						this.loadHospital();
					}
				}
			},
			loadProduct(name){
				let t=this;
				t.S({
					url:"product?tag="+name,
					data:{page:t.page,limit:t.limit},
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.productList= res.data.data;
								if(parseInt(res.data.total)> t.page*t.limit){
									t.page ++;
								}else{
									t.loadMoreStatus = 2;
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
			loadTag(){
				let t=this;
				t.S({
					url:"tag?type=健康商城",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.tagList2= res.data.data;
								if(t.tagList2.length>0){
									t.loadProduct(t.tagList2[0].name)
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
			loadHospital(){
				
			},
			loadData(){
				let t= this;
				if(t.tag == 0){
					t.loadTag();
				}else{
					t.loadHospital();
				}
				
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
</style>
