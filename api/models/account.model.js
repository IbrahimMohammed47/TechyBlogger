const mongoose = require('mongoose')
const { Schema } = mongoose

const accountSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('accounts', accountSchema)
