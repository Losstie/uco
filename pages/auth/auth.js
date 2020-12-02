// pages/auth/auth.js
import {request} from  "../../request/index"
import {getSetting, chooseAddress, openSetting, showModal, showToast, login} from "../../utils/asyncWX"
import regeneratorRuntim, { AsyncIterator } from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e){
    try {
      // 获取用户信息
      const { encrypteData, rawData, iv, signature } = e.detail;
      // 获取小程序登陆成功后的code
      const {code} = await login();
      // 发送请求获取用户token
      const loginParams = {encrypteData, rawData, iv, signature , code};
      const {token} = await request({
        url:'/users/wxlogin',
        data:loginParams,
        method: 'post'
      });
      // token = 
      // 缓存token 跳转上一层
      wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      wx.navigateBack({
        delta: 1
      })
      } catch(err){
        console.log(err)
      }
  }
})