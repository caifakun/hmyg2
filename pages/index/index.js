Page({
	data: {
		// 轮播图
		swiperList: [

		],
		// 导航
		navigatorList:[]
	},
	onLoad() {
		// 这里是请求获取轮播图数据
		wx.request({
			url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
			method: 'GET',
			responseType: 'text',
			success: (result) => {
				// console.log(result.data.message);
				this.setData({
					swiperList: result.data.message
				})
			}
		});

		// 这里是请求获取导航分类数据
		wx.request({
			url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
			method: 'GET',
			responseType: 'text',
			success: (result) => {
				// console.log(result.data.message);
				this.setData({
					navigatorList: result.data.message
				})
			}
		});

	}
})