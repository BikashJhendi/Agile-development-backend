const mongoose = require('mongoose');
const localHostUrl = 'mongodb://127.0.0.1:27017/DropShipping'

mongoose.connect(process.env.MONGODB_URL || localHostUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});