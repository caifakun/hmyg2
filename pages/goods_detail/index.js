// pages/goods_detail/index.js

import request from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据内容
    goodsDetail: [] 
  },

  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },
  // 封装获取商品详情的方法
  getGoodsDetail(goods_id) {
    request({
      url: 'goods/detail',
      data: {
        goods_id
      }
    }).then(result => {
      this.setData({  
        goodsDetail : result.data.message
      })
    })
  },
  // 点击图片，进行预览
  handldePreviewImage(e){
    const current = e.currentTarget.dataset.src;
    const urls = this.data.goodsDetail.pics.map(v=>v.pics_big)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }
})