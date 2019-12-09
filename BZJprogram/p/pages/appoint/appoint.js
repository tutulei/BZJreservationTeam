//appoint.js
// const util = require('../../utils/util.js')

Page({
  data: {
    isread: false,
    iswrite: false,
    venue_id: "c3429d2d-4898-45c0-8b9c-22dc67f290f6",
    date: null,
    url: "cloud://yuntest1-xt878.7975-yuntest1-xt878-1300763170/picture/unconfirm.png",
  },

  onLoad: function(options) {
    var date = new Date("2018-05-10 10:20:32")
    this.setData({
      date: date,
      url1: "cloud://yuntest1-xt878.7975-yuntest1-xt878-1300763170/picture/unconfirm.png",
      url2: "cloud://yuntest1-xt878.7975-yuntest1-xt878-1300763170/picture/unconfirm.png"
    })

  },

  onShow: function() {
    if (this.data.isread) {
      /*改变tubiao*/
      this.setData({
        url1: "cloud://yuntest1-xt878.7975-yuntest1-xt878-1300763170/picture/confirm.png"
      })
    }
    if (this.data.iswrite) {
      /*改变tubiao*/
      this.setData({
        url2: "cloud://yuntest1-xt878.7975-yuntest1-xt878-1300763170/picture/confirm.png"
      })
    }
  },



  read: function() {
    wx.navigateTo({
      url: '../attention/attention'
    })
  },

  appointment: function() {
    // wx.setStorageSync('date', this.data.date);
    // console.log(this.data.isread)
    if (this.data.isread) {
      let date = JSON.stringify(this.data.date)
      wx.navigateTo({
        url: '../table/table?venue_id=' + this.data.venue_id + "&date=" + date
      })
    } else {
      wx.showToast({
        title: '请先阅读《毕至居预约说明》，并且同意',
        icon: 'none',
        duration: 2000
      })
    }
  },

  submit: function() {
    if (this.data.isread && this.data.iswrite) {
      wx.showModal({
        title: '提示',
        content: '提交后将进入待添加成员状态，该状态下仍可在详情页面修改部分信息',
        icon: 'none',
        duration: 3000,
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 2,
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先填写预约单！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  //设置轮播容器的高度
  setContainerHeight: function(e) {

    //图片的原始宽度
    var imgWidth = e.detail.width;

    //图片的原始高度
    var imgHeight = e.detail.height;

    //同步获取设备宽度
    var sysInfo = wx.getSystemInfoSync();
    console.log("sysInfo:", sysInfo);

    //获取屏幕的宽度
    var screenWidth = sysInfo.screenWidth;

    //获取屏幕和原图的比例
    var scale = screenWidth / imgWidth;

    //设置容器的高度
    this.setData({
      height: imgHeight * scale
    })
    console.log(this.data.height);
  }
})