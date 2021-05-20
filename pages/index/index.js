// pages/index/index.js
import {
  getBanner,
  getRec,
  getTop
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    getBanner('/banner', {
      type: 2
    }).then(res => {
      this.setData({
        bannerList: res.banners
      })
    })

    /* 获取banner数据 */


    getRec('/personalized', {
      limit: 30
    }).then(res => {
      console.log(res);
      this.setData({
        recList: res.result
      })
    })

    /* 获取排行榜数据 */
    let finalArr = []

    let i = 0
    while (i < 5) {
      i++
      getTop('/top/list', {
        idx: i
      }).then(res => {
        let name = res.playlist.name
        let resArr = res.playlist.tracks.slice(0, 3)
        let toplistItem = {
          name,
          tracks: resArr
        }
        finalArr.push(toplistItem)
        this.setData({
          topList: finalArr
        })
      })

    }


  },
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong'
    })
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