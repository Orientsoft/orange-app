<template>
	<view class="container ">
		<swiper class="screen-swiper square-dot home-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" indicator-color="#fcabab">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="TO({url:item.link_url})">
				<image :src="item.pic" mode="scaleToFill" class="radius"></image>
			</swiper-item>
		</swiper>
		
		<view class="flex top-card-bg">
			<view class="flex margin-right-lg top-card">
				<image class="icon" src="../../static/charge-old/zxwz.png"></image>
				<view>
					<view class="title">在线问诊</view>
					<view class="sub-title">咨询项目详情</view>
				</view>
			</view>
			<view @click="doApt" class="top-card flex">
				<image class="icon" src="../../static/charge-old/jzyy.png"></image>
				<view class="title">精准预约</view>
			</view>
		</view>
		
		<view class="space-l"></view>
		<view class="space-s"></view>
		<!--商城-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<!-- <text class="card-item-title">健康商城&nbsp;&nbsp;{{productList.length}}条</text> -->
				<text class="card-item-title">健康商城</text>
				<text @click="goPages('/pages/home/mall/productList')" class="more">更多</text>
			</view>
			<view class="space-s"></view>
			<view class="flex justify-start magin-tb-lg">
				<view @click="onTag(index)" v-for="(item,index) in tagList" :key="index" :class="index==tag?'tag-active':'tag'">
					{{item.name}}
				</view>
			</view>
			
			<view @tap="goPagesById('/pages/home/mall/productInfo','',item.id)" v-for="(item,index) in productList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image" mode="aspectFit"></image>
					<image class="hot" src="../../static/home/hot.png" mode="aspectFit"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="card-item-title">{{item.name}}</view>
					<view class="card-item-desc color_666">{{item.desc_1}}</view>
					<text class="card-item-desc card-tag">{{item.desc_2}}</text>
					<view class="flex card-item-desc" style="justify-content: space-between;">
						<view class="active-price">¥<text class="active-price-big">{{item.sale}}</text><text  class="card-item-desc color_grey" style="text-decoration:line-through">¥{{item.price}}</text></view>
						<view class="card-item-desc color_grey">已售：{{item.volume}}</view>
					</view>
					<view class="card-item-desc color_grey">可用门店：<text class="color_666">{{item.support.length}}家</text></view>
				</view>
			</view>
		</view>
		<!--医院-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">热门医院</text>
				<text @click="goPages('/pages/home/hospitalList')" class="more">更多</text>
			</view>
			<view @click="goPagesById('/pages/home/hospitalInfo','',item.id)" v-for="(item,index) in hospitalList" :key="index" class="flex padding-tb-sm card-item">
				<view class="image align-center justify-center">
					<image :src="item.logo" class="image-round" mode="aspectFill"></image>
				</view>
				<view class="margin-left-sm" style="flex-grow: 1;">
					<view class="flex">
						<text class="card-item-title">{{item.name}}</text>
						<text v-for="(tag,index) in item.tag" :key="index" class="card-item-sign">{{tag}}</text>
					</view>
					<view class="card-item-desc">科室：<text v-for="(dept,index) in item.department" :key="index" class="margin-right-sm">{{dept}}</text></view>
					<view class="card-item-desc flex align-end color_grey">
						电话： {{item.phone}}</view>
					<view class="card-item-desc flex align-end color_grey">
						地址： {{item.address}}</view>
				</view>
			</view>
		</view>
		<!--名医-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="text-bold text-black text-lg">专家讲堂</text>
				<text @click="goPages('/pages/home/classList')" class="more">更多</text>
			</view>
			<view v-for="(item,index) in classList" :key="index" class="padding-tb-sm flex">
				<view @click="goPagesById('/pages/home/newInfo','class',item[0].id)" class="card-item-row margin-right-lg">
					<view class="image-class align-center justify-center">
						<image :src="item[0].logo" class="image-class" mode="aspectFill"></image>
					</view>
					<view class="margin-left-sm ">
						<view class="card-item-title">{{item[0].name}}</view>
						<view class="flex card-item-mt-10">
							<view class="name-class">{{item[0].doctor}}</view>
							<view>{{item[0].tag[0]}}</view>
						</view>
						<view class="card-item-desc flex">擅长：
							<view class="flex justify-around">
								<view v-for="(item,index) in item[0].skilled" :key="index" class="tag-class">
									{{item}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view @click="goPagesById('/pages/home/newInfo','class',item[1].id)" class="card-item-row">
					<view v-if="item[1]" class="image-class align-center justify-center">
						<image :src="item[1].logo" class="image-class" mode="aspectFill"></image>
					</view>
					<view v-if="item[1]" class="margin-left-sm" style="flex-grow: 1;">
						<view class="card-item-title">{{item[1].name}}</view>
						<view class="flex card-item-mt-10">
							<view class="name-class">刘一刀</view>
							<view>一级专家</view>
						</view>
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
		</view>
		<!--新闻-->
		<view class="margin-lr-item card-list">
			<view class="flex" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="card-item-title">新闻热点</text>
				<text @click="goPages('/pages/home/newsList')" class="more">更多</text>
			</view>
			<view class="space-s"></view>
			<view class="flex justify-around">
				<view @click="onTag2(index)" v-for="(item,index) in tagList2" :key="index" :class="index==tag2?'tag2-active':'tag2'">
					{{item.name}}
				</view>
			</view>
			<view @click="goPagesById('/pages/home/newInfo','news',item.id)" v-for="(item,index) in newsList" :key="index" class="flex padding-tb-sm card-item">
				<view class="margin-left-sm" style="flex-grow: 1;align-self: stretch;">
					<view class="text-bold hospital-card-title">{{item.name}}</view>
					<view class="hospital-card-info color_grey">{{item.desc}}</view>
				</view>
				<view class="image align-center justify-center">
					<image :src="item.pic" class="image" mode="aspectFill"></image>
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
				animate: false,
				animate2: false,
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
				productList:[],
				hospitalList:[],
				classRawLength:0,
				classList:[],
				newsList:[],
				advsList:[],
				tagList:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"成人"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"儿童"},
					{"id":"5e3a59530b842cf5a5d3d7b9","name":"老人"},
					{"id":"5e3a59630b842cf5a5d3d7ba","name":"家庭"}
				],
				tagList2:[
					{"id":"5e3a592f0b842cf5a5d3d7b7","name":"精选"},
					{"id":"5e3a59450b842cf5a5d3d7b8","name":"饮食与养生"},
					{"id":"5e3a59530b842cf5a5d3d7b9","name":"健康"},
					{"id":"5e3a59630b842cf5a5d3d7ba","name":"育儿"}
				],
				tag:0,
				tag2:0,
				tagClass:['高血压','冠心病'],
				dotsStyles: {
							backgroundColor: 'rgba(83, 200, 249,0.3)',
							border: '1px rgba(83, 200, 249,0.3) solid',
							color: '#fff',
							selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
							selectedBorder: '1px rgba(83, 200, 249,0.9) solid',
							bottom:100
						},
				current: 0,
				mode: 'long',
				isOutitime: false
			}
		},
		onNavigationBarButtonTap(e) {
			console.log('onNavigationBarButtonTap',e)
		},
		onLoad() {
			this.startAnimate();
			this.userInfo = this.app;
			this.loadData();
			console.log("*********************StatusBar",this.StatusBar)
		},
		onShow() {
			this.userInfo = this.app;
			//刷新token
			if(this.userInfo.token){
				let token = this.userInfo.token;
				let now = new Date().getTime();
				if(now < (token.updatedAt + token.expir*1000)){
					this.isOutitime = true;
				}else{
					this.isOutitime = false;
					this.refreshToken();
				}
			}
		},
		methods: {
			...mapMutations(['TO','S','SET','request']),
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
			doApt(){
				if(this.isOutitime){
					this.goPages('/pages/home/doApointment');
				}else{
					this.goPages('/pages/auth/login');
				}
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
			onTag2(index){
				if(this.tag2 == index){
					return;
				}
				this.tag2 = index;
				this.loadNews(this.tagList2[index].name);
			},
			onTag(index){
				if(this.tag == index){
					return;
				}
				this.tag = index;
				this.loadProduct(this.tagList[index].name);
			},
			refreshToken(){
				let t = this;
				t.request({
					url:"refresh",
					method:"GET",
					dataType:'json',
					header:{
						AccessToken:t.userInfo.token.refresh_token
					},
					callback:function(res){
						console.log(JSON.stringify(res))
						if(res.statusCode===200){
							if(res.data.status==1){
								// t.newsList = res.data.data;
								let token = t.userInfo.token;
								console.log(JSON.stringify(token))
								token.access_token = res.data.data.access_token;
								token.updatedAt = new Date().getTime();
								console.log(JSON.stringify(token))
								t.SET({
									key:'token',
									value:token
								})
							}else{
								t.isOutitime = true;
								console.log(JSON.stringify(res));
							}
						}else{
							// t.$utils.msg(res.errMsg);
						}
					}
				})
			},
			getInfo(id){
				let t = this;
				t.S({
					url:"news/"+id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								// t.newsList = res.data.data;
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
			//查询健康商城
			loadProduct(name){
				let t=this;
				t.S({
					url:"product?tag="+name,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.productList= res.data.data;
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
			loadNews(name){
				let t=this;
				t.S({
					url:"news?limit=3&page=1&tag="+name,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
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
				let t= this;
				t.S({
					url:"adv?location=home",
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
									url:'/pages/auth/login'
								})
							}else{
								t.$utils.msg(res.errMsg);
							}
						}
					}
				})
				
				t.S({
					url:"tag?type=健康商城",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.tagList = res.data.data;
								if(t.tagList.length>0){
									t.loadProduct(t.tagList[0].name);
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
					url:"tag?type=新闻",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.tagList2 = res.data.data;
								if(t.tagList2.length>0){
									t.loadNews(t.tagList2[0].name);
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
					url:"class?limit=4&page=1",
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.data.status==1){
								t.classList = [];
								t.classRawLength = res.data.data.length;
								for (let i = 0; i < res.data.data.length; i=i+2) {
									let tmp = [];
									tmp.push(res.data.data[i]);
									if(res.data.data[i+1]){
										tmp.push(res.data.data[i+1]);
									}
									t.classList.push(tmp);
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
</style>
