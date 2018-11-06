const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

// mock
const books = [
  {
    name: 'Lord of the rings',
    genere: 'Fantasy',
    id: 1,
    authorId: 1
  },
  {
    name: 'The final empire',
    genere: 'Fantasy',
    id: 2,
    authorId: 2
  },
  {
    name: 'The long Earth',
    genere: 'Sci-fi',
    id: 3,
    authorId: 3
  },
  {
    name: 'Hobbit',
    genere: 'Fantasy',
    id: 4,
    authorId: 1
  },
  {
    name: 'The color of magic',
    genere: 'Fantasy',
    id: 5,
    authorId: 2
  },
  {
    name: 'The Ligth Fantastic',
    genere: 'Sci-fi',
    id: 6,
    authorId: 3
  }
]

const authors = [{
  name: 'Tolkien',
  age: 60,
  id: 1
},
{
  name: 'Terry Prachett',
  age: 42,
  id: 2
},
{
  name: 'Brandon Sanderson',
  age: 66,
  id: 3
}
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
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id == parent.id)
      }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books.filter(book => book.authorId == parent.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve (parent, args) {
        // code to get data from db
        return books.find(book => book.id == args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve (parent, args) {
        return authors.find(author => author.id == args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})