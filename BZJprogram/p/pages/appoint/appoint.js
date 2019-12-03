//appoint.js
// const util = require('../../utils/util.js')

Page({
  data:{
    isread:false,
    venue_id:"",
    date:null,
  },
  onLoad: function (options) {
    console.log(options.date)
    console.log(options.venue_id)

    this.setData({
      date: new Date(""+options.data),
      venue_id: options.venue_id,
    })
  
  },
  read: function () {
    wx.navigateTo({
      url: '../attention/attention'
    })
  },

  appointment: function () {
    // wx.setStorageSync('date', this.data.date);
    // console.log(this.data.isread)
    if (this.data.isread){
      let date = JSON.stringify(this.data.date)
      wx.navigateTo({
        url: '../table/table?venue_id=' + this.data.venue_id + "&date=" + date
      })
    }else{
      wx.showToast({
        title: '请先阅读《毕至居预约说明》，并且同意',
        icon: 'none',
        duration: 2000
      })
    }



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
  },

  //设置轮播容器的高度
  setContainerHeight: function (e) {

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