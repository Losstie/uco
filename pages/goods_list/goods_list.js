// pages/goods_list/goods_list.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goods_list:[]
  },
  // 接口需要参数
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
  getGoodsList(){
    const res = request({
      url:'/goods/search',
      data:this.queryParams
    }).then(res=>{
      let {goods} = res.data.message;
      this.totalPages = Math.ceil(res.data.message.total / this.queryParams.pagesize);
      this.setData({
        goods_list:[...this.data.goods_list, ...goods],
      });
      // 关闭下拉刷新
    wx.stopPullDownRefresh();
    });
    
  },
  // 排序更改
  handleitemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach(v=>{
      v.isActive=v.id===index?true:false;
    });
    this.setData({
      tabs  
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新
    // 重置
    this.queryParams.pagenum = 1;
    this.setData({
      goods_list:[]
    })
    // 重新加载数据
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum >= this.totalPages) {
      // 没有下一页
      wx.showToast({
        title: '页面触底啦~~~',
      });
    }else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  }
})