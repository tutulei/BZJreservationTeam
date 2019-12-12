// pages/user/user.js
Page({
 
  /**
   * 页面的初始数据
   */
 
  data: {
    status: '正常',
    contactList: [{
      "name": "张三",
      "sno": "31701011",
      "tel": "13348774655"
    }, {
      "name": "李四",
      "sno": "31701023",
      "tel": "13587678889"
    }, {
      "name": "王五",
      "sno": "31701025",
      "tel": "13587678689"
    }]
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

  },

  search: function () {

  },

  tag: function () {

  },

  btn: function () {
    var myThis = this;
    var list = ['正常', '异常']
    wx.showActionSheet({
      itemList: ['正常', '异常'],
      success(res) {
        // console.log(res.tapIndex)
        myThis.setData({
          status: list[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  }

})