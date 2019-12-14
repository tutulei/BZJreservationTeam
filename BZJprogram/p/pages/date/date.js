// pages/date/date.js
Page({
  onLoad: function (options) {
    wx.showLoading({
      title: "慢吞吞地加载中",
      mask: true,
    })
    this.setDiffReservationMsg()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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

  sure:function() {
    if (this.data.isclick){
      wx.navigateTo({
        url: '../appoint/appoint?date=' + this.data.date + '&venue_id=' + this.data.venue_id
      })
    }else{
      wx.showToast({
        title: '请先选择预约时间',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    venue_id: "",
    date: "",
    isclick: false,
    //日期
    timeList: [],
    //可预约天数
    yyDay: 7,
    //预约时间段
    hourList: [
    { hour: "尚雅楼 10:00-14:00", n: 1, isShow: true },
    { hour: "尚雅楼 16:00-20:00", n: 2, isShow: true },
    { hour: "致远楼 10:00-14:00", n: 3, isShow: true },
    { hour: "致远楼 16:00-20:00", n: 4, isShow: true }
    ],

    /*fbdreserList为不能选择的场次列表，格式为
    [
      {
      venuename:"尚雅楼",
      venuetime:"10:00-14:00",
      date:"2021-10-12"
      },
      {……},
      ……
      ]
    */
    fbdreserList:[],
    //是否显示
    timeShow: false,
    currentTab: 0,
    //选择时间
    chooseHour: "",
    //选择日期
    chooseTime: "",
    hourIndex: -1,
    //预约时间
    yyTime: ''
  },
  //日期选择
  timeClick: function (e) {
    //(所有时间点都可选择)
    var list = this.data.hourList;
    for (var i = 0; i < list.length; i++) {
      list[i].isShow = true;
    }
    this.setData({
      hourList: list
    })
    
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      yyTime: '',
      chooseHour: this.data.timeList[0],
      hourIndex: -1
    });
    console.log(this.data.chooseTime)
    this.getVenueId()
  },

  // 时间选择
  hourClick: function (e) {
    this.data.isclick=true;
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,

    });
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    this.setData({
      yyTime: chooseTime
    })
    console.log(chooseTime)
    this.getVenueId(this.data.chooseHour)
    this.getStrTime(this.data.yyTime)
  },

  getVenueId: function (str) {
    // console.log(("" + str).substr(0, 3))
    // console.log(("" + str).substr(4))
    var name = ("" + str).substr(0, 3)
    var time = ("" + str).substr(4)
    const db = wx.cloud.database()
    db.collection('venue').where({
      venue_name: name,
      venue_time: time,
    }).get({
      success: res => {
        var data = res.data[0]
        // console.log(res)
        this.setData({
          venue_id: data._id,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  getStrTime: function (str) {
    // console.log(("" + str).substr(0, 10))
    this.setData({
      date: ("" + str).substr(0, 10),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
      * 时间对象的格式化;
    */
    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate()+7,     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds(), //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }

    /**
      * 日期的计算;
    */
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      switch (interval) {
        case "y": date.setFullYear(this.getFullYear() + number); break;
        case "m": date.setMonth(this.getMonth() + number); break;
        case "d": date.setDate(this.getDate() + number); break;
        case "w": date.setDate(this.getDate() + 7 * number); break;
        case "h": date.setHours(this.getHours() + number); break;
        case "n": date.setMinutes(this.getMinutes() + number); break;
        case "s": date.setSeconds(this.getSeconds() + number); break;
        case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
      }
      return date;
    }

    var dateList = [];
    var now = new Date();
    for (var i = 0; i < this.data.yyDay; i++) {
      var d = {};
      var day = new Date().DateAdd('d', i).getDay();
      if (day == 1) { var w = "周一" }
      if (day == 2) { var w = "周二" }
      if (day == 3) { var w = "周三" }
      if (day == 4) { var w = "周四" }
      if (day == 5) { var w = "周五" }
      if (day == 6) { var w = "周六" }
      if (day == 0) { var w = "周日" }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM-dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });

    //初始化当前日期
    this.setData({
      chooseTime: this.data.timeList[0].date,
    });
    this.getVenueId()
  },
  setDiffReservationMsg:function(){
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('venuediffstatus').where({
      venue_status: _.or(_.eq(app.globalData.STATUS_RESER_WA), _.eq(app.globalData.STATUS_VENUE_HR)),
    }).get({
      success: res => {
        var data = res.data
        var list = [];
        for (var i = 0; i < s.length; i++) {
          var jstr = {}
          jstr.date = data[i].venue_date
          jstr.venuename = ""
          jstr.venuetime = ""
          list.push(jstr)
          this.setData({
            fbdreserList:list
          })
          this.setDiffVenueMsg(i,data[i].venue_id)

        }


      }
    })
  },
  setDiffVenueMsg:function(i,id){
    const db = wx.cloud.database();
    db.collection('venue').where({
      _id:id
    }).get({
      success: res => {
        var list = this.data.fbdreserList
        list[i].venuename = res.data[0].venue_name
        list[i].venuetime = res.data[0].venue_time
        this.setData({
          fbdreserList: list,
        })
      }
    })
  }
})