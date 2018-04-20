//index.js
//获取应用实例
const app = getApp();
//URL下标从1开始
var page = 1;

Page({
  data: {
    items: [],
    hidden: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    wx.request({
      url: "http://gank.io/api/data/all/10/" + page,
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: res => {
        if (
          res == null ||
          res.data == null ||
          res.data.results == null ||
          res.data.results.length <= 0
        ) {
          console.error('服务器数据为null');
          return;
        }
        console.log(res.data);
        this.setData({
          items: [...this.data.items, ...res.data.results],
          hidden: true
        });
        page += 1;
      }
    });
  }
});
