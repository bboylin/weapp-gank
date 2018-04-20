//index.js
//获取应用实例
const app = getApp();
//URL下标从1开始
var page = 1;

Page({
  data: {
    items: [],
    hidden: false,
    wHeight: 0
  },
  //事件处理函数
  onTitleClick: function() {
    wx.showToast({
      title: "个人开发者不支持webview",
      icon: "none"
    })
  },
  onImageClick: function() {
    wx.showToast({
      title: "image",
      icon: "success"
    })
  },
  refresh: function(){
    page = 1;
    console.log('下拉刷新')
    load(this)
  },
  loadMore: function(){
    console.log('加载更多')
    load(this)
  },
  onLoad: function() {
    var that = this;
    load(that)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        console.log(res.windowHeight)
        that.setData({
          wHeight: res.windowHeight
        })
      }
    })
  }
});

function load(that){
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
      if(page==1){
        that.setData({
          items: res.data.results,
          hidden: true
        });
      }else{
        that.setData({
          items: [...that.data.items, ...res.data.results],
          hidden: true
        });
      }
      page += 1;
    }
  });
}