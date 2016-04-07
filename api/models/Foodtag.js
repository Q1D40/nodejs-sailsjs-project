/**
* Foodtag.js
*
* @description :: food tag model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    food: {
      type: 'string',
      required: true
    },

    tag: {
      type: 'string',
      required: true
    },

    foodtag: {
      type: 'string',
      unique: true,
    }

  },

  beforeCreate: function (values, cb) {
    values.foodtag = values.food + '_' + values.tag;
    cb();
  },

  afterCreate: function (newlyInsertedRecord, cb) {
    var tag = newlyInsertedRecord.tag;
    Tag.findOrCreate({name: tag}, {name: tag}).exec(function (err, tagData){
      if (err) return cb(err);
      cb();
    });
  }

};

