var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'));


var CredentialSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  login: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  notes: String,

  name: {
    type: String,
    required: true
  },

  tags: Array,

  updated_at: Date,
});

CredentialSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

exports.model = db.model('Credential', CredentialSchema);
