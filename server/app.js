const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/gql'
const PORT = process.env.PORT || 7000
const schema = require('./schema/schema')
const moongose = require('mongoose')

console.log('mongoURI', mongoURI)

const app = express()

const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
}

moongose.connect(mongoURI, connectOptions, (er, db) => {
  if (er) console.log(`Error`, er)
  console.log(`Connected to MongoDB`)
})
moongose.connection.once('open', () => {
  console.log('connected to db ')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
