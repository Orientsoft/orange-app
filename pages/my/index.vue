<template>
	<view>
			<view class="user-card">
				<view class="padding-top-lg bg-orange-lg">
					<view style="height:20px;padding-top: ${StatusBar}px;"></view>
					<view class="flex padding-tb-sm" style="align-items: center;width: 100%;margin-left:80upx;justify-content: flex-start;text-align: center;">
						<view>
							<image :src="userInfo.logo" class="image"></image>
						</view>
						<view class="justify-center align-center margin-left-sm">
							<navigator url="/pages/my/set/setting">
								<view class="text-black text-lg flex justify-start">
									<text class="tittop">{{userInfo.name}}<text class="cuIcon-right"></text></text>
								</view>
							</navigator>
							<view class="text-gray text-lg flex justify-start margin-bottom-s">
								<text style="font-size: 22upx;color: #fff;">{{userInfo.phone}}</text>
							</view>
						</view>
					</view>
					<view class="space-m"></view>
				</view>
				
			</view>
			
			<view class="space-m"></view>
			<!-- 列表 -->
			<view >
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
					
					<view v-if="isCasher" class="list" @tap="doScan()">
						<image src="../../static/my/erweima.png" class="item-image margin-lr" mode="scaleToFill"></image>
						<view class="flex-sub">
							<text class="item-title">核销二维码</text>
						</view>
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
							{name:'我的订单',url:'../../static/my/mydindan.png',nav_url:'/pages/my/order/orderList'},
							{name:'精准预约',url:'../../static/my/jzyy.png',nav_url:'./myApointment'},
							{name:'我的病历',url:'../../static/my/binli.png',nav_url:'./myCase'},
						]
					},
					{	groupId:2,
						itemList:[
							{name:'家庭成员',url:'../../static/my/jitcy.png',nav_url:'./myFamily'},
							{name:'专属客服',url:'../../static/my/kefu.png',nav_url:'exclusiveService/exclusiveService'},
						]
					},
					{
						groupId:3,
						itemList:[
							{name:'我的关注',url:'../../static/my/guanzu.png',nav_url:'./myFollow'},
						]
					},
					],
					data:{'notice':false,'message':false},
					isCasher:false
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
			this.userInfo = this.app;
			console.log(this.userInfo)
			if(!this.userInfo.token){
				uni.navigateTo({
					url:"/pages/auth/login"
				})
			}else{
				this.loadData()
			}
		},
		methods: {
			...mapMutations(['TO','S','SET','P']),
			doScan(){
				let t=this;
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						
						uni.showLoading({
							title:"提交中...",
							mask: true,
							success:function(){
								t.P({
									url:'order/scan',
									data:{id:res.result},
									callback:function(res){
										uni.hideLoading();
										console.log(JSON.stringify(res));
										if(res.statusCode===200){
											if(res.data.status==1){
												t.$utils.msg(res.data.message);
											}else{
												t.$utils.msg(res.data.message);
											}
										}else{
											t.$utils.msg(res.errMsg);
										}
									}
								})
							}
						})
				    }
				});
			},
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
							console.log(JSON.stringify(res));
							if(res.statusCode===200){
								if(res.data.status==1){
									t.userInfo = res.data.data;
									if(t.userInfo.role.indexOf(3)>-1){
										t.isCasher = true;
									}
									t.SET({
										key:'User',
										value:res.data.data
									})
								}else{
									t.$utils.msg(res.data.message);
								}
							}else{
								if(res.statusCode==401){
									t.$utils.msg('登陆超时');
									setTimeout(()=>{
										t.TO({
											url:'/pages/auth/login'
										})
									},1000)
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
    @import url("../../css/my.css");
	page{
		background-color: #f3f1f3;
	}
	
</style>
