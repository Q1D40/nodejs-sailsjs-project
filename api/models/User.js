/**
* User.js
*
* @description :: user model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    openid: {
      type: 'string',
      unique: true,
      required: true
    },

    sex: {
      type: 'string',
      enum: ['男', '女'],
      required: true
    },

    height: {
      type: 'integer',
      required: true
    },

    weight: {
      type: 'integer',
      required: true
    },

    age: {
      type: 'integer',
      required: true
    },

    work: {
      type: 'string',
      enum: ['卧床', '轻度', '中度', '重度'],
      required: true
    }

  }

};
