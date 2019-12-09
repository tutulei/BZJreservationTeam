// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList: [{
      "name": "尚雅毕至居",
      "time": "2019-11-14",
      "place": "14:00-16:00",
      "status": "待审核"
    }, {
      "name": "致远毕至居",
      "time": "2019-11-15",
      "place": "14:00-16:00",
      "status": "待审核"
  }],

    contactList2: [{
      "name": "致远毕至居",
      "time": "2019-11-14",
      "place": "14:00-16:00",
      "status": "已审核"
    }, {
      "name": "尚雅毕至居",
      "time": "2019-11-13",
      "place": "14:00-16:00",
      "status": "已审核"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUsermsg();
    // this.getAnnouncement();
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