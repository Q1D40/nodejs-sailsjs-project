/**
* Knowledgefav.js
*
* @description :: knowledge fav model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    openid: {
      type: 'string',
      required: true
    },

    knowledge: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    openidknowledge: {
      type: 'string',
      unique: true,
    }

  },

  beforeCreate: function (values, cb) {
    values.openidknowledge = values.openid + '_' + values.knowledge;
    cb();
  }

};
