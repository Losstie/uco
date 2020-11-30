// pages/pay/pay.js
import {getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment} from "../../utils/asyncWX"
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
    // 遍历计算支付金额和需支付的物品数量
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
      }
    });
    // 
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 结算功能
  async handleOrderPay(e){
    try {
        // 获取token
      const token = wx.getStorageSync('token');
      // 是否有token
      if(!token){
        wx.navigateTo({ 
          url: '/pages/auth/auth',
        });
        return;
      }
      // 创建订单
      // const header = {Authorization: token};
      // 准备请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v=>{
        goods.push({
          goods_id: v.goods_id,
          goods_num:v.num,
          goods_price:v.goods_price
        });
      });
      const orderParams = {order_price, consignee_addr, goods}
      // 发送请求 创建订单
      const order_num = await request({
        url:"/my/orders/create",
        method: "POST",
        data: orderParams,
      });
      // 准备发起预支付
      const {pay} = await request({url:"/my/orders/req_unfiedorder",method:"POST" ,data:{order_num}});
      // 发起微信支付
      await requestPayment(pay);
      // 查询后台 订单状态
      const res = await request({url:'my/orders/chkOrder', method:'POST', data:{order_num}});
      await showToast({title:"支付成功"});
      // 删除缓存中的 已经支付的商品
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v=>!v.checked);
      wx.setStorageSync('cart', newCart);
      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch(err){
      await showToast({title:"支付失败"});
      console.log(err);
    }
    


  }
  

})