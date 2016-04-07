/**
 * MyController
 *
 * @description :: my controller
 * @help        :: See http://sailsjs.org/documentation/concepts/Controllers
 */

var https = require('https');

module.exports = {

  /**
   * index
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  index: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth?redirect=' + encodeURI('my/index'));
    var openid = req.cookies.openid;
    var opt = {openid: openid};
    Wxauth.findOne(opt).exec(function (err, wxauthData) {
      if (err) return res.serverError();
      var accessToken = wxauthData.accessToken;
      var refreshToken = wxauthData.refreshToken;
      var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';
      https.get(url, function(resp) {
        var body = '';
        resp.on('data', function (chunk) {
          body += chunk;
        });
        resp.on('end', function () {
          var data = JSON.parse(body);
          if (data.errcode) return res.redirect('/user/wxreftk?redirect=' + encodeURI('user/info?type=1'));
          return res.view('my/index', {data: data, layout: false});
        });
      }).on('error', function(e) {
        console.error(e);
      });
    });
  },

  /**
   * info
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  info: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth?redirect=' + encodeURI('my/info'));
    var openid = req.cookies.openid;
    var opt = {openid: openid};
    User.findOne(opt).exec(function (err, userData) {
      if (err) return res.serverError();
      if (!userData) userData = {};
      var data = {};
      data.userData = userData;
      return res.view('my/info', {data: data, layout: false});
    });
  },

  /**
   * edit
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  edit: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth?redirect=' + encodeURI('my/info'));
    var openid = req.cookies.openid;
    var f = req.query.f;
    var k = req.query.k;
    var v = req.query.v;
    var data = {};
    if (f == 'age') {
      return res.view('my/slc-age', {data: data, layout: false});
    } else if (f == 'height') {
      return res.view('my/slc-height', {data: data, layout: false});
    } else if (f == 'sex') {
      return res.view('my/slc-sex', {data: data, layout: false});
    } else if (f == 'w') {
      return res.view('my/slc-w', {data: data, layout: false});
    } else if (f == 'work') {
      return res.view('my/slc-work', {data: data, layout: false});
    } else {
      if (k && v) {
        var data = {};
        data.sex = '男';
        data.height = 0;
        data.weight = 0;
        data.age = 0;
        data.work = '轻度';
        data[k] = v;
        User.findOrCreate({openid: openid}, {openid: openid, sex: data.sex, height: data.height, weight: data.weight, age: data.age, work: data.work}).exec(function (err, userData){
          if (err) return res.serverError();
          var updateF = {};
          updateF[k] = v;
          User.update({openid: openid}, updateF).exec(function (err, updateData){
            if (err) return res.serverError();
            return res.redirect('/my/info');
          });
        });
      } else {
        return res.serverError();
      }
    }
  },

  /**
   * fav
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  fav: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth?redirect=' + encodeURI('my/fav'));
    var openid = req.cookies.openid;
    var opt = {openid: openid, sort: 'id DESC'};
    Knowledgefav.find(opt).exec(function (err, knowledgefavData) {
      var data = {};
      data.knowledgefavData = knowledgefavData;
      return res.view('my/fav', {data: data, layout: false});
    });
  }

};
