// pages/goods_list/index.js
import request from "../../utils/request"
Page({

  // 为了数据可以全局应用和方便修改，定义一个全局变量
  params: {
    query:"",//关键字
    cid:-1,//分类id
    pagenum:1, //页码
    pagesize:10//页面容量
  },
  data:{
    goodsList:[]
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
      // console.log(result);
      this.setData({
        goodsList:result.data.message.goods
      })
    }) 
  },

})