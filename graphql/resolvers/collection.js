const { Collection } = require('../models')
const {
  queryResolvesToMany,
  queryResolvesToOne,
  fieldResolvesToOne,
  fieldResolvesToMany
} = require('./factories')
module.exports = {
  Query: {
    collections: queryResolvesToMany(Collection),
    collection: queryResolvesToOne(Collection)
  },
  Collection: {
    articles: fieldResolvesToMany('articles', 'articlesLoader'),
    viewer: fieldResolvesToOne('viewer', 'viewersLoader')
  }
}
