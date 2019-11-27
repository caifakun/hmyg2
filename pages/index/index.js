Page({
	data: {
		swiperList: [

		]
	},
	onLoad() {
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

	}
})