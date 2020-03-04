<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white title-orange">
			<block slot="backText"><text class="title-black"></text></block>
			<block slot="right"><text class="title-orange">。。。</text></block>
		</cu-custom>
		<view class="container">
			<view style="height: 10upx;"></view>
			<view class="flex-sub padding">
				<view>
					<rich-text :nodes="detail.content"></rich-text>
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
				id:0,
				url:'',
				detail:{
				}
			}
		},
		onLoad(option) {
			console.log(option.id);
			if(option.id){
				this.id = option.id;
				this.url = option.url;
			}
		},
		onShow() {
			this.loadData();
		},
		methods: {
			...mapMutations(['TO','S']),
			loadData(){
				let t= this;
				uni.showLoading({
					title:'加载中。。。',
					success() {
						t.S({
							url:t.url+"/"+t.id,
							callback:function(res){
								// console.log(res);
								uni.hideLoading();
								if(res.statusCode===200){
									console.log(JSON.stringify(res.data))
									let data = res.data;
									if(data.status==1){
										t.detail = data.data;
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
				})
				
			}
		}
	}
</script>

<style>
	@import url("../../css/home.css");
	page{
		background-color: #F3F1F3;
	}
	.title{
		font-size: 36upx;
		color: #333;
		font-weight: bold;
	}
	.time{
		color: #aaa;
		font-size: 26upx;
	}
	.content{
		font-size: 26upx;
		color: #333;
		line-height: 32upx;
	}
</style>
