const { gql } = require('apollo-server-express')

const Viewer = gql`
  extend type Query {
    viewer(viewerId: MongoObjectId!): Viewer!
    viewers(filter: String, lastId:MongoObjectId, pageSize: Int, pageNumber: Int): [Viewer!]!
  }
  type Viewer {
    id: MongoObjectId!
    account: Account!
    friends: [Viewer!]!
    collections: [Collection!]!
    interests: [String]!
  }
`

module.exports = Viewer
