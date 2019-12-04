// 执行获取用户权限
export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {     
                resolve(result)   
            },
            fail: () => {},
            complete: () => {}
        });   
    })
}
// 执行打开设置权限
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {     
                resolve(result)   
            },
            fail: () => {},
            complete: () => {}
        });   
    })
}

// 执行选择收货地址
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {     
                resolve(result)   
            },
            fail: () => {},
            complete: () => {}
        });   
    })
}


//  执行登录
export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
               resolve(result) 
            }
        });     
    })
}

// 进行微信支付

export const requestPayment = (pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result);
            },
        });     
    })
}