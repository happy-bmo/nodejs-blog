const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Succesfully")
    } catch (error) {
        console.log("Failure")

    }
}

module.exports = { connect }