// pages/place/place.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      date:'',
      TIME:null,
      venueid: '',
      venueaddr: ['北校区尚雅楼', '南校区致远楼'],
      venuetime: ['10:00-14:00', '16:00-20:00'],
      venuestat: ['已开放','未开放'],
      addr_index: 0,
      time_index: 0,
      stat_index: 0,
      status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Now = util.formatTime(new Date());
    this.setData({
      TIME: Now
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindAddressChange: function (e) {
    console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    this.setData({
      addr_index: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    this.setData({
      time_index: e.detail.value
    })
  },

  bindStatusChange: function (e) {
    console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    this.setData({
      stat_index: e.detail.value
    })
  },

  updateStatus: function () {
    const db = wx.cloud.database()

    db.collection('venue').where({
      venue_addr: this.data.venueaddr[this.data.addr_index],
      venue_time: this.data.venuetime[this.data.time_index]
    }).get({
      success: res => {
        var data = res.data[0]
        this.setData({
          venueid: data.venue_id
        })
      }
    }).then(res => {
      db.collection('venuediffstatus').add({
        // 要插入的数据
        data: {
          venue_date: this.data.date,
          venue_id: this.data.venueid,
          venue_status: this.data.status,
        }
      })
    }).catch(err => {
      // 插入数据失败
      console.log(err)
    })
  },

  sure: function () {
    this.updateStatus()
    wx.navigateTo({
      url: '../resermanager/resermanager'
    })
  },
})