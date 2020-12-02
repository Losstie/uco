// pages/order/order.js
import {request} from "../../request/index.js"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:"全部订单",
        isActive: true
      },
      {
        id:1,
        value:"待付款",
        isActive: false
      },
      {
        id:2,
        value:"待发货",
        isActive: false
      },
      {
        id:3,
        value:"退款/退货",
        isActive: false
      }
    ],
    orders:[]

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    }
    const pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  async getOrders(type){
    const res = await request({url:'/my/orders/all', data:{type:1}});
    this.setData({
      orders:res.data.message.orders.map(v=>({...v, create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach(v=>{
      v.isActive=v.id===index?true:false;
    });
    this.setData({
      tabs  
    });
  },
  handleitemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },

  
})