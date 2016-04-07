/**
 * FoodController
 *
 * @description :: food controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * dashboard list
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  dashboardList: function (req, res) {
    var wd = req.query.wd;
    if (wd) wd = wd.trim();
    var foodDic = {};
    var data = [];
    if (wd) {
      var opt = {name: { 'like': '%' + wd + '%' }};
      Food.find(opt).exec(function (err, foodData) {
        if (err) return res.send([]);
        for (var key in foodData) {
          foodDic[foodData[key].name] = foodData[key].name;
        }
        var opt = {tag: wd};
        Foodtag.find(opt).exec(function (err, foodtagData) {
          if (err) return res.send([]);
          for (var key in foodtagData) {
            foodDic[foodtagData[key].food] = foodtagData[key].food;
          }
          var foodName = Object.keys(foodDic);
          var opt = {name: foodName};
          Food.find(opt).exec(function (err, foodData) {
            if (err) return res.send([]);
            var opt = {food: foodName};
            Foodtag.find(opt).exec(function (err, foodtagData) {
              if (err) return res.send([]);
              var tagDic = {};
              for (var key in foodtagData) {
                tagDic[foodtagData[key].food] = tagDic[foodtagData[key].food] ? tagDic[foodtagData[key].food] : [];
                tagDic[foodtagData[key].food].push(foodtagData[key].tag);
              }
              for (var key in foodData) {
                var tag = tagDic[foodData[key].name] ? tagDic[foodData[key].name] : [];
                foodData[key]['tag'] = tag;
              }
              data = foodData;
              return res.send(data);
            });
          });
        });
      });
    } else {
      var opt = {limit: 100, sort: 'id DESC'};
      Food.find(opt).exec(function (err, foodData) {
        if (err) return res.send([]);
        for (var key in foodData) {
          foodDic[foodData[key].name] = foodData[key].name;
        }
        var foodName = Object.keys(foodDic);
        var opt = {food: foodName};
        Foodtag.find(opt).exec(function (err, foodtagData) {
          if (err) return res.send([]);
          var tagDic = {};
          for (var key in foodtagData) {
            tagDic[foodtagData[key].food] = tagDic[foodtagData[key].food] ? tagDic[foodtagData[key].food] : [];
            tagDic[foodtagData[key].food].push(foodtagData[key].tag);
          }
          for (var key in foodData) {
            var tag = tagDic[foodData[key].name] ? tagDic[foodData[key].name] : [];
            foodData[key]['tag'] = tag;
          }
          data = foodData;
          return res.send(data);
        });
      });
    }
  }

};
