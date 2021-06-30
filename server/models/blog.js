const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title : String,
    author : String,
    text : String
})

module.exports = mongoose.model('blog',blogSchema,'blogs')