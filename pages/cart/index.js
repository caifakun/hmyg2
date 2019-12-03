/* 
1 获取用户的收货地址
  1 设置个人的收货地址
    1 用户可以在微信中 设置N个收货地址 
    2 其他的微信小程序 可以 获取到 用户设置好的收货地址
    3 其他的微信小程序 可以共享 相同的收货地址 
! 2 在小程序中来获取用户已经设置好的收货地址
  1 如果 按照 最简单的流程 该功能很容易
    1 在API中已经封装好了 
  2 但是 当用户点击了拒绝了  此时 开发者就无法再去获取用户的收货地址（体验是有问题的！！）
todo 3
  1  当用户第一次点击获取地址的时候 
      1 用户点击 授予获取地址 按钮  自己直接获取 返回值即可
  2  当用户第一次点击获取地址的时候 
      1 点击了 “拒绝”
      2 当用再次点击 “收货” 按钮的时候 无法去拿地址了
  3  应该要这么做
    1 弹出窗口- 授权设置页(button-open-type-openSetting) 
      用户自己选择 “允许该小程序 获取 我的收货地址”
? 4 正确的流程（看这个即可 ）
    1 当用户点击获取收货地址的时候 先判断 用户有没有授予权限-收货  其实就是一个变量 auth
      1 当 auth = undefined  表示 用户是第一次点击 获取收货-按钮 
      2 当 auth = true  表示 用户已经给与 权限 已经允许
      3 当 auth =  false 表示 用户 曾经拒绝过！！
    2 当  auth = undefined 或者  true 的时候
      我们都可以直接获取用户的 收货地址
    3 当 auth =  false
      1 先打开 用户授权设置页面  -- 两种的方式来打开用户权限设置页面（1 api提供，直接打开即可 ）
      2 用户自己 打开 获取收货的授权
      3 再获取用户的 收货地址
    4 修改成 async的方式 

  */

 import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

 import { getSetting,openSetting,chooseAddress} from '../../utils/wxAsync';
Page({

  data: {
    address: {}, //用于存储用户地址
    carts:[],  //购物车商品
    toalPrice:0, // 总价
    num:0 //商品总价
  },
  onLoad(){

    // this.getTotalPrice();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    // 从本地存储中取出来
    const carts = wx.getStorageSync('carts') || [];

    const address = wx.getStorageSync('address') || {};  
    // 修改address
    this.setData({
      address:address.res,
      carts
    }) 
    this.getTotalPrice(carts);
  },
  // 计算商品总价和数量
  getTotalPrice(carts){
  // 1 获取缓存中的购物车数组
  // 2 循环 
  //   1 判断该商品的isChecked 是否为 true
  //   2 获取每个商品的单价 * 要购买的数量
  //   3 每个商品的总价 叠加计算 ++ 
  
    let totalPrice = 0;
    let num = 0
    carts.forEach(v => {
      if(v.isChecked){
        totalPrice += v.nums*v.goods_price; // 总价
        num += v.nums  // 总数量
      }
    });
    this.setData({
      totalPrice,
      num
    })
  },

  // 单选框是否被选中
  checkboxChange(e){
    const {index} = e.currentTarget.dataset;
    const {carts} = this.data;
    // 等于当前的单选框 自身去反
    carts[index].isChecked = !carts[index].isChecked;
    this.setData({
      carts
    })
    // 重新存回本地存储
    wx.setStorageSync('carts',carts);
    // 重新计算总价
    this.getTotalPrice(carts)
  },

   /*编辑数量
  1 点击 "+" 或者 "-" 
  2 点击  "+" 执行数量 ++
  3 点击  "-" 执行数量 --
  4 其他情况 
    1 当数量 大于 等于 库存    提示用户即可
    2 当数量 小于 等于 1 的时候 提示用户 "是否要删除。。
  */
  
  // 数量增加
  add(e){
    
    const {index} = e.currentTarget.dataset;
    const {carts} = this.data;
    
    if( carts[index].nums >= 1  && carts[index].nums <100){
      carts[index].nums++
    }else{
      wx.showToast({
        title: '库存不足了',
        icon: 'none',
        mask: true,
      });    
    }
    this.setData({
      carts
    })
     // 重新存回本地存储
     wx.setStorageSync('carts',carts);
     // 重新计算总价
     this.getTotalPrice(carts)

  },
  // 数量减少
  reduce(e){
    
    const {index} = e.currentTarget.dataset;
    const {carts} = this.data;
    
    if( carts[index].nums >1){
      carts[index].nums--
    }else if(carts[index].nums === 1){
      wx.showModal({
        title: '警告',
        content: '您是否要删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            carts.splice(index,1)
            this.setData({
              carts
            })
             // 重新存回本地存储
             wx.setStorageSync('carts',carts);
             // 重新计算总价
             this.getTotalPrice(carts)
          }
        }
      });  
    }
    this.setData({
      carts
    })
     // 重新存回本地存储
     wx.setStorageSync('carts',carts);
     // 重新计算总价
     this.getTotalPrice(carts)

  },


  //添加收货地址
  async getAddress() {
    // 先判断用户权限
     const auth = (await getSetting()).authSetting['scope.address'];
     if(auth === false){
       await openSetting();
     }
      const res = await chooseAddress(); 
      console.log(res)
      // 存入本地存储
      wx.setStorageSync('address', {res});
  }
})