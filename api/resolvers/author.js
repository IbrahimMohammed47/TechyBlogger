const { Author } = require('../models')
const {
  queryResolvesToMany,
  queryResolvesToOne,
  fieldResolvesToOne,
  fieldResolvesToMany
} = require('./factories')
module.exports = {
  Query: {
    authors: queryResolvesToMany(Author),
    author: queryResolvesToOne(Author)
  },
  Author: {
    account: fieldResolvesToOne('account', 'accountsLoader'),
    articles: fieldResolvesToMany('articles', 'articlesLoader')
  }
}
