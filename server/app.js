const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/gql'
const PORT = process.env.PORT || 7000
const schema = require('./schema/schema')
const moongose = require('mongoose')
const cors = require('cors')

const app = express()

// allow cors
app.use(cors())

const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
}

moongose.connect(mongoURI, connectOptions, (er, db) => {
  if (er) console.log(`Error`, er)
  console.log(`Connected to MongoDB`)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
