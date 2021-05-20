import {
  Login
} from '../../api/login'
// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  handleInput(e) {
    /* 利用id传值 */
    // let type = e.currentTarget.id
    // console.log(e);
    // this.setData({
    //   [type] :e.detail.value
    // })
    /* 利用dataset传值 */
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value
    })
  },
  async login() {
    let {
      phone,
      password
    } = this.data
    if (!phone || !password) {
      wx.showToast({
        title: '脑瘫吧,填东西啊',
        icon: "none"
      })
      return
    }
    let result = await Login('/login/cellphone', {
      phone,
      password
    })
    console.log(result);
    if (result.data.code === 200) { // 登录成功
      wx.showToast({
        title: '登录成功'
      })
      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.data.profile))

      wx.setStorage({
        key: 'cookies',
        data: JSON.stringify(result.cookies)
      })

      // 跳转至个人中心personal页面
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    } else if (result.data.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else if (result.data.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})