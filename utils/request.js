// 在发数据请求的时候，需要显示加载中
// 当请求回来后再把加载中的效果取消

// 但是首页中有3个异步请求，无法确定是哪个最后请求回来
// 1.如果是第一个先请求回来，加载中的效果会直接被取消，后面两个请求的效果就会失效了
// 2.所以需要进行判断一下，利用一个变量来判断
let axiosCurrent = 0;

function axios({url,...params}) {
    axiosCurrent++;
    const baseURL = 'https://api.zbztb.cn/api/public/v1/';
    return new Promise((resolve, reject) => {
        // 显示加载
        wx.showLoading({
            title: '加载中',
            mask:true
          })
        wx.request({
            url: baseURL + url,
            ...params,
            success: (result) => {
                resolve(result);
            },
            complete(){
                axiosCurrent--;
                if(axiosCurrent === 0){
                //    不管是否成功，都会隐藏加载  
                   wx.hideLoading()
                }
            }
        })
    })
}

export default axios