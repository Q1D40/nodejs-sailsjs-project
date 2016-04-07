/**
* Miss.js
*
* @description :: miss food model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    count: {
      type: 'integer',
      required: true
    }

  },

  /**
   * miss food count
   *
   * @param {String}   name
   */
  count: function (name) {
    Miss.findOrCreate({name: name}, {name: name, count: 0}).exec(function (err, missData){
      if (err) return;
      var count = missData.count + 1;
      Miss.update({name: name}, {count: count}).exec(function (err, updateData){
        if (err) return;
        console.log('add miss count done!');
      });
    });
  }

};

