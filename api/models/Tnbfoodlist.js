/**
* Tnbfoodlist.js
*
* @description :: tnb food list model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    openid: {
      type: 'string',
      required: true
    },

    list: {
      type: 'json',
      required: true
    },

    info: {
      type: 'json',
      required: true
    }

  }

};

