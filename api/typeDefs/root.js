const { gql } = require('apollo-server-express')

const root = gql`
  scalar MongoObjectId
  scalar EmailAddress
  scalar Date
  scalar DateTime
  scalar PhoneNumber
  scalar PositiveFloat
  scalar PositiveInt
  scalar JSON
  scalar JSONObject

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`

module.exports = root
