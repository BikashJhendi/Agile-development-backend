const mongoose = require('mongoose');
const localHostUrl = 'mongodb://127.0.0.1:27017/DropShipping'

mongoose.connect('mongodb+srv://dhuwani:DzlFUD3pbRQWkJnl@dhuwani.jakvu.mongodb.net/dhuwaniDB?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});