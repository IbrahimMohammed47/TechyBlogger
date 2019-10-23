const { gql } = require('apollo-server-express')
const inputTypes = gql`
  input StringFilterInput {
    eq: String
    in: [String]
    regex: String
  }

  input IntFilterInput {
    eq: PositiveInt
    lt: PositiveInt
    gt: PositiveInt
    in: [PositiveInt]
  }

  input FloatFilterInput {
    eq: PositiveFloat
    lt: PositiveFloat
    gt: PositiveFloat
    in: [PositiveFloat]
  }

  input DateFilterInput {
    eq: DateTime
    lt: DateTime
    gt: DateTime
  }
`
module.exports = inputTypes
