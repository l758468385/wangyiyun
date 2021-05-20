// pages/recommendSong/recommendSong.js
import {getRecommend} from '../../api/recommend'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getRecommend('/recommend/songs').then(res => {
      console.log(res);
     let recommendList =  res.recommend
     this.setData({
      recommendList
     })
    })
  },
  toSongDetail(e){
    console.log(e);
    let song = e.currentTarget.dataset.song
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + song.id
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