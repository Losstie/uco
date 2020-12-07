// pages/collect/collect.js
import {request} from "../../request/index.js"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false
      },
      {
        id:3,
        value:'浏览足迹',
        isActive:false
      }
    ]
  },

  onShow: function () {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    }
    const collect = wx.getStorageSync('collect') || [];
    this.setData({collect});

    const pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
  },

  handleitemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach(v=>{
      v.isActive=v.id===index?true:false;
    });
    this.setData({
      tabs  
    });
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },

})