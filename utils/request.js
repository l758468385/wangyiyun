import config from '../config'

export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, rejetct) => {
    wx.request({
      url: config.baseUrl + url,
      method,
      data,
      header: {
        cookie: wx.getStorageSync('cookies')  ? JSON.parse(wx.getStorageSync('cookies')) .find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },
      success: (res) => {
        var pages = getCurrentPages() //获取加载的页面
        var currentPage = pages[pages.length - 1] //获取当前页面的对象
        var url1 = currentPage.route //当前页面url
        if (url1 == 'pages/login/login') {
          resolve(res)
        } else {
          resolve(res.data)
        }
      },
      fail: (err) => {
        rejetct(err)
      }

    })
  })
}