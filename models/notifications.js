var mongoose = require('mongoose');
var sprint = require('./sprint');
var Schema = mongoose.Schema;
var userschema = mongoose.Schema({
	date: Date,
	contenu: String,
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	to: String
});
var notifications = mongoose.model('notifications', userschema, 'notifications');
module.exports = notifications;
