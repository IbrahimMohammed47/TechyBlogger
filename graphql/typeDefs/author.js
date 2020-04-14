const { gql } = require('apollo-server-express')

const Author = gql`
  extend type Query {
    author(authorId: MongoObjectId!): Author!
    authors(filter: AuthorFilters, lastId:MongoObjectId, pageSize: Int, pageNumber: Int): [Author!]!
  }
  type Author {
    id: MongoObjectId!
    rate: Float!
    articles: [Article!]!
    account: Account!
  }
  input AuthorFilters {
    rate: FloatFilterInput
  }
`

module.exports = Author
