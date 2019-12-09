const app = getApp()
// pages/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // that.setData({
    //   project_id: options.project_id
    // })
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
    // var that = this; let pages = getCurrentPages(); //页面栈    
    // let currPage = pages[pages.length - 1]; //当前页面          
    // that.setData({      
    //   name: currPage.options.name //获取上上级页面传的参数    
    // })
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

  getInviteInput: function (e) {
    this.setData({
      code: e.detail.value,
    })
  },


  formSubmit: function (e) {
    if(this.isAdmin()){
      wx.navigateTo({
        url: '../resermanager/resermanager'
      })
    }else{
      this.addReservation()
    }


    
    // // console.log('form发生了submit事件，携带数据为：', e.detail.value),
    // wx.navigateBack({
    //   delta: 1,
    // })
  },

  formReset: function () {
    console.log('form发生了reset事件'),
    wx.navigateBack({
      delta: 1,
    })
  },
  isAdmin:function(){
    var is =false
    var str = ""+this.data.code
    if (str.substr(0,4)==="adad"){
      const db = wx.cloud.database()
      db.collection('admin').where({
        admin_code: str,
      }).get({
        success: res => {
          // console.log('[数据库] [查询记录] 成功: ', res)
          if (res.data[0] === undefined) {
            is = false
          }else{
            is = true
            console.log("hello admin")
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
    return is
  },
  addReservation:function(){
    const db = wx.cloud.database()
    db.collection('invite').where({
      invite_code: this.data.code,
    }).get({
      success: res => {
          // console.log('[数据库] [查询记录] 成功: ', res)
          if (res.data[0] === undefined) {
            wx.showToast({
              title: '无效邀请码',
              icon: 'none',
              duration: 1000
            })
          } else {
            this.addmenber(res.data[0].reservation_id)
          }
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
  addmenber:function(id){
    const db = wx.cloud.database();
    var menbers =""
    db.collection('reservation').where({
      _id: id,
    }).get({
      success: res => {
        menbers = res.data[0].reservation_menber
      }
    }).then(res => {
      // console.log(res)
      const can = db.collection('reservation').doc(id).update({
        data: {
          reservation_menber: menbers === "" ? app.globalData.usermsg.user_no : (menbers + "," + app.globalData.usermsg.user_no)
        }
      })
    })

  }
})