// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js'

import request from '../../utils/request'
/* 获取全局对象实例 */
const appInstance = getApp(

)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    song: {}, // 歌曲详情对象
    musicId: '', // 音乐id
    musicLink: '', // 音乐的链接 
  },
  handleMusicPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    let {
      musicId,
      musicLink
    } = this.data;
    this.musicControl(this.data.isPlay, musicId, musicLink);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    // 获取音乐详情
    this.getMusicInfo(musicId);
    // 创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监视音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true);
      // 修改全局音乐播放的状态
      appInstance.globalData.musicId = musicId;
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });
  },
  // 修改播放状态的功能函数
  changePlayState(isPlay) {
    // 修改音乐是否的状态
    this.setData({
      isPlay
    })
  },
  // 控制音乐播放/暂停的功能函数
  async musicControl(isPlay, musicId, musicLink) {
    if (isPlay) { // 音乐播放
      if (!musicLink) {
        // 获取音乐播放链接
        let musicLinkData = await request('/song/url', {
          id: musicId
        });
        musicLink = musicLinkData.data[0].url;
        this.setData({
          musicLink
        })
      }
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
    } else { // 暂停音乐
      this.backgroundAudioManager.pause();
    }

  },
  // 获取音乐详情的功能函数
  async getMusicInfo(musicId) {
    let songData = await request('/song/detail', {
      ids: musicId
    });
    console.log(songData);
    this.setData({
      song: songData.songs[0],
    })
    // 动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },

  /* 上一曲，下一曲 */

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