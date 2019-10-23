const { gql } = require('apollo-server-express')

const Article = gql`
  extend type Query {
    article(articleId: MongoObjectId!): Article!
    articles: [Article!]!
  }
  type Article {
    id: MongoObjectId!
    title: String
    body: String
    rate: Float!
    author: Author!
    tags: [String!]!
    comments: [Comment!]!
    reacts: [String]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Comment {
    text: String
    viewer: Viewer!
  }
`

module.exports = Article
