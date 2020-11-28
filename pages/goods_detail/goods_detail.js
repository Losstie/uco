// pages/goods_detail/goods_detail.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    goodsObj:{}

  },
  // 商品信息
  goodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.setData({
      goods_id
    });
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情
  getGoodsDetail(goods_id){
    request({
      url:'/goods/detail',
      data:{goods_id}
    }).then(res=>{
      let _goodsObj = res.data.message;
      this.goodsInfo = _goodsObj;
      this.setData({
        goodsObj:{
          goods_name:_goodsObj.goods_name,
          goods_price:_goodsObj.goods_price,
          pics: _goodsObj.pics,
          goods_introduce:_goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
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

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})