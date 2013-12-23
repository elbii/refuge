var mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'));

var SessionSchema = new mongoose.Schema({
  created_at: Date,
  destroyed_at: Date,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

SessionSchema.pre('save', function (next) {
  this.created_at = new Date();
  next();
});

exports.model = connection.model('Session', SessionSchema);
