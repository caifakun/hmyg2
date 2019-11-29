import request from "../../utils/request"

Page({
	data: {
		// 轮播图
		swiperList: [

		],
		// 导航
		navigatorList: [],
		// 楼层内容
		floorList: []
	},
	onLoad() {
		// 这里是请求获取轮播图数据
		request({
			url: 'home/swiperdata'
		}).then(result => {
			this.setData({
				swiperList: result.data.message
			})
		})

		// 这里是请求获取导航分类数据
		request({
			url: 'home/catitems'
		}).then(result => {
			this.setData({
				navigatorList: result.data.message
			})
		})

		// 这里 获取首页 楼层数据
		request({
			url: 'home/floordata'
		}).then(result => {
			// console.log(result.data.message);
			this.setData({
				floorList: result.data.message
			})
		})
	}
})