/**
* Recommend.js
*
* @description :: recommend model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    key: {
      type: 'string',
      unique: true,
      required: true
    },

    description: {
      type: 'string'
    },

    config: {
      type: 'text'
    }

  }

};
