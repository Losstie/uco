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
      // 缓存token 跳转上一层
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      })
      } catch(err){
        console.log(err)
      }
  }
})