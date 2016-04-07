/**
 * UserController
 *
 * @description :: user controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var https = require('https');

module.exports = {

  APPID : sails.config.wx.APPID,
  SECRET : sails.config.wx.SECRET,
  REDIRECT_URI : sails.config.wx.REDIRECT_URI,

  /**
   * edit
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  edit: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth');
    var openid = req.cookies.openid;
    var step = req.query.step ? req.query.step : 0;
    var data = {};
    data.type = req.query.type;
    data.sex = req.query.sex;
    data.height = req.query.height;
    data.weight = req.query.weight;
    data.age = req.query.age;
    data.work = req.query.work;
    if (step == 0) return res.view('tnbfood/info-tip', {data: data, layout: false});
    if (step == 1) return res.view('tnbfood/slc-sex', {data: data, layout: false});
    if (step == 2) return res.view('tnbfood/slc-height', {data: data, layout: false});
    if (step == 3) return res.view('tnbfood/slc-w', {data: data, layout: false});
    if (step == 4) return res.view('tnbfood/slc-age', {data: data, layout: false});
    if (step == 5) return res.view('tnbfood/slc-work', {data: data, layout: false});
    if (step == 6) {
      User.findOrCreate({openid: openid}, {openid: openid, sex: data.sex, height: data.height, weight: data.weight, age: data.age, work: data.work}).exec(function (err, userData){
        if (err) return res.serverError();
        User.update({openid: openid}, {sex: data.sex, height: data.height, weight: data.weight, age: data.age, work: data.work}).exec(function (err, updateData){
          if (err) return res.serverError();
          //return res.redirect('/user/info?type=' + data.type);
          return res.redirect('/user/info?type=1');
        });
      });
    }
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
    if (!req.cookies.openid) return res.redirect('/user/wxauth?redirect=' + encodeURI('user/info?type=1'));
    var type = req.query.type;
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
          var opt = {openid: openid};
          User.findOne(opt).exec(function (err, userData) {
            if (err) return res.serverError();
            if (!userData) return res.view('tnbfood/my', {data: data, layout: false});
            userData.lw = userData.height - 105;
            var wp = 0;
            var wl = (userData.weight - userData.lw) / userData.lw;
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
            userData.dc = userData.lw * cp;
            userData.jhf = Math.round(userData.dc / 90);
            data.userData = userData;
            if (type == 1){
              return res.view('tnbfood/pro', {data: data, layout: false});
            } else {
              return res.view('tnbfood/my', {data: data, layout: false});
            }
          });
        });
      }).on('error', function(e) {
        console.error(e);
      });
    });
  },

  /**
   * wx auth
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  wxauth: function (req, res) {
    var redirect = req.query.redirect;
    var redirectStr = '';
    if (redirect) redirectStr = '?redirect=' + redirect;
    redirectUri = encodeURI(this.REDIRECT_URI + redirectStr);
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.APPID + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    return res.redirect(url);
  },

  /**
   * wx call back
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  wxcb: function (req, res) {
    var code = req.query.code;
    var redirect = req.query.redirect;
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.APPID + '&secret=' + this.SECRET + '&code=' + code + '&grant_type=authorization_code';
    https.get(url, function(resp) {
      var body = '';
      resp.on('data', function (chunk) {
        body += chunk;
      });
      resp.on('end', function () {
        var data = JSON.parse(body);
        if (data.errcode) { console.log(data); return res.serverError(); }
        var openid = data.openid;
        var accessToken = data.access_token;
        var refreshToken = data.refresh_token;
        Wxauth.findOrCreate({openid: openid}, {openid: openid, accessToken: accessToken, refreshToken: refreshToken}).exec(function (err, wxauthData){
          if (err) return res.serverError();
          Wxauth.update({openid: openid}, {accessToken: accessToken, refreshToken: refreshToken}).exec(function (err, updateData){
            if (err) return res.serverError();
            res.cookie('openid', openid);
            if (!redirect) redirect = 'my/index';
            return res.redirect(redirect);
          });
        });
      });
    }).on('error', function(e) {
      console.error(e);
    });
  },

  /**
   * wx refresh token
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  wxreftk: function (req, res) {
    if (!req.cookies.openid) return res.redirect('/user/wxauth');
    var redirect = req.query.redirect;
    var openid = req.cookies.openid;
    var appid = this.APPID;
    var opt = {openid: openid};
    Wxauth.findOne(opt).exec(function (err, wxauthData) {
      if (err) return res.serverError();
      var accessToken = wxauthData.accessToken;
      var refreshToken = wxauthData.refreshToken;
      var url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appid + '&grant_type=refresh_token&refresh_token=' + refreshToken;
      https.get(url, function(resp) {
        var body = '';
        resp.on('data', function (chunk) {
          body += chunk;
        });
        resp.on('end', function () {
          var data = JSON.parse(body);
          if (data.errcode) return res.redirect('/user/wxauth');
          var openid = data.openid;
          var accessToken = data.access_token;
          var refreshToken = data.refresh_token;
          Wxauth.findOrCreate({openid: openid}, {openid: openid, accessToken: accessToken, refreshToken: refreshToken}).exec(function (err, wxauthData){
            if (err) return res.serverError();
            Wxauth.update({openid: openid}, {accessToken: accessToken, refreshToken: refreshToken}).exec(function (err, updateData){
              if (err) return res.serverError();
              res.cookie('openid', openid);
              return res.redirect(redirect);
            });
          });
        });
      }).on('error', function(e) {
        console.error(e);
      });
    });
  }

};
