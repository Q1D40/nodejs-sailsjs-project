/**
* Doctor.js
*
* @description :: doctor model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    avatar: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string',
      required: true
    }

  }

};
