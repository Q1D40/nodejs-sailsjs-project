/**
 * CircleController
 *
 * @description :: circle controller
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
    var skip = 0;
    var limit = 10;
    var options = { skip: skip, limit: limit };
    Topic.getCircleTopicList(options, function (err, topicList) {
      if (err) {
        console.log(err);
        topicList = [];
      }
      var data = {};
      data.topicList = topicList;
      return res.view('circle/index', {data: data, layout: false});
    });
  },

  /**
   * topic list
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  topicList: function (req, res) {
    var page = req.query.page;
    if (!page) page = 0;
    var skip = page * 10;
    var limit = 10;
    var options = { skip:skip, limit: limit };
    Topic.getCircleTopicList(options, function (err, topicList) {
      if (err) {
        console.log(err);
        topicList = [];
      }
      var data = {};
      data.topicList = topicList;
      return res.send(data);
    });
  }

};

