const { gql } = require('apollo-server-express')

const Author = gql`
  extend type Query {
    author(authorId: MongoObjectId!): Author!
    authors: [Author!]!
  }
  type Author {
    id: MongoObjectId!
    rate: Float!
    articles: [Article!]!
    account: Account!
  }
`

module.exports = Author
