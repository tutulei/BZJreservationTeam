// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    username: "管理员，你好！",
    list: [{
      name: "张三",
      sno: "31701011",
      tel: "13348774655",
      isTouchMove: false
    }, {
      name: "李四",
      sno: "31701023",
      tel: "13587678889",
      isTouchMove: false
    }, {
      name: "王五",
      sno: "31701025",
      tel: "13587678689",
      isTouchMove: false
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

  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },

  touchmove: function (e) {
    let index = e.currentTarget.dataset.index,//当前索引
      startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    this.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    // //更新数据
    this.setData({
      list: this.data.list
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },

  del: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定将其移除黑名单吗？',
      success: (res) => {
        if (res.confirm) {
          let listItem = this.data.list[e.currentTarget.dataset.index]
          this.data.list.splice(e.currentTarget.dataset.index, 1)
          this.setData({ list: this.data.list })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})