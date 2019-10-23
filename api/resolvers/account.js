const { Account } = require('../models')
const { queryResolvesToMany, queryResolvesToOne } = require('./factories')
module.exports = {
  Query: {
    accounts: queryResolvesToMany(Account),
    account: queryResolvesToOne(Account)
  }
}
