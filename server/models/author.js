const moongose = require('mongoose')
const Schema = moongose.Schema

const AuthorSchema = new Schema({
  name: String,
  age: Number
})

module.exports = moongose.model('Author', AuthorSchema)
