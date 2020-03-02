<template>
	<view>
		<view>
			<cu-custom :isBack="true" class="title-orange" bgColor="bg-white">
				<block slot="backText"><text class="title-black">名师讲堂</text></block>
			</cu-custom>
		</view>
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
			<view v-for="(item,index) in hospitalList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image-round" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="flex">
						<text class="card-item-title">{{item.name}}</text>
					</view>
					<view class="flex">
						<view class="name-class">刘一刀</view>
						<view>一级专家</view>
					</view>
					<view>麻醉科 病理科|神经外科</view>
					<view class="card-item-desc flex">擅长：
						<view class="flex justify-around">
							<view v-for="(item,index) in tagClass" :key="index" class="tag-class">
								{{item}}
							</view>
						</view>
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
				hospitalList:[],
				current: 0,
				tagList2:[
					{"name":"综合排序"},
					{"name":"人气最高"},
				],
				tag2:0,
				tagClass:['高血压','冠心病'],
				loadMoreStatus:0,
				now_page:1,
				windowHeight:0,
				limit:10
			}
		},
		onLoad() {
			this.calcHeight();
			this.loadData();
		},
		onShow() {
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
				this.loadData(this.tagList2[index].name)
			},
			getInfo(id){
				let t = this;
				uni.navigateTo({
					url:'/pages/home/classInfo?id='+id
				})
			},
			loadMore(){
				console.log('loadMore',this.loadMoreStatus);
				if(this.loadMoreStatus<2)
					this.loadData();
			},
			loadData(){
				let t= this;
				t.S({
					url:"class",
					data:{page:t.now_page,limit:t.limit},
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								if(parseInt(res.data.total)> t.now_page*t.limit){
									t.now_page ++;
								}else{
									t.loadMoreStatus = 2;
								}
								t.hospitalList = res.data.data;
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
