let ajaxTimes = 0;
export const request = (params)=>{
  // 判断url
  let header = {...params.header};
  if(params.url.includes("/my/")){
    header["Authorization"] = wx.getStorageSync('token');
  }


  // 全局效果  显示加载中
  wx.showLoading({
    title: '加载中',
    mark:true
  });
  ajaxTimes++;
  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        if(ajaxTimes--){
          wx.hideLoading();
        }
      }
    })
  })
}