/**
 * BodyguardController
 *
 * @description :: bodyguard controller
 * @help        :: See http://sailsjs.org/documentation/concepts/Controllers
 */

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
    if (!req.cookies.openid) return res.redirect('/user/wxauth');
    var openid = req.cookies.openid;
    var opt = {openid: openid};
    var type = 0;
    User.findOne(opt).exec(function (err, userData) {
      if (err) return res.serverError();
      if (userData) type = 1;
      Tnbfoodlist.findOne(opt).exec(function (err, tnbfoodlistData) {
        if (err) return res.serverError();
        if (tnbfoodlistData) type = 2;
        var data = {};
        data.type = type;
        return res.view('tnbfood/index', {data: data, layout: false});
      });
    });
  }

};

