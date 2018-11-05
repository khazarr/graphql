const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql

// mock
const books = [
  {name: 'Lord of the rings', genere: 'Fantasy', id: 1},
  {name: 'The final empire', genere: 'Fantasy', id: 2},
  {name: 'The long Earth', genere: 'Sci-fi', id: 3}
]

const authors = [
  {name: 'Tolkien', age: 60, id: 1},
  {name: 'Terry Prachett', age: 42, id: 2},
  {name: 'Brandon Sanderson', age: 66, id: 3}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genere: {
      type: GraphQLString
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db
        return books.find(book => book.id == args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {id: {
        type: GraphQLID
      }},
      resolve(parent, args) {
        return authors.find(author => author.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})