const mongoose = require('mongoose');
const localMongoDBUrl = 'mongodb://127.0.0.1:27017/DropShipping'

mongoose.connect(process.env.MONGODB_URL || localMongoDBUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});