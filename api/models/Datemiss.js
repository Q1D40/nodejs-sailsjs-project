/**
* Datemiss.js
*
* @description :: datemiss model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    date: {
      type: 'string',
      unique: true,
      required: true
    },

    all: {
      type: 'integer',
      defaultsTo: 0
    },

    miss: {
      type: 'integer',
      defaultsTo: 0
    }

  },

  /*
   * date miss count
   *
   * @param {String}   date
   * @param {Boolean}  hit
   */
  count: function (date, hit) {
    Datemiss.findOrCreate({date: date}, {date: date, all: 0, miss: 0}).exec(function (err, datemissData){
      if (err) return;
      var all = datemissData.all + 1;
      var miss = hit ? datemissData.miss : (datemissData.miss + 1);
      Datemiss.update({date: date}, {all: all, miss: miss}).exec(function (err, updateData){
        if (err) return;
        console.log('add datemiss count done!');
      });
    });
  }

};

