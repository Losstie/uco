// pages/category/category.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 选中菜单
    selectedIndex:0,
    // 右侧菜单数据
    rightMenuList:[],
    // 右侧内容距离顶部距离
    scrollTop:0,
    // 接口返回数据
    cates: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地缓存  
    // 当无旧数据或者旧数据过期则发送新请求
    const Cates = wx.getStorageSync('cates');
    if(!Cates) {
      this.getCates();
    }else{
      // 存在旧数据 过期时间定义5分钟
      if (Date.now() - Cates.time > 1000*5*60) {
        // 过期
        this.getCates();
      }else{
        // 没有过期
        const _cates = Cates.data;
        const _leftMenuList = _cates.map(v=>v.cat_name);
        const _rightMenuList = _cates[0].children;
        this.setData({ 
          cates:_cates,
          leftMenuList:_leftMenuList,
          rightMenuList:_rightMenuList
        });

      }
    }
  },
  // 获取分类数据
  getCates(){
    request({url:'/categories'})
    .then((result)=>{
      const _cates = result.data.message;
      const _leftMenuList = _cates.map(v=>v.cat_name);
      const _rightMenuList = _cates[0].children;
      this.setData({ 
        cates:_cates,
        leftMenuList:_leftMenuList,
        rightMenuList:_rightMenuList
      });
      // 缓存
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: _cates
      })
    });
  },
  // 切换分类
  adjustCate(e){
    const {index} = e.target.dataset;
    const _rightcontent = this.data.cates[index].children;
    this.setData({
      selectedIndex: index,
      rightMenuList: _rightcontent,
      scrollTop:0
    });
  }
})