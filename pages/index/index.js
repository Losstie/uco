import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiperList();
   this.getCateList();
   this.getFloorList();
  },
  // 获取轮播图
  getSwiperList:function(){
    request({url:'/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      });
    })
  },
  // 获取分类数据
  getCateList:function(){
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
        cateList:result.data.message
      });
    })
  },
  // 获取楼层数据
  getFloorList:function(){
    request({url:'/home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})