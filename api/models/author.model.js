const mongoose = require('mongoose')
const { Schema } = mongoose

const authorSchema = new Schema(
  {
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'articles'
      }
    ],
    rate: {
      type: Schema.Types.Number
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('authors', authorSchema)
