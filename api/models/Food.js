/**
* Food.js
*
* @description :: food model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    img: {
      type: 'string',
      defaultsTo: ''
    },

    // 胆固醇偏高人群
    cHP: {
      type: 'string',
      enum: ['能吃', '不能吃', '未收录'],
      defaultsTo: '未收录'
    },

    // 高血脂人群
    hHP: {
      type: 'string',
      enum: ['能吃', '不能吃', '未收录'],
      defaultsTo: '未收录'
    },

    // 胆固醇含量
    cCT: {
      type: 'integer',
      defaultsTo: 0
    },

    // 脂肪含量
    fCT: {
      type: 'integer',
      defaultsTo: 0
    }

  },

  afterDestroy: function (destroyedRecords, cb) {
    for (var key in destroyedRecords) {
      var food = destroyedRecords[key].name;
      Foodtag.destroy({food: food}).exec(function(err) {
        if (err) cb(err);
      });
    }
    cb();
  },

  /*
   * search food
   *
   * @param {String}   wd
   * @param {Function} cb
   */
  search: function (wd, cb) {
    var foodDic = {};
    var opt = {name: { 'like': '%' + wd + '%' }};
    Food.find(opt).exec(function (err, foodData) {
      if (err) return cb(err);
      for (var key in foodData) {
        foodDic[foodData[key].name] = foodData[key].name;
      }
      var opt = {tag: wd};
      Foodtag.find(opt).exec(function (err, foodtagData) {
        if (err) return cb(err);
        for (var key in foodtagData) {
          foodDic[foodtagData[key].food] = foodtagData[key].food;
        }
        var foodName = Object.keys(foodDic);
        var opt = {name: foodName};
        Food.find(opt).exec(function (err, foodData) {
          if (err) return cb(err);
          return cb(false, foodData);
        });
      });
    });
  }

};
