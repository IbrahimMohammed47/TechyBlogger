const { gql } = require('apollo-server-express')

const Article = gql`
  extend type Query {
    article(articleId: MongoObjectId!): Article!
    articles(filter: ArticleFilters, lastId:MongoObjectId, pageSize: Int, pageNumber: Int): [Article!]!
  }
  type Article {
    id: MongoObjectId!
    title:String 
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
  input ArticleFilters {
    title: StringFilterInput
    createdAt: DateFilterInput
    rate: FloatFilterInput
  }
`

module.exports = Article
