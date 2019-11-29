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
    // 由于分类数据过多，为了优化数据的显示，进行缓存，判断是否存在缓存再进行发送请求获取分类数据
    // 1 打开了分类页面的时候 先做一个判断 
    // 看本地存储里面有没有旧的数据
    // 1 假设没有旧数据 
    //   1 直接发送请求获取新的数据
    //   2 要新数据存到缓存中 
    // 2 假设有旧数据 但是 判断这个数据有没有过期  
    //   1 数据过期 
    //     1 直接发送请求获取新的数据
    //     2 要新数据存到缓存中 
    //   2 数据没有过期 才使用旧的缓存的数据
    let categoryList = wx.getStorageSync("cate");

    // 如果没有旧数据
    if(!categoryList){
      this.getCategoryList();
      // 如果有旧数据
    }else{
      // 如果旧数据没有过期
      if(Date.now()-categoryList.time>10*1000){
        // console.log('数据过期');
        this.getCategoryList();
      }else{
        // console.log('数据没有过期');
        this.Categories = categoryList.list;
        this.setData({
          leftMenues:this.Categories.map(v=>v.cat_name), 
          rightContent:this.Categories[this.data.current].children,
        })
      }  
    }
  },
  getCategoryList(){
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
      // 存到本地存储中
      wx.setStorageSync("cate", {list:this.Categories,time:Date.now()});
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