const { gql } = require('apollo-server-express')

const Account = gql`
  extend type Query {
    account(accountId: MongoObjectId!): Account!
    accounts: [Account!]!
  }
  type Account {
    id: MongoObjectId!
    firstName: String
    lastName: String
    image: String
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

module.exports = Account
