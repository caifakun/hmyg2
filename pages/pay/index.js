/* 
0 因为后续的功能都是发送请求的 做很多的嵌套 我们要使用 es7 async方式
1 创建订单
  1 post
  2 请求头中加入 数据  headers:{Authorization:token }    jwt => json web token 
  3 用户登录 
    1 单单指 执行一段代码 wx.login 返回的是 微信给你的 令牌 
    2 要我自己 调用一个自己的后台的登录 来返回自己后台给的数据 
      电商项目 -> 自己定义的 令牌
      外卖项目 ->  自己定义的 令牌 
2 先在自己的后台服务器上执行 登录 /users/wxlogin
  1 post
  2 执行小程序的登录 来获取 code字段
  3 借助 button的功能 来获取 用户的信息
      encryptedData
      rawData
      iv
      signature
 */
 
 import regeneratorRuntime from '../../lib/runtime/runtime';

 import { getSetting,openSetting,chooseAddress,login } from '../../utils/wxAsync';
 import request from '../../utils/request'
Page({

  data: {
    address: {}, //用于存储用户地址
    
    carts:[],  //购物车商品
    toalPrice:0, // 总价
    num:0, //商品总数
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
      // 过滤掉其他，只需要获取勾选中的商品
      carts:carts.filter(v=>v.isChecked)
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
  },

  // 进行支付
  async getUserInfo(e){
    // console.log(e);

  const {encryptedData,rawData,iv,signature} = e.detail;
    // 这里可以返回一个code
  const {code} = (await login());


  console.log(code);
  
  const loginParams = {
    encryptedData,
    rawData,
    iv,
    signature,
    code
  }
  const token = (await request({url:'users/wxlogin',method:'post',data:loginParams})).data.message.token
  console.log(token);

  
  
    // wx.navigateTo({
    //   url: '/pages/pay/index',
    // });

  }
})