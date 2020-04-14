const { Viewer } = require('../models')
const { queryResolvesToMany, queryResolvesToOne, fieldResolvesToOne, fieldResolvesToMany } = require('./factories')
module.exports = {
  Query: {
    viewers: queryResolvesToMany(Viewer),
    viewer: queryResolvesToOne(Viewer)
  },
  Viewer: {
    account: fieldResolvesToOne('account', 'accountsLoader'),
    friends: fieldResolvesToMany('friends', 'viewersLoader'),
    collections: fieldResolvesToMany('collections', 'collectionsLoader')
  }
}
