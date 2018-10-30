const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const PORT = 4000
const schema = require('./schema/schema')

app.use('/graphql', graphqlHTTP({
  schema
}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})