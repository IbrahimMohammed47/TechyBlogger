const mongoose = require('mongoose')
const { Schema } = mongoose

const viewerSchema = new Schema(
  {
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'collections'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'viewers'
      }
    ],
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts'
    },
    interests: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('viewers', viewerSchema)
