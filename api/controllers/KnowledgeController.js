/**
 * KnowledgeController
 *
 * @description :: knowledge controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
var markdown = require("markdown").markdown;

module.exports = {

  /**
   * main
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  main: function (req, res) {
    var data = {};
    return res.view('knowledge/index', {data: data, layout: false});
  },

  /**
   * type
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  type: function (req, res) {
    var category = req.query.category;
    var opt = {category: category, sort: 'id DESC'};
    Knowledgetype.find(opt).exec(function (err, typeData) {
      var opt = {key: 'knowledge_type_tnb_recommend1'};
      Recommend.findOne(opt).exec(function (err, recommendData) {
        var data = {};
        data.typeData = typeData;
        if (recommendData) data.recommend = JSON.parse(recommendData.config);
        return res.view('knowledge/type', {data: data, layout: false});
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
    var type = req.query.type;
    var opt = {id: type};
    var data = {};
    Knowledgetype.findOne(opt).exec(function (err, typeData) {
      if (!typeData) return res.serverError();
      data.typeData = typeData;
      var opt = {type: type, sort: 'id DESC'};
      Knowledge.find(opt).exec(function (err, knowledgeData) {
        data.knowledgeData = knowledgeData;
        return res.view('knowledge/list', {data: data, layout: false});
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
    var openid = req.cookies.openid;
    var id = req.query.id;
    var bak = req.query.bak;
    if (!id) return res.serverError();
    var opt = {id: id};
    Knowledge.findOne(opt).exec(function (err, knowledgeData) {
      if (err) return res.serverError();
      var data = {};
      if (openid) data.openid = openid;
      if (bak) data.bak = bak;
      data.knowledgeData = knowledgeData;
      data.knowledgeData.date = moment(knowledgeData.createdAt).format("YYYY-MM-DD")
      data.knowledgeData.markdown = markdown.toHTML(knowledgeData.content);
      return res.view('knowledge/detail', {data: data, layout: false});
    });
  }

};
