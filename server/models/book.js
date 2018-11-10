const moongose = require('mongoose')
const Schema = moongose.Schema

const BookSchema = new Schema({
  name: String,
  genere: String,
  authorId: String
})

module.exports = moongose.model('Book', BookSchema)
