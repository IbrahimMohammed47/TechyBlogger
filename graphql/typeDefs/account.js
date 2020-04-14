const { gql } = require('apollo-server-express')

const Account = gql`
  extend type Query {
    account(accountId: MongoObjectId!): Account!
    accounts(filter: AccountFilters, lastId:MongoObjectId, pageSize: Int, pageNumber: Int): [Account!]!
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
  input AccountFilters {
    firstName: StringFilterInput
    lastName: StringFilterInput
    email: StringFilterInput
    createdAt: DateFilterInput
  }
`

module.exports = Account
