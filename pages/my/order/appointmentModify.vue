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
						<view class="card-title">{{info.name}}</view>
						<view>{{info.desc_1}}</view>
						<view>{{info.desc_2}}</view>
						<view class="space-l"></view>
					</view>
					<image :src="info.logo" class="card-logo" mode="aspectFit"></image>
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
						<input style="flex: 1;" placeholder="到店门店" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect">预约时间:</view>
						<input style="flex:1" type="number" placeholder="到店时间" placeholder-style="font-size:12px;color:#bbb"/>
						<view @click="showModal2" class="more-right"><text class="cuIcon-right"></text></view>
					</view>
					<view class="flex input-v">
						<view class="name-connect">预约人:</view>
						<input placeholder="使用者姓名" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="flex input-v">
						<view class="name-connect">联系电话:</view>
						<input type="number" placeholder="联系电话" placeholder-style="font-size:12px;color:#bbb"/>
					</view>
					<view class="space-m"></view>
					<view class="long-bg">提交预约</view>
				</view>
			</view>
			
		</view>
		
		
		
		<!-- 底部 -->
		<view class="flex padding-tb-sm padding-lr-lg" style="background: #fcfcfc;position: fixed;bottom: 0;justify-content: flex-end;width: 100%;animation: show 2s  ;z-index: 1000;">
			<view class="active-price"></view>
			<view @click="goPages()" class="order-btn text-center text-white">提交修改</view>
		</view>
		
		<!-- 选择时间 -->
		<view class="cu-modal bottom-modal" :class="modalName2=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择时间</view>
					<view class="action" @tap="hideModal2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="uni-title">日期：{{year}}年{{month}}月{{day}}日{{hour}}时</view>
				<scroll-view class="padding-bottom" style="height: 500upx;" scroll-y="true">
					<picker-view style="height: 250px;" :value="value" @change="bindChange">
						<picker-view-column>
							<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
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
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const hour = date.getHours() + 1
			const hours = []
			const day = date.getDate()
			const weekday = date.getDay();
			const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			const week = weeks[day];
			for (let i = 1990; i <= date.getFullYear(); i++) {
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
			return {
				id:'',
				info:{},
				addressIndex:1,
				modalName:'',
				modalName2:'',
				title: 'picker-view',
				years:years,
				year:year,
				months:months,
				month:month,
				days:days,
				day:day,
				hours:hours,
				hour:hour,
				weekday:weekday,
				weeks:weeks,
				week:week,
				visible:true,
				value: [9999, month - 1, day - 1],
				indicatorStyle: `height: 400px;`
			}
		},
		onLoad:function(option){
			this.id = option.id;
			this.getInfo();
		},
		methods: {
			...mapMutations(['TO','S']),
			bindChange: function (e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.hour = this.hours[val[3]]
			},
			showModal(){
				this.modalName='Modal';
			},
			hideModal(){
				this.modalName='';
			},
			showModal2(){
				this.modalName2='Modal';
			},
			hideModal2(){
				this.modalName2='';
			},
			radioChange(e){
				console.log(e);
				// this.payIndex = index;
			},
			goPages(){
				let t = this;
				uni.navigateTo({
					url:'/pages/my/order/orderInfo?id='+t.id
				})
			},
			getInfo(){
				let t=this;
				t.S({
					url:"product/"+t.id,
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
