<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white title-orange">
			<block slot="backText"><text class="title-black">营养餐</text></block>
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
			<view @click="goPagesById('/pages/home/newInfo',item.id)" v-for="(item,index) in newsList" :key="index" class="flex padding-tb-sm card-item">
				<view class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
					<view class="text-bold">{{item.name}}</view>
					<view>{{item.desc}}</view>
				</view>
				<view class="image align-center justify-center">
					<image :src="item.pic" class="image" mode="aspectFill"></image>
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
				newsList:[],
				current: 0,
				tagList2:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"甲亢"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"心脏病"},
				],
				tag2:0,
				loadMoreStatus:0,
				now_page:1,
				windowHeight:0,
				limit:10
			}
		},
		onLoad() {
			console.log(this.app.User.Token);
			this.calcHeight();
			
		},
		onHide() {
			this.itemList=[]
			this.now_page=1
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
			onTag2(index){
				if(this.tag2 == index){
					return;
				}
				this.tag2 = index;
				this.loadMoreStatus=0;
				this.now_page=1;
				this.loadHealth(this.tagList2[index].name)
			},
			goPagesById(url,id){
				let t = this;
				uni.navigateTo({
					url:url+'?id='+id
				})
			},
			loadMore(){
				console.log('loadMore',this.loadMoreStatus);
				if(this.loadMoreStatus<2)
					this.loadHealth();
			},
			loadHealth(name){
				let t= this;
				t.loadMoreStatus = 1;
				t.S({
					url:"meal",
					data:{page:t.now_page,limit:t.limit,tag:name},
					callback:function(res){
						if(res.statusCode===200){
							// console.log(JSON.stringify(res))
							if(res.data.status==1){
								if(parseInt(res.data.total)> t.now_page*t.limit){
									t.now_page ++;
								}else{
									t.loadMoreStatus = 2;
								}
								t.newsList = res.data.data;
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
			loadData(){
				let t=this;
				t.S({
					url:"tag?type=营养餐",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.tagList2 = res.data.data;
								if(t.tagList2.length>0){
									t.loadHealth(t.tagList2[0].name);
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
			}
		}
	}
</script>

<style>
	@import url("../../css/home.css");
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
