const { gql } = require('apollo-server-express')

const Collection = gql`
  extend type Query {
    collection(collectionId: MongoObjectId!): Collection!
    collections(filter: CollectionFilters, lastId:MongoObjectId, pageSize: Int, pageNumber: Int): [Collection!]!
  }
  type Collection {
    id: MongoObjectId!
    title: String!
    viewer: Viewer!
    articles: [Article!]!
  }
  input CollectionFilters {
    title: StringFilterInput
  }
`

module.exports = Collection
