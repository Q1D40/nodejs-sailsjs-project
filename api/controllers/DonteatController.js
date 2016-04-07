/**
 * DonteatController
 *
 * @description :: do not eat controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');

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
    var food = req.query.food;
    if (food) food = food.trim();
    if (food) {
      var opt = {name: food};
      Food.findOne(opt).exec(function (err, foodData) {
        if (err) return res.view('donteat/index', {layout: false});
        var data = {};
        data.food = food;
        var date = moment().format("YYYY-MM-DD");
        if (!foodData) {
          Food.search(food, function(err, foodData){
            if (err) return res.view('donteat/index', {layout: false});
            if (foodData.length > 0) {
              Datemiss.count(date, true);
              data.randomImg = (Math.ceil(Math.random() * 10) % 5) + 1;
              data.foodData = foodData;
              return res.view('donteat/mresult', {data: data, layout: false});
            } else {
              Miss.count(food);
              Datemiss.count(date, false);
              return res.view('donteat/none', {data: data, layout: false});
            }
          });
        } else {
          Datemiss.count(date, true);
          data.randomImg = (Math.ceil(Math.random() * 10) % 5) + 1;
          data.foodData = foodData;
          return res.view('donteat/result', {data: data, layout: false});
        }
      });
    } else {
      return res.view('donteat/index', {layout: false});
    }
  }

};
