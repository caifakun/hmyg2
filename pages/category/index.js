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
    rightContent:[],
    // 用于左侧栏切换样式和数据
    current:0,
    //用于设置滚动条的位置
    scrollTop:0
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
    })
  },
  handleCategory(e){
    // console.log(e.currentTarget.dataset);
    let {index} = e.currentTarget.dataset;
    this.setData({
      current:index,
      rightContent:this.Categories[index].children,
      scrollTop:0
    })
  }
})