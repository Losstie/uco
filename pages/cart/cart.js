// pages/cart/cart.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWX"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart: [],
    allChecked: false,
    totalPrice:0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面展示
   */
  onShow:function(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    });
    this.setCart(cart);
  },  
  // 收货地址 
  async handleChooseAddress(){
    try {
      // 获取权限状态
      const  res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress===false){
        await openSetting();
      }
      // 调用获取收货地址API
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync('address', address);
    }catch(err){
      console.log(err);
    }
  },
  // 选择商品
  handleItemCheck(e){
    // 获取被修改的商品id
    const cur_good_id = e.currentTarget.dataset.id;
    // 获取购物车数据
    let {cart}= this.data;
    // 修改状态的商品索引
    const index = cart.findIndex(v=>cur_good_id===v.goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 购物车数据更改
  setCart(cart){
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
      }else{
        allChecked = false;
      }
    });
    // 判断数组是否为空
    allChecked = cart.length !=0?allChecked: false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart);

  },
  // 全选按钮点击
  handleAllChecked(e){
    let {cart, allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 编辑商品数量
  async handleItemNumEdit(e){
    // 获取传递参数
    const {id, operation} = e.currentTarget.dataset;
    // 获取购物车
    let {cart} = this.data;
    // 需修改的索引
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num === 1 && operation<0){
      const res = await showModal({title:"提示", content:"您确定要删除吗？"});
      if(res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }else {
      // 修改数量
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 结算功能
  async handlePay(e){
    const {address, totalNum} = this.data;
    // 判断是否有通讯地址
    if(!address.userName){
      await showToast({title:"您还没与选择收货地址!"});
      return;
    }
    // 判断是否选购商品
    if(totalNum === 0) {
      await showToast({title:"您还没有选购商品"});
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  } 

})