// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "管理员，你好！",
    contactList: [{
      "time": "尚雅楼 16:00-20:00",
      "date": "2019-11-14",
      "status": "待审核",
    }, {
        "time": "尚雅楼 10:00-14:00",
        "date": "2019-11-14",
        "status": "待审核",
  }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUsermsg();
    // this.getAnnouncement();
  },
  
  button1: function () {
    wx.navigateTo({
      url: '../resermanager/resermanager'
    })
  },

  button2: function () {
    wx.navigateTo({
      url: '../venuemanager/venuemanager'
    })
  },

  button3: function () {
    wx.navigateTo({
      url: '../usermanager/usermanager'
    })
  },

  check: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },


  uncheck: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  search: function () {
      
  },
})