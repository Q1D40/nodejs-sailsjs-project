/**
* Knowledgetype.js
*
* @description :: knowledge type model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    subtitle: {
      type: 'string'
    },

    video: {
      type: 'string'
    },

    category: {
      type: 'string',
      enum: ['糖尿病'],
      required: true
    }

  }

};
