const mongoose = require('mongoose')
const AD = mongoose.model('ad', {

adimage: {
    type: String,
    // required: true
}
})
module.exports = AD;

