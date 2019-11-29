// pages/category/index.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧数据
    leftMenues:[],
    // 右侧数据
    rightContent:[]
  },
  // 全局内部的数据 wxml中找不到
  // 但是js内部需要使用到全局数据
  Categories:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 请求获取分类数据
    request({url:'categories'}).then(result=>{
      // console.log(result.data.message);
      // 修改全局数据
      this.Categories = result.data.message;
      // 修改 左侧数据
      this.setData({
        leftMenues : this.Categories.map(v=>v.cat_name) 
      })

      // 修改右侧数据
      this.setData({
        rightContent:this.Categories[0].children
      })
      console.log(this.data.rightContent);
      
    })
  }


})