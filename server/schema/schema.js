const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql

// mock
const books = [
  {name: 'Lord of the rings', genere: 'Fantasy', id: 1},
  {name: 'The final empire', genere: 'Fantasy', id: 2},
  {name: 'The long Earth', genere: 'Sci-fi', id: 3}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    genere: {
      type: GraphQLString
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        // code to get data from db
        return books.find(book => book.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})