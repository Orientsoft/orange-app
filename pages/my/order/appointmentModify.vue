<template>
	<view class="container bg-white">
		<view>
			<cu-custom :isBack="true" bgColor="container title-orange">
				<block slot="backText"><text class="title-black">修改时间</text></block>
			</cu-custom>
		</view>
		
		<view class="harf-top">
			<!-- 信息 -->
			<view class="card">
				<view class="cro_left_bottom"></view>
				<view class="cro_right_bottom"></view>
				<view class="flex align-end">
					<view class="card-desc">
						<view class="card-title">{{info.product.name}}</view>
						<view>{{info.product.desc_1}}</view>
						<view>{{info.product.desc_2}}</view>
						<view class="space-l"></view>
					</view>
					<image :src="info.product.logo" class="card-logo" mode="aspectFit"></image>
				</view>	
			</view>
			
					
			<view class="info-border-top"></view>
			<!-- 用户信息 -->
			<view class="card">
				<view class="cro_left_top"></view>
				<view class="cro_right_top"></view>
				<view>
					<view class="flex input-v">
						<view class="name-connect">预约门店:</view>
						<input disabled :value="info.appointment.address" style="flex: 1;" placeholder="到店门店" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect">预约时间:</view>
						<input :value="orderAt" style="flex:1" placeholder="到店时间" placeholder-style="font-size:12px;color:#bbb"/>
						<view @click="showModal2" class="more-right text-lg padding"><text class="cuIcon-right"></text></view>
					</view>
					<view class="flex input-v">
						<view class="name-connect">预约人:</view>
						<input disabled :value="info.appointment.name" placeholder="使用者姓名" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect">联系电话:</view>
						<input disabled :value="info.appointment.phone" type="number" placeholder="联系电话" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="space-m"></view>
					<view @click="goPages" class="long-bg">修改预约</view>
				</view>
			</view>
			
		</view>
		
		
		
		<!-- 底部 -->
		<!-- <view class="flex padding-tb-sm padding-lr-lg" style="background: #fcfcfc;position: fixed;bottom: 0;justify-content: flex-end;width: 100%;animation: show 2s  ;z-index: 1000;">
			<view class="active-price"></view>
			<view @click="goPages()" class="order-btn text-center text-white">提交修改</view>
		</view> -->
		
		<!-- 选择时间 -->
		<view class="cu-modal bottom-modal" :class="modalName2=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action" @tap="hideModal2">
							<text class="text-red">取消</text>
						</view>
						<view class="content">请选择时间</view>
						<view class="action" @tap="orderTime">
							<text class="text-black">确定</text>
						</view>
					</view>
					<view class="uni-title">日期：{{year}}年{{month}}月{{day}}日{{hour}}时</view>
					<scroll-view class="padding-bottom" style="height: 500upx;" scroll-y="true">
						<picker-view style="height: 250px;" :value="dates.value" @change="bindChange">
							<picker-view-column>
								<view class="item" v-for="(item,index) in dates.years" :key="index">{{item}}年</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item" v-for="(item,index) in dates.months" :key="index">{{item}}月</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item" v-for="(item,index) in dates.days" :key="index">{{item}}日</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item" v-for="(item,index) in dates.hours" :key="index">{{item}}时</view>
							</picker-view-column>
						</picker-view>
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
				addressIndex:1,
				modalName:'',
				modalName2:'',
				year:0,
				month:0,
				day:0,
				hour:0,
				weekday:0,
				week:0,
				visible:true,
				dates:{},
				orderAt:""
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
			const date = new Date()
			const years = []
			this.year = date.getFullYear()
			const months = []
			this.month = date.getMonth() + 1
			const days = []
			this.hour = date.getHours() + 1
			const hours = []
			this.day = date.getDate()
			this.weekday = date.getDay();
			const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			this.week = weeks[this.weekday];
			for (let i = 2020; i <= date.getFullYear()+10; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			for (let i = 1; i <= 24; i++) {
				hours.push(i)
			}
			
			this.dates={
				years:years,
				months:months,
				days:days,
				hours:hours,
				weeks:weeks,
				indicatorStyle: `height: 400px;`,
				value: [0, this.month - 1, this.day - 1,this.hour - 1],
			}
		},
		methods: {
			...mapMutations(['TO','S','PUT']),
			bindChange: function (e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.hour = this.hours[val[3]]
			},
			showModal2(){
				this.modalName2='Modal';
			},
			hideModal2(){
				this.modalName2='';
			},
			orderTime(){
				this.orderAt = this.year+'-'+this.month+'-'+this.day+' '+this.hour+'时';
				this.hideModal2()
			},
			//修改时间
			goPages(){
				let t = this;
				if(!t.orderAt){
					t.$utils.msg("请选择时间");
					return;
				}
				let orderAt = t.year+'-'+t.month+'-'+t.day+' '+t.hour+':00:00';
				uni.showLoading({
					title:"提交中...",
					mask: true,
					success:function(){
						t.PUT({
							url:'appointment/product/'+t.id,
							data:{orderAt:orderAt},
							callback:function(res){
								uni.hideLoading();
								console.log(JSON.stringify(res.data));
								if(res.statusCode===200){
									if(res.data.status==1){
										// t.id = res.data.data.id;
										t.$utils.msg('预约成功');
										setTimeout(()=>{
											uni.switchTab({
												url:'/pages/my/order/orderList'
											})
										},100)
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
			},
			getInfo(){
				let t=this;
				t.S({
					url:"order/"+t.id,
					callback:function(res){
						if(res.statusCode===200){
							console.log(JSON.stringify(res))
							if(res.errMsg=='request:ok'){
								t.info = res.data.data
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
	
	.store-item{
		border-bottom: 1upx solid #f0f0f0;
		padding-top: 10upx;
		padding-bottom: 10upx;
	}
</style>
