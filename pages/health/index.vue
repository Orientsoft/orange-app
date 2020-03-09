<template>
	<view>
		<view class="heatopbg" style="">
			<!-- <image style="width: 100%;height: 280upx;margin-bottom: -200upx;" src="../../static/home/head_jk.png" mode="scaleToFill"></image> -->
			<view class="flex justify-around">
				<view @click="onTagTop(index)" v-for="(item,index) in tagTopList" :key="index" :class="index==tagTop?'tagTop-active':'tagTop'">
					{{item.name}}
				</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
				
		<swiper class=" screen-swiper square-dot home-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" indicator-color="#fff" indicator-active-color="#fff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="TO({url:item.link_url})">
				<image :src="item.pic" mode="aspectFill" class="radius"></image>
<!-- 				<video :src="item.image" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
 -->		</swiper-item>
		</swiper>
		<view class="space-m"></view>
		<!--医院-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">精选机构</text>
				<text @click="goPages('/pages/home/hospitalList')" class="more">更多</text>
			</view>
			<view @click="goPagesById('/pages/home/hospitalInfo','',item.id)" v-for="(item,index) in hospitalList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image-round" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="flex">
						<text class="card-item-title">{{item.name}}</text>
						<text v-for="(tag,index) in item.tag" :key="index+'tag'" class="card-item-sign">{{tag}}</text>
					</view>
					<view class="card-item-desc">科室：<text v-for="(dept,index) in item.department" :key="index+'dept'" class="margin-right-sm">{{dept}}</text></view>
					<view class="card-item-desc flex align-end color_grey">
						电话：{{item.phone}}</view>
					<view class="card-item-desc flex align-end color_grey">
						地址： {{item.address}}</view>
				</view>
			</view>
		</view>
		
		<!--健康自诊-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">健康自诊</text>
				<text @click="goPages('/pages/health/healthList')" class="more">更多</text>
			</view>
			<view class="space-s"></view>
			<view class="flex justify-around magin-tb-lg">
				<view @click="onTag(index)" v-for="(item,index) in tagList" :key="index" :class="index==tag?'tag-active':'tag'">
					{{item.name}}
				</view>
			</view>
			<view @click="goPagesById('/pages/home/newInfo','diagnosis',item.id)" v-for="(item,index) in diagnosisList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
					<view class="text-bold hospital-card-title">{{item.name}}</view>
					<view class="hospital-card-info color_grey">{{item.desc}}</view>
				</view>
			</view>
		</view>
		
		<!--常见疾病-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">常见疾病</text>
				<text @click="goPages('/pages/health/diseaseList')" class="more">更多</text>
			</view>
			<view @click="goPagesById('/pages/home/newInfo','disease',item.id)" v-for="(item,index) in diseaseList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
					<view class="text-bold hospital-card-title">{{item.name}}</view>
					<view class="hospital-card-info color_grey">{{item.desc}}</view>
				</view>
			</view>
		</view>
		
		<!--营养餐-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">营养餐</text>
				<text @click="goPages('/pages/health/mealList')" class="more">更多</text>
			</view>
			<view @click="goPagesById('/pages/home/newInfo','meal',item.id)" v-for="(item,index) in mealList" :key="index" class="flex padding-tb-sm card-item">
				<view class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
					<view class="text-bold hospital-card-title">{{item.name}}</view>
					<view class="hospital-card-info color_grey">{{item.desc}}</view>
				</view>
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image" mode="aspectFill"></image>
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
		computed: {
			...mapState(['app','inter']),
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				animate: false,
				animate2: false,
				tagTopList:[{name:'精选机构'},{name:'健康自诊'},{name:'常见疾病'},{name:'营养餐'}],
				tagTop:0,
				userInfo: {},
				swiperList: [{
					id: 0,
					title:'瞧一瞧看一看喽',
					type: 'image',
					image: 'http://sy.foway.net:8087/public/uploads/20190605/0382c09627505b6c76cf7b6e05066445.jpg',
					link_url:'http://www.baidu.com',
					createtime:'1557888344',
					updatetime:'1557888344'
				}],
				hospitalList:[],//医院
				diagnosisList:[],//健康自诊
				diseaseList:[],//常见疾病
				mealList:[],//营养餐
				tagList:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"甲亢"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"糖尿病"},
					{"id":"5e3a59530b842cf5a5d3d7b9","name":"冠心病"},
					{"id":"5e3a59630b842cf5a5d3d7ba","name":"抑郁症"}
				],
				tagList2:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"精选"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"饮食与养生"},
					{"id":"5e3a59530b842cf5a5d3d7b9","name":"健康"},
					{"id":"5e3a59630b842cf5a5d3d7ba","name":"育儿"}
				],
				tag:0,
				tag2:0,
				tagClass:['高血压','冠心病']
			}
		},
		
		onLoad() {
			this.startAnimate();
			this.loadData();
		},
		onShow() {
			this.userInfo = this.app.User.Info;
		},
		methods: {
			...mapMutations(['TO','S']),
			startAnimate(){
				// setInterval(this.showMarquee, 4000);
				// setInterval(this.showMarquee2, 2000);
			},
			showMarquee: function() {
				this.animate = true;
				setTimeout(() => {
					this.swiperList.push(this.swiperList[0]);
					this.swiperList.shift();
					this.animate = false;
				}, 500);
			},
			showMarquee2: function() {
				this.animate2 = true;
				// setTimeout(() => {
				// 	this.marqueeList_order.push(this.marqueeList_order[0]);
				// 	this.marqueeList_order.shift();
				// 	this.animate2 = false;
				// }, 500);
			},
			goShare:function(){
				uni.navigateTo({
					url:'/pages/home/share'
				})
			},
			onTagTop(index){
				this.tagTop = index;
				uni.pageScrollTo({
				    scrollTop: 600*(index-1)+200,
				    duration: 300
				});
			},
			onTag2(index){
				
			},
			onTag(index){
				if(this.tag == index){
					return;
				}
				this.tag = index;
				this.loadHealth(this.tagList[index].name);
			},
			goPages:function(url){
				uni.navigateTo({
					url:url
				})
			},
			goPagesById(url,url2,id){
				let params = 'url='+url2+'&';
				params = params+'id='+id;
				
				uni.navigateTo({
					url:url+'?'+params
				})
			},
			//查询diagnosis 健康自诊
			loadHealth(name){
				let t=this;
				t.S({
					url:"diagnosis?limit=3&page=1&tag="+name,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.diagnosisList= res.data.data;
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
				let t= this;
				t.S({
					url:"adv?location=health",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.swiperList= res.data.data;
							}else{
								console.log(JSON.stringify(res));
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
				t.S({
					url:"hospital?limit=3&page=1",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.hospitalList = res.data.data;
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
				
				t.S({
					url:"tag?type=健康自诊",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.tagList = res.data.data;
								if(t.tagList.length>0){
									t.loadHealth(t.tagList[0].name);
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
				
				t.S({
					url:"disease?limit=3&page=1",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.diseaseList = res.data.data;
							}else{
								console.log(JSON.stringify(res));
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
				
				t.S({
					url:"meal?limit=3&page=1",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.mealList = res.data.data;
							}else{
								console.log(JSON.stringify(res));
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
	@import url("../../css/home.css");
</style>
