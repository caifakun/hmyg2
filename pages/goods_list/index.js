// pages/goods_list/index.js
import request from "../../utils/request"
Page({

  // 为了数据可以全局应用和方便修改，定义一个全局变量
  params: {
    query:"",//关键字
    cid:-1,//分类id
    pagenum:1, //页码
    pagesize:10,//页面容量
  },
  totalPage:0, // 数据页码
  data:{
    goodsList:[],
    tarBarList:[
      '综合',
      '销量',
      '价格'
    ],
    currentIndex : 0 // 用于控制tarbar
  },

  onLoad: function (options) {
    this.params.cid = options.cid;
    this.getGoodsList();
  },
  getGoodsList(){
    request({
      url:'goods/search',
      data:this.params
    }).then(result=>{
      // 先把旧数据存下来
      const {goodsList} = this.data; 
      // 使用es6解构再合并成一个新的数组
      this.setData({
        goodsList:[...goodsList,...result.data.message.goods],
      })
      this.totalPage = Math.ceil(result.data.message.total/this.params.pagesize);
    }) 
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 拉到底部，触发加载更多的时候
    // 由于后台返回来的是总条数
    // 因此触底是否需要发送请求，需要先进行判断

    // 1.页面容量大于总条数，不再加载
    if(this.params.pagenum >= this.totalPage){
      // console.log('没有内容可以继续加载了'); 
      wx.showToast({
        title: '没有更多内容',
        icon: 'success',
        duration: 2000
      })
    }//否则改变页码，发送请求
    else{
      this.params.pagenum++;
      this.getGoodsList();
    }
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重新修改页面页码为1
    this.params.pagenum = 1;
    // 重新修改数据列表为空
    this.setData({
      goodsList:[]
    })
    this.getGoodsList();
  },
  //改变tarbar的索引值进行切换
  changeIndex(e){
    // console.log(e);
    const index = e.detail.index;
    this.setData({
      currentIndex : index
    })
  }
})