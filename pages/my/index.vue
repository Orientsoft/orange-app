<template>
	<view>
			<view class="user-card">
				<view class="padding-top-lg bg-orange-lg">
					<view class="flex padding-tb-sm" style="align-items: center;width: 100%;margin-left:80upx;justify-content: flex-start;text-align: center;">
						<view>
							<image :src="userInfo.logo" class="image"></image>
						</view>
						<view class="justify-center align-center margin-left-sm">
							<navigator url="set/setting">
								<view class="text-black text-lg flex justify-start">
									<text style="font-size: 28upx;color: #fff;font-weight: 500;">信息完善<text class="cuIcon-right"></text></text>
								</view>
							</navigator>
							<view class="text-gray text-lg flex justify-start margin-bottom-s">
								<text style="font-size: 22upx;color: #eee;">{{userInfo.phone}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="space-l"></view>
			<!-- 列表 -->
			<view class="container">
					<view v-for="(item,itemIndex) in list[0].itemList" :key="item.name" class="list" @tap="goPages(item)">
						<image :src="item.url" class="item-image margin-lr" mode="aspectFill"></image>
						<view class="flex-sub">
							<text class="item-title">{{item.name}}</text>
						</view>
						<image src="../../static/my/right.png" class="right-btn" mode="aspectFit"></image>
					</view>
					<view class="space-m"></view>
					
					<view v-for="(item,index) in list[1].itemList" :key="item.name" class="list" @tap="goPages(item)">
						<image :src="item.url" class="item-image margin-lr" mode="aspectFill"></image>
						<view class="flex-sub">
							<text class="item-title">{{item.name}}</text>
						</view>
						<view v-if="item.active" style="height: 16upx;width: 16upx;border-radius: 200upx;background-color: #ff6161;"></view>
						<image src="../../static/my/right.png" class="right-btn" mode="aspectFit"></image>
					</view>
					
					<view class="space-m"></view>
					<view v-if="!((item.name=='修改密码'||item.name=='重置支付密码')&&userInfo.username=='游客')" v-for="(item,index) in list[2].itemList" :key="item.name" class="list" @tap="goPages(item)">
						<image :src="item.url" class="item-image margin-lr" mode="aspectFill"></image>
						<view class="flex-sub">
							<text class="item-title">{{item.name}}</text>
						</view>
						<view v-if="item.active" style="height: 16upx;width: 16upx;border-radius: 200upx;background-color: #ff6161;"></view>
						<image src="../../static/my/right.png" class="right-btn" mode="aspectFit"></image>
					</view>
					<view style="height: 40upx;"></view>
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
				userInfo: {
					username:'李四',
					mobile:1367837849
				},
				list:[
					{	groupId:1,
						itemList:[
							{name:'我的订单',url:'../../static/my/my_order.png',nav_url:'/pages/my/order/orderList'},
							{name:'精准预约',url:'../../static/my/my_group.png',nav_url:'./myApointment'},
							{name:'我的病例',url:'../../static/my/my_member.png',nav_url:'./myCase'},
						]
					},
					{	groupId:2,
						itemList:[
							{name:'家庭成员',url:'../../static/my/my_apply.png',nav_url:'./myFamily'},
							{name:'身份认证',url:'../../static/my/my_notice.png',nav_url:'./mySign'},
							{name:'专属客服',url:'../../static/my/my_notice.png',nav_url:'exclusiveService/exclusiveService'},
						]
					},
					{
						groupId:3,
						itemList:[
							{name:'我的关注',url:'../../static/my/my_account.png',nav_url:'./myFollow'},
						]
					},
					],
					data:{'notice':false,'message':false}
			}
		},
		onLoad() {
			// console.log(this.app.User.Token);
			// // this.$utils.msg("ssss");
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// 	this.list[3].itemList[0].version=wgtinfo.version
			// })
			this.userInfo = this.app.User;
		},
		onShow() {
			this.loadData();
			this.userInfo = this.app.User;
		},
		methods: {
			...mapMutations(['TO','S','SET']),
			
			goPages(item){
				var t=this
				if(item.nav_url==''){
					return;
				}else {
					if(item.nav_url=='version'){
						 uni.request({
						 	url:t.inter.server.index+'check_version',
							method: "POST",
							header: {
								"token": t.app.User.Token,
								'content-type': 'application/x-www-form-urlencoded', 
							},
							dataType: "json",
							success: (res)=>{
								 console.log(res)     
							  plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
							     //wgtinfo.version 应用版本号
							   if(parseInt((res.data.version).split('.').join(''))>parseInt((wgtinfo.version).split('.').join(''))){
								      switch(uni.getSystemInfoSync().platform){   
								       case 'android':       
								             plus.runtime.openURL(res.data.android);    
								      	   break;  
								      case 'ios':       
								      uni.showToast({
								      	title:'请进入appstore更新应用',
								      	icon:'none'
								      })      
								        break;    
								      default:      
								       console.log('运行在开发者工具上')     
								        break;
								      }
							   }else{
								   uni.showToast({
								   	title:'当前版本为:'+res.data.version,
								   	icon:'none'
								   }) 
							   }
							   
							})
							
							},
							fail:(res)=>{
								console.log("测试2",res)
							},
							
						 })
					}else{
						if(item.name=='我的订单'){
							uni.switchTab({
								url:item.nav_url
							})
						}else{
							uni.navigateTo({
								url:item.nav_url
							})
						}
					}
				}
				
			},
			loadData(){
				let t = this;
				t.S({
						url:'user/me',
						callback:function(res){
							console.log(JSON.stringify(res.data));
							if(res.statusCode===200){
								if(res.data.status==1){
									t.SET({
										key:'User',
										value:res.data.data
									})
								}else{
									t.$utils.msg(res.data.message);
								}
							}else{
								t.$utils.msg(res.errMsg);
							}
						}
					})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFEF5;
	}
	.nav-title {
		font-size: 36upx;
		color: #333;
		font-weight: bold;
	}
	.user-card{
		margin-top: 0upx;
	}
	.home-lg{
		width: 200upx;
		height: 200upx;
		margin-left: 40upx;
	}
	.image{
		height: 120upx;
		width: 120upx;
		background-color: #02CFA9;
		border-radius: 120upx;
	}
	.account_change{
		height: 96upx;
		width: 96upx;
		margin-right: 40upx;
	}
	
	.list{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 30upx;
		padding-top: 30upx;
		border-bottom: #eee solid 1upx;
		background-color: #fff;
	}
	.item-image{
		height: 48upx;
		width: 48upx;
		margin-right: 20upx;
	}
	.item-title{
		font-size: 32upx;
		color: #333;
	}
	.item-subtitle{
		font-size: 26upx;
		color: #ccc;
	}
	.right-btn{
		height: 25upx;
		width: 35upx;
		margin-right: 40upx;
	}
</style>
