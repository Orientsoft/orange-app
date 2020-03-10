<template>
	<view :style="[{height:windowHeight+'px'}]">
		<view class="count-down flex">
			<view class="flex-sub">
				<text class="count-text">{{seconds}}s</text>
			</view>
		</view>
		<swiper class="screen-swiper square-dot home-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" indicator-color="#fcabab" :style="[{height:windowHeight+'px'}]">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="TO({url:item.link_url})">
				<image @click="goPages(item.content)" :src="item.pic" mode="scaleToFill" class="radius" :style="[{height:windowHeight+'px'}]"></image>
			</swiper-item>
		</swiper>
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
				id:0,
				url:'',
				swiperList:[],
				windowHeight:0,
				seconds:5,
				countInterval:null
			}
		},
		onLoad() {
			this.loadData();
			this.calcHeight();
		},
		onShow() {
			this.doCount()
		},
		methods: {
			...mapMutations(['TO','S']),
			doCount(){
				let t = this;
				t.countInterval = setInterval(()=>{
					t.seconds = t.seconds-1;
					if(t.seconds < 0){
						clearInterval(t.countInterval)
						uni.reLaunch({
							url:'/pages/home/index'
						})
					}

				},1000)
			},
			calcHeight(){
				let t = this;
				uni.getSystemInfo({
					success:function(res){
						console.log(JSON.stringify(res));
						t.windowHeight=res.windowHeight;
					}
				});
			},
			goPages(link_url){
				uni.navigateTo({
					url:link_url
				})
			},
			loadData(){
				let t= this;
				t.S({
					url:"adv",
					data:{
						location:'start'
					},
					callback:function(res){
						// console.log(res);
						uni.hideLoading();
						if(res.statusCode===200){
							console.log(JSON.stringify(res.data))
							let data = res.data;
							if(data.status==1){
								t.swiperList = data.data;
							}else{
								t.$utils.msg(data.msg);
							}
						}else{
							if(res.statusCode==401){
								t.TO({
									url:'/pages/charge/login'
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
	.home-swiper{
		overflow: hidden;
	}
	.screen-swiper image,
	.screen-swiper video,
	.swiper-item image,
	.swiper-item video {
		display: block;
		margin: 0;
		pointer-events: none;
		height: 100%;
	}
	.count-down{
		height: 60upx;
		width: 60upx;
		border-radius: 30upx;
		background-color: #F3F1F3;
		align-items: center;
		text-align: center;
		position: fixed;
		z-index: 100;
		top: 80upx;
		right: 60upx;
	}
	.count-text{
		color: #626262;
	}
</style>
