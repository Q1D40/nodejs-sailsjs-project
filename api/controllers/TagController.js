/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * search tag
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  search: function (req, res) {
    var wd = req.query.wd;
    if (wd) wd = wd.trim();
    var data = {
      success: true,
      results: [
        {name: '蔬菜', value: '蔬菜'},
        {name: '水果', value: '水果'},
        {name: '肉', value: '肉'},
        {name: '海鲜', value: '海鲜'}
      ]
    };
    if (wd) {
      var opt = {name: { 'like': '%' + wd + '%' }};
      Tag.find(opt).exec(function (err, tagData) {
        if (err) return res.send(data);
        if (tagData.length <= 0) return res.send(data);
        data.results = [];
        for (var key in tagData) {
          var row = {};
          row.name = tagData[key].name;
          row.value = tagData[key].name;
          data.results.push(row);
        }
        return res.send(data);
      });
    } else {
      return res.send(data);
    }
  }

};

