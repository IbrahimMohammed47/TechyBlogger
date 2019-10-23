const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    rate: {
      type: Schema.Types.Number
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'authors'
    },
    tags: [
      {
        type: String
      }
    ],
    comments: [
      {
        text: {
          type: String
        },
        viewer: {
          type: Schema.Types.ObjectId,
          ref: 'viewers'
        },
        createdAt: Date
      }
    ],
    reacts: [
      {
        type: String,
        enum: ['like', 'love', 'haha', 'sad', 'angry']
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('articles', articleSchema)
