// pages/place/place.js
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    yyPlace: '',
    yyTime: '',
    yyDate: '',
    yyStatus: ''
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

  btn: function () {
    var myThis = this;
    var list = ['尚雅毕至居', '致远毕至居']
    wx.showActionSheet({
      itemList: ['尚雅毕至居', '致远毕至居'],
      success(res) {
        // console.log(res.tapIndex)
        myThis.setData({
          yyPlace: list[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  },

  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      yyDate: e.detail.value
    })
  },

  btn2: function () {
    var myThis = this;
    var list = ['10:00-14:00', '16:00-20:00']
    wx.showActionSheet({
      itemList: ['10:00-14:00', '16:00-20:00'],
      success: function (res) {
        // console.log(res.tapIndex)
        myThis.setData({
          yyTime: list[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  btn3: function () {
    var myThis = this;
    var list = ['启用', '禁用']
    wx.showActionSheet({
      itemList: ['启用', '禁用'],
      success: function (res) {
        console.log(res.tapIndex)
        myThis.setData({
          yyStatus: list[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  submit: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    }),
      wx.navigateBack({
        delta: 2,
      })
  }

})