var mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'));


var CredentialSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  data: String, // encrypted data
  notes: String,
  tags: Array,
  updated_at: Date
});

CredentialSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

exports.model = connection.model('Credential', CredentialSchema);
