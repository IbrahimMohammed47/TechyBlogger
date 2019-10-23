const mongoose = require('mongoose')
const { Schema } = mongoose

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    viewer: {
      type: Schema.Types.ObjectId,
      ref: 'viewers'
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'articles'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('collections', collectionSchema)
