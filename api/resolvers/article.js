const { Article } = require('../models')
const { queryResolvesToMany, queryResolvesToOne, fieldResolvesToOne } = require('./factories')
module.exports = {
  Query: {
    articles: queryResolvesToMany(Article),
    article: queryResolvesToOne(Article)
  },
  Article: {
    author: fieldResolvesToOne('author', 'authorsLoader')
  },
  Comment: {
    viewer: fieldResolvesToOne('viewer', 'viewersLoader')
  }
}
