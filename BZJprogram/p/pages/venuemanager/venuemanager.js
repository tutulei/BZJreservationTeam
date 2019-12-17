// pages/place/place.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "管理员，你好！",
    yyPlace:'',
    yyTime: '',
    yyDate: '',
    yyStatus:'',
    venueid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  btn: function () {
    var myThis = this;
    var list = ['北校区尚雅楼', '南校区致远楼']
    wx.showActionSheet({
      itemList: ['北校区尚雅楼', '南校区致远楼'],
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
        if (res.tapIndex== 0){
          myThis.setData({
            yyStatus: app.globalData.STATUS_VENUE_CR
          })
        }
        else if (res.tapIndex== 1){
          myThis.setData({
            yyStatus: app.globalData.STATUS_VENUE_NO
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  updateStatus: function () {
    const db = wx.cloud.database()
    db.collection('venue').where({
      venue_addr: this.data.yyPlace,
      venue_time: this.data.yyTime
    }).get({
      success: res => {
        console.log(res)
        var data = res.data[0]
        this.setData({
          venueid: data._id
        })
        db.collection('venuediffstatus').add({
          // 要插入的数据
          data: {
            venue_date: this.data.yyDate,
            venue_id: this.data.venueid,
            venue_status: this.data.yyStatus,
          }
        })
      }
    })


      
  },

  submit: function () {
    this.updateStatus()
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    }),
      wx.navigateBack({
        delta: 1,
      })
  }

})