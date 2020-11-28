// Promise 形式 getSetting
export const getSetting = ()=>{
  return new Promise((resolve, rejected)=>{
    wx.getSetting({
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        rejected(err);
      }
    });
  })
}

// Promise 形式 chooseAddress
export const chooseAddress = ()=>{
  return new Promise((resolve, rejected)=>{
    wx.chooseAddress({
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        rejected(err);
      }
    });
  })
}

// Promise 形式 openSetting
export const openSetting = ()=>{
  return new Promise((resolve, rejected)=>{
    wx.getSetting({
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        rejected(err);
      }
    });
  })
}
/**
 * Promise 形式 showModal
 * @param {object} param0 参数
 */
export const showModal = ({title, content})=>{
  return new Promise((resolve, rejected)=>{
    wx.showModal({
      title:title,
      content:content,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        rejected(err);
      }
    })
  })
}

/**
 * Promise 形式 showToast
 * @param {object} param0 参数
 */
export const showToast = ({title})=>{
  return new Promise((resolve, rejected)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success: res=>{
        resolve(res);
      },
      fail:err=>{
        rejected(err);
      }
    })
  })
}


