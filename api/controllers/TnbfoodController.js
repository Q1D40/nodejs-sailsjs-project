/**
 * TnbfoodController
 *
 * @description :: tnbfood controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');

module.exports = {

  /**
   * make
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  make: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth');
    var openid = req.cookies.openid;
    var opt = {openid: openid};
    User.findOne(opt).exec(function (err, userData) {
      if (err) return res.serverError();
      if (!userData) return res.serverError();
      var lw = userData.height - 105;
      var wp = 0;
      var wl = (userData.weight - lw) / lw;
      if ( wl < -0.1) {
        wp = 1;
      }
      if ( wl >= -0.1 && wl <= 0.1) {
        wp = 2;
      }
      if ( wl > 0.1) {
        wp = 3;
      }
      var cp = 0;
      if (wp == 3) {
        if (userData.work == '卧床') cp = 20;
        if (userData.work == '轻度') cp = 25;
        if (userData.work == '中度') cp = 30;
        if (userData.work == '重度') cp = 35;
      }
      if (wp == 2) {
        if (userData.work == '卧床') cp = 25;
        if (userData.work == '轻度') cp = 30;
        if (userData.work == '中度') cp = 35;
        if (userData.work == '重度') cp = 40;
      }
      if (wp == 1) {
        if (userData.work == '卧床') cp = 30;
        if (userData.work == '轻度') cp = 35;
        if (userData.work == '中度') cp = 40;
        if (userData.work == '重度') cp = 45;
      }
      var dc = lw * cp;
      var data = {};
      data.dc = Math.round(dc);
      data.jhf = Math.round(dc / 90);
      data.tshhw = Math.round(data.jhf * 0.6)
      data.dbz = Math.round(data.jhf * 0.2)
      data.zf = data.jhf - data.tshhw - data.dbz;
      data.zjhf = Math.round(data.jhf * 0.25);
      data.wjhf = Math.round(data.jhf * 0.4);
      data.njhf = data.jhf - data.zjhf - data.wjhf;
      data.zgsjhf = Math.round(data.zjhf * 0.5);
      data.wgsjhf = Math.round(data.wjhf * 0.4);
      data.ngsjhf = Math.round(data.njhf * 0.4);
      Tnbfood.find().exec(function (err, tnbfoodData) {
        if (err) return res.serverError();
        var foodDic = {};
        for (var key in tnbfoodData) {
          if (!foodDic[tnbfoodData[key].category]) foodDic[tnbfoodData[key].category] = [];
          foodDic[tnbfoodData[key].category].push(tnbfoodData[key]);
        }
        data.foodDic = foodDic;
        return res.view('tnbfood/food', {data: data, layout: false});
      });
    });
  },

  /**
   * make ajax
   *
   * @method POST
   *
   * @param {Object} req
   * @param {Object} res
   */
  make_ajax: function (req, res) {
    if (!req.cookies.openid) return res.serverError();;
    var list = req.body;
    var openid = req.cookies.openid;
    var opt = {openid: openid};
    User.findOne(opt).exec(function (err, userData) {
      if (err) return res.serverError();
      if (!userData) return res.serverError();
      var opt = {openid: openid, list: list, info: userData};
      Tnbfoodlist.create(opt).exec(function (err, tnbfoodlistData) {
        if (err) return res.serverError();
        return res.send(200, {result: 'ok'});
      });
    });
  },

  /**
   * list
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  list: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth');
    var openid = req.cookies.openid;

    Tnbfood.find().exec(function (err, tnbfoodData) {
      if (err) return res.serverError();
      var foodDic = {};
      for (var key in tnbfoodData) {
        foodDic[tnbfoodData[key].name] = tnbfoodData[key];
      }
      var opt = {openid: openid, sort: 'id DESC'};
      Tnbfoodlist.find(opt, function (err, tnbfoodlistData) {
        if (err) return res.serverError();
        var list = [];
        for (key in tnbfoodlistData) {
          var row = {};
          row.id = tnbfoodlistData[key].id;
          row.time = moment(tnbfoodlistData[key].createdAt, "", "zh-cn").fromNow()
          row.zc = '';
          for (k in tnbfoodlistData[key].list['早餐'].s) {
            var v = tnbfoodlistData[key].list['早餐'].s[k];
            if (v > 0) {
              row.zc += k + (foodDic[k].portion * v) + foodDic[k].unit + '、';
            }
          }
          row.wc = '';
          for (k in tnbfoodlistData[key].list['午餐'].s) {
            var v = tnbfoodlistData[key].list['午餐'].s[k];
            if (v > 0) {
              row.wc += k + (foodDic[k].portion * v) + foodDic[k].unit + '、';
            }
          }
          list.push(row);
        }
        var data = {};
        data.list = list;
        return res.view('tnbfood/foodlist', {data: data, layout: false});
      });
    });
  },

  /**
   * detail
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  detail: function (req, res) {
    Tnbfood.find().exec(function (err, tnbfoodData) {
      if (err) return res.serverError();
      var foodDic = {};
      for (var key in tnbfoodData) {
        foodDic[tnbfoodData[key].name] = tnbfoodData[key];
      }
      var opt = {sort: 'id DESC', limit: 1};
      var id = req.query.id;
      if (id) opt.id = id;
      Tnbfoodlist.find(opt, function (err, tnbfoodlistData) {
        if (err) return res.serverError();
        if (!tnbfoodlistData[0]) return res.serverError();
        var tnbfoodlistData = tnbfoodlistData[0];
        var data = {};
        data.jhf = tnbfoodlistData.list.d;
        data.dc = tnbfoodlistData.list.dc;
        data.time = moment(tnbfoodlistData.createdAt).format("YYYY年MM月DD日 HH:mm:ss")
        data.info = tnbfoodlistData.info;
        data.info.lw = data.info.height - 105;
        data.zc = {};
        data.zc.jhf = tnbfoodlistData.list['早餐'].d;
        data.zc.list = [];
        for (k in tnbfoodlistData.list['早餐'].s) {
          var row = {};
          var v = tnbfoodlistData.list['早餐'].s[k];
          if (v > 0) {
            row = foodDic[k];
            row.f = v;
            row.zl = row.portion * v;
            data.zc.list.push(row);
          }
        }
        data.wc = {};
        data.wc.jhf = tnbfoodlistData.list['午餐'].d;
        data.wc.list = [];
        for (k in tnbfoodlistData.list['午餐'].s) {
          var row = {};
          var v = tnbfoodlistData.list['午餐'].s[k];
          if (v > 0) {
            row = foodDic[k];
            row.f = v;
            row.zl = row.portion * v;
            data.wc.list.push(row);
          }
        }
        data.nc = {};
        data.nc.jhf = tnbfoodlistData.list['晚餐'].d;
        data.nc.list = [];
        for (k in tnbfoodlistData.list['晚餐'].s) {
          var row = {};
          var v = tnbfoodlistData.list['晚餐'].s[k];
          if (v > 0) {
            row = foodDic[k];
            row.f = v;
            row.zl = row.portion * v;
            data.nc.list.push(row);
          }
        }
        return res.view('tnbfood/fooded', {data: data, layout: false});
      });
    });
  }

};

