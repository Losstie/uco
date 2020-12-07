// pages/goods_detail/goods_detail.js
import {request} from "../../request/index"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    goodsObj:{},
    isCollect:false

    
  },
  // 商品信息
  goodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let cur = pages[pages.length-1];
    let options = cur.options;
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情
  async getGoodsDetail(goods_id){
  //   request({
  //     url:'/goods/detail',
  //     data:{goods_id}
  //   }).then(res=>{
  //     let _goodsObj = res.data.message;
  //     this.goodsInfo = _goodsObj;
  //     this.setData({
  //       goodsObj:{
  //         goods_name:_goodsObj.goods_name,
  //         goods_price:_goodsObj.goods_price,
  //         pics: _goodsObj.pics,
  //         goods_introduce:_goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
  //       }
  //     })
  //   })
      const goodsObj = (await request({url:'/goods/detail', data:{goods_id}})).data.message;
      this.GoodsInfo = goodsObj;
      // 获取缓存中的商品收藏的数组
      let collect = wx.getStorageSync('collect')||[];
      let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          pics: goodsObj.pics,
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
        },
        isCollect
      })
  },
  // 轮播图预览
  handlePreviewImage(e){
    // 构造预览图片数组
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
   
    
    
  },
  // 加入购物车
  handleJoinCart(e){
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = false;
      cart.push(this.goodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask:true
    })
  },
  // 点击收藏
  handleCollect(){
    let isCollect = false;
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true
      })
    }else{
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({isCollect});
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})