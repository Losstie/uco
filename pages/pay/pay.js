// pages/pay/pay.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWX"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart: [],
    checkedCart:[],
    totalPrice:0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面展示
   */
  onShow:function(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 本次支付商品数组
    cart = cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
      }
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  }
  // 结算功能
  

})