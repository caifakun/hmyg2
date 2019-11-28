Page({
	data: {
		// 轮播图
		swiperList: [

		],
		// 导航
		navigatorList:[],
		// 楼层内容
		floorList:[]
	},
	onLoad() {
		// 这里是请求获取轮播图数据
		wx.request({
			url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
			method: 'GET',
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
			success: (result) => {
				// console.log(result.data.message);
				this.setData({
					navigatorList: result.data.message
				})
			}
		});

		// 这里 获取首页 楼层数据
		wx.request({
			url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
			method: 'GET',
			success: (result) => {
				console.log(result.data.message);
				this.setData({
					floorList: result.data.message
				})
			}
		});
	}
})