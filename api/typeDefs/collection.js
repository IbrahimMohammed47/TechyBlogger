const { gql } = require('apollo-server-express')

const Collection = gql`
  extend type Query {
    collection(collectionId: MongoObjectId!): Collection!
    collections: [Collection!]!
  }
  type Collection {
    id: MongoObjectId!
    title: String!
    viewer: Viewer!
    articles: [Article!]!
  }
`

module.exports = Collection
