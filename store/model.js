const model = {
	//读取全局变量
	APP(state, provider) {
		state.app = provider;
	},
	//保存全局变量
	SET(state, provider) {
		state.app[provider.key] = provider.value;
		uni.setStorage({key: 'app',data: state.app,success: (res) => {}})
	},
	//跳转一个页面
	TO(s,d) {
		console.log(s,d)
		if (d.url.match(RegExp(/http/))) {
			uni.navigateTo({
				url: "/pages/common/webview?url=" + d.url
			})
		} else {
			if(d.t){
				setTimeout(function() {uni.navigateTo({d})}, 2000);
			}else{
				uni.navigateTo({url:d.url})
			}
		}
	},
	//发送一个请求
	S(s,d) {
		console.log(JSON.stringify(d));
		var t = this;
		uni.request({
			url: s.inter.server.url + d.url,
			data: d.data,
			method: "GET",
			header: {
				"AccessToken": s.app.token.access_token,
				'content-type': 'application/json', 
			},
			dataType: "json",
			success: (res) => {
				console.log(res.statusCode);
				if(res.statusCode == 401 || res.statusCode == 422){
					t.commit("SET", {key: "User",value: ''})
					res.statusCode = 401;
					d.callback(res);
				}else if(res.statusCode == 200){
					if(res.data.status == 3){
						t.commit("SET", {key: "User",value: ''})
						res.statusCode = 401;
						d.callback(res);
					}else{
						d.callback(res);
					}
				}else if(res.statusCode >= 500){
					d.callback({
						statusCode:res.statusCode,
						errMsg:'服务器错误'
					})
				}else if(!res.statusCode){
					d.callback({
						statusCode:-101,
						errMsg:'未知错误'
					})
				}else{
					d.callback({
						statusCode:res.statusCode,
						errMsg:'错误代码:'+res.statusCode
					})
				}
			},
			fail:(res)=>{
				console.log(JSON.stringify(res))
				if(res.errMsg == 'request:fail abort'){
					d.callback({
						statusCode:-1,
						errMsg:'网络连接错误'
					})
				}else if(res.errMsg=='request:time out'){
					d.callback({
						statusCode:-2,
						errMsg:'网络连接超时'
					})
				}else{
					d.callback({
						statusCode:-100,
						errMsg:res.errMsg
					})
				}
			}
		});
	},
	//发送一个请求
	P(s,d) {
		console.log(JSON.stringify(d));
		var t = this;
		uni.request({
			url: s.inter.server.url + d.url,
			data: d.data,
			method: "POST",
			header: {
				"AccessToken": s.app.token.access_token,
				'content-type': 'application/json', 
			},
			dataType: "json",
			success: (res) => {
				if(res.statusCode == 401 || res.statusCode == 422){
					t.commit("SET", {key: "User",value: ''})
					res.statusCode = 401;
					d.callback(res);
				}else if(res.statusCode == 200){
					if(res.data.status == 3){
						t.commit("SET", {key: "User",value: ''})
						res.statusCode = 401;
						d.callback(res);
					}else{
						d.callback(res);
					}
				}else if(res.statusCode >= 500){
					d.callback({
						statusCode:res.statusCode,
						errMsg:'服务器错误'
					})
				}else if(!res.statusCode){
					d.callback({
						statusCode:-101,
						errMsg:'未知错误'
					})
				}else{
					d.callback({
						statusCode:res.statusCode,
						errMsg:'错误代码:'+res.statusCode
					})
				}
			},
			fail:(res)=>{
				console.log(JSON.stringify(res))
				if(res.errMsg == 'request:fail abort'){
					d.callback({
						statusCode:-1,
						errMsg:'网络连接错误'
					})
				}else if(res.errMsg=='request:time out'){
					d.callback({
						statusCode:-2,
						errMsg:'网络连接超时'
					})
				}else{
					d.callback({
						statusCode:-100,
						errMsg:res.errMsg
					})
				}
			}
		});
	},
	DEL(s,d) {
		console.log(JSON.stringify(d));
		var t = this;
		uni.request({
			url: s.inter.server.url + d.url,
			data: d.data,
			method: "DELETE",
			header: {
				"AccessToken": s.app.token.access_token,
				'content-type': 'application/json',
			},
			dataType: "json",
			success: (res) => {
				if(res.statusCode == 401 || res.statusCode == 422){
					t.commit("SET", {key: "User",value: ''})
					res.statusCode = 401;
					d.callback(res);
				}else if(res.statusCode == 200){
					if(res.data.status == 3){
						t.commit("SET", {key: "User",value: ''})
						res.statusCode = 401;
						d.callback(res);
					}else{
						d.callback(res);
					}
				}else if(res.statusCode >= 500){
					d.callback({
						statusCode:res.statusCode,
						errMsg:'服务器错误'
					})
				}else if(!res.statusCode){
					d.callback({
						statusCode:-101,
						errMsg:'未知错误'
					})
				}else{
					d.callback({
						statusCode:res.statusCode,
						errMsg:'错误代码:'+res.statusCode
					})
				}
			},
			fail:(res)=>{
				console.log(JSON.stringify(res))
				if(res.errMsg == 'request:fail abort'){
					d.callback({
						statusCode:-1,
						errMsg:'网络连接错误'
					})
				}else if(res.errMsg=='request:time out'){
					d.callback({
						statusCode:-2,
						errMsg:'网络连接超时'
					})
				}else{
					d.callback({
						statusCode:-100,
						errMsg:res.errMsg
					})
				}
			}
		});
	},
	PUT(s,d) {
		console.log(JSON.stringify(d));
		var t = this;
		uni.request({
			url: s.inter.server.url + d.url,
			data: d.data,
			method: "PUT",
			header: {
				"AccessToken": s.app.token.access_token,
				'content-type': 'application/json', 
			},
			dataType: "json",
			success: (res) => {
				if(res.statusCode == 401 || res.statusCode == 422){
					t.commit("SET", {key: "User",value: ''})
					res.statusCode = 401;
					d.callback(res);
				}else if(res.statusCode == 200){
					d.callback(res);
				}else if(res.statusCode >= 500){
					d.callback({
						statusCode:res.statusCode,
						errMsg:'服务器错误'
					})
				}else if(!res.statusCode){
					d.callback({
						statusCode:-101,
						errMsg:'未知错误'
					})
				}else{
					d.callback({
						statusCode:res.statusCode,
						errMsg:'错误代码:'+res.statusCode
					})
				}
			},
			fail:(res)=>{
				console.log(JSON.stringify(res))
				if(res.errMsg == 'request:fail abort'){
					d.callback({
						statusCode:-1,
						errMsg:'网络连接错误'
					})
				}else if(res.errMsg=='request:time out'){
					d.callback({
						statusCode:-2,
						errMsg:'网络连接超时'
					})
				}else{
					d.callback({
						statusCode:-100,
						errMsg:res.errMsg
					})
				}
			}
		});
	},
	request(s,d) {
		console.log(JSON.stringify(d));
		var t = this;
		uni.request({
			url: s.inter.server.url + d.url,
			data: d.data,
			method: d.method,
			header: d.header,
			dataType: d.dataType,
			success: (res) => {
				console.log(res.statusCode);
				if(res.statusCode == 401 || res.statusCode == 422){
					t.commit("SET", {key: "User",value: ''})
					res.statusCode = 401;
					d.callback(res);
				}else if(res.statusCode == 200){
					if(res.data.status == 3){
						t.commit("SET", {key: "User",value: ''})
						res.statusCode = 401;
						d.callback(res);
					}else{
						d.callback(res);
					}
				}else if(res.statusCode >= 500){
					d.callback({
						statusCode:res.statusCode,
						errMsg:'服务器错误'
					})
				}else if(!res.statusCode){
					d.callback({
						statusCode:-101,
						errMsg:'未知错误'
					})
				}else{
					d.callback({
						statusCode:res.statusCode,
						errMsg:'错误代码:'+res.statusCode
					})
				}
			},
			fail:(res)=>{
				console.log(JSON.stringify(res))
				if(res.errMsg == 'request:fail abort'){
					d.callback({
						statusCode:-1,
						errMsg:'网络连接错误'
					})
				}else if(res.errMsg=='request:time out'){
					d.callback({
						statusCode:-2,
						errMsg:'网络连接超时'
					})
				}else{
					d.callback({
						statusCode:-100,
						errMsg:res.errMsg
					})
				}
			}
		});
	},
	//上传文件d
	UF(s,d) {
		uni.uploadFile({
			url: s.server.url + d.url, //仅为示例，非真实的接口地址
			filePath: d.file,
			name: 'files',
			header: {
				"token": s.app.Token
			},
			formData: d.formData,
			success: (res) => {
				d.callback(res);
			}
		});
	},
	
	
	//登录系统
	IN(s,d){
		this.commit("SET", {key: "User",value: d})
	},
	//退出系统
	OUT(s,d){
		this.commit("SET", {key: "User",value: ''})
	},
}
export default model
