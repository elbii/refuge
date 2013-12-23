var mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'));


var GoodSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  title: String,
  data: Object, // encrypted data
  notes: String,
  tags: Array,
  updated_at: Date
});

GoodSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

exports.model = connection.model('Good', GoodSchema);
