import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
{
  authors {
    name
    id
  }
}
`

const getBooksQuery = gql`
{
  books {
    name
    id
  }
}
`

const addBookMutation = gql`
  mutation($name: String!, $genere: String!, $authorId: ID!){
      addBook(name: $name, genere: $genere, authorId: $authorId){
          name
          id
      }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation }
