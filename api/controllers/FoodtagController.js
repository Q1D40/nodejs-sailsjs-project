/**
 * FoodtagController
 *
 * @description :: food tag controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * delete food tag by food and tag
   *
   * @method GET
   *
   * @param {Object} req
   * @param {Object} res
   */
  del: function (req, res) {
    var food = req.query.food;
    if (food) food = food.trim();
    var tag = req.query.tag;
    if (tag) tag = tag.trim();
    if (food && tag) {
      Foodtag.destroy({food: food, tag: tag}).exec(function(err) {
        if (err) console.log(err);
      });
    }
    return res.send({result: 'suc'});
  }

};

