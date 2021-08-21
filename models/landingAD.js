const mongoose = require('mongoose')
const landad = mongoose.model('landing', {

landingimage: {
    type: String,
    // required: true
}
})
module.exports = landad;
